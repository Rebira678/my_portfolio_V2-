'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from './AppProvider';
import { usePathname } from 'next/navigation';

export default function CinematicIntro() {
    const { stage, setStage } = useAppContext();
    const [percent, setPercent] = useState(0);
    const pathname = usePathname();

    // Lock body scroll while intro is visible
    useEffect(() => {
        const isVisible = stage === 'preloading' || stage === 'lanyard' || stage === 'cinematic';
        document.body.style.overflow = isVisible ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [stage]);

    // Loading progress
    useEffect(() => {
        if (stage !== 'preloading' && stage !== 'lanyard') return;

        let p = 0;
        const interval = setInterval(() => {
            // Sleek logarithmic ease-out loading style
            const step = Math.max(1, (100 - p) / 10);
            p += step;
            if (p >= 99) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => setStage('cinematic'), 80); // trigger the eclipse expansion quickly
            }
            setPercent(Math.floor(p));
        }, 40);

        return () => clearInterval(interval);
    }, [stage]);

    const isVisible = (stage === 'preloading' || stage === 'lanyard' || stage === 'cinematic') && pathname === '/';
    if (!isVisible) return null;

    // The actual site is rendered UNDER this layer. 
    // We will create a full-screen black overlay that has a transparent circular hole in the center.
    // We can achieve this elegantly with a radial-gradient mask that we expand.

    // In Framer Motion, we can animate `clipPath: circle(...)` from 0% to 150%. 
    // But wait, clipPath hides the OUTSIDE of the circle. We want the exact opposite?
    // No, we want the intro screen to BE the mask covering the site.
    // Actually, if we apply the clipPath to a solid black div over the site:
    // clip-path: circle(R at 50% 50%) keeps the black INSIDE the circle.

    // A better way: Let the CinematicIntro fully cover the screen with black.
    // Inside it, show a sleek spinning ring.
    // When stage hits cinematic, simply fade the black out with a massive scale/blur effect,
    // or a central burst.

    return (
        <AnimatePresence>
            <motion.div
                key="intro"
                className="fixed inset-0 w-full h-screen pointer-events-none flex justify-center items-center overflow-hidden z-[1000]"
            >
                <motion.div
                    animate={{ opacity: stage === 'cinematic' ? 0 : 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
                    className="absolute inset-0 bg-[#030308]"
                />

                {/* The Eclipse Loader */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: stage === 'cinematic' ? 150 : 1,
                        opacity: stage === 'cinematic' ? 0 : 1
                    }}
                    transition={{
                        duration: stage === 'cinematic' ? 0.8 : 2,
                        ease: stage === 'cinematic' ? [0.7, 0, 0.3, 1] : "easeOut"
                    }}
                    className="relative flex justify-center items-center"
                >
                    {/* Static placeholder for the bloom (Removed pulsing flicker) */}
                    <div
                        className="hidden md:block absolute w-32 h-32 bg-blue-500 rounded-full blur-[40px] mix-blend-screen opacity-40"
                    />

                    {/* Outer spinning ring - multiple rings for an astrolabe feel */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute w-40 h-40 border-[1px] border-white/10 rounded-full border-t-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                        className="absolute w-48 h-48 border-[1px] border-white/5 rounded-full border-l-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    />

                    {/* Core circle that acts as the "lens" */}
                    <div className="w-24 h-24 rounded-full bg-black border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] flex justify-center items-center md:backdrop-blur-md">
                        {/* Percentage counter */}
                        <h2 className="font-outfit font-black text-white/90 text-2xl tracking-tighter">
                            {percent}
                        </h2>
                        <span className="text-white/40 text-xs ml-0.5">%</span>
                    </div>

                </motion.div>

                {/* Text (Removed pulse) */}
                <motion.div
                    animate={{ opacity: stage === 'cinematic' ? 0 : 1, y: stage === 'cinematic' ? 20 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute bottom-16 sm:bottom-24"
                >
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/30 font-inter">
                        Establishing Connection
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
