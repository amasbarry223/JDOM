import { NextResponse } from 'next/server';
import { users } from '@/lib/mock-data';

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === params.id);

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: user,
  });
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === params.id);

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, role, organizationId, status, avatar } = body;

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (organizationId) user.organizationId = organizationId;
    if (status) user.status = status;
    if (avatar) user.avatar = avatar;
    user.updatedAt = new Date().toISOString();

    return NextResponse.json({
      data: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userIndex = users.findIndex(u => u.id === params.id);

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  // Delete user (in real app, this would delete from database)
  users.splice(userIndex, 1);

  return NextResponse.json({
    message: 'User deleted successfully',
  });
}
