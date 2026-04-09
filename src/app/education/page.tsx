'use client';

import { motion, Variants } from 'framer-motion';
import data from '@/data/data.json';
import { GraduationCap, CalendarDays, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import VerticalThreads from '@/components/VerticalThreads';

// Matched Indigo/Blue for site-wide continuity
const THREADS_COLOR: [number, number, number] = [0.3, 0.3, 0.8];

// Animation Variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } as any },
};

export default function EducationPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#050511] text-white overflow-y-auto overflow-x-hidden pb-32">
      {/* Background Movement - Matched with About Page Indigo/Blue */}
      <div className="fixed inset-0 z-0 opacity-40">
        <VerticalThreads color={THREADS_COLOR} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 sm:pt-32 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20 mb-32">
          <motion.div variants={fadeIn} initial="hidden" animate="show" className="flex-1">
            <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-outfit font-black tracking-tighter text-white leading-none mb-6">
              Academic<br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10 italic">Foundation.</span>
            </h1>
            <p className="text-white/40 font-inter text-base sm:text-lg max-w-lg tracking-wide leading-relaxed">
              Tracking the formal grounding in computer science and specialized engineering certs that define my methodology.
            </p>
          </motion.div>

          {/* Focus Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="w-full lg:w-[400px] shrink-0">
            <div className="relative p-8 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white/60" />
                </div>
                <h3 className="text-xl font-outfit font-bold text-white tracking-tight">Focus</h3>
              </div>
              <p className="text-white/40 text-sm font-inter leading-relaxed">
                Full-Stack systems, Cloud Infrastructure, and Algorithmic Efficiency.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Zig-Zag Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent transform lg:-translate-x-1/2" />

          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 lg:space-y-0">
            {data.education.map((edu, i) => {
              const isEven = i % 2 === 0;
              const hasLink = !!edu.link;

              return (
                <div key={i} className="relative group">
                  {/* Node */}
                  <div className="absolute left-[16px] lg:left-1/2 top-1 lg:top-8 w-2 h-2 rounded-full bg-white border border-white/50 z-20 transform lg:-translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:scale-150 transition-transform duration-500" />

                  <div className={`flex flex-col lg:flex-row items-center w-full ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    <div className="w-full lg:w-1/2 pl-12 lg:pl-0 lg:px-16">
                      <motion.div variants={fadeIn} className={`text-center lg:${isEven ? 'text-right' : 'text-left'}`}>
                        {/* Meta */}
                        <div className={`inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase mb-4 ${isEven ? 'lg:mr-0' : 'lg:ml-0'}`}>
                          {edu.year}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-black text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/40 transition-all duration-500">
                          {edu.degree}
                        </h2>

                        <div className={`flex items-center gap-2 text-white/30 text-xs sm:text-sm font-inter uppercase tracking-widest mb-6 ${isEven ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span className="font-bold text-white/60">{edu.institution}</span>
                        </div>

                        {/* Description */}
                        {edu.description && (
                          <div className={`max-w-md mx-auto ${isEven ? 'lg:mr-0' : 'lg:ml-0'}`}>
                            <p className="text-sm sm:text-base text-white/40 font-inter leading-relaxed font-light">{edu.description}</p>
                          </div>
                        )}

                        {/* Link */}
                        {hasLink && (
                          <Link
                            href={edu.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-6 inline-flex items-center gap-2 text-xs font-bold text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em] ${isEven ? 'lg:flex-row-reverse' : ''}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Verify
                          </Link>
                        )}
                      </motion.div>
                    </div>
                    <div className="hidden lg:block lg:w-1/2" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
