/**
 * Local storage utilities for persisting dashboard data
 */

import { Property, RecentLocation, SearchHistoryItem, PropertyFilters, MapStyle } from '../types';
import { STORAGE_KEYS, MAX_RECENT_LOCATIONS, MAX_SEARCH_HISTORY } from '../constants';

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Safely get item from localStorage
 */
function getItem<T>(key: string, defaultValue: T): T {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * Safely set item in localStorage
 */
function setItem<T>(key: string, value: T): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Clearing old data...');
      // Try to clear some space by removing oldest items
      clearOldData();
      // Retry once
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (retryError) {
        console.error('Failed to save after clearing old data:', retryError);
        return false;
      }
    }
    return false;
  }
}

/**
 * Clear old data to free up space
 */
function clearOldData(): void {
  try {
    // Clear search history first (least critical)
    localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    // Clear recent locations
    localStorage.removeItem(STORAGE_KEYS.RECENT_LOCATIONS);
  } catch (error) {
    console.error('Error clearing old data:', error);
  }
}

/**
 * Remove item from localStorage
 */
function removeItem(key: string): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

// ============================================================================
// Favorites Management
// ============================================================================

/**
 * Get favorites from localStorage
 */
export function getFavorites(): Property[] {
  return getItem<Property[]>(STORAGE_KEYS.FAVORITES, []);
}

/**
 * Save favorites to localStorage
 */
export function saveFavorites(favorites: Property[]): boolean {
  return setItem(STORAGE_KEYS.FAVORITES, favorites);
}

/**
 * Add property to favorites
 */
export function addFavorite(property: Property): boolean {
  const favorites = getFavorites();
  
  // Check if already in favorites
  if (favorites.some(fav => fav.id === property.id)) {
    return true;
  }

  favorites.push(property);
  return saveFavorites(favorites);
}

/**
 * Remove property from favorites
 */
export function removeFavorite(propertyId: string): boolean {
  const favorites = getFavorites();
  const filtered = favorites.filter(fav => fav.id !== propertyId);
  return saveFavorites(filtered);
}

/**
 * Check if property is in favorites
 */
export function isFavorite(propertyId: string): boolean {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === propertyId);
}

/**
 * Clear all favorites
 */
export function clearFavorites(): void {
  removeItem(STORAGE_KEYS.FAVORITES);
}

// ============================================================================
// Recent Locations Management
// ============================================================================

/**
 * Get recent locations from localStorage
 */
export function getRecentLocations(): RecentLocation[] {
  const locations = getItem<RecentLocation[]>(STORAGE_KEYS.RECENT_LOCATIONS, []);
  // Convert timestamp strings back to Date objects
  return locations.map(loc => ({
    ...loc,
    timestamp: new Date(loc.timestamp),
  }));
}

/**
 * Save recent locations to localStorage
 */
export function saveRecentLocations(locations: RecentLocation[]): boolean {
  return setItem(STORAGE_KEYS.RECENT_LOCATIONS, locations);
}

/**
 * Add recent location
 */
export function addRecentLocation(location: RecentLocation): boolean {
  const locations = getRecentLocations();
  
  // Add to beginning of array
  locations.unshift(location);
  
  // Keep only the most recent MAX_RECENT_LOCATIONS items
  const trimmed = locations.slice(0, MAX_RECENT_LOCATIONS);
  
  return saveRecentLocations(trimmed);
}

/**
 * Clear recent locations
 */
export function clearRecentLocations(): void {
  removeItem(STORAGE_KEYS.RECENT_LOCATIONS);
}

// ============================================================================
// Search History Management
// ============================================================================

/**
 * Get search history from localStorage
 */
export function getSearchHistory(): SearchHistoryItem[] {
  const history = getItem<SearchHistoryItem[]>(STORAGE_KEYS.SEARCH_HISTORY, []);
  // Convert timestamp strings back to Date objects
  return history.map(item => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));
}

/**
 * Save search history to localStorage
 */
export function saveSearchHistory(history: SearchHistoryItem[]): boolean {
  return setItem(STORAGE_KEYS.SEARCH_HISTORY, history);
}

/**
 * Add search to history
 */
export function addSearchHistory(item: SearchHistoryItem): boolean {
  const history = getSearchHistory();
  
  // Check if query already exists
  const existingIndex = history.findIndex(h => h.query.toLowerCase() === item.query.toLowerCase());
  
  if (existingIndex !== -1) {
    // Update existing entry with new timestamp
    history[existingIndex] = item;
  } else {
    // Add to beginning of array
    history.unshift(item);
  }
  
  // Keep only the most recent MAX_SEARCH_HISTORY items
  const trimmed = history.slice(0, MAX_SEARCH_HISTORY);
  
  return saveSearchHistory(trimmed);
}

/**
 * Clear search history
 */
export function clearSearchHistory(): void {
  removeItem(STORAGE_KEYS.SEARCH_HISTORY);
}

// ============================================================================
// Filters Management
// ============================================================================

/**
 * Get saved filters from localStorage
 */
export function getSavedFilters(): PropertyFilters | null {
  return getItem<PropertyFilters | null>(STORAGE_KEYS.FILTERS, null);
}

/**
 * Save filters to localStorage
 */
export function saveFilters(filters: PropertyFilters): boolean {
  return setItem(STORAGE_KEYS.FILTERS, filters);
}

/**
 * Clear saved filters
 */
export function clearFilters(): void {
  removeItem(STORAGE_KEYS.FILTERS);
}

// ============================================================================
// Map Style Management
// ============================================================================

/**
 * Get saved map style from localStorage
 */
export function getSavedMapStyle(): MapStyle | null {
  return getItem<MapStyle | null>(STORAGE_KEYS.MAP_STYLE, null);
}

/**
 * Save map style to localStorage
 */
export function saveMapStyle(style: MapStyle): boolean {
  return setItem(STORAGE_KEYS.MAP_STYLE, style);
}

/**
 * Clear saved map style
 */
export function clearMapStyle(): void {
  removeItem(STORAGE_KEYS.MAP_STYLE);
}
