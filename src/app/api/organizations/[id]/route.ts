import { NextResponse } from 'next/server';
import { organizations } from '@/lib/mock-data';

// GET /api/organizations/[id] - Get organization by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const org = organizations.find(o => o.id === params.id);

  if (!org) {
    return NextResponse.json(
      { error: 'Organization not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: org,
  });
}

// PUT /api/organizations/[id] - Update organization
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const org = organizations.find(o => o.id === params.id);

  if (!org) {
    return NextResponse.json(
      { error: 'Organization not found' },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const { name, type, description, website, email, status } = body;

    // Update organization fields
    if (name) org.name = name;
    if (type) org.type = type;
    if (description) org.description = description;
    if (website) org.website = website;
    if (email) org.email = email;
    if (status) org.status = status;
    org.updatedAt = new Date().toISOString();

    return NextResponse.json({
      data: org,
      message: 'Organization updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update organization' },
      { status: 500 }
    );
  }
}

// DELETE /api/organizations/[id] - Delete organization
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const orgIndex = organizations.findIndex(o => o.id === params.id);

  if (orgIndex === -1) {
    return NextResponse.json(
      { error: 'Organization not found' },
      { status: 404 }
    );
  }

  // Delete organization (in real app, this would delete from database)
  organizations.splice(orgIndex, 1);

  return NextResponse.json({
    message: 'Organization deleted successfully',
  });
}
