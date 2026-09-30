'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Star, CheckCircle2, Bot } from 'lucide-react';
import data from '@/data/data.json';

export default function FeedbackWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Listen for global toggle events (from the Contact page button)
    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-feedback-widget', handleToggle);
        return () => window.removeEventListener('toggle-feedback-widget', handleToggle);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        setStatus('submitting');

        try {
            // Use standard FormSubmit AJAX fields
            const dataToSubmit = new URLSearchParams();
            dataToSubmit.append('name', 'Global Feedback User');
            dataToSubmit.append('email', 'anonymous@feedback.com'); // Using a dummy email for the sender field
            dataToSubmit.append('message', feedback); // THIS IS THE CRITICAL LINE
            dataToSubmit.append('access_key', 'f8483346-848e-4f26-87b1-0b6dc49abf1a');
            dataToSubmit.append('_subject', 'Portfolio Feedback');
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
                setStatus('success');
                setFeedback('');
                setTimeout(() => {
                    setStatus('idle');
                    setIsOpen(false);
                }, 3000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error("Feedback error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="fixed bottom-12 right-12 z-[100] font-inter pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                        className="absolute bottom-24 right-0 w-[350px] bg-[#0a0a0f]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/20 animate-ping rounded-full" />
                                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 relative z-10">
                                        <MessageSquare className="w-5 h-5 text-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-outfit font-black text-white">Feedback</h4>
                                    <p className="text-xs text-blue-400/80">We value your thoughts</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 -mr-2 text-white/20 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-10 text-center"
                            >
                                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h4 className="text-lg font-outfit font-bold text-white mb-2">Thank You!</h4>
                                <p className="text-xs text-white/60 leading-relaxed">Your feedback has been successfully sent.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-medium text-white/60 ml-1">Your Message</label>
                                    <div className="relative">
                                        <textarea
                                            required
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Let me know what you think..."
                                            className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-6 text-sm text-white placeholder:text-white/20 outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all resize-none h-32 scrollbar-none shadow-inner"
                                        />
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 text-center font-medium">
                                        Something went wrong. Please try again.
                                    </motion.p>
                                )}

                                <button
                                    disabled={status === 'submitting'}
                                    className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 py-4 rounded-[1.5rem] transition-all"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-sm font-outfit font-bold text-white">
                                            {status === 'submitting' ? 'Sending...' : 'Send Feedback'}
                                        </span>
                                        <Send className={`w-4 h-4 text-white transition-transform ${status === 'idle' ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''}`} />
                                    </div>
                                </button>
                            </form>
                        )}

                        {/* Visual Accents */}
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-[2rem] bg-blue-600 shadow-[0_15px_40px_rgba(37,99,235,0.4)] flex items-center justify-center group pointer-events-auto relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-800 opacity-90" />
                <div className="absolute inset-0 bg-blue-400/20 animate-ping rounded-full opacity-40" />

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0.5, opacity: 0 }}>
                            <X className="w-8 h-8 text-white relative z-10" />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: -90, scale: 0.5, opacity: 0 }} className="flex flex-col items-center">
                            <MessageSquare className="w-8 h-8 text-white relative z-10" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Label */}
                <div className="absolute right-24 py-3 px-6 rounded-2xl bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none shadow-2xl whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-outfit font-medium text-white">Leave Feedback</span>
                    </div>
                </div>
            </motion.button>
        </div>
    );
}
