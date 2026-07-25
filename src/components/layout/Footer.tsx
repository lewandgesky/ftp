"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0f] border-t border-[#22223a] pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent opacity-50"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[#7c3aed] blur-[100px] rounded-full opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm shadow-glow">
                F
              </div>
              <span className="font-bold text-lg tracking-tight">
                {t("common.brandName")}
              </span>
            </Link>
            <p className="text-[#8888a0] text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-semibold text-[#f0f0f5] mb-4">Plateforme</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/#templates" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("nav.templates")}
                </Link>
              </li>
              <li>
                <Link href="/commander" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("nav.order")}
                </Link>
              </li>
              <li>
                <Link href="/suivi" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("nav.tracking")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-semibold text-[#f0f0f5] mb-4">Informations</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#faq" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("nav.faq")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>

            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-semibold text-[#f0f0f5] mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cgv" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-sm text-[#8888a0] hover:text-[#06b6d4] transition-colors">
                  {t("footer.legal")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#22223a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5a5a72]">
            &copy; {currentYear} {t("common.brandFullName")}. {t("footer.rights")}
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-[#5a5a72]">Made with ❤️ for students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
