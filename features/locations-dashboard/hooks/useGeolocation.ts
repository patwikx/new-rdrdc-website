/**
 * useGeolocation Hook - Manage user location with Geolocation API
 * 
 * This hook provides functionality to:
 * - Get user's current location
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
 * Hook to manage user geolocation
 * 
 * @returns Object with location state and methods to get location
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: false,
    error: null,
  });

  /**
   * Get user's current location
   * 
   * @param options - Geolocation options
   * @returns Promise that resolves with the location or rejects with error
   */
  const getCurrentLocation = useCallback(
    (options?: PositionOptions): Promise<LatLng> => {
      return new Promise((resolve, reject) => {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
          const error = 'Geolocation is not supported by your browser';
          setState({
            location: null,
            loading: false,
            error,
          });
          reject(new Error(error));
          return;
        }

        setState((prev) => ({
          ...prev,
          loading: true,
          error: null,
        }));

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: LatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            setState({
              location,
              loading: false,
              error: null,
            });

            resolve(location);
          },
          (error) => {
            let errorMessage: string;
            let errorType: GeolocationErrorType;

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Location access denied. Please enable location permissions.';
                errorType = 'permission_denied';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information unavailable.';
                errorType = 'position_unavailable';
                break;
              case error.TIMEOUT:
                errorMessage = 'Location request timed out.';
                errorType = 'timeout';
                break;
              default:
                errorMessage = 'An unknown error occurred while getting location.';
                errorType = 'unknown';
            }

            setState({
              location: null,
              loading: false,
              error: errorMessage,
            });

            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            ...options,
          }
        );
      });
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
    });
  }, []);

  return {
    location: state.location,
    loading: state.loading,
    error: state.error,
    getCurrentLocation,
    clearError,
    reset,
  };
}
