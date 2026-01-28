/**
 * Zustand store for Locations Dashboard application state
 * Implements state management for properties, filters, favorites, UI state, and more
 * Validates: Requirements 8.1, 8.4
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  Property,
  PropertyFilters,
  RecentLocation,
  SearchHistoryItem,
  SearchSuggestion,
  MapViewport,
  MapStyle,
  SidebarView,
  LatLng,
} from '../types';
import {
  getFavorites,
  saveFavorites,
  getRecentLocations,
  saveRecentLocations,
  getSearchHistory,
  saveSearchHistory,
  getSavedFilters,
  saveFilters as saveFiltersToStorage,
  getSavedMapStyle,
  saveMapStyle as saveMapStyleToStorage,
} from '../utils/storage';
import { applyFilters, searchProperties } from '../utils/filters';
import { DEFAULT_MAP_CONFIG, DEFAULT_PRICE_RANGE, MAX_RECENT_LOCATIONS } from '../constants';

// ============================================================================
// Store Interfaces
// ============================================================================

/**
 * Properties store state
 */
interface PropertiesState {
  all: Property[];
  filtered: Property[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setProperties: (properties: Property[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateFiltered: () => void;
}

/**
 * Filters store state
 */
interface FiltersState {
  filters: PropertyFilters;
  
  // Actions
  setFilters: (filters: PropertyFilters) => void;
  updateTypeFilter: (types: string[]) => void;
  updatePriceRange: (min: number, max: number) => void;
  updateFeatures: (features: string[]) => void;
  updateLocationFilter: (center: LatLng, radius: number) => void;
  clearLocationFilter: () => void;
  resetFilters: () => void;
}

/**
 * Favorites store state
 */
interface FavoritesState {
  items: Property[];
  loading: boolean;
  
  // Actions
  loadFavorites: () => void;
  addFavorite: (property: Property) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  clearFavorites: () => void;
}

/**
 * UI store state
 */
interface UIState {
  sidebar: {
    collapsed: boolean;
    activeView: SidebarView;
  };
  map: {
    viewport: MapViewport;
    style: MapStyle;
    fullscreen: boolean;
  };
  selectedProperty: Property | null;
  
  // Actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setActiveView: (view: SidebarView) => void;
  setMapViewport: (viewport: MapViewport) => void;
  setMapStyle: (style: MapStyle) => void;
  setFullscreen: (fullscreen: boolean) => void;
  toggleFullscreen: () => void;
  setSelectedProperty: (property: Property | null) => void;
}

/**
 * Search store state
 */
interface SearchState {
  query: string;
  suggestions: SearchSuggestion[];
  loading: boolean;
  history: SearchHistoryItem[];
  
  // Actions
  setQuery: (query: string) => void;
  setSuggestions: (suggestions: SearchSuggestion[]) => void;
  setLoading: (loading: boolean) => void;
  loadHistory: () => void;
  addToHistory: (item: SearchHistoryItem) => void;
  clearHistory: () => void;
}

/**
 * Recent locations store state
 */
interface RecentsState {
  locations: RecentLocation[];
  
  // Actions
  loadRecents: () => void;
  addRecent: (location: RecentLocation) => void;
  clearRecents: () => void;
}

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_FILTERS: PropertyFilters = {
  type: [],
  priceRange: DEFAULT_PRICE_RANGE,
  features: [],
};

const DEFAULT_VIEWPORT: MapViewport = {
  center: DEFAULT_MAP_CONFIG.defaultCenter,
  zoom: DEFAULT_MAP_CONFIG.defaultZoom,
  bounds: {
    north: DEFAULT_MAP_CONFIG.defaultCenter.lat + 0.1,
    south: DEFAULT_MAP_CONFIG.defaultCenter.lat - 0.1,
    east: DEFAULT_MAP_CONFIG.defaultCenter.lng + 0.1,
    west: DEFAULT_MAP_CONFIG.defaultCenter.lng - 0.1,
  },
};

// ============================================================================
// Properties Store
// ============================================================================

export const usePropertiesStore = create<PropertiesState>()(
  devtools(
    (set, get) => ({
      all: [],
      filtered: [],
      loading: false,
      error: null,

      setProperties: (properties) => {
        set({ all: properties, error: null });
        get().updateFiltered();
      },

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error, loading: false }),

      updateFiltered: () => {
        const { all } = get();
        const filters = useFiltersStore.getState().filters;
        const searchQuery = useSearchStore.getState().query;
        
        let filtered = all;
        
        // Apply search filter
        if (searchQuery.trim()) {
          filtered = searchProperties(filtered, searchQuery);
        }
        
        // Apply property filters
        filtered = applyFilters(filtered, filters);
        
        set({ filtered });
      },
    }),
    { name: 'properties-store' }
  )
);

// ============================================================================
// Filters Store
// ============================================================================

export const useFiltersStore = create<FiltersState>()(
  devtools(
    persist(
      (set, get) => ({
        filters: DEFAULT_FILTERS,

        setFilters: (filters) => {
          set({ filters });
          saveFiltersToStorage(filters);
          usePropertiesStore.getState().updateFiltered();
        },

        updateTypeFilter: (types) => {
          const filters = { ...get().filters, type: types as any };
          get().setFilters(filters);
        },

        updatePriceRange: (min, max) => {
          const filters = {
            ...get().filters,
            priceRange: { min, max },
          };
          get().setFilters(filters);
        },

        updateFeatures: (features) => {
          const filters = { ...get().filters, features };
          get().setFilters(filters);
        },

        updateLocationFilter: (center, radius) => {
          const filters = {
            ...get().filters,
            location: { center, radius },
          };
          get().setFilters(filters);
        },

        clearLocationFilter: () => {
          const filters = { ...get().filters };
          delete filters.location;
          get().setFilters(filters);
        },

        resetFilters: () => {
          get().setFilters(DEFAULT_FILTERS);
        },
      }),
      {
        name: 'filters-storage',
        partialize: (state) => ({ filters: state.filters }),
      }
    ),
    { name: 'filters-store' }
  )
);

// ============================================================================
// Favorites Store
// ============================================================================

export const useFavoritesStore = create<FavoritesState>()(
  devtools(
    (set, get) => ({
      items: [],
      loading: false,

      loadFavorites: () => {
        set({ loading: true });
        try {
          const favorites = getFavorites();
          set({ items: favorites, loading: false });
        } catch (error) {
          console.error('Error loading favorites:', error);
          set({ loading: false });
        }
      },

      addFavorite: (property) => {
        const { items } = get();
        
        // Check if already in favorites
        if (items.some((fav) => fav.id === property.id)) {
          return;
        }
        
        const newItems = [...items, property];
        set({ items: newItems });
        saveFavorites(newItems);
      },

      removeFavorite: (propertyId) => {
        const { items } = get();
        const newItems = items.filter((fav) => fav.id !== propertyId);
        set({ items: newItems });
        saveFavorites(newItems);
      },

      isFavorite: (propertyId) => {
        const { items } = get();
        return items.some((fav) => fav.id === propertyId);
      },

      clearFavorites: () => {
        set({ items: [] });
        saveFavorites([]);
      },
    }),
    { name: 'favorites-store' }
  )
);

// ============================================================================
// UI Store
// ============================================================================

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        sidebar: {
          collapsed: false,
          activeView: 'search',
        },
        map: {
          viewport: DEFAULT_VIEWPORT,
          style: 'street',
          fullscreen: false,
        },
        selectedProperty: null,

