// ============================================================
// VTON Dashboard — TypeScript Types
// ============================================================

export type ShopStatus = 'active' | 'trial' | 'paused' | 'pending';
export type ShopPlan = 'basic' | 'standard';
export type CreditType = 'normal' | 'premium';
export type GarmentCategory = 'saree' | 'dress' | 'top' | 'bottom' | 'children' | 'other';
export type TransactionType = 'used' | 'topup' | 'plan_credit' | 'refund';
export type InventorySource = 'own' | 'vton'; // own = they have their own system, vton = we provide it

// ── Shop ─────────────────────────────────────────────────────
export interface Shop {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  mall?: string;
  address: string;
  slug: string;
  plan: ShopPlan;
  status: ShopStatus;
  devicesIncluded: number;
  creditsIncluded: number; // per month with plan
  normalCredits: number;
  premiumCredits: number;
  inventoryEnabled: boolean;
  inventorySource: InventorySource;
  joinedAt: string;
  lastActiveAt: string;
  trialEndsAt?: string;
}

// ── Daily Code ────────────────────────────────────────────────
export interface DailyCode {
  id: string;
  shopId: string;
  code: string; // 6-char alphanumeric
  date: string; // YYYY-MM-DD
  status: 'active' | 'used' | 'expired';
  activatedAt?: string;
  sessionsCount: number;
  sentViaWhatsapp: boolean;
}

// ── Credit Transaction ────────────────────────────────────────
export interface CreditTransaction {
  id: string;
  shopId: string;
  type: TransactionType;
  creditType: CreditType;
  amount: number; // positive = credit added, negative = credit used
  balanceAfter: number;
  description: string;
  timestamp: string;
}

// ── Garment (Inventory) ───────────────────────────────────────
export interface GarmentItem {
  id: string;
  shopId: string;
  sku: string;
  name: string;
  category: GarmentCategory;
  price: number; // INR
  stockCount: number;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  tryOnCount: number; // how many times tried via VTON
  addedAt: string;
}

// ── Try-On Session ────────────────────────────────────────────
export interface TryOnSession {
  id: string;
  shopId: string;
  garmentCategory: GarmentCategory;
  creditType: CreditType;
  creditsUsed: number;
  status: 'completed' | 'failed' | 'regenerated';
  timestamp: string;
}

// ── Invoice ───────────────────────────────────────────────────
export interface Invoice {
  id: string;
  shopId: string;
  month: string; // e.g. "Sep 2026"
  planFee: number;
  normalCreditsExtra: number;
  premiumCreditsExtra: number;
  topupAmount: number;
  totalAmount: number;
  status: 'paid' | 'due' | 'overdue';
  dueDate: string;
  paidAt?: string;
}

// ── Analytics Datapoint ───────────────────────────────────────
export interface DailyVolume {
  date: string;       // "12 Sep"
  normal: number;
  premium: number;
  total: number;
}

export interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
  avgCreditsPerSession: number;
}

// ── KPI Card ──────────────────────────────────────────────────
export interface KpiData {
  label: string;
  value: string;
  delta?: string;       // e.g. "+12%" or "-5%"
  deltaPositive?: boolean;
  icon: string;         // material symbol name
  subtext?: string;
}
