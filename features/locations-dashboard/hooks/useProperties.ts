/**
 * React Query hooks for property data fetching
 * 
 * Implements asynchronous data loading with caching and error handling
 * Requirements:
 * - 8.1: Asynchronous data loading without blocking interface
 * - 8.4: Property data caching to minimize API calls
 * - 8.5: Loading indicators during data loading
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Property, LatLngBounds } from '../types';

/**
 * Mock API function to fetch properties
 * In a real application, this would call an actual API endpoint
 */
async function fetchProperties(): Promise<Property[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock data
  // In production, this would be: const response = await fetch('/api/properties');
  // return response.json();
  return [];
}

/**
 * Mock API function to fetch properties within a specific viewport
 * In a real application, this would call an API with bounds parameters
 */
async function fetchPropertiesInBounds(bounds: LatLngBounds): Promise<Property[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // In production, this would be:
  // const response = await fetch(`/api/properties?bounds=${JSON.stringify(bounds)}`);
  // return response.json();
  return [];
}

/**
 * Hook to fetch all properties
 * 
 * Returns:
 * - data: Array of properties
 * - isLoading: True during initial load
 * - isError: True if fetch failed
 * - error: Error object if fetch failed
 * - refetch: Function to manually refetch data
 */
export function useProperties(): UseQueryResult<Property[], Error> {
  return useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
}

/**
 * Hook to fetch properties within specific map bounds
 * 
 * Parameters:
 * - bounds: Map viewport bounds to fetch properties for
 * - enabled: Whether to enable the query (default: true)
 * 
 * Returns:
 * - data: Array of properties within bounds
 * - isLoading: True during initial load
 * - isFetching: True during any fetch (including background refetch)
 * - isError: True if fetch failed
 * - error: Error object if fetch failed
 */
export function usePropertiesInBounds(
  bounds: LatLngBounds | null,
  enabled: boolean = true
): UseQueryResult<Property[], Error> {
  return useQuery({
    queryKey: ['properties', 'bounds', bounds],
    queryFn: () => {
      if (!bounds) {
        throw new Error('Bounds are required');
      }
      return fetchPropertiesInBounds(bounds);
    },
    enabled: enabled && bounds !== null,
    staleTime: 3 * 60 * 1000, // Consider data fresh for 3 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
}

/**
 * Hook to fetch a single property by ID
 * 
 * Parameters:
 * - propertyId: ID of the property to fetch
 * - enabled: Whether to enable the query (default: true)
 * 
 * Returns:
 * - data: Property object
 * - isLoading: True during initial load
 * - isError: True if fetch failed
 * - error: Error object if fetch failed
 */
export function useProperty(
  propertyId: string | null,
  enabled: boolean = true
): UseQueryResult<Property, Error> {
  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      if (!propertyId) {
        throw new Error('Property ID is required');
      }
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In production:
      // const response = await fetch(`/api/properties/${propertyId}`);
      // return response.json();
      
      throw new Error('Property not found');
    },
    enabled: enabled && propertyId !== null,
    staleTime: 10 * 60 * 1000, // Individual properties stay fresh longer
    gcTime: 15 * 60 * 1000,
  });
}
