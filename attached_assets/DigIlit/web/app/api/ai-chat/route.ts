import { NextResponse } from 'next/server';

export async function POST() {
  // simple echo stub
  return NextResponse.json({ reply: 'Hello from AI stub' });
}
