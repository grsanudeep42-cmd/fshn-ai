import { NextRequest, NextResponse } from 'next/server';
import { pingWorker } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const echo = request.nextUrl.searchParams.get('echo') || undefined;
    const data = await pingWorker(echo);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to Cloudflare Worker',
        detail: error?.message,
      },
      { status: 502 }
    );
  }
}
