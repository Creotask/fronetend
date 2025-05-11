import { PrismaClient } from '@/lib/generated/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../[...nextauth]/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get the auth session
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    // Find user by ID, include full profile and achievements
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profile: {
          select: {
            id: true,
            bio: true,
            skills: true,
            portfolio: true,
            // xp: true, // Uncomment if Prisma client is regenerated and field is available
            // level: true,
            // streak: true,
            // endorsements: true,
            achievement: {
              select: {
                id: true,
                title: true,
                description: true,
                iconUrl: true,
                achievedAt: true,
              },
              orderBy: { achievedAt: 'desc' },
            },
          },
        },
      },
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

// Update profile (supports all gamified fields and achievements CRUD)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    const updatedData = await request.json();
    // Separate user and profile fields
    const userFields: any = {};
    const profileFields: any = {};
    if (typeof updatedData.name === 'string') userFields.name = updatedData.name;
    // Profile fields
    if (typeof updatedData.bio === 'string') profileFields.bio = updatedData.bio;
    if (Array.isArray(updatedData.skills)) profileFields.skills = updatedData.skills;
    if (Array.isArray(updatedData.portfolio)) profileFields.portfolio = updatedData.portfolio;
    if (typeof updatedData.xp === 'number') profileFields.xp = updatedData.xp;
    if (typeof updatedData.level === 'number') profileFields.level = updatedData.level;
    if (typeof updatedData.streak === 'number') profileFields.streak = updatedData.streak;
    if (Array.isArray(updatedData.endorsements)) profileFields.endorsements = updatedData.endorsements;
    // Update user
    if (Object.keys(userFields).length > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: userFields,
      });
    }
    // Update or create profile
    let profile = await prisma.profile.findUnique({ where: { userId: session.user.id } });
    if (profile) {
      await prisma.profile.update({
        where: { userId: session.user.id },
        data: profileFields,
      });
    } else if (Object.keys(profileFields).length > 0) {
      profile = await prisma.profile.create({
        data: { userId: session.user.id, ...profileFields },
      });
    }
    // Handle achievements CRUD (optional, expects array of achievement objects)
    if (Array.isArray(updatedData.achievements)) {
      // Remove all existing achievements for this profile
      if (profile) {
        await prisma.achievement.deleteMany({ where: { profileId: profile.id } });
        // Add new achievements
        for (const ach of updatedData.achievements) {
          await prisma.achievement.create({
            data: {
              profileId: profile.id,
              title: ach.title,
              description: ach.description,
              iconUrl: ach.iconUrl,
              achievedAt: ach.achievedAt ? new Date(ach.achievedAt) : undefined,
            },
          });
        }
      }
    }
    // Refetch user with full profile and achievements
    const userWithProfile = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profile: {
          select: {
            id: true,
            bio: true,
            skills: true,
            portfolio: true,
            // xp: true, // Uncomment if Prisma client is regenerated and field is available
            // level: true,
            // streak: true,
            // endorsements: true,
            achievement: {
              select: {
                id: true,
                title: true,
                description: true,
                iconUrl: true,
                achievedAt: true,
              },
              orderBy: { achievedAt: 'desc' },
            },
          },
        },
      },
    });
    if (!userWithProfile) {
      return NextResponse.json(
        { error: 'User not found after update' },
        { status: 404 }
      );
    }
    return NextResponse.json(userWithProfile, { status: 200 });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
// NOTE: If you have recently changed your Prisma schema, run `npx prisma generate` to update the client.