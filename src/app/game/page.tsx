'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VerticalThreads from '@/components/VerticalThreads';
import { Sparkles, Terminal, Activity, Zap, Layers, MousePointer2 } from 'lucide-react';

const THREADS_COLOR: [number, number, number] = [0.3, 0.3, 0.8];

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State for HUD metrics
  const [metrics, setMetrics] = useState({
    fps: 0,
    nodes: 0,
    connections: 0,
    stability: 100,
    mode: 'STANDBY'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMouseDown = false;
    let lastTime = performance.now();
    let frameCount = 0;
    let connectionCount = 0;

    class Particle {
      x: number;
      y: number;
      homeX: number;
      homeY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      hue: number;
      intensity: number = 0;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.homeX = x;
        this.homeY = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.hue = 210 + Math.random() * 40; // Blue to Indigo
        this.color = `hsla(${this.hue}, 100%, 70%, 1)`;
      }

      update(mouse: any) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Attraction / Repulsion Logic
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;

          if (isMouseDown) {
            // GRAVITY WELL (Attract)
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force * 1.5;
            this.vy += Math.sin(angle) * force * 1.5;
            this.intensity = Math.min(this.intensity + 0.1, 1);
          } else {
            // REPULSION (Standard)
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.8;
            this.vy -= Math.sin(angle) * force * 0.8;
            this.intensity = Math.max(this.intensity - 0.05, 0);
          }
        } else {
          this.intensity = Math.max(this.intensity - 0.02, 0);
        }

        // Return to Home position (Resilience)
        const dHomeX = this.homeX - this.x;
        const dHomeY = this.homeY - this.y;
        this.vx += dHomeX * 0.005;
        this.vy += dHomeY * 0.005;

        // Physics
        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.92;
        this.vy *= 0.92;
      }

      draw() {
        if (!ctx) return;
        const glowSize = this.intensity * 15;

        ctx.beginPath();
        // Fixed size and color for a cleaner, non-flickering look
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // Constant color and opacity (Removed intensity-based flicker)
        ctx.fillStyle = `hsla(${this.hue}, 100%, 75%, 0.7)`;

        // Consistent subtle glow for all nodes
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, 0.5)`;

        ctx.fill();
        ctx.shadowBlur = 0; // Reset for next draw state
      }
    }

    const initParticles = () => {
      particles = [];
      const density = Math.floor((width * height) / 10000); // Higher density
      for (let i = 0; i < density; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height));
      }
      setMetrics(prev => ({ ...prev, nodes: particles.length }));
    };

    const mouse = { x: -1000, y: -1000, radius: 250 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseDown = () => {
      isMouseDown = true;
      setMetrics(prev => ({ ...prev, mode: 'GRAVITY_WELL' }));
    };
    const handleMouseUp = () => {
      isMouseDown = false;
      setMetrics(prev => ({ ...prev, mode: 'REPULSION' }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };
    window.addEventListener('resize', resize);
    resize();

    const drawLines = () => {
      if (!ctx) return;
      connectionCount = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            connectionCount++;
            const opacity = (1 - dist / 150) * 0.3;
            // Enhanced glow if near mouse
            const interaction = (particles[i].intensity + particles[j].intensity) / 2;

            // Constant line opacity and width for a stable visual state
            ctx.beginPath();
            ctx.strokeStyle = `hsla(210, 100%, 70%, 0.15)`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update(mouse);
        p.draw();
      });
      drawLines();

      // Update Metrics every 30 frames
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: frameCount,
          connections: connectionCount,
          stability: Math.max(0, 100 - (isMouseDown ? 40 : 10))
        }));
        frameCount = 0;
        lastTime = now;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen w-full bg-[#050511] overflow-hidden flex flex-col items-center justify-center cursor-none">

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <VerticalThreads color={THREADS_COLOR} />
      </div>

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 mix-blend-screen"
      />

      {/* ─── TECHNICAL HUD ─── */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Top Left: Logo & Location */}
        <div className="absolute top-10 left-10 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-outfit font-black tracking-widest text-white">REBIK::LAB</h2>
          </div>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Node-Physics // Prototype_04</p>
        </div>

        {/* Bottom Left: Metrics Panel */}
        <div className="absolute bottom-10 left-10 flex flex-col gap-6 font-mono text-white/40">
          <HUDMetric icon={Activity} label="Frame Rate" value={`${metrics.fps} FPS`} />
          <HUDMetric icon={Layers} label="Node Density" value={`${metrics.nodes} Units`} />
          <HUDMetric icon={Zap} label="System Mode" value={metrics.mode} className="text-blue-400" />
        </div>

        {/* Bottom Right: Instructions */}
        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-2 text-white/60 text-xs font-mono tracking-wider">
            <MousePointer2 className="w-4 h-4" />
            HOLD MOUSE TO INVOKE GRAVITY WELL
          </div>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] max-w-[200px]">
            Constellation resilience active. Automatic structural realignment enabled.
          </p>
        </div>
      </div>

      {/* ─── CENTRAL OVERLAY ─── */}
      <div className="relative z-30 pointer-events-none flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-outfit font-black tracking-tighter text-white drop-shadow-2xl">
            CONSTELLATION<span className="text-blue-500">.</span>
          </h1>
        </motion.div>
      </div>

      {/* Custom Crosshair (Since we have cursor-none) */}
      <CustomCursor />

    </main>
  );
}

function HUDMetric({ icon: Icon, label, value, className = "" }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className={`text-lg font-bold tracking-tighter ${className}`}>{value}</div>
    </div>
  );
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const handleDown = () => setIsDown(true);
    const handleUp = () => setIsDown(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className={`absolute inset-0 border border-white/40 rounded-full transition-transform duration-300 ${isDown ? 'scale-[2.5] bg-white/20' : 'scale-100'}`} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
    </div>
  );
}
