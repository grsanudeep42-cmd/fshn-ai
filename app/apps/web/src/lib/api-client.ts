import { PingResponse } from '@myfashion/shared-types';

const WORKER_BASE_URL =
  process.env.NEXT_PUBLIC_WORKER_API_URL || 'http://localhost:8787';

/**
 * Ping the Cloudflare Worker API to confirm frontend-to-worker connection.
 */
export async function pingWorker(echo?: string): Promise<PingResponse> {
  const url = new URL('/api/ping', WORKER_BASE_URL);
  if (echo) {
    url.searchParams.set('echo', echo);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Worker responded with HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export function getWorkerBaseUrl(): string {
  return WORKER_BASE_URL;
}
