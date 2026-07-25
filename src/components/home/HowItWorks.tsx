"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/context";

export function HowItWorks() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance the demo every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <line x1="10" y1="9" x2="8" y2="9"/>
        </svg>
      ),
      color: "#22d3ee",
      title: t("howItWorks.step1Title"),
      desc: t("howItWorks.step1Desc"),
      demo: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#334155] rounded-full w-3/4"></div>
              <div className="h-2 bg-[#334155]/60 rounded-full w-1/2 mt-1.5"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#334155] rounded-full w-5/6"></div>
              <div className="h-2 bg-[#334155]/60 rounded-full w-2/3 mt-1.5"></div>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg border border-dashed border-[#22d3ee]/30 bg-[#22d3ee]/5 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span className="text-xs text-[#22d3ee]">Glissez vos fichiers ici</span>
          </div>
        </div>
      ),
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      ),
      color: "#8b5cf6",
      title: t("howItWorks.step2Title"),
      desc: t("howItWorks.step2Desc"),
      demo: (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-2">
            <span>Paiement sécurisé</span>
            <div className="flex gap-1">
              <div className="w-6 h-4 rounded bg-[#8b5cf6]/30"></div>
              <div className="w-6 h-4 rounded bg-[#8b5cf6]/20"></div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#0f172a] border border-[#334155]">
            <div className="text-[10px] text-[#64748b] mb-1">Montant</div>
            <div className="text-lg font-bold text-[#f1f5f9]">25 000 FCFA</div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#34d399]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Paiement via Mobile Money</span>
          </div>
          <div className="h-1.5 bg-[#334155] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] rounded-full w-2/3 animate-[shimmer_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      ),
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z"/>
          <path d="M22 2 11 13"/>
        </svg>
      ),
      color: "#34d399",
      title: t("howItWorks.step3Title"),
      desc: t("howItWorks.step3Desc"),
      demo: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#34d399]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span className="text-xs text-[#34d399] font-medium">Rapport terminé !</span>
          </div>
          <div className="p-3 rounded-lg bg-[#0f172a] border border-[#334155] flex items-center gap-3">
            <div className="w-10 h-12 rounded bg-gradient-to-br from-[#8b5cf6]/30 to-[#22d3ee]/30 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-[#f1f5f9]">Rapport_Final.pdf</div>
              <div className="text-[10px] text-[#64748b]">45 pages • 2.4 MB</div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#34d399]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            <span>Envoyé via WhatsApp</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 relative bg-[#0f172a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("howItWorks.title")}</h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">{t("howItWorks.subtitle")}</p>
        </div>

        {/* Animated Demo + Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Interactive Demo Panel */}
          <div className="order-2 lg:order-1">
            <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
              {/* Browser chrome mockup */}
              <div className="flex items-center gap-1.5 mb-4 pb-4 border-b border-[#334155]">
                <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/60"></div>
                <div className="ml-3 flex-1 h-6 bg-[#0f172a] rounded-md flex items-center px-3">
                  <span className="text-[10px] text-[#64748b]">faistoiplaisir.com</span>
                </div>
              </div>
              
              {/* Animated content */}
              <div className="min-h-[220px] relative">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      activeStep === index
                        ? "opacity-100 translate-y-0"
                        : activeStep > index
                        ? "opacity-0 -translate-y-4"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${step.color}20`, color: step.color }}>
                        {index + 1}
                      </span>
                      <span style={{ color: step.color }}>{step.title}</span>
                    </div>
                    {step.demo}
                  </div>
                ))}
              </div>
              
              {/* Progress indicator */}
              <div className="flex gap-2 mt-6 pt-4 border-t border-[#334155]">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                      activeStep === index
                        ? "bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee]"
                        : "bg-[#334155] hover:bg-[#475569]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Steps list */}
          <div className="order-1 lg:order-2 space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? "bg-[#1e293b] border border-[#334155] shadow-lg" 
                    : "hover:bg-[#1e293b]/50"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{ 
                    backgroundColor: activeStep === index ? `${step.color}20` : 'rgba(30,41,59,0.5)',
                    color: activeStep === index ? step.color : '#64748b',
                    border: `1px solid ${activeStep === index ? `${step.color}40` : '#334155'}`
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#64748b] font-mono">0{index + 1}</span>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
