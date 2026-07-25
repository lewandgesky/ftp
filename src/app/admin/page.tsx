"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  loginAdmin, 
  isAdminLoggedIn, 
  logoutAdmin, 
  getAllOrders, 
  updateOrderStatus, 
  getPriceSettings, 
  updatePriceSettings,
  updateAdminPassword
} from "@/lib/store";
import { Order, ORDER_STATUS_LIST, PriceSettings, ServiceType, OrderStatus } from "@/types/order";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [prices, setPrices] = useState<PriceSettings>({ reportPrice: 0, powerpointPrice: 0, packPrice: 0 });
  const [activeTab, setActiveTab] = useState<"orders" | "settings">("orders");
  
  const [newPassword, setNewPassword] = useState("");
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setOrders(getAllOrders());
    setPrices(getPriceSettings());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setIsLoggedIn(true);
      setLoginError(false);
      loadData();
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsLoggedIn(false);
    setPassword("");
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const success = updateOrderStatus(orderId, newStatus);
    if (success) loadData();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrices(prev => ({ ...prev, [name]: Number(value) }));
  };

  const saveSettings = () => {
    updatePriceSettings(prices);
    let passwordChanged = false;
    if (newPassword) {
      if (newPassword.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères.");
        return;
      }
      passwordChanged = updateAdminPassword(newPassword);
      if (passwordChanged) setNewPassword("");
    }
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 bg-[#0f172a] flex items-center justify-center py-20 px-4">
          <Card className="w-full max-w-md bg-[#0f172a] border-[#334155]">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] flex items-center justify-center text-white mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h1 className="text-2xl font-bold">Administration FTP</h1>
                <p className="text-[#94a3b8] text-sm">Veuillez vous connecter</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                {loginError && (
                  <p className="text-red-500 text-sm">Mot de passe incorrect</p>
                )}
                <p className="text-[#64748b] text-xs text-center mt-2">
                  Première connexion ? Mot de passe par défaut : <code className="text-[#22d3ee]">admin2026</code>
                </p>
                <Button type="submit" variant="glow" className="w-full">
                  Connexion
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#0f172a] pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold">Tableau de bord Admin</h1>
            <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-500/10">
              Déconnexion
            </Button>
          </div>

          <div className="flex gap-4 mb-8 border-b border-[#334155]">
            <button 
              className={`pb-3 px-2 font-medium border-b-2 transition-colors ${activeTab === "orders" ? "border-[#22d3ee] text-[#22d3ee]" : "border-transparent text-[#94a3b8] hover:text-[#f1f5f9]"}`}
              onClick={() => setActiveTab("orders")}
            >
              Commandes ({orders.length})
            </button>
            <button 
              className={`pb-3 px-2 font-medium border-b-2 transition-colors ${activeTab === "settings" ? "border-[#22d3ee] text-[#22d3ee]" : "border-transparent text-[#94a3b8] hover:text-[#f1f5f9]"}`}
              onClick={() => setActiveTab("settings")}
            >
              Paramètres & Tarifs
            </button>
          </div>

          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <Card className="bg-[#0f172a] border-[#334155] p-12 text-center text-[#94a3b8]">
                  Aucune commande pour le moment.
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => (
                    <Card key={order.id} className="bg-[#1e293b] border-[#334155] overflow-hidden">
                      <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">{order.orderRef}</span>
                            <span className="text-xs bg-[#334155] px-2 py-1 rounded text-[#cbd5e1]">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-[#64748b]">Client</div>
                              <div className="font-medium">{order.fullName}</div>
                              <div className="text-sm text-[#94a3b8]">{order.email}</div>
                              <div className="text-sm text-[#94a3b8]">{order.phone}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#64748b]">Projet</div>
                              <div className="font-medium line-clamp-1" title={order.reportTheme}>{order.reportTheme}</div>
                              <div className="text-sm text-[#94a3b8]">{order.school} ({order.studyLevel})</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#64748b]">Service & Prix</div>
                              <div className="font-medium capitalize">{order.serviceType}</div>
                              <div className="text-[#22d3ee] font-bold">{order.totalPrice > 0 ? `${order.totalPrice} FCFA` : "Sur devis"}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-64 border-t md:border-t-0 md:border-l border-[#334155] pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                          <Label className="mb-2 block">Statut</Label>
                          <select 
                            value={order.status} 
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className="w-full bg-[#0f172a] border border-[#334155] rounded p-2 text-sm text-[#f1f5f9] focus:outline-none focus:ring-1 focus:ring-[#8b5cf6]"
                          >
                            {ORDER_STATUS_LIST.map(s => (
                              <option key={s} value={s}>
                                {s === "pending" ? "En attente" : 
                                 s === "accepted" ? "Acceptée" :
                                 s === "in_progress" ? "En cours de rédaction" :
                                 s === "review" ? "En révision" : "Terminée"}
                              </option>
                            ))}
                          </select>
                          
                          <a 
                            href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=Bonjour ${order.fullName}, concernant votre commande ${order.orderRef}...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 w-full bg-[#0ea5e9]/10 text-[#0ea5e9] hover:bg-[#0ea5e9]/20 py-2 rounded text-center text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.94a3b8-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            Contacter
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-[#1e293b] border-[#334155]">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <h2 className="text-xl font-bold border-b border-[#334155] pb-4">Tarification (FCFA)</h2>
                  <p className="text-sm text-[#94a3b8]">Mettez à 0 pour afficher "Sur devis"</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportPrice">Prix - Rédaction Rapport</Label>
                      <Input 
                        id="reportPrice" 
                        name="reportPrice" 
                        type="number" 
                        value={prices.reportPrice} 
                        onChange={handlePriceChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="powerpointPrice">Prix - PowerPoint Seul</Label>
                      <Input 
                        id="powerpointPrice" 
                        name="powerpointPrice" 
                        type="number" 
                        value={prices.powerpointPrice} 
                        onChange={handlePriceChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="packPrice">Prix - Pack Complet</Label>
                      <Input 
                        id="packPrice" 
                        name="packPrice" 
                        type="number" 
                        value={prices.packPrice} 
                        onChange={handlePriceChange} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1e293b] border-[#334155]">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <h2 className="text-xl font-bold border-b border-[#334155] pb-4">Sécurité</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe admin</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        placeholder="Laissez vide pour ne pas modifier"
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-6 border-t border-[#334155]">
                    <Button onClick={saveSettings} variant="glow" className="w-full h-11">
                      Enregistrer les paramètres
                    </Button>
                    {settingsSaved && (
                      <p className="text-[#34d399] text-sm text-center mt-3 animate-pulse">
                        Paramètres enregistrés avec succès !
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