        setSidebarCollapsed: (collapsed) => {
          set((state) => ({
            sidebar: { ...state.sidebar, collapsed },
          }));
        },

        toggleSidebar: () => {
          set((state) => ({
            sidebar: { ...state.sidebar, collapsed: !state.sidebar.collapsed },
          }));
        },

        setActiveView: (view) => {
          set((state) => ({
            sidebar: { ...state.sidebar, activeView: view },
          }));
        },

        setMapViewport: (viewport) => {
          set((state) => ({
            map: { ...state.map, viewport },
          }));
        },

        setMapStyle: (style) => {
          set((state) => ({
            map: { ...state.map, style },
          }));
          saveMapStyleToStorage(style);
        },

        setFullscreen: (fullscreen) => {
          set((state) => ({
            map: { ...state.map, fullscreen },
          }));
        },

        toggleFullscreen: () => {
          set((state) => ({
            map: { ...state.map, fullscreen: !state.map.fullscreen },
          }));
        },

        setSelectedProperty: (property) => {
          set({ selectedProperty: property });
        },
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({
          sidebar: state.sidebar,
          map: {
            style: state.map.style,
            // Don't persist viewport and fullscreen
          },
        }),
      }
    ),
    { name: 'ui-store' }
  )
);

// ============================================================================
// Search Store
// ============================================================================

