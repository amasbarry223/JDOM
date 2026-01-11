'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, X, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { allDatasets } from '@/lib/mock-data';
import { calculateRelevance, highlightText, debounce, formatNumber } from '@/lib/utils';

interface FuzzySearchProps {
  onDatasetSelect?: (datasetId: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function FuzzySearch({ onDatasetSelect, placeholder = 'Rechercher...', autoFocus = false }: FuzzySearchProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Fuzzy search algorithm
  const searchDatasets = useMemo(() => {
    if (!query || query.length < 2) {
      return [];
    }

    const queryLower = query.toLowerCase();
    let results: Array<{ dataset: any; score: number }> = [];

    allDatasets.forEach(dataset => {
      let score = 0;
      const maxScore = 200;

      // Exact title match (highest priority)
      if (dataset.title.toLowerCase() === queryLower) {
        score += maxScore;
      }
      // Title starts with query
      else if (dataset.title.toLowerCase().startsWith(queryLower)) {
        score += maxScore * 0.9;
      }
      // Title contains query
      else if (dataset.title.toLowerCase().includes(queryLower)) {
        score += maxScore * 0.7;
      }
      // Description contains query
      else if (dataset.description.toLowerCase().includes(queryLower)) {
        score += maxScore * 0.5;
      }
      // Keywords match
      dataset.keywords.forEach(kw => {
        if (kw.toLowerCase().includes(queryLower)) {
          score += maxScore * 0.6;
        }
      });
      // Organization match
      if (dataset.organization.name.toLowerCase().includes(queryLower)) {
        score += maxScore * 0.3;
      }
      // Theme match
      if (dataset.theme.name.toLowerCase().includes(queryLower)) {
        score += maxScore * 0.2;
      }

      if (score > 0) {
        results.push({ dataset, score });
      }
    });

    // Sort by score descending and take top 10
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 10).map(result => result.dataset);
  }, [query]);

  // Handle search with debouncing
  const debouncedSearch = useMemo(
    () => debounce((searchTerm: string) => {
      setIsSearching(true);
      setQuery(searchTerm);
      // Add to recent searches
      if (searchTerm.length > 2) {
        setRecentSearches(prev => {
          const filtered = prev.filter(s => s !== searchTerm);
          return [searchTerm, ...filtered].slice(0, 5);
        });
      }
      setTimeout(() => setIsSearching(false), 300);
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setRecentSearches([]);
  };

  const handleDatasetClick = (datasetId: string) => {
    if (onDatasetSelect) {
      onDatasetSelect(datasetId);
    }
  };

  if (searchDatasets.length > 0 && !isSearching) {
    return (
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={handleSearch}
              autoFocus={autoFocus}
              className="pl-10 pr-10"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button variant="outline" size="sm">
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Results Dropdown */}
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-background border shadow-xl rounded-lg overflow-hidden">
          <div className="p-3 bg-muted/30 border-b">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>{searchDatasets.length} résultat{searchDatasets.length !== 1 ? 's' : ''} trouvé{searchDatasets.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchDatasets.map((dataset, index) => (
              <div
                key={dataset.id}
                onClick={() => handleDatasetClick(dataset.id)}
                className="p-4 border-b hover:bg-muted cursor-pointer transition-colors last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">
                        {highlightText(dataset.title, query)}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {dataset.theme.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {highlightText(dataset.description.substring(0, 150) + '...', query)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {formatNumber(dataset.downloads)}
                      </span>
                      <span>•</span>
                      <span>{formatNumber(dataset.views)} vues</span>
                      <span>•</span>
                      <span>{dataset.organization.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* No Results */}
            {searchDatasets.length === 0 && !isSearching && (
              <div className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Aucun résultat</h3>
                <p className="text-sm text-muted-foreground">
                  Essayez une recherche différente ou vérifiez l'orthographe
                </p>
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="p-12 text-center">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground mt-4">Recherche en cours...</p>
              </div>
            )}
          </div>

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && !isSearching && (
            <div className="p-3 bg-muted/30 border-b">
              <h4 className="text-sm font-medium mb-2">Recherches récentes</h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => debouncedSearch(search)}
                    className="px-3 py-1.5 text-sm bg-background border rounded-lg hover:border-primary transition-colors"
                  >
                    {search}
                  </button>
                ))}
                <button
                  onClick={() => setRecentSearches([])}
                  className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                  title="Effacer l'historique"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleSearch}
            autoFocus={autoFocus}
            className="pl-10"
          />
        </div>
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="h-10 w-10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
