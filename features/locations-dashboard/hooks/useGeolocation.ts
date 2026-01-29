/**
 * useGeolocation Hook - Manage user location with Geolocation API
 * 
 * This hook provides functionality to:
 * - Get user's current location via browser Geolocation API
 * - Fallback to IP-based geolocation if browser fails
 * - Track location state and errors
 * - Handle permissions and errors
 * 
 * Requirements: 5.5
 */

import { useState, useCallback } from 'react';
import { LatLng } from '../types';

/**
 * Geolocation state
 */
export interface GeolocationState {
  location: LatLng | null;
  loading: boolean;
  error: string | null;
  isFromIP: boolean; // Indicates if location came from IP (less accurate)
}

/**
 * Geolocation error types
 */
export type GeolocationErrorType =
  | 'permission_denied'
  | 'position_unavailable'
  | 'timeout'
  | 'not_supported'
  | 'unknown';

/**
 * Get location from IP address as fallback
 * Uses ipapi.com with API key for better accuracy
 */
async function getLocationFromIP(): Promise<LatLng> {
  const ipapiKey = process.env.NEXT_PUBLIC_IPAPI_KEY;

  // Try ipapi.com first with API key (most accurate when authenticated)
  if (ipapiKey) {
    try {
      const response = await fetch(`http://api.ipapi.com/api/check?access_key=${ipapiKey}`);
      const data = await response.json();

      if (data.latitude && data.longitude) {
        console.log('IP location from ipapi.com (with API key):', {
          lat: data.latitude,
          lng: data.longitude,
          city: data.city,
          region: data.region_name
        });
        return {
          lat: data.latitude,
          lng: data.longitude,
        };
      }
    } catch (e) {
      console.log('ipapi.com failed, trying fallback...');
    }
  }

  // Try ipinfo.io as fallback
  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();

    if (data.loc) {
      const [lat, lng] = data.loc.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        console.log('IP location from ipinfo.io:', { lat, lng, city: data.city });
        return { lat, lng };
      }
    }
  } catch (e) {
    console.log('ipinfo.io failed, trying next fallback...');
  }

  // Try ipapi.co as another fallback
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    if (data.latitude && data.longitude) {
      console.log('IP location from ipapi.co:', { lat: data.latitude, lng: data.longitude, city: data.city });
      return {
        lat: data.latitude,
        lng: data.longitude,
      };
    }
  } catch (e) {
    console.log('ipapi.co failed, trying last fallback...');
  }

  // Last resort: ip-api.com
  try {
    const response = await fetch('http://ip-api.com/json/?fields=lat,lon,status,city');
    const data = await response.json();

    if (data.status === 'success' && data.lat && data.lon) {
      console.log('IP location from ip-api.com:', { lat: data.lat, lng: data.lon, city: data.city });
      return {
        lat: data.lat,
        lng: data.lon,
      };
    }
  } catch (e) {
    console.log('ip-api.com failed');
  }

  throw new Error('All IP geolocation services failed');
}

/**
 * Hook to manage user geolocation
 * 
 * @returns Object with location state and methods to get location
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: false,
    error: null,
    isFromIP: false,
  });

  /**
   * Get user's current location with IP fallback
   * 
   * @param options - Geolocation options
   * @returns Promise that resolves with the location or rejects with error
   */
  const getCurrentLocation = useCallback(
    async (options?: PositionOptions): Promise<LatLng & { isFromIP?: boolean }> => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        isFromIP: false,
      }));

      // Try browser geolocation first
      if (navigator.geolocation) {
        try {
          const location = await new Promise<LatLng>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log('Browser geolocation success:', {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  accuracy: position.coords.accuracy,
                });
                resolve({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              (error) => {
                console.log('Browser geolocation error:', error.code, error.message);
                reject(error);
              },
              {
                enableHighAccuracy: true,
                timeout: 15000, // Give more time for GPS
                maximumAge: 60000, // Accept cached position up to 1 minute old
                ...options,
              }
            );
          });

          setState({
            location,
            loading: false,
            error: null,
            isFromIP: false,
          });

          return { ...location, isFromIP: false };
        } catch (browserError) {
          console.log('Browser geolocation failed, trying IP fallback...', browserError);
        }
      }

      // Fallback to IP-based geolocation
      try {
        const location = await getLocationFromIP();

        setState({
          location,
          loading: false,
          error: null,
          isFromIP: true,
        });

        return { ...location, isFromIP: true };
      } catch (ipError) {
        const errorMessage = 'Could not determine your location. Please enable GPS/location services.';
        setState({
          location: null,
          loading: false,
          error: errorMessage,
          isFromIP: false,
        });
        throw new Error(errorMessage);
      }
    },
    []
  );

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({
      location: null,
      loading: false,
      error: null,
      isFromIP: false,
    });
  }, []);

  return {
    location: state.location,
    loading: state.loading,
    error: state.error,
    isFromIP: state.isFromIP,
    getCurrentLocation,
    clearError,
    reset,
  };
}
