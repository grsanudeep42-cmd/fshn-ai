export interface Env {
  // Bindings
  HYPERDRIVE?: Hyperdrive;
  R2_BUCKET?: R2Bucket;

  // Environment variables
  ENVIRONMENT?: string;

  // Secrets (injected via Cloudflare Worker secrets or .dev.vars)
  SUPABASE_DB_URL?: string;
  MONGO_DATA_API_URL?: string;
  MONGO_DATA_API_KEY?: string;
  VTON_API_KEY?: string;
  VTON_API_URL?: string;
  OTP_PROVIDER_API_KEY?: string;
}
