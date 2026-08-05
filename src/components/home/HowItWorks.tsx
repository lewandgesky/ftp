"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { useTranslation } from "@/lib/i18n/context";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function HowItWorks() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  // Auto-advance the demo every 3 seconds — uniquement quand la section
  // est visible à l'écran (évite de tourner dans le vide hors viewport).
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

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
      color: "#c8944e",
      title: t("howItWorks.step1Title"),
      desc: t("howItWorks.step1Desc"),
      demo: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c8944e]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8944e" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#d4cdc5] rounded-full w-3/4"></div>
              <div className="h-2 bg-[#e5dfd8] rounded-full w-1/2 mt-1.5"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c8944e]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8944e" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#d4cdc5] rounded-full w-5/6"></div>
              <div className="h-2 bg-[#e5dfd8] rounded-full w-2/3 mt-1.5"></div>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg border border-dashed border-[#c8944e]/30 bg-[#c8944e]/5 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8944e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span className="text-xs text-[#c8944e]">Glissez vos fichiers ici</span>
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
      color: "#1e2d3d",
      title: t("howItWorks.step2Title"),
      desc: t("howItWorks.step2Desc"),
      demo: (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#6b7b8d] mb-2">
            <span>Paiement sécurisé</span>
            <div className="flex gap-1">
              <div className="w-6 h-4 rounded bg-[#c8944e]/30"></div>
              <div className="w-6 h-4 rounded bg-[#c8944e]/20"></div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#1a2332] border border-[#2a3f52]">
            <div className="text-[10px] text-[#8899aa] mb-1">Montant</div>
            <div className="text-lg font-bold text-[#e8e2dc]">10 000 FCFA</div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#10b981]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Paiement via Mobile Money</span>
          </div>
          <div className="h-1.5 bg-[#d4cdc5] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#c8944e] to-[#d4a96a] rounded-full w-2/3 animate-[shimmer_2s_ease-in-out_infinite]"></div>
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
      color: "#10b981",
      title: t("howItWorks.step3Title"),
      desc: t("howItWorks.step3Desc"),
      demo: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#10b981]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span className="text-xs text-[#10b981] font-medium">Rapport terminé !</span>
          </div>
          <div className="p-3 rounded-lg bg-[#1a2332] border border-[#2a3f52] flex items-center gap-3">
            <div className="w-10 h-12 rounded bg-gradient-to-br from-[#c8944e]/30 to-[#d4a96a]/30 flex items-center justify-center text-[#e8e2dc]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-[#e8e2dc]">Rapport_Final.pdf</div>
              <div className="text-[10px] text-[#8899aa]">45 pages • 2.4 MB</div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#10b981]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6b7b8d]">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            <span>Envoyé via WhatsApp</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 relative bg-[#ebe5de]/80 backdrop-blur-md border-y border-white/20">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e2d3d]">{t("howItWorks.title")}</h2>
          <p className="text-[#6b7b8d] max-w-2xl mx-auto">{t("howItWorks.subtitle")}</p>
        </Reveal>

        {/* Animated Demo + Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Interactive Demo Panel */}
          <div className="order-2 lg:order-1">
            <div className="bg-[#1a2332] rounded-2xl p-6 relative overflow-hidden shadow-lg border border-[#2a3f52]">
              {/* Browser chrome mockup */}
              <div className="flex items-center gap-1.5 mb-4 pb-4 border-b border-[#2a3f52]">
                <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/60"></div>
                <div className="ml-3 flex-1 h-6 bg-[#0f1923] rounded-md flex items-center px-3">
                  <span className="text-[10px] text-[#8899aa]">faistoiplaisir.com</span>
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
              <div className="flex gap-2 mt-6 pt-4 border-t border-[#2a3f52]">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                      activeStep === index
                        ? "bg-gradient-to-r from-[#c8944e] to-[#d4a96a]"
                        : "bg-[#2a3f52] hover:bg-[#3a5062]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Steps list */}
          <Stagger as="div" className="order-1 lg:order-2 space-y-6" stagger={0.15}>
            {steps.map((step, index) => (
              <StaggerItem
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? "bg-white border border-[#d4cdc5] shadow-lg"
                    : "hover:bg-white/50"
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{ 
                    backgroundColor: activeStep === index ? `${step.color}20` : 'rgba(212,205,197,0.5)',
                    color: activeStep === index ? step.color : '#9ca3af',
                    border: `1px solid ${activeStep === index ? `${step.color}40` : '#d4cdc5'}`
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#9ca3af] font-mono">0{index + 1}</span>
                    <h3 className="text-lg font-semibold text-[#1e2d3d]">{step.title}</h3>
                  </div>
                  <p className="text-[#6b7b8d] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
