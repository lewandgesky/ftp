export type OrderStatus =
  | "brouillon"
  | "en_attente_paiement"
  | "paiement_valide"
  | "en_cours"
  | "premiere_version"
  | "en_correction"
  | "termine";

export type ServiceType = "rapport" | "powerpoint" | "pack";

export type StudyLevel = "bts" | "licence" | "master" | "ingenieur" | "other";

export interface OrderFile {
  id: string;
  orderId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderRef: string;

  // Personal info
  fullName: string;
  email: string;
  phone: string;
  school: string;
  fieldOfStudy: string;
  studyLevel: StudyLevel;

  // Internship info
  companyName: string;
  companySector: string;
  internshipDuration: string;
  department?: string;
  supervisorName?: string;
  positionHeld?: string;

  // Project / Report
  reportTheme: string;
  problematic?: string;
  objectives?: string;
  tasksDone: string;
  difficulties?: string;
  results?: string;
  schoolGuidelines?: string;

  // Services & payment
  serviceType: ServiceType;
  specialRequests?: string;
  totalPrice?: number;

  // Status
  status: OrderStatus;
  estimatedDelivery?: string;
  adminNotes?: string;

  // Files
  files: OrderFile[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  title: string;
  field: string;
  pageCount: number;
  coverImageUrl: string;
  description: string;
  isVisible: boolean;
  displayOrder: number;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  studentName: string;
  school: string;
  field: string;
  content: string;
  rating: number;
  isAnonymous: boolean;
  status: ReviewStatus;
  createdAt: string;
}

// Keep old name as alias for backwards compat
export type Testimonial = Review;

export interface PriceSettings {
  reportPrice: number;
  powerpointPrice: number;
  packPrice: number;
}

export const ORDER_STATUS_LIST: OrderStatus[] = [
  "brouillon",
  "en_attente_paiement",
  "paiement_valide",
  "en_cours",
  "premiere_version",
  "en_correction",
  "termine",
];

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  brouillon: "#8888a0",
  en_attente_paiement: "#f59e0b",
  paiement_valide: "#06b6d4",
  en_cours: "#7c3aed",
  premiere_version: "#6366f1",
  en_correction: "#f59e0b",
  termine: "#10b981",
};
