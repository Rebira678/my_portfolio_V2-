'use client';

import { motion, useSpring, useScroll, useTransform } from 'framer-motion';
import data from '@/data/data.json';
import { User, Code, BookOpen, ArrowRight } from 'lucide-react';
import StarfieldBackground from '@/components/StarfieldBackground';
import BlurText from '@/components/animations/BlurText';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 35,
    mass: 1.2
  });

  const handleScrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <main className="relative w-full bg-[#000000] text-white select-none font-inter overflow-x-hidden">
      {/* Background Frame Sequence with Cinematic Scaling & Vignette */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none flex items-center justify-center bg-[#000000]">

        {/* 3D Infinity Starfield Simulation */}
        <div className="relative w-full h-full overflow-hidden opacity-100 mix-blend-screen">
          <StarfieldBackground />
        </div>

        {/* Intensely aggressive, thick vignette to completely hide frame boundaries */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#000000_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#000000_100%)] mix-blend-multiply" />

        {/* Very thick edge shadows extending deep into the canvas */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#000000] via-[#000000]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#000000] via-[#000000]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#000000] via-[#000000]/90 to-transparent" />
      </div>

      <div className="relative z-10 w-full flex flex-col" onPointerCancel={(e) => e.stopPropagation()}>

        {/* --- SECTION 1: Welcome Hero --- */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="relative min-h-screen w-full px-8 py-12 md:px-16 md:py-16 flex flex-col justify-between pointer-events-none"
        >
          {/* Top Row */}
          <div className="flex justify-end w-full pt-8 pointer-events-auto">
            <div className="flex gap-6 text-sm font-semibold tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors">
              <a href={data.bio.github} target="_blank" className="hover:text-white transition-colors">GH</a>
              <a href={data.bio.linkedin} target="_blank" className="hover:text-white transition-colors">LI</a>
              <a href={data.bio.twitter} target="_blank" className="hover:text-white transition-colors">X</a>
            </div>
          </div>

          {/* Bottom Content Area */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-32">

            {/* Left Texts */}
            <div className="col-span-1 lg:col-span-8">
              <BlurText text={`Welcome to ${data.bio.name.split(' ')[0]}'s World:`} className="text-sm md:text-base tracking-[0.1em] text-blue-400 mb-2 font-light" delay={200} />

              <div className="font-outfit font-light tracking-tight leading-[1.1] text-white flex flex-col max-w-4xl mt-6 lg:mt-10">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="text-[2.5rem] md:text-5xl lg:text-[4.5rem] !leading-[1.1] drop-shadow-2xl"
                >
                  <span className="text-white/40 font-serif mr-4 lg:mr-8 align-top text-5xl lg:text-7xl leading-none">"</span>
                  The top of one <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">mountain</span>
                  <br className="hidden lg:block" />
                  is the bottom of the <span className="text-blue-500 font-bold">next</span>,
                  <br />
                  so keep <i className="text-blue-400 font-serif lowercase italic">climbing.</i>
                </motion.h2>
              </div>
            </div>

            {/* Right Cta & Paragraph */}
            <div className="col-span-1 lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mb-8"
              >
                <Button onClick={handleScrollToNext} variant="outline" size="md">
                  <span>Explore My World</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-sm md:text-base text-white/50 leading-relaxed font-light max-w-sm drop-shadow-md"
              >
                I am dedicated to engineering robust full-stack systems, blending optimal algorithmic efficiency with pixel-perfect design to deliver exceptional, high-performance web applications.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* --- SECTION 2: Who I Am (Bio) --- */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative min-h-screen w-full px-6 py-24 md:px-12 flex flex-col items-center justify-center"
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 pointer-events-auto items-start">

            {/* Left Header & Meta */}
            <div className="w-full md:w-1/3 flex flex-col pt-2">
              <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-blue-400 font-medium drop-shadow-lg">Who I Am</span>
              <h2 className="text-5xl md:text-7xl font-outfit font-black tracking-tighter text-white mt-4 drop-shadow-2xl">The Engineer</h2>
              <div className="mt-8 mb-12 h-[1px] w-1/2 bg-gradient-to-r from-blue-500 to-transparent opacity-50" />

              <div className="flex flex-col gap-8 mt-2">
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 font-semibold mb-2">Base</p>
                  <p className="font-outfit font-medium text-white/90 drop-shadow-md text-lg md:text-xl tracking-tight">{data.contact.location.split(',')[0]}</p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">Priority Status</p>
                  <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
                    </span>
                    <span className="font-outfit font-medium text-blue-300 text-sm tracking-wide">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bio Text */}
            <div className="w-full md:w-2/3 flex flex-col">
              <div className="relative">
                {/* Modern subtle accent line on the left of the text block */}
                <div className="hidden md:block absolute left-0 top-3 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-blue-500/20 to-transparent opacity-50" />

                <div className="md:pl-10 space-y-8">
                  {/* First paragraph stands out larger */}
                  <p className="text-xl md:text-3xl font-light text-white leading-[1.6] tracking-tight drop-shadow-xl selection:bg-blue-500/30">
                    {data.bio.about[0]}
                  </p>

                  {/* Subsequent paragraphs slightly muted */}
                  <div className="space-y-6 text-base md:text-xl text-white/60 leading-relaxed font-light selection:bg-blue-500/30">
                    {data.bio.about.slice(1).map((p, i) => (
                      <p key={i} className="hover:text-white/80 transition-colors duration-500">{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.section>

        {/* --- SECTION 3: Tech Stack & Contact --- */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative min-h-[80vh] w-full px-6 py-24 md:px-12 flex flex-col items-center justify-center mb-32"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pointer-events-auto items-center">

            <div className="text-center flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-[0.35em] text-blue-300 drop-shadow-md mb-4 flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" /> Capabilities
              </span>
              <h2 className="text-4xl md:text-7xl font-outfit font-black tracking-tighter text-white drop-shadow-2xl">
                Core Ecosystem
              </h2>
            </div>

            {/* Infinite Marquee Rows */}
            <div className="w-[100vw] relative left-1/2 -translate-x-1/2 mt-10 md:mt-16 flex flex-col gap-6 md:gap-8 overflow-hidden mask-gradient-x">

              {/* Row 1: Left to Right */}
              <div className="flex gap-4 md:gap-6 w-max animate-marquee whitespace-nowrap">
                {[...data.skills.slice(0, 9), ...data.skills.slice(0, 9)].map((skill, i) => (
                  <div
                    key={`r1-${i}`}
                    className="flex-shrink-0 px-6 py-3 md:px-8 md:py-4 rounded-2xl border border-white/5 bg-[#000000]/40 backdrop-blur-md text-white/50 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 cursor-default"
                  >
                    <span className="font-outfit font-medium tracking-widest text-sm md:text-lg uppercase">
                      {skill.replace(/\s*\([^)]*\)/, '')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 2: Right to Left */}
              <div className="flex gap-4 md:gap-6 w-max animate-marquee-reverse whitespace-nowrap ml-[-20%]">
                {[...data.skills.slice(9), ...data.skills.slice(9)].map((skill, i) => (
                  <div
                    key={`r2-${i}`}
                    className="flex-shrink-0 px-6 py-3 md:px-8 md:py-4 rounded-2xl border border-white/5 bg-[#000000]/40 backdrop-blur-md text-white/50 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-300 cursor-default"
                  >
                    <span className="font-outfit font-medium tracking-widest text-sm md:text-lg uppercase">
                      {skill.replace(/\s*\([^)]*\)/, '')}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center w-full max-w-xs md:max-w-none mt-8 md:mt-12">
              <Button href="/contact" variant="primary" className="w-full md:w-auto">
                Let's Connect
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1" />
              </Button>
              <Button href="/projects" variant="outline" className="w-full md:w-auto">
                View Projects
              </Button>
            </div>

          </div>
        </motion.section>

      </div>

      {/* Persistent Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="fixed bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-50 text-white/40 mix-blend-difference"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] font-medium drop-shadow-md">Scroll</div>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </main>
  );
}
