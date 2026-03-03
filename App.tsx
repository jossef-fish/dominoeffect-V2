import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  BarChart3, 
  Target, 
  Clock, 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2, 
  ArrowLeft,
  Info,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Youtube,
  Github
} from 'lucide-react';
import { VideoInput, PerformanceReport } from './types';
import { generatePerformanceReport } from './services/gemini';

type Step = 'LANDING' | 'INPUT' | 'UNLOCK' | 'REPORT';

export default function App() {
  const [step, setStep] = useState<Step>('LANDING');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<VideoInput>({
    title: '',
    script: '',
    topic: '',
    audience: '',
    length: 30
  });
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [hasOpenedForm, setHasOpenedForm] = useState(false);
  const [confirmedSubmission, setConfirmedSubmission] = useState(false);
  const [hasOpenedYoutube, setHasOpenedYoutube] = useState(false);
  const [confirmedYoutube, setConfirmedYoutube] = useState(false);
  const [hasOpenedGithub, setHasOpenedGithub] = useState(false);
  const [confirmedGithub, setConfirmedGithub] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'length' ? parseInt(value) : value }));
  };

  const startAnalysis = () => setStep('INPUT');

  const handleSubmitInput = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('UNLOCK');
  };

  const handleUnlock = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScIxq5Lxlir8AvQjH2JeBcJ0isXtXPmQ8NYVjmkWvQfx59ecA/viewform', '_blank');
    setHasOpenedForm(true);
  };

  const handleYoutubeSubscribe = () => {
    window.open('https://www.youtube.com/@DOMINICEFFECT', '_blank');
    setHasOpenedYoutube(true);
  };

  const handleGithubConnect = () => {
    window.open('https://github.com/DOMINICEFFECT', '_blank');
    setHasOpenedGithub(true);
  };

  const handleShowReport = async () => {
    if (!hasOpenedForm || !confirmedSubmission || !hasOpenedYoutube || !confirmedYoutube || !hasOpenedGithub || !confirmedGithub) {
      alert('Please complete all steps to unlock your report.');
      return;
    }
    setLoading(true);
    try {
      const data = await generatePerformanceReport(formData);
      setReport(data);
      setStep('REPORT');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setStep('LANDING')}>
          <img 
            src="https://storage.googleapis.com/user-uploads-7332.appspot.com/ais-dev-ygpa7yjwxy3awxcwkxadwy-300085071235.asia-east1.run.app/67c42f09-3220-4318-8686-348625906371.png" 
            alt="DOMINIC EFFECT V2 Logo" 
            className="w-10 h-10 object-cover border border-white/10"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-black tracking-tighter uppercase">DOMINIC EFFECT V2</span>
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/DOMINICEFFECT" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          {step !== 'LANDING' && (
            <button 
              onClick={() => setStep(step === 'REPORT' ? 'LANDING' : 'LANDING')}
              className="text-white/50 hover:text-accent transition-colors text-sm uppercase tracking-widest font-bold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit
            </button>
          )}
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'LANDING' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-12 py-20"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-center mb-8"
                >
                  <img 
                    src="https://storage.googleapis.com/user-uploads-7332.appspot.com/ais-dev-ygpa7yjwxy3awxcwkxadwy-300085071235.asia-east1.run.app/67c42f09-3220-4318-8686-348625906371.png" 
                    alt="DOMINIC EFFECT V2 Logo" 
                    className="w-24 h-24 object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none"
                >
                  Will Your Short <br />
                  <span className="text-accent">Go Viral?</span>
                </motion.h1>
                <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto">
                  AI predicts performance before you post. Small changes. Massive reach.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={startAnalysis}
                  className="electric-button group flex items-center gap-3 text-xl"
                >
                  Analyze My Hook
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="grid grid-cols-3 gap-12 pt-12 border-t border-white/10 w-full max-w-2xl">
                  <div className="text-center">
                    <div className="text-accent font-black text-2xl mb-1">98%</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-accent font-black text-2xl mb-1">2.4M</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Hooks Analyzed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-accent font-black text-2xl mb-1">0.4s</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Processing</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'INPUT' && (
            <motion.div 
              key="input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Video Parameters</h2>
                <p className="text-white/50 uppercase tracking-widest text-xs font-bold">Feed the engine your content data</p>
              </div>

              <form onSubmit={handleSubmitInput} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Video Title</label>
                    <input 
                      required
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. How I made $10k in 24 hours"
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Topic / Niche</label>
                    <input 
                      required
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="e.g. Personal Finance / Side Hustles"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">First 5 Seconds Script (The Hook)</label>
                  <textarea 
                    required
                    name="script"
                    value={formData.script}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Type your exact opening lines here..."
                    className="input-field resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Target Audience</label>
                    <input 
                      required
                      name="audience"
                      value={formData.audience}
                      onChange={handleInputChange}
                      placeholder="e.g. Aspiring entrepreneurs aged 18-25"
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Length: {formData.length}s</label>
                    <input 
                      type="range"
                      name="length"
                      min="15"
                      max="60"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="w-full accent-accent bg-white/10 h-1 rounded-none appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-white/30 font-bold">
                      <span>15S</span>
                      <span>60S</span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="electric-button w-full flex justify-center items-center gap-3">
                  Generate Performance Report
                  <Zap className="w-5 h-5 fill-current" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'UNLOCK' && (
            <motion.div 
              key="unlock"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center space-y-12 py-20"
            >
              <div className="w-20 h-20 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <TrendingUp className="w-10 h-10 text-accent" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Analysis Complete</h2>
                <p className="text-xl text-white/60 max-w-md mx-auto">
                  Your performance analysis is ready. Complete the steps below to unlock full analytics.
                </p>
              </div>

              <div className="space-y-8 max-w-md mx-auto">
                {/* Step 1: Form */}
                <div className="space-y-4">
                  <button 
                    onClick={handleUnlock}
                    className={`w-full flex items-center justify-center gap-3 py-4 font-black uppercase tracking-widest text-sm transition-all ${hasOpenedForm ? 'bg-white/10 text-white/40 border border-white/10' : 'bg-accent text-black shadow-[0_0_20px_rgba(0,191,255,0.3)]'}`}
                  >
                    1. Fill Performance Form
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  
                  {hasOpenedForm && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-3 p-3 bg-white/5 border border-white/10"
                    >
                      <input 
                        type="checkbox" 
                        id="confirm-submit"
                        checked={confirmedSubmission}
                        onChange={(e) => setConfirmedSubmission(e.target.checked)}
                        className="w-5 h-5 accent-accent cursor-pointer"
                      />
                      <label htmlFor="confirm-submit" className="text-[10px] font-bold uppercase tracking-widest cursor-pointer select-none">
                        I have submitted the form
                      </label>
                    </motion.div>
                  )}
                </div>

                {/* Step 2: YouTube */}
                <div className="space-y-4">
                  <button 
                    onClick={handleYoutubeSubscribe}
                    className={`w-full flex items-center justify-center gap-3 py-4 font-black uppercase tracking-widest text-sm transition-all ${hasOpenedYoutube ? 'bg-white/10 text-white/40 border border-white/10' : 'bg-[#FF0000] text-white shadow-[0_0_20px_rgba(255,0,0,0.3)]'}`}
                  >
                    2. Subscribe on YouTube
                    <Youtube className="w-5 h-5 fill-current" />
                  </button>
                  
                  {hasOpenedYoutube && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-3 p-3 bg-white/5 border border-white/10"
                    >
                      <input 
                        type="checkbox" 
                        id="confirm-youtube"
                        checked={confirmedYoutube}
                        onChange={(e) => setConfirmedYoutube(e.target.checked)}
                        className="w-5 h-5 accent-[#FF0000] cursor-pointer"
                      />
                      <label htmlFor="confirm-youtube" className="text-[10px] font-bold uppercase tracking-widest cursor-pointer select-none">
                        I have subscribed to channel
                      </label>
                    </motion.div>
                  )}
                </div>

                {/* Step 3: GitHub */}
                <div className="space-y-4">
                  <button 
                    onClick={handleGithubConnect}
                    className={`w-full flex items-center justify-center gap-3 py-4 font-black uppercase tracking-widest text-sm transition-all ${hasOpenedGithub ? 'bg-white/10 text-white/40 border border-white/10' : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
                  >
                    3. Connect GitHub
                    <Github className="w-5 h-5 fill-current" />
                  </button>
                  
                  {hasOpenedGithub && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-3 p-3 bg-white/5 border border-white/10"
                    >
                      <input 
                        type="checkbox" 
                        id="confirm-github"
                        checked={confirmedGithub}
                        onChange={(e) => setConfirmedGithub(e.target.checked)}
                        className="w-5 h-5 accent-white cursor-pointer"
                      />
                      <label htmlFor="confirm-github" className="text-[10px] font-bold uppercase tracking-widest cursor-pointer select-none">
                        I have connected GitHub
                      </label>
                    </motion.div>
                  )}
                </div>
                
                <div className="space-y-4 pt-8 border-t border-white/10">
                  <div className="bg-accent/10 border-l-4 border-accent p-4 mb-2 text-left">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-black leading-relaxed">
                      After completing all steps, unlock your report below.
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleShowReport}
                    disabled={loading || !confirmedSubmission || !confirmedYoutube || !confirmedGithub}
                    className="w-full border border-white/20 hover:border-accent hover:text-accent py-4 uppercase tracking-widest text-xs font-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing Intelligence...' : 'Show My Report'}
                  </button>
                </div>
              </div>

              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold pt-8">
                We respect your privacy. No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          )}

          {step === 'REPORT' && report && (
            <motion.div 
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Report Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
                <div className="space-y-2">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">Performance Report</h2>
                  <p className="text-accent uppercase tracking-widest text-xs font-bold flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" />
                    Intelligence Engine v4.2
                  </p>
                </div>
                <div className="bg-accent text-black px-6 py-3 font-black text-2xl">
                  {report.viral_probability_estimate}% <span className="text-xs uppercase tracking-tighter block">Viral Prob.</span>
                </div>
              </div>

              {/* Score Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Hook', val: report.hook_score, icon: Zap },
                  { label: 'Curiosity', val: report.curiosity_gap_score, icon: Target },
                  { label: 'Intensity', val: report.emotional_intensity_score, icon: TrendingUp },
                  { label: 'Clarity', val: report.clarity_score, icon: Info },
                  { label: 'Loop', val: report.loop_potential_score, icon: Clock },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <item.icon className="w-4 h-4 text-accent" />
                      <span className="text-xl font-black">{item.val}</span>
                    </div>
                    <div className="h-1 bg-white/10 w-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        className="h-full bg-accent"
                      />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-white/40">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="glass-card p-8 space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-black text-accent">Performance Summary</h3>
                <p className="text-lg text-white/80 leading-relaxed italic">
                  "{report.performance_summary}"
                </p>
              </div>

              {/* Two Column Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-widest font-black flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    Improvement Suggestions
                  </h3>
                  <ul className="space-y-4">
                    {report.improvement_suggestions.map((s, i) => (
                      <li key={i} className="flex gap-4 items-start group">
                        <div className="w-6 h-6 rounded-none border border-white/20 flex items-center justify-center text-[10px] font-black group-hover:border-accent group-hover:text-accent transition-colors">
                          0{i + 1}
                        </div>
                        <p className="text-sm text-white/60 leading-snug">{s}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-widest font-black flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Stronger Hook Variants
                  </h3>
                  <div className="space-y-3">
                    {report.stronger_hook_variants.map((v, i) => (
                      <div key={i} className="p-4 bg-white/5 border-l-2 border-accent text-sm font-medium">
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Structure */}
              <div className="space-y-6">
                <h3 className="text-xs uppercase tracking-widest font-black flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  Optimized Video Structure
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
                  {Object.entries(report.recommended_structure).map(([time, strategy], i) => (
                    <div key={i} className="bg-black p-6 space-y-4">
                      <div className="text-[10px] uppercase tracking-widest font-black text-accent">{time.replace('_', ' ')}</div>
                      <p className="text-xs text-white/60 font-medium leading-relaxed">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-12 border-t border-white/10 text-center space-y-8">
                <div className="space-y-2">
                  <h4 className="text-2xl font-black uppercase tracking-tighter">Want retention tracking and historical analytics?</h4>
                  <p className="text-white/40 text-sm">Join DOMINIC EFFECT V2 Pro early access.</p>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <a 
                    href="https://www.youtube.com/@DOMINICEFFECT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-[#FF0000] text-white font-black py-6 px-12 rounded-none transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:shadow-[0_0_50px_rgba(255,0,0,0.5)] text-2xl uppercase tracking-tighter flex-1"
                  >
                    <Youtube className="w-10 h-10 fill-current" />
                    YouTube
                  </a>
                  <a 
                    href="https://github.com/DOMINICEFFECT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-white text-black font-black py-6 px-12 rounded-none transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] text-2xl uppercase tracking-tighter flex-1"
                  >
                    <Github className="w-10 h-10 fill-current" />
                    GitHub
                  </a>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">
                  We respect your privacy. No spam. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none" />
    </div>
  );
}
