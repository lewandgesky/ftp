"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation, Locale } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { t, locale, setLocale } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === "fr" ? "en" : "fr");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "glass shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-white font-bold text-xl shadow-glow group-hover:scale-105 transition-transform">
            F
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            {t("common.brandName")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/#services" className="text-sm text-[#f0f0f5] hover:text-[#06b6d4] transition-colors">
            {t("nav.services")}
          </Link>
          <Link href="/#templates" className="text-sm text-[#f0f0f5] hover:text-[#06b6d4] transition-colors">
            {t("nav.templates")}
          </Link>
          <Link href="/#faq" className="text-sm text-[#f0f0f5] hover:text-[#06b6d4] transition-colors">
            {t("nav.faq")}
          </Link>
          <Link href="/suivi" className="text-sm text-[#8888a0] hover:text-[#f0f0f5] transition-colors">
            {t("nav.tracking")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="text-xs font-mono px-2 py-1 rounded border border-[#2a2a3e] hover:bg-[#1a1a2e] transition-colors"
            title={t("common.language")}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          
          <Link href="/commander" className="hidden sm:block">
            <Button variant="glow" size="sm">
              {t("nav.order")}
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2 text-[#f0f0f5]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-strong border-t border-[#2a2a3e] py-4 px-4 flex flex-col gap-4 animate-fade-in-up">
          <Link href="/#services" className="text-[#f0f0f5] py-2 border-b border-[#2a2a3e]/50" onClick={() => setMobileMenuOpen(false)}>
            {t("nav.services")}
          </Link>
          <Link href="/#templates" className="text-[#f0f0f5] py-2 border-b border-[#2a2a3e]/50" onClick={() => setMobileMenuOpen(false)}>
            {t("nav.templates")}
          </Link>
          <Link href="/#faq" className="text-[#f0f0f5] py-2 border-b border-[#2a2a3e]/50" onClick={() => setMobileMenuOpen(false)}>
            {t("nav.faq")}
          </Link>
          <Link href="/suivi" className="text-[#f0f0f5] py-2 border-b border-[#2a2a3e]/50" onClick={() => setMobileMenuOpen(false)}>
            {t("nav.tracking")}
          </Link>
          <Link href="/commander" className="mt-2" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="glow" className="w-full">
              {t("nav.order")}
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