export const useSearchStore = create<SearchState>()(
  devtools(
    (set, get) => ({
      query: '',
      suggestions: [],
      loading: false,
      history: [],

      setQuery: (query) => {
        set({ query });
        usePropertiesStore.getState().updateFiltered();
      },

      setSuggestions: (suggestions) => set({ suggestions }),

      setLoading: (loading) => set({ loading }),

      loadHistory: () => {
        try {
          const history = getSearchHistory();
          set({ history });
        } catch (error) {
          console.error('Error loading search history:', error);
        }
      },

      addToHistory: (item) => {
        const { history } = get();
        
        // Check if query already exists
        const existingIndex = history.findIndex(
          (h) => h.query.toLowerCase() === item.query.toLowerCase()
        );
        
        let newHistory: SearchHistoryItem[];
        if (existingIndex !== -1) {
          // Update existing entry
          newHistory = [...history];
          newHistory[existingIndex] = item;
        } else {
          // Add to beginning
          newHistory = [item, ...history];
        }
        
        set({ history: newHistory });
        saveSearchHistory(newHistory);
      },

      clearHistory: () => {
        set({ history: [] });
        saveSearchHistory([]);
      },
    }),
    { name: 'search-store' }
  )
);

// ============================================================================
// Recent Locations Store
// ============================================================================

export const useRecentsStore = create<RecentsState>()(
  devtools(
    (set, get) => ({
      locations: [],

      loadRecents: () => {
        try {
          const locations = getRecentLocations();
          set({ locations });
        } catch (error) {
          console.error('Error loading recent locations:', error);
        }
      },

      addRecent: (location) => {
        const { locations } = get();
        
        // Add to beginning
        const newLocations = [location, ...locations];
        
        // Keep only the most recent MAX_RECENT_LOCATIONS items
        const trimmed = newLocations.slice(0, MAX_RECENT_LOCATIONS);
        
        set({ locations: trimmed });
        saveRecentLocations(trimmed);
      },

      clearRecents: () => {
        set({ locations: [] });
        saveRecentLocations([]);
      },
    }),
    { name: 'recents-store' }
  )
);

// ============================================================================
// Store Initialization
// ============================================================================

/**
 * Initialize all stores with persisted data
 * Should be called once when the application starts
 */
export function initializeStores() {
  // Load favorites
  useFavoritesStore.getState().loadFavorites();
  
  // Load search history
  useSearchStore.getState().loadHistory();
  
  // Load recent locations
  useRecentsStore.getState().loadRecents();
  
  // Load saved filters
  const savedFilters = getSavedFilters();
  if (savedFilters) {
    useFiltersStore.getState().setFilters(savedFilters);
  }
  
  // Load saved map style
  const savedMapStyle = getSavedMapStyle();
  if (savedMapStyle) {
    useUIStore.getState().setMapStyle(savedMapStyle);
  }
}

// ============================================================================
// Utility Hooks
// ============================================================================

/**
 * Hook to get filtered property count
 */
export function useFilteredPropertyCount() {
  return usePropertiesStore((state) => state.filtered.length);
}

/**
 * Hook to check if a property is a favorite
 */
export function useIsFavorite(propertyId: string) {
  return useFavoritesStore((state) => state.isFavorite(propertyId));
}

/**
 * Hook to get current map viewport
 */
export function useMapViewport() {
  return useUIStore((state) => state.map.viewport);
}

/**
 * Hook to get current map style
 */
export function useMapStyle() {
  return useUIStore((state) => state.map.style);
}

/**
 * Hook to get sidebar state
 */
export function useSidebarState() {
  return useUIStore((state) => state.sidebar);
}
