import { NextRequest, NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bucketFromQuery = searchParams.get('bucket') || undefined

    const endpoint = process.env.SUPABASE_S3_ENDPOINT
    const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY
    const secretAccessKey = process.env.SUPABASE_S3_SECRET_KEY
    const region = process.env.SUPABASE_S3_REGION || 'us-east-1'
    const bucket = bucketFromQuery || process.env.SUPABASE_S3_BUCKET || 'project-images'

    if (!endpoint) {
      return NextResponse.json({ ok: false, error: 'Missing SUPABASE_S3_ENDPOINT' }, { status: 500 })
    }
    if (!accessKeyId || !secretAccessKey) {
      return NextResponse.json({ ok: false, error: 'Missing S3 access keys' }, { status: 500 })
    }

    const s3 = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
      endpoint,
      forcePathStyle: true,
    })

    try {
      // Minimal call to verify bucket exists without listing contents
      const cmd = new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 1 })
      const res = await s3.send(cmd)
      return NextResponse.json({
        ok: true,
        bucketExists: true,
        usedBucket: bucket,
        endpoint,
        region,
        keyCountSample: (res.Contents || []).length,
      })
    } catch (err: any) {
      const code = err?.Code || err?.name || 'UnknownError'
      const message = err?.message || String(err)
      const bucketExists = code !== 'NoSuchBucket'
      return NextResponse.json({
        ok: false,
        bucketExists,
        usedBucket: bucket,
        endpoint,
        region,
        code,
        message,
      }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}


