import type {
  Shop, DailyCode, CreditTransaction, GarmentItem,
  Invoice, TryOnSession, DailyVolume, CategoryStat,
} from '@/types/dashboard';

// ── Helpers ───────────────────────────────────────────────────
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function monthLabel(monthsAgo: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  return d.toLocaleString('en-IN', { month: 'short', year: 'numeric' });
}

function dayLabel(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short' });
}

// ── SHOPS ─────────────────────────────────────────────────────
export const MOCK_SHOPS: Shop[] = [
  {
    id: 'shop-001',
    name: 'Lakshmi Sarees & Silks',
    ownerName: 'Rajesh Varma',
    phone: '+91 98765 43210',
    email: 'rajesh@lakshmisilks.in',
    city: 'Visakhapatnam',
    mall: 'CMR Mall Vizag',
    address: 'Ground Floor, CMR Mall, Siripuram, Visakhapatnam 530003',
    slug: 'lakshmi-sarees-vizag',
    plan: 'standard',
    status: 'active',
    devicesIncluded: 50,
    creditsIncluded: 100,
    normalCredits: 64,
    premiumCredits: 22,
    inventoryEnabled: true,
    inventorySource: 'vton',
    joinedAt: daysAgo(45),
    lastActiveAt: daysAgo(0),
  },
  {
    id: 'shop-002',
    name: 'Meenakshi Boutique',
    ownerName: 'Priya Sundaram',
    phone: '+91 87654 32109',
    email: 'priya@meenakshiboutique.com',
    city: 'Chennai',
    mall: 'Express Avenue',
    address: 'Level 2, Express Avenue Mall, Royapettah, Chennai 600014',
    slug: 'meenakshi-boutique-chennai',
    plan: 'basic',
    status: 'active',
    devicesIncluded: 10,
    creditsIncluded: 100,
    normalCredits: 45,
    premiumCredits: 8,
    inventoryEnabled: false,
    inventorySource: 'vton',
    joinedAt: daysAgo(30),
    lastActiveAt: daysAgo(1),
  },
  {
    id: 'shop-003',
    name: 'Kalanjali Silks',
    ownerName: 'Venkat Rao',
    phone: '+91 76543 21098',
    email: 'venkat@kalanjali.in',
    city: 'Hyderabad',
    mall: 'GVK One',
    address: 'GVK One Mall, Road No. 1, Banjara Hills, Hyderabad 500034',
    slug: 'kalanjali-silks-hyd',
    plan: 'standard',
    status: 'active',
    devicesIncluded: 50,
    creditsIncluded: 100,
    normalCredits: 12,
    premiumCredits: 4,
    inventoryEnabled: true,
    inventorySource: 'own',
    joinedAt: daysAgo(60),
    lastActiveAt: daysAgo(0),
  },
  {
    id: 'shop-004',
    name: 'Nalli Silks Bengaluru',
    ownerName: 'Suresh Nalli',
    phone: '+91 65432 10987',
    email: 'bengaluru@nallisilks.com',
    city: 'Bengaluru',
    mall: 'Phoenix Marketcity',
    address: 'Phoenix Marketcity, Whitefield, Bengaluru 560066',
    slug: 'nalli-silks-blr',
    plan: 'basic',
    status: 'trial',
    devicesIncluded: 10,
    creditsIncluded: 100,
    normalCredits: 90,
    premiumCredits: 10,
    inventoryEnabled: false,
    inventorySource: 'vton',
    joinedAt: daysAgo(8),
    lastActiveAt: daysAgo(1),
    trialEndsAt: daysAgo(-6), // trial ends in 6 days
  },
  {
    id: 'shop-005',
    name: 'Radha Fashion House',
    ownerName: 'Ananya Krishnan',
    phone: '+91 54321 09876',
    email: 'ananya@radhafashion.com',
    city: 'Visakhapatnam',
    mall: 'Chitralaya Mall',
    address: 'Chitralaya Mall, Dwaraka Nagar, Visakhapatnam 530016',
    slug: 'radha-fashion-vizag',
    plan: 'basic',
    status: 'paused',
    devicesIncluded: 10,
    creditsIncluded: 100,
    normalCredits: 0,
    premiumCredits: 0,
    inventoryEnabled: false,
    inventorySource: 'vton',
    joinedAt: daysAgo(90),
    lastActiveAt: daysAgo(22),
  },
  {
    id: 'shop-006',
    name: 'Pothys World',
    ownerName: 'Karthik Pothys',
    phone: '+91 43210 98765',
    email: 'karthik@pothys.com',
    city: 'Chennai',
    address: 'Pothys World, Usman Road, T Nagar, Chennai 600017',
    slug: 'pothys-world-chennai',
    plan: 'standard',
    status: 'pending',
    devicesIncluded: 50,
    creditsIncluded: 100,
    normalCredits: 70,
    premiumCredits: 30,
    inventoryEnabled: false,
    inventorySource: 'vton',
    joinedAt: daysAgo(2),
    lastActiveAt: daysAgo(2),
  },
];

