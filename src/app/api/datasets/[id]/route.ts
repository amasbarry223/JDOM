import { NextResponse } from 'next/server';
import { allDatasets } from '@/lib/mock-data';

// GET /api/datasets/[id] - Get dataset by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const dataset = allDatasets.find(ds => ds.id === params.id);

  if (!dataset) {
    return NextResponse.json(
      { error: 'Dataset not found' },
      { status: 404 }
    );
  }

  // Increment view count (in real app, this would update database)
  dataset.views += 1;

  return NextResponse.json({
    data: dataset,
  });
}

// PUT /api/datasets/[id] - Update dataset
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const dataset = allDatasets.find(ds => ds.id === params.id);

  if (!dataset) {
    return NextResponse.json(
      { error: 'Dataset not found' },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const { title, description, status } = body;

    // Update dataset fields
    if (title) dataset.title = title;
    if (description) dataset.description = description;
    if (status) dataset.status = status;
    dataset.updatedAt = new Date().toISOString();

    return NextResponse.json({
      data: dataset,
      message: 'Dataset updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update dataset' },
      { status: 500 }
    );
  }
}

// DELETE /api/datasets/[id] - Delete dataset
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const datasetIndex = allDatasets.findIndex(ds => ds.id === params.id);

  if (datasetIndex === -1) {
    return NextResponse.json(
      { error: 'Dataset not found' },
      { status: 404 }
    );
  }

  // Delete dataset (in real app, this would delete from database)
  allDatasets.splice(datasetIndex, 1);

  return NextResponse.json({
    message: 'Dataset deleted successfully',
  });
}
