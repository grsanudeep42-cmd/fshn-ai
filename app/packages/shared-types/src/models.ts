export interface UserProfile {
  id: string;
  phone: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreBranch {
  id: string;
  name: string;
  slug: string;
  city: string;
  address?: string;
  isActive: boolean;
}

export interface GarmentItem {
  id: string;
  name: string;
  category: 'saree' | 'dress' | 'top' | 'bottom' | 'outerwear' | 'children' | 'other';
  price: number;
  imageUrl: string;
  sku?: string;
  branchSlug?: string;
}

export interface TryOnSession {
  id: string;
  userId?: string;
  branchSlug?: string;
  garmentId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  resultImageUrl?: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

export interface WalletBalance {
  credits: number;
  normalCredits: number;
  premiumCredits: number;
  lastUpdated: string;
}
