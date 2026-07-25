"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Card, CardContent } from "@/components/ui/card";

export function Templates() {
  const { t } = useTranslation();

  // Mock data for templates
  const templates = [
    {
      id: 1,
      title: "Analyse de la chaîne logistique et optimisation des flux",
      field: "Logistique & Transport",
      pages: 45,
      color: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
    },
    {
      id: 2,
      title: "Développement d'une application de gestion des stocks",
      field: "Génie Logiciel",
      pages: 62,
      color: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30",
    },
    {
      id: 3,
      title: "Stratégie de communication digitale et community management",
      field: "Marketing Digital",
      pages: 38,
      color: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
    },
    {
      id: 4,
      title: "Audit financier et contrôle de gestion interne",
      field: "Finance & Comptabilité",
      pages: 50,
      color: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/30",
    },
  ];

  return (
    <section id="templates" className="py-20 bg-[#12121a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("templates.title")}</h2>
            <p className="text-[#8888a0]">{t("templates.subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden group card-hover bg-[#0a0a0f] border-[#2a2a3e]">
              <div className={`h-40 bg-gradient-to-br ${template.color} border-b ${template.border} relative flex items-center justify-center p-6 text-center`}>
                <div className="absolute inset-0 bg-[#0a0a0f]/40 backdrop-blur-[2px]"></div>
                <div className="relative z-10 w-full h-full border border-white/10 rounded bg-[#1a1a2e]/80 shadow-sm flex flex-col justify-center items-center p-4">
                  <div className="w-10 h-1 bg-white/20 rounded-full mb-3"></div>
                  <div className="w-full h-2 bg-white/10 rounded-full mb-2"></div>
                  <div className="w-3/4 h-2 bg-white/10 rounded-full mb-2"></div>
                  <div className="w-5/6 h-2 bg-white/10 rounded-full"></div>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-[#06b6d4] bg-[#06b6d4]/10 px-2 py-1 rounded">
                    {template.field}
                  </span>
                  <span className="text-xs text-[#8888a0] flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    {template.pages} {t("templates.pages")}
                  </span>
                </div>
                <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-4 group-hover:text-[#7c3aed] transition-colors">
                  {template.title}
                </h3>
                
                <div className="flex items-center text-sm text-[#8888a0] group-hover:text-[#f0f0f5] transition-colors gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  {t("templates.viewMore")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
