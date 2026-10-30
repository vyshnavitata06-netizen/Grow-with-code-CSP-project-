'use client';

import React, { useRef, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { LANGUAGES } from '@/lib/data/languages';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Award, Download, CheckCircle2, Lock, ShieldCheck, Sparkles, Printer } from 'lucide-react';
import { LanguageId } from '@/lib/types';

export default function CertificatesPage() {
  const { user, progress } = useAuth();
  const [selectedCertLang, setSelectedCertLang] = useState<LanguageId>('python');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const langObj = LANGUAGES.find((l) => l.id === selectedCertLang) || LANGUAGES[0];
  const pct = progress.languageProgress[selectedCertLang] || 0;
  const isUnlocked = pct >= 100 || progress.earnedCertificates.some((c) => c.language === selectedCertLang);

  const existingCert = progress.earnedCertificates.find((c) => c.language === selectedCertLang);
  const certId = existingCert?.certificateId || `GWC-${selectedCertLang.toUpperCase()}-948102`;
  const certDate = existingCert?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleDownloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-res canvas dimensions
    canvas.width = 1200;
    canvas.height = 850;

    // Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 850);
    bgGradient.addColorStop(0, '#090d16');
    bgGradient.addColorStop(0.5, '#0f172a');
    bgGradient.addColorStop(1, '#020617');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 850);

    // Decorative Borders
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 1140, 790);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 760);

    // Header Title
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GROW WITH CODE • OFFICIAL CERTIFICATION', 600, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'extrabold 52px serif';
    ctx.fillText('Certificate of Completion', 600, 200);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px sans-serif';
    ctx.fillText('THIS IS PROUDLY PRESENTED TO', 600, 270);

    // Learner Name
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 58px sans-serif';
    ctx.fillText(user?.name || 'Alex Learner', 600, 360);

    // Body Text
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px sans-serif';
    ctx.fillText(
      `for successfully completing all requirements and mastering the structured roadmap for`,
      600,
      440
    );

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`${langObj.name.toUpperCase()} PROGRAMMING PATH`, 600, 510);

    // Footer Info
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px monospace';
    ctx.fillText(`Certificate ID: ${certId}`, 300, 680);
    ctx.fillText(`Issued Date: ${certDate}`, 900, 680);

    ctx.strokeStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(200, 640);
    ctx.lineTo(400, 640);
    ctx.moveTo(800, 640);
    ctx.lineTo(1000, 640);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '16px sans-serif';
    ctx.fillText('Verification Code', 300, 620);
    ctx.fillText('Authorized Registrar', 900, 620);

    // Download PNG image link
    const link = document.createElement('a');
    link.download = `GrowWithCode_Certificate_${langObj.name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  <Award className="h-4 w-4" /> Certification Portal
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Verifiable Learning Certificates
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl">
                  Earn official digital certificates of completion as you complete each programming language roadmap on Grow With Code!
                </p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800 pt-4">
              {LANGUAGES.map((l) => {
                const langPct = progress.languageProgress[l.id] || 0;
                const unlocked = langPct >= 100;
                const isSelected = selectedCertLang === l.id;

                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedCertLang(l.id)}
                    className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{l.icon}</span>
                    <span>{l.name}</span>
                    {unlocked ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] opacity-70">({langPct}%)</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certificate Preview Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{langObj.name} Certificate</h2>
                  <p className="text-xs text-slate-400">
                    Status: {isUnlocked ? 'Unlocked & Issued' : `In Progress (${pct}% Completed)`}
                  </p>
                </div>
              </div>

              {isUnlocked ? (
                <button
                  onClick={handleDownloadCertificate}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg hover:from-amber-400 hover:to-orange-400 transition-all hover:scale-[1.02]"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Certificate (PNG)</span>
                </button>
              ) : (
                <span className="flex items-center gap-1.5 rounded-2xl bg-slate-800 px-4 py-2 text-xs font-bold text-slate-400 border border-slate-700">
                  <Lock className="h-4 w-4" /> Complete 100% to Unlock
                </span>
              )}
            </div>

            {/* Simulated Digital Certificate Artwork */}
            <div className="relative rounded-3xl border-4 border-amber-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 text-center shadow-2xl">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-950/40">
                <ShieldCheck className="h-3.5 w-3.5" /> VERIFIED CREATION
              </div>

              <div className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
                GROW WITH CODE • OFFICIAL CERTIFICATION
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 font-serif">
                Certificate of Completion
              </h2>

              <p className="text-xs text-slate-400 mt-4 uppercase tracking-widest">THIS IS PROUDLY PRESENTED TO</p>

              <div className="text-2xl sm:text-4xl font-extrabold text-cyan-400 mt-2 font-sans">
                {user?.name || 'Alex Learner'}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-4 leading-relaxed">
                for successfully completing all requirements and mastering the structured roadmap for
              </p>

              <div className="text-xl sm:text-2xl font-black text-amber-400 mt-2 tracking-wide uppercase">
                {langObj.name} Programming Path
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2">
                <div>Certificate ID: {certId}</div>
                <div>Issued Date: {certDate}</div>
              </div>
            </div>

            {/* Hidden Canvas for High-Res PNG Download */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </main>
      </div>
    </div>
  );
}
