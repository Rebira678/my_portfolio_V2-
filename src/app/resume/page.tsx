'use client';

import { motion, Variants } from 'framer-motion';
import data from '@/data/data.json';
import { Briefcase, CalendarDays, ExternalLink, ShieldCheck, Download, FileText } from 'lucide-react';
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

export default function ResumePage() {
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
              Experience<br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10 italic">Evolution.</span>
            </h1>
            <p className="text-white/40 font-inter text-base sm:text-lg max-w-lg tracking-wide leading-relaxed">
              A bi-directional roadmap documenting the architecture of high-performance systems and engineering leadership.
            </p>
          </motion.div>

          {/* ─── NEW: "Cool" Executive Dossier Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[440px] shrink-0 group/card"
          >
            <div className="relative overflow-hidden p-8 sm:p-10 bg-[#0a0a0f]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl transition-all duration-500 group-hover/card:border-white/10 group-hover/card:bg-[#0c0c14]/80">

              {/* Subtle tech accents */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/card:opacity-10 transition-opacity">
                <ShieldCheck className="w-24 h-24 text-white" />
              </div>

              {/* Status Row */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-500/80">Active Dossier</span>
                </div>
                <span className="text-[10px] font-mono text-white/20">RC-001 / 2026</span>
              </div>

              {/* Header */}
              <div className="mb-10">
                <h3 className="text-3xl font-outfit font-black text-white tracking-tight leading-none mb-2">
                  Curriculum <br /> <span className="text-white/40">Vitae</span>
                </h3>
                <p className="text-sm text-white/30 font-inter max-w-[200px]">
                  Verified engineering profile and technical history.
                </p>
              </div>

              {/* Action Grid */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <Link
                  href={data.bio.resumeUrl || "/assets/resume.pdf"}
                  target="_blank"
                  className="group/btn flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <FileText className="w-6 h-6 text-white/40 group-hover/btn:text-white transition-colors" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/60 group-hover/btn:text-white">View</span>
                </Link>

                <a
                  href={data.bio.resumeUrl || "/assets/resume.pdf"}
                  download="Resume_Rebira_Adugna.pdf"
                  className="group/btn flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/10 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300"
                >
                  <Download className="w-6 h-6 text-indigo-400 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">Save</span>
                </a>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Zig-Zag Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent transform lg:-translate-x-1/2" />

          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-12 lg:space-y-0">
            {data.experience.map((expObj, i) => {
              const exp = expObj as any;
              const isEven = i % 2 === 0;
              const hasLink = !!exp.link;

              return (
                <div key={i} className="relative group">
                  {/* Node */}
                  <div className="absolute left-[16px] lg:left-1/2 top-1 lg:top-8 w-2 h-2 rounded-full bg-white border border-white/50 z-20 transform lg:-translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:scale-150 transition-transform duration-500" />

                  <div className={`flex flex-col lg:flex-row items-center w-full ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="w-full lg:w-1/2 pl-12 lg:pl-0 lg:px-16">
                      <motion.div variants={fadeIn} className={`text-center lg:${isEven ? 'text-left' : 'text-right'}`}>
                        {/* Meta */}
                        <div className={`inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase mb-4 ${isEven ? '' : 'lg:ml-auto'}`}>
                          {exp.year || exp.duration}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-black text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/40 transition-all duration-500">
                          {exp.title || exp.role}
                        </h2>

                        <div className={`flex items-center gap-2 text-white/30 text-xs sm:text-sm font-inter uppercase tracking-widest mb-6 ${isEven ? 'justify-center lg:justify-start' : 'justify-center lg:justify-end'}`}>
                          <Briefcase className="w-3.5 h-3.5" />
                          <span className="font-bold text-white/60">{exp.company}</span>
                        </div>

                        {/* Description */}
                        {exp.description && (
                          <div className={`max-w-md mx-auto ${isEven ? 'lg:ml-0' : 'lg:mr-0'}`}>
                            {Array.isArray(exp.description) ? (
                              <div className="space-y-3">
                                {exp.description.map((desc: string, idx: number) => (
                                  <p key={idx} className="text-sm sm:text-base text-white/40 font-inter leading-relaxed font-light">{desc}</p>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm sm:text-base text-white/40 font-inter leading-relaxed font-light">{exp.description}</p>
                            )}
                          </div>
                        )}

                        {/* Link */}
                        {hasLink && (
                          <Link
                            href={exp.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-6 inline-flex items-center gap-2 text-xs font-bold text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em] ${isEven ? '' : 'lg:flex-row-reverse'}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Explore Project
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