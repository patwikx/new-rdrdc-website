/**
 * Property Data Adapter
 * 
 * Transforms existing property data format to Dashboard Property format
 */

import { properties as existingProperties } from './data';
import type { Property as DashboardProperty } from '@/features/locations-dashboard/types';

/**
 * Convert existing property data to Dashboard property format
 */
export function adaptPropertiesToDashboard(): DashboardProperty[] {
  return existingProperties.map((prop) => {
    // Determine property type based on category
    let type: 'residential' | 'commercial' | 'land' = 'commercial';
    if (prop.category.toLowerCase().includes('residential')) {
      type = 'residential';
    } else if (prop.category.toLowerCase().includes('township') || prop.category.toLowerCase().includes('mixed')) {
      type = 'land';
    }

    // Extract features from the property
    const features = prop.features.map((feature, index) => ({
      id: `f-${prop.id}-${index}`,
      name: feature,
      category: 'amenity' as 'amenity' | 'specification' | 'location',
    }));

    // Add specs as features
    if (prop.specs.sqm) {
      features.push({
        id: `f-${prop.id}-sqm`,
        name: `Area: ${prop.specs.sqm}`,
        category: 'specification',
      });
    }
    if (prop.specs.floors) {
      features.push({
        id: `f-${prop.id}-floors`,
        name: `Floors: ${prop.specs.floors}`,
        category: 'specification',
      });
    }
    if (prop.specs.parking) {
      features.push({
        id: `f-${prop.id}-parking`,
        name: `Parking: ${prop.specs.parking}`,
        category: 'specification',
      });
    }

    return {
      id: prop.id,
      title: prop.name,
      address: prop.location,
      coordinates: {
        lat: prop.lat,
        lng: prop.lng,
      },
      price: 0, // Price not available in current data
      type,
      features,
      images: prop.images,
      description: prop.description,
      createdAt: new Date(prop.specs.completion || '2020-01-01'),
      updatedAt: new Date(),
    };
  });
}