export const getShop = (id: string) => MOCK_SHOPS.find(s => s.id === id) ?? MOCK_SHOPS[0];

// ── DAILY CODES ───────────────────────────────────────────────
export const MOCK_CODES: DailyCode[] = [
  { id: 'code-001', shopId: 'shop-001', code: 'VT7KM2', date: new Date().toISOString().split('T')[0], status: 'active', activatedAt: daysAgo(0), sessionsCount: 14, sentViaWhatsapp: true },
  { id: 'code-002', shopId: 'shop-002', code: 'BN3QR8', date: new Date().toISOString().split('T')[0], status: 'active', activatedAt: daysAgo(0), sessionsCount: 7, sentViaWhatsapp: false },
  { id: 'code-003', shopId: 'shop-003', code: 'ZX5LP9', date: new Date().toISOString().split('T')[0], status: 'active', activatedAt: daysAgo(0), sessionsCount: 21, sentViaWhatsapp: true },
  { id: 'code-004', shopId: 'shop-004', code: 'FM1WT4', date: new Date().toISOString().split('T')[0], status: 'used', activatedAt: daysAgo(0), sessionsCount: 3, sentViaWhatsapp: true },
  { id: 'code-005', shopId: 'shop-001', code: 'KP8NB6', date: daysAgo(1).split('T')[0], status: 'expired', sessionsCount: 18, sentViaWhatsapp: true },
  { id: 'code-006', shopId: 'shop-001', code: 'RQ2DV7', date: daysAgo(2).split('T')[0], status: 'expired', sessionsCount: 11, sentViaWhatsapp: true },
  { id: 'code-007', shopId: 'shop-001', code: 'WT5GH3', date: daysAgo(3).split('T')[0], status: 'expired', sessionsCount: 9, sentViaWhatsapp: true },
  { id: 'code-008', shopId: 'shop-001', code: 'XC9JL1', date: daysAgo(4).split('T')[0], status: 'expired', sessionsCount: 22, sentViaWhatsapp: true },
  { id: 'code-009', shopId: 'shop-001', code: 'BS4MN8', date: daysAgo(5).split('T')[0], status: 'expired', sessionsCount: 16, sentViaWhatsapp: false },
  { id: 'code-010', shopId: 'shop-001', code: 'DH7QZ2', date: daysAgo(6).split('T')[0], status: 'expired', sessionsCount: 8, sentViaWhatsapp: true },
];

export const getTodayCode = (shopId: string): DailyCode | null => {
  const today = new Date().toISOString().split('T')[0];
  return MOCK_CODES.find(c => c.shopId === shopId && c.date === today) ?? null;
};

export const getCodeHistory = (shopId: string): DailyCode[] =>
  MOCK_CODES.filter(c => c.shopId === shopId).sort((a, b) => b.date.localeCompare(a.date));

