import { NextResponse } from 'next/server';
import { allDatasets } from '@/lib/mock-data';

// POST /api/search - Search across all datasets
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, filters = {} } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const queryLower = query.toLowerCase();
    let filteredDatasets = [...allDatasets];

    // Apply search
    filteredDatasets = filteredDatasets.filter(ds =>
      ds.title.toLowerCase().includes(queryLower) ||
      ds.description.toLowerCase().includes(queryLower) ||
      ds.keywords.some(kw => kw.toLowerCase().includes(queryLower))
    );

    // Apply filters
    if (filters.theme) {
      filteredDatasets = filteredDatasets.filter(ds => ds.theme.id === filters.theme);
    }

    if (filters.organization) {
      filteredDatasets = filteredDatasets.filter(ds => ds.organization.id === filters.organization);
    }

    if (filters.format) {
      filteredDatasets = filteredDatasets.filter(ds => ds.formats.includes(filters.format));
    }

    if (filters.license) {
      filteredDatasets = filteredDatasets.filter(ds => ds.license === filters.license);
    }

    if (filters.status) {
      filteredDatasets = filteredDatasets.filter(ds => ds.status === filters.status);
    }

    if (filters.startDate) {
      filteredDatasets = filteredDatasets.filter(ds => new Date(ds.publishedAt) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filteredDatasets = filteredDatasets.filter(ds => new Date(ds.publishedAt) <= new Date(filters.endDate));
    }

    // Calculate relevance score
    const scoredResults = filteredDatasets.map(dataset => {
      let score = 0;

      // Title match (highest weight)
      if (dataset.title.toLowerCase().includes(queryLower)) {
        score += 100;
        if (dataset.title.toLowerCase().startsWith(queryLower)) {
          score += 50; // Exact match bonus
        }
      }

      // Description match
      if (dataset.description.toLowerCase().includes(queryLower)) {
        score += 50;
      }

      // Keywords match
      dataset.keywords.forEach(kw => {
        if (kw.toLowerCase().includes(queryLower)) {
          score += 30;
        }
      });

      return {
        ...dataset,
        relevanceScore: score,
      };
    });

    // Sort by relevance score
    scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Limit results
    const limit = filters.limit ? parseInt(filters.limit) : 20;
    const page = filters.page ? parseInt(filters.page) : 1;
    const offset = (page - 1) * limit;
    const paginatedResults = scoredResults.slice(offset, offset + limit);

    return NextResponse.json({
      data: paginatedResults,
      pagination: {
        total: scoredResults.length,
        limit,
        page,
        totalPages: Math.ceil(scoredResults.length / limit),
      },
      search: {
        query,
        resultCount: scoredResults.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
    );
  }
}
