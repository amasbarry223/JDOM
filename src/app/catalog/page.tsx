'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DatasetCard } from '@/components/catalog/DatasetCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { allDatasets, themes, organizations } from '@/lib/mock-data';
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3,
  List,
  X,
  Filter,
  ArrowRight
} from 'lucide-react';

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort datasets
  const filteredDatasets = useMemo(() => {
    let filtered = allDatasets.filter(dataset => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          dataset.title.toLowerCase().includes(query) ||
          dataset.description.toLowerCase().includes(query) ||
          dataset.keywords.some(kw => kw.toLowerCase().includes(query)) ||
          dataset.organization.name.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Theme filter
      if (selectedThemes.length > 0) {
        if (!selectedThemes.includes(dataset.theme.id)) return false;
      }

      // Format filter
      if (selectedFormats.length > 0) {
        const hasFormat = dataset.formats.some(f => selectedFormats.includes(f));
        if (!hasFormat) return false;
      }

      // Organization filter
      if (selectedOrgs.length > 0) {
        if (!selectedOrgs.includes(dataset.organization.id)) return false;
      }

      return true;
    });

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'downloads':
          return b.downloads - a.downloads;
        case 'views':
          return b.views - a.views;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedThemes, selectedFormats, selectedOrgs, sortBy]);

  const hasActiveFilters = 
    selectedThemes.length > 0 || 
    selectedFormats.length > 0 || 
    selectedOrgs.length > 0;

  const clearFilters = () => {
    setSelectedThemes([]);
    setSelectedFormats([]);
    setSelectedOrgs([]);
  };

  const toggleTheme = (themeId: string) => {
    setSelectedThemes(prev =>
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const toggleOrg = (orgId: string) => {
    setSelectedOrgs(prev =>
      prev.includes(orgId)
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <h1 className="font-heading font-bold text-3xl mb-2">Catalogue de données</h1>
            <p className="text-muted-foreground mb-4">
              Explorez {allDatasets.length} jeux de données publiques
            </p>
            
            {/* Search Bar */}
            <form 
              className="relative max-w-2xl"
              onSubmit={(e) => {
                e.preventDefault();
                // Search is already reactive
              }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par titre, description, mots-clés..."
                className="h-12 pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                themes={themes}
                selectedThemes={selectedThemes}
                selectedFormats={selectedFormats}
                selectedOrgs={selectedOrgs}
                onToggleTheme={toggleTheme}
                onToggleFormat={toggleFormat}
                onToggleOrg={toggleOrg}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {filteredDatasets.length} résultat{filteredDatasets.length !== 1 ? 's' : ''}
                  </span>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Effacer les filtres
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtres
                        {hasActiveFilters && (
                          <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                            {selectedThemes.length + selectedFormats.length + selectedOrgs.length}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <FilterSidebar
                        themes={themes}
                        selectedThemes={selectedThemes}
                        selectedFormats={selectedFormats}
                        selectedOrgs={selectedOrgs}
                        onToggleTheme={toggleTheme}
                        onToggleFormat={toggleFormat}
                        onToggleOrg={toggleOrg}
                        onClearFilters={clearFilters}
                        hasActiveFilters={hasActiveFilters}
                      />
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Pertinence</SelectItem>
                      <SelectItem value="date">Plus récent</SelectItem>
                      <SelectItem value="downloads">Plus téléchargé</SelectItem>
                      <SelectItem value="views">Plus vu</SelectItem>
                      <SelectItem value="rating">Mieux noté</SelectItem>
                      <SelectItem value="title">A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              {filteredDatasets.length === 0 ? (
                <EmptyState
                  type="no-results"
                  actionText="Effacer les filtres"
                  onAction={clearFilters}
                />
              ) : (
                <>
                  <div 
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }
                  >
                    {filteredDatasets.map((dataset) => (
                      <DatasetCard key={dataset.id} dataset={dataset} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-center mt-8">
                    <Button variant="outline" disabled>
                      Page précédente
                    </Button>
                    <div className="px-4 text-sm text-muted-foreground">
                      1 / 5
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/catalog?page=2">
                        Page suivante
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface FilterSidebarProps {
  themes: typeof themes;
  selectedThemes: string[];
  selectedFormats: string[];
  selectedOrgs: string[];
  onToggleTheme: (id: string) => void;
  onToggleFormat: (format: string) => void;
  onToggleOrg: (id: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

function FilterSidebar({
  themes,
  selectedThemes,
  selectedFormats,
  selectedOrgs,
  onToggleTheme,
  onToggleFormat,
  onToggleOrg,
  onClearFilters,
  hasActiveFilters,
}: FilterSidebarProps) {
  const allFormats = ['CSV', 'JSON', 'Excel', 'PDF', 'GeoJSON', 'Shapefile'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold">Filtres</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Themes */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Thèmes</h3>
        <div className="space-y-2">
          {themes.map((theme) => (
            <div key={theme.id} className="flex items-center gap-2">
              <Checkbox
                id={`theme-${theme.id}`}
                checked={selectedThemes.includes(theme.id)}
                onCheckedChange={() => onToggleTheme(theme.id)}
              />
              <label
                htmlFor={`theme-${theme.id}`}
                className="flex items-center gap-2 text-sm cursor-pointer flex-1"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
                {theme.name}
                <span className="text-muted-foreground">({theme.datasetsCount})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Formats */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Formats</h3>
        <div className="flex flex-wrap gap-2">
          {allFormats.map((format) => (
            <Badge
              key={format}
              variant={selectedFormats.includes(format) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onToggleFormat(format)}
            >
              {format}
            </Badge>
          ))}
        </div>
      </div>

      {/* Organizations */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Organisations</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {organizations.slice(0, 10).map((org) => (
            <div key={org.id} className="flex items-center gap-2">
              <Checkbox
                id={`org-${org.id}`}
                checked={selectedOrgs.includes(org.id)}
                onCheckedChange={() => onToggleOrg(org.id)}
              />
              <label
                htmlFor={`org-${org.id}`}
                className="text-sm cursor-pointer flex-1 line-clamp-1"
              >
                {org.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
