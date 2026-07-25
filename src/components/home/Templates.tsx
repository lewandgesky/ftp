"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Template {
  id: number;
  title: string;
  field: string;
  pages: number;
  color: string;
  border: string;
  abstract: string;
  sections: string[];
}

export function Templates() {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const templates: Template[] = [
    {
      id: 1,
      title: "Analyse de la chaîne logistique et optimisation des flux",
      field: "Logistique & Transport",
      pages: 45,
      color: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      abstract: "Ce rapport examine en profondeur les processus de gestion de la chaîne logistique au sein de l'entreprise XYZ, avec une attention particulière portée sur l'optimisation des flux de marchandises et la réduction des coûts opérationnels.",
      sections: ["Introduction Générale", "Présentation de l'entreprise", "Cadre théorique et méthodologie", "Analyse des flux existants", "Diagnostic et recommandations", "Plan d'optimisation proposé", "Conclusion et perspectives"],
    },
    {
      id: 2,
      title: "Développement d'une application de gestion des stocks",
      field: "Génie Logiciel",
      pages: 62,
      color: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30",
      abstract: "Ce projet de stage porte sur la conception et le développement d'une application web de gestion des stocks pour la société ABC, utilisant les technologies modernes React et Node.js pour créer une solution performante et intuitive.",
      sections: ["Introduction", "Étude de l'existant", "Analyse et spécifications", "Conception UML", "Implémentation technique", "Tests et validation", "Conclusion"],
    },
    {
      id: 3,
      title: "Stratégie de communication digitale et community management",
      field: "Marketing Digital",
      pages: 38,
      color: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      abstract: "Cette étude analyse les stratégies de communication digitale mises en œuvre lors du stage au sein de l'agence DEF, incluant la gestion des réseaux sociaux, la création de contenu et l'analyse des KPIs de performance.",
      sections: ["Contexte et objectifs", "Présentation de l'agence", "Audit de la communication existante", "Stratégie proposée", "Mise en œuvre opérationnelle", "Résultats et analyse", "Bilan et recommandations"],
    },
    {
      id: 4,
      title: "Audit financier et contrôle de gestion interne",
      field: "Finance & Comptabilité",
      pages: 50,
      color: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/30",
      abstract: "Ce rapport de stage détaille les missions d'audit financier et de contrôle de gestion réalisées au sein du cabinet GHI, couvrant l'analyse des états financiers, l'évaluation des risques et les procédures de contrôle interne.",
      sections: ["Introduction", "Présentation du cabinet", "Cadre réglementaire", "Méthodologie d'audit", "Résultats de l'audit", "Recommandations", "Conclusion générale"],
    },
  ];

  return (
    <>
      <section id="templates" className="py-20 bg-[#1e293b]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("templates.title")}</h2>
              <p className="text-[#94a3b8]">{t("templates.subtitle")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className="overflow-hidden group card-hover bg-[#0f172a] border-[#334155] cursor-pointer"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className={`h-44 bg-gradient-to-br ${template.color} border-b ${template.border} relative flex items-center justify-center p-4`}>
                  <div className="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-[1px]"></div>
                  {/* Realistic document preview */}
                  <div className="relative z-10 w-full h-full bg-white rounded shadow-lg flex flex-col p-3 overflow-hidden">
                    <div className="w-8 h-1 bg-gray-300 rounded-full mb-2 mx-auto"></div>
                    <div className="text-[6px] text-gray-800 font-bold text-center mb-1.5 leading-tight">{template.title}</div>
                    <div className="w-12 h-[2px] bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="space-y-1 flex-1">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                      <div className="w-11/12 h-1.5 bg-gray-100 rounded-full"></div>
                      <div className="w-4/5 h-1.5 bg-gray-100 rounded-full"></div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                      <div className="w-3/4 h-1.5 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-[#8b5cf6] font-medium text-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      Voir l&apos;aperçu
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-medium text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-1 rounded">
                      {template.field}
                    </span>
                    <span className="text-xs text-[#94a3b8] flex items-center gap-1">
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
                  <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-4 group-hover:text-[#8b5cf6] transition-colors">
                    {template.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-[#94a3b8] group-hover:text-[#f1f5f9] transition-colors gap-2">
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

      {/* Preview Modal */}
      {selectedTemplate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedTemplate(null)}
        >
          <div 
            className="bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-auto shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[#334155]">
              <div>
                <span className="text-xs font-medium text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-1 rounded">
                  {selectedTemplate.field}
                </span>
                <h3 className="text-xl font-bold mt-3">{selectedTemplate.title}</h3>
                <p className="text-sm text-[#64748b] mt-1">{selectedTemplate.pages} pages</p>
              </div>
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="w-10 h-10 rounded-full bg-[#334155] hover:bg-[#475569] transition-colors flex items-center justify-center text-[#94a3b8] hover:text-white shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            {/* Document preview */}
            <div className="p-6">
              {/* Simulated document */}
              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-gray-800 max-w-2xl mx-auto">
                {/* Title page simulation */}
                <div className="text-center mb-8 pb-8 border-b-2 border-gray-200">
                  <div className="text-xs uppercase tracking-widest text-gray-400 mb-4">République du Cameroun — Paix - Travail - Patrie</div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">FTP</div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">RAPPORT DE STAGE</h4>
                  <p className="text-sm text-gray-600 font-medium">{selectedTemplate.title}</p>
                  <div className="mt-4 text-xs text-gray-400">Année académique 2025-2026</div>
                </div>
                
                {/* Abstract */}
                <div className="mb-8">
                  <h5 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">Résumé</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedTemplate.abstract}</p>
                </div>
                
                {/* Table of contents */}
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">Table des matières</h5>
                  <div className="space-y-2">
                    {selectedTemplate.sections.map((section, i) => (
                      <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-dashed border-gray-200">
                        <span className="text-gray-700">
                          <span className="text-gray-400 mr-2 font-mono">{String(i + 1).padStart(2, '0')}.</span>
                          {section}
                        </span>
                        <span className="text-gray-400 text-xs font-mono">{Math.floor(Math.random() * 8) + i * 6 + 3}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="text-center mt-8">
                <p className="text-[#94a3b8] text-sm mb-4">Vous voulez un rapport similaire ?</p>
                <Link href="/commander">
                  <Button variant="glow" size="lg" className="px-8">
                    Commander mon rapport
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
