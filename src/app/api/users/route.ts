import { NextResponse } from 'next/server';
import { users, organizations } from '@/lib/mock-data';

// GET /api/users - Get all users with optional filters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  let filteredUsers = [...users];

  // Apply filters
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }

  if (status) {
    filteredUsers = filteredUsers.filter(user => user.status === status);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  }

  // Apply pagination
  const limitNum = limit ? parseInt(limit) : 20;
  const offsetNum = offset ? parseInt(offset) : 0;
  const startIndex = offsetNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalCount = filteredUsers.length;

  return NextResponse.json({
    data: paginatedUsers.map(user => ({
      ...user,
      organization: organizations.find(org => org.id === user.organizationId),
    })),
    pagination: {
      total: totalCount,
      limit: limitNum,
      offset: offsetNum,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: Math.floor(offsetNum / limitNum) + 1,
    },
  });
}

// POST /api/users - Create new user
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

    if (!email || !email.includes('@')) {
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

    // Create new user (in real app, this would save to database)
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: '', // Never return password
      role,
      organizationId: role === 'citizen' ? null : organizationId,
      status: 'pending', // Email verification pending
      avatar: `https://ui-avatars.com/api/?name=${name}&background=14B14B&color=fff`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
      notifications: [],
      favorites: [],
    };

    return NextResponse.json({
      data: newUser,
      message: 'User created successfully. Please check your email to verify your account.',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
