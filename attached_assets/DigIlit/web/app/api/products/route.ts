import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ products: [{ id: 'p1', name: 'Starter', priceCents: 9900 }] });
}
