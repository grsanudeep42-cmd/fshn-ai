import type { ShopStatus, ShopPlan, CreditType, GarmentCategory } from '@/types/dashboard';

// ── Formatting ────────────────────────────────────────────────
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-IN').format(n);
}

export function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// ── Status helpers ─────────────────────────────────────────────
export const STATUS_COLORS: Record<string, string> = {
  active: '#2E7D32',
  trial: '#1565C0',
  paused: '#E65100',
  pending: '#6B6560',
};

export const STATUS_BG: Record<string, string> = {
  active: 'rgba(46,125,50,0.10)',
  trial: 'rgba(21,101,192,0.10)',
  paused: 'rgba(230,81,0,0.10)',
  pending: 'rgba(107,101,96,0.10)',
};

export const STATUS_LABELS: Record<ShopStatus, string> = {
  active: 'Active',
  trial: 'Trial',
  paused: 'Paused',
  pending: 'Pending',
};

export const PLAN_LABELS: Record<ShopPlan, string> = {
  basic: 'Basic — ₹2K/mo',
  standard: 'Standard — ₹5K/mo',
};

export const CREDIT_TYPE_LABELS: Record<CreditType, string> = {
  normal: 'Normal',
  premium: 'Premium',
};

export const CATEGORY_ICONS: Record<GarmentCategory, string> = {
  saree: 'style',
  dress: 'checkroom',
  top: 'dry_cleaning',
  bottom: 'straighten',
  children: 'child_care',
  other: 'category',
};

export const CATEGORY_LABELS: Record<GarmentCategory, string> = {
  saree: 'Saree',
  dress: 'Dress / Lehenga',
  top: 'Top / Kurti',
  bottom: 'Bottom / Palazzo',
  children: 'Children',
  other: 'Other',
};

// ── Credit routing info ───────────────────────────────────────
export const CREDIT_ROUTING: Record<GarmentCategory, CreditType> = {
  saree: 'premium',
  dress: 'normal',
  top: 'normal',
  bottom: 'normal',
  children: 'normal',
  other: 'normal',
};

// ── Code helpers ──────────────────────────────────────────────
export function getWhatsappLink(phone: string, code: string, shopName: string): string {
  const msg = encodeURIComponent(
    `✨ VTON — Daily Access Code\n\nShop: ${shopName}\nCode: *${code}*\n\nValid for today only. Enter this code in the VTON staff app to start sessions.\n\n— VTON Team`
  );
  const clean = phone.replace(/\D/g, '');
  return `https://wa.me/${clean}?text=${msg}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

// ── Misc ──────────────────────────────────────────────────────
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function creditBarPercent(used: number, total: number): number {
  if (total === 0) return 0;
  return clamp(Math.round((used / total) * 100), 0, 100);
}

export function deltaColor(positive: boolean | undefined): string {
  if (positive === undefined) return '#6B6560';
  return positive ? '#2E7D32' : '#E65100';
}
