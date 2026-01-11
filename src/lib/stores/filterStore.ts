import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SearchFilters, FileFormat, License, UpdateFrequency, SortBy } from '@/types';

interface FilterState {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  setQuery: (query: string) => void;
  toggleTheme: (themeId: string) => void;
  toggleOrganization: (orgId: string) => void;
  toggleFormat: (format: FileFormat) => void;
  toggleLicense: (license: License) => void;
  setSortBy: (sortBy: SortBy) => void;
}

const defaultFilters: SearchFilters = {
  sortBy: 'relevance',
  sortOrder: 'desc',
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,

      setFilters: (newFilters) => {
        set(state => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      resetFilters: () => {
        set({ filters: defaultFilters });
      },

      setQuery: (query) => {
        set(state => ({
          filters: { ...state.filters, query },
        }));
      },

      toggleTheme: (themeId) => {
        set(state => {
          const themes = state.filters.themes || [];
          return {
            filters: {
              ...state.filters,
              themes: themes.includes(themeId)
                ? themes.filter(id => id !== themeId)
                : [...themes, themeId],
            },
          };
        });
      },

      toggleOrganization: (orgId) => {
        set(state => {
          const orgs = state.filters.organizations || [];
          return {
            filters: {
              ...state.filters,
              organizations: orgs.includes(orgId)
                ? orgs.filter(id => id !== orgId)
                : [...orgs, orgId],
            },
          };
        });
      },

      toggleFormat: (format) => {
        set(state => {
          const formats = state.filters.formats || [];
          return {
            filters: {
              ...state.filters,
              formats: formats.includes(format)
                ? formats.filter(f => f !== format)
                : [...formats, format],
            },
          };
        });
      },

      toggleLicense: (license) => {
        set(state => {
          const licenses = state.filters.licenses || [];
          return {
            filters: {
              ...state.filters,
              licenses: licenses.includes(license)
                ? licenses.filter(l => l !== license)
                : [...licenses, license],
            },
          };
        });
      },

      setSortBy: (sortBy) => {
        set(state => ({
          filters: { ...state.filters, sortBy },
        }));
      },
    }),
    {
      name: 'jdom-filters-storage',
    }
  )
);