// ── CREDIT TRANSACTIONS ───────────────────────────────────────
export const MOCK_TRANSACTIONS: CreditTransaction[] = [
  { id: 'tx-001', shopId: 'shop-001', type: 'used', creditType: 'premium', amount: -1, balanceAfter: 22, description: 'Saree try-on: Kanjivaram Crimson Gold', timestamp: daysAgo(0) },
  { id: 'tx-002', shopId: 'shop-001', type: 'used', creditType: 'normal', amount: -1, balanceAfter: 64, description: 'Western dress try-on', timestamp: daysAgo(0) },
  { id: 'tx-003', shopId: 'shop-001', type: 'used', creditType: 'premium', amount: -1, balanceAfter: 23, description: 'Saree try-on: Banarasi Emerald', timestamp: daysAgo(0) },
  { id: 'tx-004', shopId: 'shop-001', type: 'topup', creditType: 'normal', amount: 50, balanceAfter: 65, description: 'Standard Top-Up — ₹375', timestamp: daysAgo(3) },
  { id: 'tx-005', shopId: 'shop-001', type: 'used', creditType: 'normal', amount: -1, balanceAfter: 15, description: 'Kids dress try-on', timestamp: daysAgo(5) },
  { id: 'tx-006', shopId: 'shop-001', type: 'plan_credit', creditType: 'normal', amount: 90, balanceAfter: 90, description: 'Standard Plan — Monthly Credits (Normal)', timestamp: daysAgo(30) },
  { id: 'tx-007', shopId: 'shop-001', type: 'plan_credit', creditType: 'premium', amount: 10, balanceAfter: 10, description: 'Standard Plan — Monthly Credits (Premium)', timestamp: daysAgo(30) },
  { id: 'tx-008', shopId: 'shop-001', type: 'topup', creditType: 'premium', amount: 20, balanceAfter: 30, description: 'Premium Top-Up — ₹220', timestamp: daysAgo(20) },
  { id: 'tx-009', shopId: 'shop-001', type: 'refund', creditType: 'normal', amount: 5, balanceAfter: 20, description: 'Refund — generation failed', timestamp: daysAgo(15) },
  { id: 'tx-010', shopId: 'shop-001', type: 'used', creditType: 'normal', amount: -1, balanceAfter: 19, description: 'Kurti try-on', timestamp: daysAgo(7) },
];

export const getTransactions = (shopId: string): CreditTransaction[] =>
  MOCK_TRANSACTIONS.filter(t => t.shopId === shopId).sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

// ── INVENTORY ─────────────────────────────────────────────────
export const MOCK_GARMENTS: GarmentItem[] = [
  { id: 'g-001', shopId: 'shop-001', sku: 'SAR-KNJ-001', name: 'Kanjivaram Silk Saree — Crimson Gold', category: 'saree', price: 14999, stockCount: 3, imageUrl: undefined, description: 'Pure silk, 6-yard, zari border', isActive: true, tryOnCount: 42, addedAt: daysAgo(40) },
  { id: 'g-002', shopId: 'shop-001', sku: 'SAR-BNR-002', name: 'Banarasi Zari Saree — Emerald Green', category: 'saree', price: 18200, stockCount: 2, imageUrl: undefined, description: 'Raw silk, gold zari weave', isActive: true, tryOnCount: 38, addedAt: daysAgo(38) },
  { id: 'g-003', shopId: 'shop-001', sku: 'SAR-CHN-003', name: 'Chanderi Zari Saree — Champagne', category: 'saree', price: 7800, stockCount: 5, imageUrl: undefined, description: 'Chanderi silk, light weight', isActive: true, tryOnCount: 31, addedAt: daysAgo(35) },
  { id: 'g-004', shopId: 'shop-001', sku: 'DRS-WES-001', name: 'Anarkali Suit — Powder Blue', category: 'dress', price: 4890, stockCount: 8, imageUrl: undefined, description: 'Georgette with embroidery', isActive: true, tryOnCount: 19, addedAt: daysAgo(30) },
  { id: 'g-005', shopId: 'shop-001', sku: 'TOP-KRT-001', name: 'Chanderi Kurti — Mustard', category: 'top', price: 1299, stockCount: 12, imageUrl: undefined, description: 'Block print, straight cut', isActive: true, tryOnCount: 24, addedAt: daysAgo(28) },
  { id: 'g-006', shopId: 'shop-001', sku: 'CHD-FRK-001', name: 'Silk Frock — Coral Pink', category: 'children', price: 899, stockCount: 4, imageUrl: undefined, description: 'Pure silk, 2-6 years', isActive: true, tryOnCount: 16, addedAt: daysAgo(25) },
  { id: 'g-007', shopId: 'shop-001', sku: 'SAR-DHR-004', name: 'Dharmavaram Silk — Peacock Blue', category: 'saree', price: 11500, stockCount: 1, imageUrl: undefined, description: 'Heavy weight, festive', isActive: true, tryOnCount: 29, addedAt: daysAgo(22) },
  { id: 'g-008', shopId: 'shop-001', sku: 'BOT-PAL-001', name: 'Palazzo Pants — Ivory', category: 'bottom', price: 799, stockCount: 0, imageUrl: undefined, description: 'Rayon, wide leg', isActive: false, tryOnCount: 7, addedAt: daysAgo(20) },
  { id: 'g-009', shopId: 'shop-001', sku: 'DRS-LEH-002', name: 'Lehenga Set — Bridal Red', category: 'dress', price: 22000, stockCount: 2, imageUrl: undefined, description: 'Velvet with stonework', isActive: true, tryOnCount: 33, addedAt: daysAgo(18) },
  { id: 'g-010', shopId: 'shop-001', sku: 'TOP-KRT-002', name: 'Embroidered Kurti — Sage Green', category: 'top', price: 1599, stockCount: 7, imageUrl: undefined, description: 'Cotton with thread work', isActive: true, tryOnCount: 11, addedAt: daysAgo(15) },
  { id: 'g-011', shopId: 'shop-001', sku: 'SAR-IKT-005', name: 'Pochampally Ikat — Royal Blue', category: 'saree', price: 5500, stockCount: 4, imageUrl: undefined, description: 'Handloom ikat weave', isActive: true, tryOnCount: 18, addedAt: daysAgo(12) },
  { id: 'g-012', shopId: 'shop-001', sku: 'CHD-SHR-002', name: 'Ethnic Sherwani Set — Navy', category: 'children', price: 1499, stockCount: 3, imageUrl: undefined, description: 'Boys 4-8 years', isActive: true, tryOnCount: 9, addedAt: daysAgo(10) },
];

