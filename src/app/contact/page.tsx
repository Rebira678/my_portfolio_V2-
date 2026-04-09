'use client';

import { motion, AnimatePresence } from 'framer-motion';
import data from '@/data/data.json';
import { Mail, MapPin, Send, MessageSquare, CheckCircle2, Star } from 'lucide-react';
import dynamic from 'next/dynamic';
import VerticalThreads from '@/components/VerticalThreads';
import { useState } from 'react';
import Button from '@/components/ui/Button';

// Dynamically import the map to avoid SSR issues with Leaflet
const EthiopiaMap = dynamic(() => import('@/components/EthiopiaMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl flex items-center justify-center text-white/20 font-inter text-xs tracking-widest uppercase">Initializing Radar...</div>
});

const THREADS_COLOR: [number, number, number] = [0.3, 0.3, 0.8];

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const dataToSubmit = new URLSearchParams();
      dataToSubmit.append('name', formData.name);
      dataToSubmit.append('email', formData.email);
      dataToSubmit.append('message', formData.message);
      dataToSubmit.append('access_key', 'f8483346-848e-4f26-87b1-0b6dc49abf1a');
      dataToSubmit.append('_subject', formData.subject || 'Portfolio Contact');
      dataToSubmit.append('_captcha', 'false');

      const response = await fetch("https://formsubmit.co/ajax/rebikman9@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        body: dataToSubmit
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  const handleFeedbackToggle = () => {
    // Dispatch a global event to open the FeedbackWidget
    window.dispatchEvent(new CustomEvent('toggle-feedback-widget'));
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col justify-between pb-24 md:pb-28">

      {/* Background System */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <VerticalThreads color={THREADS_COLOR} />
      </div>

      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-blue-900/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 flex flex-col gap-12 flex-grow relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-black">Secure Interlink</span>
          <h1 className="mt-4 font-outfit font-black tracking-tighter text-white leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}>
            Liaison<span className="text-blue-500">.</span>
          </h1>
          <div className="mt-6 h-[1px] w-32 bg-gradient-to-r from-blue-500/60 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full items-start">

          {/* ── LEFT COLUMN: Formal Inquiries ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="lg:col-span-7 space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-outfit font-bold text-white/90">Direct Communication</h2>
              <p className="text-white/40 font-inter max-w-xl leading-relaxed">
                If you have a formal project inquiry or partnership proposal, please utilize the secure channel below. All transmissions are encrypted and prioritized.
              </p>
            </div>

            <div className="relative p-8 md:p-10 bg-[#0a0a0f]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-outfit font-black text-white mb-2">Transmission Received</h3>
                    <p className="text-white/40 font-inter">Your message has been safely delivered. I will respond shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-2">Assigned Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Your identity..."
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/40 focus:bg-white/10 transition-all font-inter text-white placeholder:text-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-2">Contact Endpoint</label>
                        <input
                          required
                          type="email"
                          placeholder="yourname@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/40 focus:bg-white/10 transition-all font-inter text-white placeholder:text-white/10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-2">Subject Header</label>
                      <input
                        required
                        type="text"
                        placeholder="Inquiry Type..."
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/40 focus:bg-white/10 transition-all font-inter text-white placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-2">Payload (Message)</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Detailed technical description or message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-3xl px-6 py-4 outline-none focus:border-blue-500/40 focus:bg-white/10 transition-all font-inter text-white placeholder:text-white/10 resize-none"
                      />
                    </div>

                    {formState === 'error' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-[10px] font-inter text-center uppercase tracking-widest">
                        Transmission Interrupted. Use direct email fallback.
                      </motion.p>
                    )}

                    <button
                      disabled={formState === 'submitting'}
                      className="w-full flex items-center justify-center gap-3 p-6 rounded-3xl bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 transition-all font-outfit font-black uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {formState === 'submitting' ? 'Encrypting Transmission...' : (
                        <>
                          Transmit Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Bio & Feedback ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="lg:col-span-5 space-y-12"
          >
            {/* Feedback / Meta Section */}
            <div className="relative p-8 md:p-10 bg-blue-500/5 backdrop-blur-3xl border border-blue-500/10 rounded-[2.5rem] shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquare className="w-32 h-32 text-blue-500" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-white">Project Feedback</h3>
                </div>
                <p className="text-sm text-white/40 font-inter leading-relaxed">
                  Have insights on my work or the engineering patterns used here? I highly value technical critique and constructive feedback.
                </p>
                <Button
                  onClick={handleFeedbackToggle}
                  variant="outline"
                  className="w-full border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all py-6 text-white/90"
                >
                  Open Feedback Portal
                </Button>
              </div>
            </div>

            {/* Map Integration */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-outfit font-bold text-white/90">Strategic Deployment</h3>
                <span className="text-[10px] font-mono text-white/20">COORD: 8.5414° N, 39.2705° E</span>
              </div>

              <div className="relative h-[400px] w-full bg-[#0a0a0f]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-inner">
                <EthiopiaMap />
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <div className="liquid-glass px-4 py-2 flex items-center gap-2 border-white/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[10px] font-inter font-bold tracking-[0.2em] uppercase text-white/80">Active Base</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pl-4 border-l border-white/10 mt-6 font-inter">
                <div className="flex items-center gap-4 text-white/40">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">{data.contact.location}</span>
                </div>
                <div className="flex items-center gap-4 text-white/40">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href={`mailto:${data.contact.email}`} className="text-sm hover:text-white hover:underline transition-all">
                    {data.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 px-6 md:px-12 pt-8 text-xs font-inter text-white/15 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
        <p className="font-mono tracking-widest uppercase">System Operational // {new Date().getFullYear()}</p>
        <div className="flex gap-8 uppercase tracking-[0.3em] font-bold text-[10px]">
          <a href="/projects" className="hover:text-blue-400 transition-colors">Portfolios</a>
          <a href="/resume" className="hover:text-blue-400 transition-colors">Logistics</a>
        </div>
      </footer>
    </main>
  );
}
