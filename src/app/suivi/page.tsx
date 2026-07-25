"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { getOrderByRefAndEmail, getWhatsAppOrderLink } from "@/lib/store";
import { Order, ORDER_STATUS_LIST } from "@/types/order";

function TrackingContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [orderRef, setOrderRef] = useState(searchParams.get("ref") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Auto-search if params exist
  useEffect(() => {
    if (searchParams.get("ref") && searchParams.get("email")) {
      handleSearch();
    }
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setError(false);
    
    setTimeout(() => {
      const found = getOrderByRefAndEmail(orderRef, email);
      if (found) {
        setOrder(found);
      } else {
        setOrder(null);
        setError(true);
      }
      setIsSearching(false);
    }, 800);
  };

  const getStatusIndex = (status: string) => {
    return ORDER_STATUS_LIST.indexOf(status as any);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t("tracking.title")}</h1>
          <p className="text-[#8888a0]">{t("tracking.subtitle")}</p>
        </div>

        {!order ? (
          <Card className="bg-[#0a0a0f] border-[#22223a] max-w-md mx-auto">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="orderRef">{t("tracking.orderRef")}</Label>
                  <Input 
                    id="orderRef" 
                    placeholder={t("tracking.orderRefPlaceholder")} 
                    value={orderRef} 
                    onChange={(e) => setOrderRef(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("tracking.email")}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-md text-sm text-center">
                    {t("tracking.notFound")}
                  </div>
                )}
                
                <Button type="submit" variant="glow" className="w-full h-11" disabled={isSearching || !orderRef || !email}>
                  {isSearching ? t("common.loading") : t("tracking.search")}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8 animate-fade-in-up">
            <button 
              onClick={() => {setOrder(null); router.replace("/suivi");}}
              className="text-sm text-[#8888a0] hover:text-[#f0f0f5] flex items-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Nouvelle recherche
            </button>

            <Card className="bg-[#0a0a0f] border-[#22223a] overflow-hidden">
              {/* Timeline Header */}
              <div className="bg-[#12121a] border-b border-[#22223a] p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-xl font-bold">{order.orderRef}</h2>
                    <p className="text-[#8888a0] text-sm mt-1">{order.reportTheme}</p>
                  </div>
                  <div className="bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#7c3aed] px-4 py-2 rounded-full text-sm font-medium">
                    {t(`tracking.statuses.${order.status}`)}
                  </div>
                </div>

                {/* Visual Timeline */}
                <div className="relative pt-8 pb-4">
                  <div className="absolute top-10 left-0 w-full h-[2px] bg-[#22223a] z-0"></div>
                  
                  {/* Progress Line */}
                  <div 
                    className="absolute top-10 left-0 h-[2px] bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] z-0 transition-all duration-1000"
                    style={{ width: `${(getStatusIndex(order.status) / (ORDER_STATUS_LIST.length - 1)) * 100}%` }}
                  ></div>

                  <div className="relative z-10 flex justify-between">
                    {ORDER_STATUS_LIST.map((s, index) => {
                      const isActive = getStatusIndex(order.status) >= index;
                      const isCurrent = order.status === s;
                      
                      return (
                        <div key={s} className="flex flex-col items-center group relative">
                          <div 
                            className={`w-5 h-5 rounded-full mb-3 flex items-center justify-center border-2 transition-colors duration-500 ${
                              isCurrent ? "bg-[#0a0a0f] border-[#06b6d4] shadow-glow" :
                              isActive ? "bg-[#06b6d4] border-[#06b6d4]" : "bg-[#0a0a0f] border-[#22223a]"
                            }`}
                          >
                            {isActive && !isCurrent && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            )}
                          </div>
                          <span className={`text-[10px] md:text-xs text-center absolute top-8 whitespace-nowrap transition-colors ${isActive ? "text-[#f0f0f5]" : "text-[#5a5a72]"}`}>
                            <span className="hidden md:inline">{t(`tracking.statuses.${s}`)}</span>
                            {/* Short text for mobile could be added here */}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-[#8888a0] mb-4 text-sm uppercase tracking-wider">{t("order.summary")}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-[#5a5a72] mb-1">{t("tracking.orderDate")}</div>
                      <div className="font-medium">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#5a5a72] mb-1">{t("tracking.services")}</div>
                      <div className="font-medium">
                        {order.serviceType === "report" ? t("services.report.name") : 
                         order.serviceType === "powerpoint" ? t("services.powerpoint.name") : 
                         t("services.pack.name")}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#5a5a72] mb-1">{t("tracking.estimatedDelivery")}</div>
                      <div className="font-medium text-[#f59e0b]">
                        {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString('fr-FR') : "À confirmer"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#8888a0] mb-4 text-sm uppercase tracking-wider">Contact & Support</h3>
                  <p className="text-sm text-[#d0d0d5] mb-6 leading-relaxed">
                    Vous avez une question sur l'avancement ou souhaitez envoyer de nouveaux documents ?
                  </p>
                  <a href={getWhatsAppOrderLink(order.orderRef)} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#25d366] hover:bg-[#128c7e] text-white border-none flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      {t("tracking.whatsappFollow")}
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#050508] bg-[url('/grid-pattern.svg')] bg-repeat">
        <Suspense fallback={<div className="flex justify-center items-center h-64">{/* Loading */}</div>}>
          <TrackingContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
