import { NextResponse } from 'next/server';

const TREFLE_API_URL = 'https://trefle.io/api/v1';
const TREFLE_TOKEN = process.env.NEXT_PUBLIC_TREFLE_TOKEN;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const query = searchParams.get('q');
    const perPage = searchParams.get('per_page') || '12';

    const endpoint = query
      ? `${TREFLE_API_URL}/plants/search?token=${TREFLE_TOKEN}&q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
      : `${TREFLE_API_URL}/plants?token=${TREFLE_TOKEN}&page=${page}&per_page=${perPage}`;

    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plants' },
      { status: 500 }
    );
  }
} 