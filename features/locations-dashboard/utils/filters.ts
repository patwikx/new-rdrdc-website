/**
 * Utility functions for filtering and manipulating property data
 */

import { Property, PropertyFilters, LatLng, LatLngBounds } from '../types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(point1: LatLng, point2: LatLng): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) *
    Math.cos(toRadians(point2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Check if a point is within bounds
 */
export function isPointInBounds(point: LatLng, bounds: LatLngBounds): boolean {
  return (
    point.lat >= bounds.south &&
    point.lat <= bounds.north &&
    point.lng >= bounds.west &&
    point.lng <= bounds.east
  );
}

/**
 * Filter properties by type
 */
export function filterByType(properties: Property[], types: string[]): Property[] {
  if (types.length === 0) {
    return properties;
  }
  return properties.filter(property => types.includes(property.type));
}

/**
 * Filter properties by price range
 */
export function filterByPriceRange(
  properties: Property[],
  min: number,
  max: number
): Property[] {
  return properties.filter(property => property.price >= min && property.price <= max);
}

/**
 * Filter properties by features
 */
export function filterByFeatures(properties: Property[], features: string[]): Property[] {
  if (features.length === 0) {
    return properties;
  }
  
  return properties.filter(property => {
    const propertyFeatureNames = property.features.map(f => f.name.toLowerCase());
    return features.every(feature => 
      propertyFeatureNames.includes(feature.toLowerCase())
    );
  });
}

/**
 * Filter properties by location radius
 */
export function filterByLocation(
  properties: Property[],
  center: LatLng,
  radiusKm: number
): Property[] {
  return properties.filter(property => {
    const distance = calculateDistance(center, property.coordinates);
    return distance <= radiusKm;
  });
}

/**
 * Filter properties by map bounds
 */
export function filterByBounds(properties: Property[], bounds: LatLngBounds): Property[] {
  return properties.filter(property => 
    isPointInBounds(property.coordinates, bounds)
  );
}

/**
 * Apply all filters to properties
 */
export function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
  let filtered = properties;
  
  // Filter by type
  if (filters.type.length > 0) {
    filtered = filterByType(filtered, filters.type);
  }
  
  // Filter by price range
  filtered = filterByPriceRange(filtered, filters.priceRange.min, filters.priceRange.max);
  
  // Filter by features
  if (filters.features.length > 0) {
    filtered = filterByFeatures(filtered, filters.features);
  }
  
  // Filter by location
  if (filters.location) {
    filtered = filterByLocation(filtered, filters.location.center, filters.location.radius);
  }
  
  return filtered;
}

/**
 * Search properties by query string
 * Searches in title, address, and description
 */
export function searchProperties(properties: Property[], query: string): Property[] {
  if (!query.trim()) {
    return properties;
  }
  
  const lowerQuery = query.toLowerCase();
  
  return properties.filter(property => {
    return (
      property.title.toLowerCase().includes(lowerQuery) ||
      property.address.toLowerCase().includes(lowerQuery) ||
      property.description.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Sort properties by distance from a point
 */
export function sortByDistance(properties: Property[], center: LatLng): Property[] {
  return [...properties].sort((a, b) => {
    const distanceA = calculateDistance(center, a.coordinates);
    const distanceB = calculateDistance(center, b.coordinates);
    return distanceA - distanceB;
  });
}

/**
 * Sort properties by price
 */
export function sortByPrice(properties: Property[], ascending = true): Property[] {
  return [...properties].sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
}

/**
 * Sort properties by date (newest first)
 */
export function sortByDate(properties: Property[], ascending = false): Property[] {
  return [...properties].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)}km`;
}

/**
 * Get property type label
 */
export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    residential: 'Residential',
    commercial: 'Commercial',
    land: 'Land',
  };
  return labels[type] || type;
}

/**
 * Calculate bounds from a list of properties
 */
export function calculateBoundsFromProperties(properties: Property[]): LatLngBounds | null {
  if (properties.length === 0) {
    return null;
  }
  
  let north = -90;
  let south = 90;
  let east = -180;
  let west = 180;
  
  properties.forEach(property => {
    const { lat, lng } = property.coordinates;
    north = Math.max(north, lat);
    south = Math.min(south, lat);
    east = Math.max(east, lng);
    west = Math.min(west, lng);
  });
  
  return { north, south, east, west };
}

/**
 * Calculate center point from bounds
 */
export function calculateCenterFromBounds(bounds: LatLngBounds): LatLng {
  return {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  };
}

/**
 * Expand bounds by a percentage
 */
export function expandBounds(bounds: LatLngBounds, percentage: number): LatLngBounds {
  const latDiff = bounds.north - bounds.south;
  const lngDiff = bounds.east - bounds.west;
  const latExpansion = (latDiff * percentage) / 100;
  const lngExpansion = (lngDiff * percentage) / 100;
  
  return {
    north: bounds.north + latExpansion,
    south: bounds.south - latExpansion,
    east: bounds.east + lngExpansion,
    west: bounds.west - lngExpansion,
  };
}
