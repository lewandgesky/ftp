"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPriceSettings } from "@/lib/store";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Services() {
  const { t } = useTranslation();
  const [prices, setPrices] = React.useState({ reportPrice: 0, powerpointPrice: 0, packPrice: 0 });
  const scrollRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    getPriceSettings().then(setPrices);
  }, []);

  React.useEffect(() => {
    // Scroll to center card (popular one) on mobile by default
    if (scrollRef.current && window.innerWidth < 768) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = (scrollRef.current.scrollWidth - scrollRef.current.clientWidth) / 2;
        }
      }, 100);
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const services = [
    {
      id: "report",
      key: "report",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-[#f5f0eb] border border-[#d4cdc5] flex items-center justify-center text-[#c8944e] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
        </div>
      ),
      price: prices.reportPrice > 0 ? `${prices.reportPrice} FCFA` : t("services.priceTBD"),
      isPopular: false,
    },
    {
      id: "pack",
      key: "pack",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c8944e] to-[#d4a96a] flex items-center justify-center text-white mb-4 shadow-glow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z"/>
            <path d="M22 2 11 13"/>
          </svg>
        </div>
      ),
      price: prices.packPrice > 0 ? `${prices.packPrice} FCFA` : t("services.priceTBD"),
      isPopular: true,
    },
    {
      id: "powerpoint",
      key: "powerpoint",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-[#f5f0eb] border border-[#d4cdc5] flex items-center justify-center text-[#1e2d3d] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2"/>
            <line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
        </div>
      ),
      price: prices.powerpointPrice > 0 ? `${prices.powerpointPrice} FCFA` : t("services.priceTBD"),
      isPopular: false,
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#f5f0eb]/80 backdrop-blur-md relative overflow-hidden border-y border-white/20">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#c8944e] blur-[150px] opacity-5 rounded-bl-[100%] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e2d3d]">{t("services.title")}</h2>
          <p className="text-[#6b7b8d] max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </Reveal>

        <div className="relative">
          {/* Navigation Arrows (Mobile only) */}
          <button 
            onClick={() => handleScroll("left")}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md text-[#1e2d3d] rounded-full shadow-lg border border-[#d4cdc5]"
            aria-label="Défiler à gauche"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={() => handleScroll("right")}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md text-[#1e2d3d] rounded-full shadow-lg border border-[#d4cdc5]"
            aria-label="Défiler à droite"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <Stagger 
            ref={scrollRef as any}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto overflow-x-auto pb-8 pt-4 snap-x snap-mandatory -mx-4 px-4 md:mx-auto md:px-0 md:overflow-visible scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
          {services.map((service) => {
            const isPopular = service.isPopular;
            const features = (t(`services.${service.key}.features`) as unknown) as string[];

            return (
              <StaggerItem key={service.id} className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center shrink-0 pt-4 md:pt-0">
              <Card
                className={`relative card-hover flex flex-col h-full ${
                  isPopular ? "border-[#c8944e]/50 shadow-glow md:-translate-y-4" : ""
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#c8944e] to-[#d4a96a] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    {t("services.popular")}
                  </div>
                )}
                
                <CardHeader>
                  {service.icon}
                  <CardTitle className="text-xl">{t(`services.${service.key}.name`)}</CardTitle>
                  <CardDescription>{t(`services.${service.key}.desc`)}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-sm text-[#6b7b8d] block mb-1">{t("services.priceLabel")}</span>
                    <span className="text-3xl font-bold text-[#1e2d3d]">{service.price}</span>
                  </div>
                  
                  <ul className="space-y-3">
                    {Array.isArray(features) && features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#4a5568]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#10b981] mt-0.5 shrink-0">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Link href={`/commander?service=${service.id}`} className="w-full">
                    <Button 
                      variant={isPopular ? "glow" : "outline"} 
                      className="w-full"
                    >
                      {t("services.choosePlan")}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              </StaggerItem>
            );
          })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
