/**
 * Core TypeScript interfaces for the Locations Dashboard feature
 * These types define the data models used throughout the dashboard
 */

// ============================================================================
// Core Data Models
// ============================================================================

/**
 * Represents a real estate property with all its details
 */
export interface Property {
  id: string;
  title: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  type: PropertyType;
  features: PropertyFeature[];
  images: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Property type categories
 */
export type PropertyType = 'residential' | 'commercial' | 'land';

/**
 * Property feature with categorization
 */
export interface PropertyFeature {
  id: string;
  name: string;
  category: 'amenity' | 'specification' | 'location';
  value?: string | number;
}

// ============================================================================
// Filter and Search Models
// ============================================================================

/**
 * Property filtering criteria
 */
export interface PropertyFilters {
  type: PropertyType[];
  priceRange: {
    min: number;
    max: number;
  };
  features: string[];
  location?: {
    center: LatLng;
    radius: number;
  };
}

/**
 * Search history item
 */
export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  resultCount: number;
  location?: LatLng;
}

/**
 * Search suggestion for autocomplete
 */
export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'address' | 'neighborhood' | 'property';
  location?: LatLng;
  propertyId?: string;
}

// ============================================================================
// Recent Locations and Activity Tracking
// ============================================================================

/**
 * Recent location activity
 */
export interface RecentLocation {
  id: string;
  property?: Property;
  searchQuery?: string;
  location: LatLng;
  timestamp: Date;
  type: 'property_view' | 'search' | 'location_browse';
}

// ============================================================================
// Map Models
// ============================================================================

/**
 * Latitude and Longitude coordinates
 */
export interface LatLng {
  lat: number;
  lng: number;
}

/**
 * Map bounding box
 */
export interface LatLngBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

/**
 * Map viewport state
 */
export interface MapViewport {
  center: LatLng;
  zoom: number;
  bounds: LatLngBounds;
}

/**
 * Map style options
 */
export type MapStyle = 'street' | 'satellite' | 'hybrid';

/**
 * Map configuration
 */
export interface MapConfiguration {
  defaultCenter: LatLng;
  defaultZoom: number;
  maxZoom: number;
  minZoom: number;
  clusterDistance: number;
  tileLayerUrls: {
    street: string;
    satellite: string;
    hybrid: string;
  };
}

// ============================================================================
// Component Props Interfaces
// ============================================================================

/**
 * Dashboard container props
 */
export interface DashboardProps {
  initialProperties: Property[];
  mapConfig: MapConfiguration;
}

/**
 * Dashboard state
 */
export interface DashboardState {
  sidebarCollapsed: boolean;
  activeView: SidebarView;
  selectedProperty: Property | null;
  mapViewport: MapViewport;
}

/**
 * Sidebar view options
 */
export type SidebarView = 'search' | 'favorites' | 'recents' | 'filters';

/**
 * Sidebar component props
 */
export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeView: SidebarView;
  onViewChange: (view: SidebarView) => void;
}

/**
 * Search component props
 */
export interface SearchComponentProps {
  onSearch: (query: string) => void;
  onLocationSelect: (location: LatLng) => void;
  searchHistory: SearchHistoryItem[];
}

/**
 * Filters component props
 */
export interface FiltersComponentProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  propertyCount: number;
}

/**
 * Favorites component props
 */
export interface FavoritesComponentProps {
  favorites: Property[];
  onFavoriteSelect: (property: Property) => void;
  onFavoriteRemove: (propertyId: string) => void;
}

/**
 * Recent locations component props
 */
export interface RecentsComponentProps {
  recentLocations: RecentLocation[];
  onRecentSelect: (location: RecentLocation) => void;
  onClearHistory: () => void;
}

/**
 * Map component props
 */
export interface MapComponentProps {
  properties: Property[];
  viewport: MapViewport;
  onViewportChange: (viewport: MapViewport) => void;
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
  mapStyle: MapStyle;
  onStyleChange: (style: MapStyle) => void;
}

/**
 * Map controls props
 */
export interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onToggleFullscreen: () => void;
  onStyleChange: (style: MapStyle) => void;
  onLocateUser: () => void;
  fullscreenActive: boolean;
  currentStyle: MapStyle;
  isLocating?: boolean;
}

/**
 * Property marker props
 */
export interface PropertyMarkerProps {
  property: Property;
  onClick: (property: Property) => void;
  onFavoriteToggle: (property: Property) => void;
  isFavorite: boolean;
  isSelected: boolean;
  isSearchResult?: boolean; // Indicates if property matches current search
}

/**
 * Property popup props
 */
export interface PropertyPopupProps {
  property: Property;
  onClose: () => void;
  onFavoriteToggle: () => void;
  onShare: () => void;
  onViewDetails: () => void;
  isFavorite: boolean;
}

/**
 * Marker cluster props
 */
export interface MarkerClusterProps {
  properties: Property[];
  bounds: LatLngBounds;
  onClick: () => void;
  count: number;
}

// ============================================================================
// State Management Models
// ============================================================================

/**
 * Application state structure
 */
export interface ApplicationState {
  // UI State
  sidebar: {
    collapsed: boolean;
    activeView: SidebarView;
  };
  map: {
    viewport: MapViewport;
    style: MapStyle;
    fullscreen: boolean;
  };

  // Data State
  properties: {
    all: Property[];
    filtered: Property[];
    loading: boolean;
    error: string | null;
  };

  // User State
  favorites: {
    items: Property[];
    loading: boolean;
  };
  recents: {
    locations: RecentLocation[];
    searches: SearchHistoryItem[];
  };

  // Filter State
  filters: PropertyFilters;
  search: {
    query: string;
    suggestions: SearchSuggestion[];
    loading: boolean;
  };
}
