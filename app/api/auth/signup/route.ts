import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma/client';
import bcrypt from 'bcrypt';
import { signupSchema } from '@/lib/validations/auth';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate using Zod schema
    try {
      // We only need to validate the fields we'll use
      const signupDataSchema = signupSchema.innerType().pick({
        name: true,
        email: true,
        password: true,
        role: true,
      });
      
      const { name, email, password, role } = signupDataSchema.parse(body);
      
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        }
      });

      return NextResponse.json(
        { success: true, user },
        { status: 201 }
      );
    } catch (validationError) {
      // Handle Zod validation errors
      if (validationError instanceof z.ZodError) {
        const errors = validationError.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }));
        
        return NextResponse.json(
          { error: 'Validation failed', details: errors },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}