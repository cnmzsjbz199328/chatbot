import { NextRequest, NextResponse } from 'next/server';

// Basic seed data route - for production, use one-time script
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  try {
    // Placeholder: In practice, run seeding logic here or redirect to script
    // For example, import and call insertSampleData from scripts
    // But to keep simple, return success for now
    console.log('Seed data endpoint called');
    return NextResponse.json({ success: true, message: 'Seeding endpoint ready. Use scripts/insert-sample-data.ts for actual seeding.' });
  } catch (error) {
    console.error('Error in seed data:', error);
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
