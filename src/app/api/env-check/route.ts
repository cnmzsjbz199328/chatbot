import { NextResponse } from 'next/server'

export async function GET() {
  const env = process.env
  const result = {
    SUPABASE_S3_ENDPOINT: Boolean(env.SUPABASE_S3_ENDPOINT),
    SUPABASE_S3_ACCESS_KEY: Boolean(env.SUPABASE_S3_ACCESS_KEY),
    SUPABASE_S3_SECRET_KEY: Boolean(env.SUPABASE_S3_SECRET_KEY),
    SUPABASE_S3_BUCKET: Boolean(env.SUPABASE_S3_BUCKET),
    SUPABASE_S3_REGION: Boolean(env.SUPABASE_S3_REGION),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  }

  return NextResponse.json({ ok: true, vars: result })
}



