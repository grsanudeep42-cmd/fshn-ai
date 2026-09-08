import { z } from 'zod';

export const PingQuerySchema = z.object({
  echo: z.string().optional(),
});
export type PingQuery = z.infer<typeof PingQuerySchema>;

export const SendOtpSchema = z.object({
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\+?[0-9]+$/, 'Invalid phone number format'),
});
export type SendOtpInput = z.infer<typeof SendOtpSchema>;

export const VerifyOtpSchema = z.object({
  phone: z.string().min(10).max(15),
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});
export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;

export const TryOnRequestSchema = z.object({
  modelPhotoUrl: z.string().url('Invalid model photo URL').optional(),
  customerPhotoUrl: z.string().url('Invalid customer photo URL').optional(),
  garmentPhotoUrl: z.string().url('Invalid garment photo URL'),
  category: z.enum(['saree', 'dress', 'top', 'bottom', 'outerwear', 'children', 'other']),
  branchSlug: z.string().min(1, 'Branch slug is required').optional(),
});
export type TryOnRequestInput = z.infer<typeof TryOnRequestSchema>;
