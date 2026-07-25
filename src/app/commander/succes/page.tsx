"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getWhatsAppOrderLink } from "@/lib/store";

function SuccessContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const orderRef = searchParams.get("ref") || "CMD-XXXX";

  const whatsappLink = getWhatsAppOrderLink(orderRef);

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 flex justify-center items-center min-h-[70vh]">
      <Card className="max-w-lg w-full text-center bg-[#0a0a0f] border-[#10b981]/30 relative overflow-hidden">
        {/* Success glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#10b981] blur-[80px] opacity-10 pointer-events-none"></div>
        
        <CardContent className="p-8 md:p-12">
          <div className="w-20 h-20 bg-[#10b981]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#10b981] border border-[#10b981]/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{t("order.orderSuccess")}</h1>
          
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 mb-6 inline-block">
            <span className="text-sm text-[#8888a0] block mb-1">{t("order.orderRef")}</span>
            <span className="text-xl font-mono font-bold text-[#f0f0f5]">{orderRef}</span>
          </div>
          
          <p className="text-[#8888a0] mb-8 leading-relaxed">
            {t("order.orderNextSteps")}
          </p>
          
          <div className="flex flex-col gap-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-[#25d366] hover:bg-[#128c7e] text-white h-12 text-base font-semibold border-none flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {t("order.goToWhatsApp")}
              </Button>
            </a>
            <Link href="/suivi" className="w-full">
              <Button variant="outline" className="w-full h-12">
                {t("order.goToTracking")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#050508]">
        <Suspense fallback={<div className="flex justify-center items-center h-64">{/* Loading */}</div>}>
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
