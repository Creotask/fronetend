import { PrismaClient } from '@/lib/generated/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const authToken = request.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const decodedToken = jwt.verify(
      authToken, 
      process.env.JWT_SECRET || 'fallback_secret'
    ) as { id: string };
    
    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      // Only include fields that exist in your Prisma schema
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}

// Update profile
export async function PUT(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const authToken = request.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const decodedToken = jwt.verify(
      authToken, 
      process.env.JWT_SECRET || 'fallback_secret'
    ) as { id: string };
    
    // Get the updated profile data
    const updatedData = await request.json();
    
    // These fields should not be updated via this endpoint
    const { id, password, email, role, ...allowedUpdates } = updatedData;
    
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: decodedToken.id },
      data: allowedUpdates,
      // Only include fields that exist in your Prisma schema
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });
    
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}