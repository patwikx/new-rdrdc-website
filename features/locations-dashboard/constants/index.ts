/**
 * Constants and default configurations for the Locations Dashboard
 */

import { MapConfiguration } from '../types';

/**
 * Default map configuration for General Santos City
 */
export const DEFAULT_MAP_CONFIG: MapConfiguration = {
  defaultCenter: {
    lat: 6.1164,
    lng: 125.1716,
  },
  defaultZoom: 13,
  maxZoom: 18,
  minZoom: 10,
  clusterDistance: 50,
  tileLayerUrls: {
    street: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    hybrid: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  },
};

/**
 * Maximum number of recent locations to store
 */
export const MAX_RECENT_LOCATIONS = 10;

/**
 * Maximum number of search history items to store
 */
export const MAX_SEARCH_HISTORY = 10;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  FAVORITES: 'locations-dashboard-favorites',
  RECENT_LOCATIONS: 'locations-dashboard-recent-locations',
  SEARCH_HISTORY: 'locations-dashboard-search-history',
  FILTERS: 'locations-dashboard-filters',
  MAP_STYLE: 'locations-dashboard-map-style',
} as const;

/**
 * Default price range for filters (in PHP)
 */
export const DEFAULT_PRICE_RANGE = {
  min: 0,
  max: 50000000, // 50 million PHP
};

/**
 * Property type labels
 */
export const PROPERTY_TYPE_LABELS = {
  residential: 'Residential',
  commercial: 'Commercial',
  land: 'Land',
} as const;

/**
 * Available property features for filtering
 */
export const AVAILABLE_FEATURES = [
  'parking',
  'pool',
  'garden',
  'security',
  'gym',
  'playground',
  'clubhouse',
  'basketball-court',
  'tennis-court',
  'jogging-path',
] as const;

/**
 * Feature labels for display
 */
export const FEATURE_LABELS: Record<string, string> = {
  parking: 'Parking',
  pool: 'Swimming Pool',
  garden: 'Garden',
  security: '24/7 Security',
  gym: 'Gym/Fitness Center',
  playground: 'Playground',
  clubhouse: 'Clubhouse',
  'basketball-court': 'Basketball Court',
  'tennis-court': 'Tennis Court',
  'jogging-path': 'Jogging Path',
};

/**
 * Debounce delay for search input (ms)
 */
export const SEARCH_DEBOUNCE_DELAY = 300;

/**
 * Map animation duration (ms)
 */
export const MAP_ANIMATION_DURATION = 500;

/**
 * Sidebar breakpoint (px)
 */
export const SIDEBAR_BREAKPOINT = 768;

/**
 * Minimum sidebar width (px)
 */
export const MIN_SIDEBAR_WIDTH = 320;