export const getInventory = (shopId: string): GarmentItem[] =>
  MOCK_GARMENTS.filter(g => g.shopId === shopId);

// ── INVOICES ──────────────────────────────────────────────────
export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv-001', shopId: 'shop-001', month: 'Sep 2026', planFee: 5000, normalCreditsExtra: 400, premiumCreditsExtra: 160, topupAmount: 560, totalAmount: 5560, status: 'due', dueDate: daysAgo(-5) },
  { id: 'inv-002', shopId: 'shop-001', month: 'Aug 2026', planFee: 5000, normalCreditsExtra: 2080, premiumCreditsExtra: 440, topupAmount: 2520, totalAmount: 7520, status: 'paid', dueDate: daysAgo(10), paidAt: daysAgo(8) },
  { id: 'inv-003', shopId: 'shop-001', month: 'Jul 2026', planFee: 5000, normalCreditsExtra: 3000, premiumCreditsExtra: 880, topupAmount: 3880, totalAmount: 8880, status: 'paid', dueDate: daysAgo(40), paidAt: daysAgo(38) },
  { id: 'inv-004', shopId: 'shop-001', month: 'Jun 2026', planFee: 5000, normalCreditsExtra: 1200, premiumCreditsExtra: 220, topupAmount: 1420, totalAmount: 6420, status: 'paid', dueDate: daysAgo(70), paidAt: daysAgo(68) },
  { id: 'inv-005', shopId: 'shop-001', month: 'May 2026', planFee: 5000, normalCreditsExtra: 800, premiumCreditsExtra: 110, topupAmount: 910, totalAmount: 5910, status: 'paid', dueDate: daysAgo(100), paidAt: daysAgo(98) },
  { id: 'inv-006', shopId: 'shop-001', month: 'Apr 2026', planFee: 5000, normalCreditsExtra: 600, premiumCreditsExtra: 55, topupAmount: 655, totalAmount: 5655, status: 'paid', dueDate: daysAgo(130), paidAt: daysAgo(128) },
];

export const getInvoices = (shopId: string): Invoice[] =>
  MOCK_INVOICES.filter(i => i.shopId === shopId);

// ── TRY-ON VOLUME (30-day chart data) ────────────────────────
export const DAILY_VOLUME_30D: DailyVolume[] = Array.from({ length: 30 }, (_, i) => {
  const daysBack = 29 - i;
  const base = Math.floor(Math.random() * 12) + 6;
  const premium = Math.floor(base * 0.35);
  const normal = base - premium;
  return {
    date: dayLabel(daysBack),
    normal,
    premium,
    total: base,
  };
});

