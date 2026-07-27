import { Order, OrderFile, PriceSettings, OrderStatus, Review, ReviewStatus } from "@/types/order";
import { supabase } from "./supabase";

const SETTINGS_KEY = "ftp-settings";
const ADMIN_KEY = "ftp-admin-auth";
const ADMIN_PASS_KEY = "ftp-admin-pass";
const DEFAULT_ADMIN_PASS = "admin2026";

// ==================== ORDER MANAGEMENT (SUPABASE) ====================

export async function generateOrderRef(): Promise<string> {
  const year = new Date().getFullYear();
  // Get count of orders this year to generate sequential ref
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .like('orderRef', `CMD-${year}-%`);
  
  const currentCount = (count || 0) + 1;
  return `CMD-${year}-${currentCount.toString().padStart(4, "0")}`;
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('createdAt', { ascending: false });
    
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data as Order[];
}

export async function getOrderByRef(orderRef: string): Promise<Order | undefined> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('orderRef', orderRef)
    .single();
    
  if (error) return undefined;
  return data as Order;
}

export async function getOrderByRefAndEmail(orderRef: string, email: string): Promise<Order | undefined> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .ilike('orderRef', orderRef)
    .ilike('email', email)
    .single();
    
  if (error) return undefined;
  return data as Order;
}

export async function createOrder(orderData: Omit<Order, "id" | "orderRef" | "status" | "files" | "createdAt" | "updatedAt">): Promise<Order> {
  const orderRef = await generateOrderRef();
  const now = new Date().toISOString();
  
  const newOrder = {
    ...orderData,
    orderRef,
    status: "en_attente_paiement",
    files: [],
    createdAt: now,
    updatedAt: now,
  };

  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }
  
  return data as Order;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ status, updatedAt: new Date().toISOString() })
    .eq('id', orderId);
    
  if (error) console.error('Error updating status:', error);
}

export async function updateOrderNotes(orderId: string, notes: string): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ adminNotes: notes, updatedAt: new Date().toISOString() })
    .eq('id', orderId);
    
  if (error) console.error('Error updating notes:', error);
}

export async function addFilesToOrder(orderId: string, files: OrderFile[]): Promise<void> {
  // Get current files first
  const { data: order } = await supabase
    .from('orders')
    .select('files')
    .eq('id', orderId)
    .single();
    
  const currentFiles = order?.files || [];
  
  const { error } = await supabase
    .from('orders')
    .update({ 
      files: [...currentFiles, ...files], 
      updatedAt: new Date().toISOString() 
    })
    .eq('id', orderId);
    
  if (error) console.error('Error adding files:', error);
}

// ==================== PRICE SETTINGS (SUPABASE) ====================

export async function getPriceSettings(): Promise<PriceSettings> {
  const defaultPrices = { reportPrice: 0, powerpointPrice: 0, packPrice: 0 };
  
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 'prices')
    .single();
    
  if (error) {
    console.error('Error fetching prices:', error);
    return defaultPrices;
  }
  
  if (data) {
    return {
      reportPrice: data.reportPrice,
      powerpointPrice: data.powerpointPrice,
      packPrice: data.packPrice
    };
  }
  
  return defaultPrices;
}

export async function savePriceSettings(settings: PriceSettings): Promise<boolean> {
  const { error } = await supabase
    .from('settings')
    .upsert({
      id: 'prices',
      reportPrice: Number(settings.reportPrice),
      powerpointPrice: Number(settings.powerpointPrice),
      packPrice: Number(settings.packPrice),
      updatedAt: new Date().toISOString()
    });
    
  if (error) {
    console.error('Error saving prices:', error);
    return false;
  }
  return true;
}

// ==================== ADMIN AUTH (Local Storage MVP) ====================

function hashPassword(password: string): string {
  return btoa(encodeURIComponent(password));
}

function getStoredPassword(): string {
  if (typeof window === "undefined") return hashPassword(DEFAULT_ADMIN_PASS);
  const stored = localStorage.getItem(ADMIN_PASS_KEY);
  if (!stored) {
    const hashed = hashPassword(DEFAULT_ADMIN_PASS);
    localStorage.setItem(ADMIN_PASS_KEY, hashed);
    return hashed;
  }
  return stored;
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_KEY) === "true";
}

export function adminLogin(password: string): boolean {
  const hashed = hashPassword(password);
  if (hashed === getStoredPassword()) {
    sessionStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ADMIN_KEY);
}

export function updateAdminPassword(newPassword: string): boolean {
  if (typeof window === "undefined") return false;
  if (!newPassword || newPassword.length < 6) return false;
  const hashed = hashPassword(newPassword);
  localStorage.setItem(ADMIN_PASS_KEY, hashed);
  return true;
}

// ==================== WHATSAPP HELPERS ====================

const WHATSAPP_NUMBER = "237659605092";

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppOrderLink(orderRef: string): string {
  return getWhatsAppLink(`Bonjour ! Je souhaite suivre ma commande n°${orderRef}`);
}

export function getWhatsAppContactLink(clientName: string, orderRef: string): string {
  return getWhatsAppLink(`Bonjour ${clientName}, concernant votre commande n°${orderRef} :`);
}

// ==================== STATS HELPERS ====================

export async function getOrderStats() {
  const orders = await getOrders();
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === "en_attente_paiement").length,
    inProgress: orders.filter((o) =>
      ["paiement_valide", "en_cours", "premiere_version", "en_correction"].includes(o.status)
    ).length,
    delivered: orders.filter((o) => o.status === "termine").length,
    revenue: orders
      .filter((o) => o.status !== "brouillon")
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0),
  };
}

// ==================== REVIEW MANAGEMENT (SUPABASE) ====================


export async function submitReview(review: {
  studentName: string;
  school: string;
  field: string;
  content: string;
  rating: number;
  isAnonymous: boolean;
}): Promise<Review | null> {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{
      ...review,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }])
    .select()
    .single();
    
  if (error) {
    console.error('Error submitting review:', error);
    return null;
  }
  return data as Review;
}

export async function getApprovedReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .order('createdAt', { ascending: false });
    
  if (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }
  return data as Review[];
}

export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('createdAt', { ascending: false });
    
  if (error) {
    console.error('Error fetching all reviews:', error);
    return [];
  }
  return data as Review[];
}

export async function updateReviewStatus(reviewId: string, status: ReviewStatus): Promise<void> {
  const { error } = await supabase
    .from('reviews')
    .update({ status })
    .eq('id', reviewId);
    
  if (error) console.error('Error updating review status:', error);
}

export async function deleteReview(reviewId: string): Promise<void> {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId);
    
  if (error) console.error('Error deleting review:', error);
}

// Aliases for admin page compatibility
export const getAllOrders = getOrders;
export const loginAdmin = adminLogin;
export const logoutAdmin = adminLogout;
export const updatePriceSettings = savePriceSettings;
