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
  updateAdminPassword,
  getAllReviews,
  updateReviewStatus,
  deleteReview
} from "@/lib/store";
import { Order, ORDER_STATUS_LIST, PriceSettings, ServiceType, OrderStatus, Review, ReviewStatus } from "@/types/order";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [prices, setPrices] = useState<PriceSettings>({ reportPrice: 0, powerpointPrice: 0, packPrice: 0 });
  const [activeTab, setActiveTab] = useState<"orders" | "reviews" | "settings">("orders");
  
  const [newPassword, setNewPassword] = useState("");
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    const fetchedOrders = await getAllOrders();
    setOrders(fetchedOrders);
    const fetchedReviews = await getAllReviews();
    setReviews(fetchedReviews);
    const fetchedPrices = await getPriceSettings();
    setPrices(fetchedPrices);
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

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    loadData();
  };

  const handleReviewAction = async (reviewId: string, action: "approve" | "reject" | "delete") => {
    if (action === "delete") {
      if (confirm("Voulez-vous vraiment supprimer cet avis définitivement ?")) {
        await deleteReview(reviewId);
        loadData();
      }
    } else {
      await updateReviewStatus(reviewId, action === "approve" ? "approved" : "rejected");
      loadData();
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrices(prev => ({ ...prev, [name]: Number(value) }));
  };

  const saveSettings = async () => {
    const success = await updatePriceSettings(prices);
    if (!success) {
      alert("Erreur lors de l'enregistrement des prix. Avez-vous exécuté le script SQL pour créer la table 'settings' dans Supabase ?");
      return;
    }
    
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
        <div className="flex-1 bg-[#ebe5de] flex items-center justify-center py-20 px-4">
          <Card className="w-full max-w-md bg-white border-[#d4cdc5]">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c2a275] to-[#d4b483] flex items-center justify-center text-white mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h1 className="text-2xl font-bold text-[#1e2d3d]">Administration REDAC</h1>
                <p className="text-[#6b7b8d] text-sm">Veuillez vous connecter</p>
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
                    className="border-[#d4cdc5] focus:ring-[#c2a275]"
                  />
                </div>
                {loginError && (
                  <p className="text-red-500 text-sm">Mot de passe incorrect</p>
                )}
                <p className="text-[#6b7b8d] text-xs text-center mt-2">
                  Première connexion ? Mot de passe par défaut : <code className="text-[#c2a275]">admin2026</code>
                </p>
                <Button type="submit" className="w-full bg-[#1e2d3d] hover:bg-[#1e2d3d]/90 text-white">
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
      <div className="flex-1 bg-[#ebe5de] pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold text-[#1e2d3d]">Tableau de bord Admin</h1>
            <Button variant="outline" onClick={handleLogout} className="border-[#c2a275] text-[#c2a275] hover:bg-[#c2a275]/10">
              Déconnexion
            </Button>
          </div>

          <div className="flex gap-4 mb-8 border-b border-[#d4cdc5] overflow-x-auto pb-1">
            <button 
              className={`pb-3 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "orders" ? "border-[#c2a275] text-[#c2a275]" : "border-transparent text-[#6b7b8d] hover:text-[#1e2d3d]"}`}
              onClick={() => setActiveTab("orders")}
            >
              Commandes ({orders.length})
            </button>
            <button 
              className={`pb-3 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "reviews" ? "border-[#c2a275] text-[#c2a275]" : "border-transparent text-[#6b7b8d] hover:text-[#1e2d3d]"}`}
              onClick={() => setActiveTab("reviews")}
            >
              Avis ({reviews.filter(r => r.status === 'pending').length} en attente)
            </button>
            <button 
              className={`pb-3 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "settings" ? "border-[#c2a275] text-[#c2a275]" : "border-transparent text-[#6b7b8d] hover:text-[#1e2d3d]"}`}
              onClick={() => setActiveTab("settings")}
            >
              Paramètres & Tarifs
            </button>
          </div>

          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <Card className="bg-white border-[#d4cdc5] p-12 text-center text-[#6b7b8d]">
                  Aucune commande pour le moment.
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => (
                    <Card key={order.id} className="bg-white border-[#d4cdc5] overflow-hidden">
                      <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg text-[#1e2d3d]">{order.orderRef}</span>
                            <span className="text-xs bg-[#ebe5de] px-2 py-1 rounded text-[#6b7b8d]">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-[#6b7b8d]">Client</div>
                              <div className="font-medium text-[#1e2d3d]">{order.fullName}</div>
                              <div className="text-sm text-[#6b7b8d]">{order.email}</div>
                              <div className="text-sm text-[#6b7b8d]">{order.phone}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#6b7b8d]">Projet</div>
                              <div className="font-medium text-[#1e2d3d] line-clamp-1" title={order.reportTheme}>{order.reportTheme}</div>
                              <div className="text-sm text-[#6b7b8d]">{order.school} ({order.studyLevel})</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#6b7b8d]">Service & Prix</div>
                              <div className="font-medium capitalize text-[#1e2d3d]">{order.serviceType}</div>
                              <div className="text-[#c2a275] font-bold">{order.totalPrice && order.totalPrice > 0 ? `${order.totalPrice} FCFA` : "Sur devis"}</div>
                            </div>
                          </div>
                          
                          {/* Fichiers uploadés */}
                          {order.files && order.files.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-[#d4cdc5]">
                              <div className="text-xs text-[#6b7b8d] mb-2 font-semibold uppercase tracking-wider">Documents rattachés ({order.files.length})</div>
                              <div className="flex flex-col gap-2">
                                {order.files.map(f => {
                                  const getSignedUrl = async () => {
                                    const url = f.fileUrl;
                                    const storagePathMatch = url.match(/\/object\/public\/order_documents\/(.+)$/);
                                    if (storagePathMatch) {
                                      const storagePath = decodeURIComponent(storagePathMatch[1]);
                                      const { data } = await supabase.storage
                                        .from('order_documents')
                                        .createSignedUrl(storagePath, 3600);
                                      return data?.signedUrl || url;
                                    }
                                    return url;
                                  };

                                  return (
                                    <div key={f.id} className="flex items-center gap-2 p-2 bg-[#c2a275]/5 rounded border border-[#c2a275]/10">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2a275" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                      <span className="text-sm text-[#1e2d3d] truncate flex-1">{f.fileName}</span>
                                      
                                      {/* Ouvrir */}
                                      <button
                                        onClick={async () => {
                                          const url = await getSignedUrl();
                                          window.open(url, '_blank');
                                        }}
                                        className="flex items-center gap-1 text-xs text-[#c2a275] hover:text-[#b09065] bg-[#c2a275]/10 hover:bg-[#c2a275]/20 px-2.5 py-1.5 rounded transition-colors flex-shrink-0"
                                        title="Ouvrir dans un nouvel onglet"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                                        Ouvrir
                                      </button>
                                      
                                      {/* Télécharger */}
                                      <button
                                        onClick={async () => {
                                          const url = await getSignedUrl();
                                          const res = await fetch(url);
                                          const blob = await res.blob();
                                          const blobUrl = URL.createObjectURL(blob);
                                          const link = document.createElement('a');
                                          link.href = blobUrl;
                                          link.download = f.fileName;
                                          document.body.appendChild(link);
                                          link.click();
                                          document.body.removeChild(link);
                                          URL.revokeObjectURL(blobUrl);
                                        }}
                                        className="flex items-center gap-1 text-xs text-[#7c3aed] hover:text-[#6d28d9] bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 px-2.5 py-1.5 rounded transition-colors flex-shrink-0"
                                        title="Télécharger le fichier"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                                        Télécharger
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="md:w-64 border-t md:border-t-0 md:border-l border-[#d4cdc5] pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                          <Label className="mb-2 block text-[#1e2d3d]">Statut</Label>
                          <select 
                            value={order.status} 
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className="w-full bg-white border border-[#d4cdc5] rounded p-2 text-sm text-[#1e2d3d] focus:outline-none focus:ring-1 focus:ring-[#c2a275]"
                          >
                            {ORDER_STATUS_LIST.map(s => (
                              <option key={s} value={s}>
                                {s === "en_attente_paiement" ? "En attente de paiement" : 
                                 s === "paiement_valide" ? "Paiement validé" :
                                 s === "en_cours" ? "En cours de rédaction" :
                                 s === "premiere_version" ? "Première version" :
                                 s === "en_correction" ? "En correction" :
                                 s === "brouillon" ? "Brouillon" : "Terminée"}
                              </option>
                            ))}
                          </select>
                          
                          <a 
                            href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=Bonjour ${order.fullName}, concernant votre commande ${order.orderRef}...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 w-full bg-[#1e2d3d]/10 text-[#1e2d3d] hover:bg-[#1e2d3d]/20 py-2 rounded text-center text-sm font-medium transition-colors flex items-center justify-center gap-2"
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

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <Card className="bg-white border-[#d4cdc5] p-12 text-center text-[#6b7b8d]">
                  Aucun avis pour le moment. Partagez le lien /avis/nouveau à vos clients.
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map(review => (
                    <Card key={review.id} className={`bg-white border ${review.status === 'pending' ? 'border-[#f59e0b]' : review.status === 'approved' ? 'border-[#10b981]' : 'border-[#ef4444]'} overflow-hidden`}>
                      <div className="p-4 md:p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-lg text-[#1e2d3d]">{review.studentName}</span>
                              {review.isAnonymous && <span className="text-xs bg-[#f5f0eb] text-[#6b7b8d] px-2 py-0.5 rounded-full border border-[#d4cdc5]">Anonyme sur le site</span>}
                            </div>
                            <div className="text-sm text-[#6b7b8d]">
                              {[review.field, review.school].filter(Boolean).join(" · ")}
                            </div>
                            <div className="text-xs text-[#8c9bab] mt-1">
                              {new Date(review.createdAt).toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? "#c8944e" : "none"} stroke={i < review.rating ? "#c8944e" : "#d4cdc5"} strokeWidth="2">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                              ))}
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              review.status === 'pending' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
                              review.status === 'approved' ? 'bg-[#10b981]/10 text-[#10b981]' :
                              'bg-[#ef4444]/10 text-[#ef4444]'
                            }`}>
                              {review.status === 'pending' ? 'En attente' : review.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-[#f5f0eb] p-4 rounded-lg text-[#4a5568] italic mb-4">
                          "{review.content}"
                        </div>
                        
                        <div className="flex gap-2 justify-end border-t border-[#d4cdc5] pt-4">
                          {review.status !== 'approved' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleReviewAction(review.id, 'approve')}
                              className="bg-[#10b981] hover:bg-[#059669] text-white"
                            >
                              Approuver
                            </Button>
                          )}
                          {review.status !== 'rejected' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleReviewAction(review.id, 'reject')}
                              className="border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10"
                            >
                              Rejeter
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleReviewAction(review.id, 'delete')}
                            className="text-[#6b7b8d] hover:text-[#ef4444] hover:bg-[#ef4444]/10"
                            title="Supprimer définitivement"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          </Button>
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
              <Card className="bg-white border-[#d4cdc5]">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <h2 className="text-xl font-bold border-b border-[#d4cdc5] pb-4 text-[#1e2d3d]">Tarification (FCFA)</h2>
                  <p className="text-sm text-[#6b7b8d]">Mettez à 0 pour afficher "Sur devis"</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportPrice" className="text-[#1e2d3d]">Prix - Rédaction Rapport</Label>
                      <Input 
                        id="reportPrice" 
                        name="reportPrice" 
                        type="number" 
                        value={prices.reportPrice} 
                        onChange={handlePriceChange} 
                        className="bg-white border-[#d4cdc5] text-[#1e2d3d]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="powerpointPrice" className="text-[#1e2d3d]">Prix - PowerPoint Seul</Label>
                      <Input 
                        id="powerpointPrice" 
                        name="powerpointPrice" 
                        type="number" 
                        value={prices.powerpointPrice} 
                        onChange={handlePriceChange} 
                        className="bg-white border-[#d4cdc5] text-[#1e2d3d]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="packPrice" className="text-[#1e2d3d]">Prix - Pack Complet</Label>
                      <Input 
                        id="packPrice" 
                        name="packPrice" 
                        type="number" 
                        value={prices.packPrice} 
                        onChange={handlePriceChange} 
                        className="bg-white border-[#d4cdc5] text-[#1e2d3d]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-[#d4cdc5]">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <h2 className="text-xl font-bold border-b border-[#d4cdc5] pb-4 text-[#1e2d3d]">Sécurité</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-[#1e2d3d]">Nouveau mot de passe admin</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        placeholder="Laissez vide pour ne pas modifier"
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="bg-white border-[#d4cdc5] text-[#1e2d3d]"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-6 border-t border-[#d4cdc5]">
                    <Button onClick={saveSettings} className="w-full h-11 bg-[#1e2d3d] hover:bg-[#1e2d3d]/90 text-white">
                      Enregistrer les paramètres
                    </Button>
                    {settingsSaved && (
                      <p className="text-[#10b981] text-sm text-center mt-3 animate-pulse">
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
