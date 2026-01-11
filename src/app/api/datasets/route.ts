import { NextResponse } from 'next/server';
import { allDatasets } from '@/lib/mock-data';

// GET /api/datasets - Get all datasets with optional filters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme');
  const status = searchParams.get('status');
  const organization = searchParams.get('organization');
  const format = searchParams.get('format');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  let filteredDatasets = [...allDatasets];

  // Apply filters
  if (theme) {
    filteredDatasets = filteredDatasets.filter(ds => ds.theme.id === theme);
  }

  if (status) {
    filteredDatasets = filteredDatasets.filter(ds => ds.status === status);
  }

  if (organization) {
    filteredDatasets = filteredDatasets.filter(ds => ds.organization.id === organization);
  }

  if (format) {
    filteredDatasets = filteredDatasets.filter(ds => ds.formats.includes(format));
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredDatasets = filteredDatasets.filter(ds =>
      ds.title.toLowerCase().includes(searchLower) ||
      ds.description.toLowerCase().includes(searchLower) ||
      ds.keywords.some(kw => kw.toLowerCase().includes(searchLower))
    );
  }

  // Apply pagination
  const limitNum = limit ? parseInt(limit) : 20;
  const offsetNum = offset ? parseInt(offset) : 0;
  const startIndex = offsetNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedDatasets = filteredDatasets.slice(startIndex, endIndex);
  const totalCount = filteredDatasets.length;

  return NextResponse.json({
    data: paginatedDatasets,
    pagination: {
      total: totalCount,
      limit: limitNum,
      offset: offsetNum,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: Math.floor(offsetNum / limitNum) + 1,
    },
  });
}

// POST /api/datasets - Create new dataset
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, themeId, organizationId, formats, license, spatialCoverage, files } = body;

    // Validation
    if (!title || title.length < 10) {
      return NextResponse.json(
        { error: 'Title is required and must be at least 10 characters' },
        { status: 400 }
      );
    }

    if (!description || description.length < 100) {
      return NextResponse.json(
        { error: 'Description is required and must be at least 100 characters' },
        { status: 400 }
      );
    }

    // Create new dataset (in real app, this would save to database)
    const newDataset = {
      id: `ds-${Date.now()}`,
      title,
      description,
      theme: { id: themeId },
      organization: { id: organizationId },
      formats,
      license,
      spatialCoverage,
      files: files || [],
      status: 'pending', // Pending admin validation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      downloads: 0,
      views: 0,
      rating: 0,
      ratingCount: 0,
      keywords: [],
      metadata: {
        publisher: organizationId,
        language: 'fr',
        contactEmail: '',
      },
      quality: {
        overall: 0,
        completeness: 0,
        accuracy: 0,
      },
    };

    return NextResponse.json({
      data: newDataset,
      message: 'Dataset created successfully. Pending admin validation.',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create dataset' },
      { status: 500 }
    );
  }
}
