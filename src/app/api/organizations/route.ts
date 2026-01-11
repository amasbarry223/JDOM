import { NextResponse } from 'next/server';
import { organizations } from '@/lib/mock-data';

// GET /api/organizations - Get all organizations with optional filters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  let filteredOrgs = [...organizations];

  // Apply filters
  if (type) {
    filteredOrgs = filteredOrgs.filter(org => org.type === type);
  }

  if (status) {
    filteredOrgs = filteredOrgs.filter(org => org.status === status);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredOrgs = filteredOrgs.filter(org =>
      org.name.toLowerCase().includes(searchLower) ||
      org.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply pagination
  const limitNum = limit ? parseInt(limit) : 20;
  const offsetNum = offset ? parseInt(offset) : 0;
  const startIndex = offsetNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedOrgs = filteredOrgs.slice(startIndex, endIndex);
  const totalCount = filteredOrgs.length;

  return NextResponse.json({
    data: paginatedOrgs,
    pagination: {
      total: totalCount,
      limit: limitNum,
      offset: offsetNum,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: Math.floor(offsetNum / limitNum) + 1,
    },
  });
}

// POST /api/organizations - Create new organization
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, description, website, email, logo, contactPerson, address } = body;

    // Validation
    if (!name || name.length < 3) {
      return NextResponse.json(
        { error: 'Organization name is required and must be at least 3 characters' },
        { status: 400 }
      );
    }

    if (!type || !['ministry', 'agency', 'institute', 'municipality', 'ngo', 'company'].includes(type)) {
      return NextResponse.json(
        { error: 'Valid organization type is required' },
        { status: 400 }
      );
    }

    if (!description || description.length < 50) {
      return NextResponse.json(
        { error: 'Description is required and must be at least 50 characters' },
        { status: 400 }
      );
    }

    // Create new organization (in real app, this would save to database)
    const newOrg = {
      id: `org-${Date.now()}`,
      name,
      type,
      description,
      website: website || '',
      email: email || '',
      logo: logo || '',
      contactPerson: contactPerson || '',
      address: address || '',
      status: 'pending', // Requires admin approval
      datasetsCount: 0,
      totalDownloads: 0,
      members: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        contactPhone: '',
        region: '',
        validatedAt: null,
        validatedBy: null,
      },
    };

    return NextResponse.json({
      data: newOrg,
      message: 'Organization created successfully. Pending admin approval.',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    );
  }
}
