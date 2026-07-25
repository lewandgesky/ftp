import { Order, OrderFile, PriceSettings, OrderStatus } from "@/types/order";

const ORDERS_KEY = "ftp-orders";
const SETTINGS_KEY = "ftp-settings";
const ADMIN_KEY = "ftp-admin-auth";
const ORDER_COUNTER_KEY = "ftp-order-counter";

// ==================== ORDER MANAGEMENT ====================

export function generateOrderRef(): string {
  if (typeof window === "undefined") return "CMD-0000-0001";
  const counter = parseInt(localStorage.getItem(ORDER_COUNTER_KEY) || "0", 10) + 1;
  localStorage.setItem(ORDER_COUNTER_KEY, counter.toString());
  const year = new Date().getFullYear();
  return `CMD-${year}-${counter.toString().padStart(4, "0")}`;
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getOrderByRef(orderRef: string): Order | undefined {
  return getOrders().find((o) => o.orderRef === orderRef);
}

export function getOrderByRefAndEmail(orderRef: string, email: string): Order | undefined {
  return getOrders().find(
    (o) => o.orderRef.toLowerCase() === orderRef.toLowerCase() && o.email.toLowerCase() === email.toLowerCase()
  );
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === order.id);
  if (index >= 0) {
    orders[index] = { ...order, updatedAt: new Date().toISOString() };
  } else {
    orders.push(order);
  }
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function createOrder(orderData: Omit<Order, "id" | "orderRef" | "status" | "files" | "createdAt" | "updatedAt">): Order {
  const now = new Date().toISOString();
  const order: Order = {
    ...orderData,
    id: crypto.randomUUID(),
    orderRef: generateOrderRef(),
    status: "en_attente_paiement",
    files: [],
    createdAt: now,
    updatedAt: now,
  };
  saveOrder(order);
  return order;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}

export function updateOrderNotes(orderId: string, notes: string): void {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.adminNotes = notes;
    order.updatedAt = new Date().toISOString();
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}

export function addFilesToOrder(orderId: string, files: OrderFile[]): void {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.files = [...order.files, ...files];
    order.updatedAt = new Date().toISOString();
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}

// ==================== PRICE SETTINGS ====================

export function getPriceSettings(): PriceSettings {
  if (typeof window === "undefined") {
    return { reportPrice: 0, powerpointPrice: 0, packPrice: 0 };
  }
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : { reportPrice: 0, powerpointPrice: 0, packPrice: 0 };
  } catch {
    return { reportPrice: 0, powerpointPrice: 0, packPrice: 0 };
  }
}

export function savePriceSettings(settings: PriceSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ==================== ADMIN AUTH (MVP - localStorage based) ====================

const ADMIN_PASS_KEY = "ftp-admin-pass";
const DEFAULT_ADMIN_PASS = "admin2026";

function hashPassword(password: string): string {
  // Simple encoding for MVP - NOT cryptographically secure
  // In production, use bcrypt on the server side
  return btoa(encodeURIComponent(password));
}

function getStoredPassword(): string {
  if (typeof window === "undefined") return hashPassword(DEFAULT_ADMIN_PASS);
  const stored = localStorage.getItem(ADMIN_PASS_KEY);
  if (!stored) {
    // Initialize with default password on first visit
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

export function getOrderStats() {
  const orders = getOrders();
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

// Aliases for admin page compatibility
export const getAllOrders = getOrders;
export const loginAdmin = adminLogin;
export const logoutAdmin = adminLogout;
export const updatePriceSettings = savePriceSettings;

export function updateAdminPassword(newPassword: string): boolean {
  if (typeof window === "undefined") return false;
  if (!newPassword || newPassword.length < 6) return false;
  const hashed = hashPassword(newPassword);
  localStorage.setItem(ADMIN_PASS_KEY, hashed);
  return true;
}

