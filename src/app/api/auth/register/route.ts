import { NextResponse } from 'next/server';
import { users, organizations } from '@/lib/mock-data';

// POST /api/auth/register - Register new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role, organizationId } = body;

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    if (!role || !['citizen', 'producer', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Valid role is required (citizen, producer, admin)' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Validate organization for non-citizen roles
    if (role !== 'citizen' && !organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required for producers and admins' },
        { status: 400 }
      );
    }

    if (role !== 'citizen') {
      const org = organizations.find(o => o.id === organizationId);
      if (!org) {
        return NextResponse.json(
          { error: 'Organization not found' },
          { status: 400 }
        );
      }
    }

    // Create new user (in real app, this would save to database)
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: '', // Never return password
      role,
      organizationId: role === 'citizen' ? null : organizationId,
      status: 'active', // Email verification pending
      avatar: `https://ui-avatars.com/api/?name=${name}&background=14B14B&color=fff`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
      notifications: [],
      favorites: [],
    };

    // Add to mock data (in real app, this would be a database insert)
    users.push(newUser);

    return NextResponse.json({
      data: newUser,
      message: 'Registration successful. Please check your email to verify your account.',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
