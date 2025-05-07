import { NextRequest, NextResponse } from 'next/server';
import { signOut } from 'next-auth/react';

export async function POST(request: NextRequest) {
  try {
    await signOut({ redirect: false });
    
    return NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}