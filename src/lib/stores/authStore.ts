import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  toggleFavorite: (datasetId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));

          // Mock login - in real app, this would be an API call
          const mockUser: User = {
            id: '1',
            name: 'Admin User',
            email,
            role: email.includes('admin') ? 'admin' : 'producer',
            type: 'organization',
            createdAt: new Date(),
            status: 'active',
            favorites: [],
            downloads: 0,
          };

          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates: Partial<User>) => {
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      toggleFavorite: (datasetId: string) => {
        set(state => {
          if (!state.user) return state;

          const favorites = state.user.favorites || [];
          const isFavorite = favorites.includes(datasetId);

          return {
            user: {
              ...state.user,
              favorites: isFavorite
                ? favorites.filter(id => id !== datasetId)
                : [...favorites, datasetId],
            },
          };
        });
      },
    }),
    {
      name: 'jdom-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