// ── CATEGORY BREAKDOWN ────────────────────────────────────────
export const CATEGORY_STATS: CategoryStat[] = [
  { category: 'Saree', count: 312, percentage: 48, avgCreditsPerSession: 1.4 },
  { category: 'Dress', count: 124, percentage: 19, avgCreditsPerSession: 1.1 },
  { category: 'Top', count: 98, percentage: 15, avgCreditsPerSession: 1.0 },
  { category: 'Children', count: 72, percentage: 11, avgCreditsPerSession: 1.0 },
  { category: 'Bottom', count: 32, percentage: 5, avgCreditsPerSession: 1.0 },
  { category: 'Other', count: 14, percentage: 2, avgCreditsPerSession: 1.0 },
];

// ── MONTHLY REVENUE (6-month trend) ──────────────────────────
export const MONTHLY_REVENUE = [
  { month: monthLabel(5), planRevenue: 15000, topupRevenue: 3820, totalRevenue: 18820, genCost: 7240, margin: 11580 },
  { month: monthLabel(4), planRevenue: 17000, topupRevenue: 5910, totalRevenue: 22910, genCost: 9100, margin: 13810 },
  { month: monthLabel(3), planRevenue: 19000, topupRevenue: 6420, totalRevenue: 25420, genCost: 10200, margin: 15220 },
  { month: monthLabel(2), planRevenue: 22000, topupRevenue: 8880, totalRevenue: 30880, genCost: 12400, margin: 18480 },
  { month: monthLabel(1), planRevenue: 25000, topupRevenue: 7520, totalRevenue: 32520, genCost: 13100, margin: 19420 },
  { month: monthLabel(0), planRevenue: 27000, topupRevenue: 5560, totalRevenue: 32560, genCost: 12800, margin: 19760 },
];

// ── RECENT ACTIVITY FEED ──────────────────────────────────────
export const RECENT_ACTIVITY = [
  { id: 'act-001', shopName: 'Lakshmi Sarees & Silks', city: 'Vizag', type: 'try_on', category: 'saree', creditType: 'premium', timestamp: daysAgo(0), description: 'Kanjivaram Crimson Gold — Premium' },
  { id: 'act-002', shopName: 'Kalanjali Silks', city: 'Hyderabad', type: 'try_on', category: 'dress', creditType: 'normal', timestamp: daysAgo(0), description: 'Anarkali Suit — Normal' },
  { id: 'act-003', shopName: 'Lakshmi Sarees & Silks', city: 'Vizag', type: 'topup', category: null, creditType: 'normal', timestamp: daysAgo(0), description: 'Top-up: 50 Normal Credits — ₹375' },
  { id: 'act-004', shopName: 'Meenakshi Boutique', city: 'Chennai', type: 'try_on', category: 'top', creditType: 'normal', timestamp: daysAgo(0), description: 'Chanderi Kurti — Normal' },
  { id: 'act-005', shopName: 'Nalli Silks Bengaluru', city: 'Bengaluru', type: 'code', category: null, creditType: null, timestamp: daysAgo(0), description: 'Daily code activated — FM1WT4' },
  { id: 'act-006', shopName: 'Lakshmi Sarees & Silks', city: 'Vizag', type: 'try_on', category: 'saree', creditType: 'premium', timestamp: daysAgo(0), description: 'Banarasi Emerald — Premium' },
  { id: 'act-007', shopName: 'Kalanjali Silks', city: 'Hyderabad', type: 'try_on', category: 'children', creditType: 'normal', timestamp: daysAgo(0), description: 'Silk Frock — Normal' },
];

// ── PLATFORM SUMMARY KPIs ─────────────────────────────────────
export const PLATFORM_KPIS = {
  totalTryOnsToday: 47,
  totalTryOnsMonth: 652,
  monthVsLastMonth: '+18',
  activeShops: 4,
  totalShops: 6,
  normalCreditsMonth: 468,
  premiumCreditsMonth: 184,
  totalCreditsMonth: 652,
  revenueMonth: 32560,
  revenuePrev: 32520,
  revenueGrowth: '+0.1',
  grossMarginPct: 60.7,
  grossMarginPrev: 59.7,
};
