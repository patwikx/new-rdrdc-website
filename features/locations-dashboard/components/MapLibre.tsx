'use client';

/**
 * MapLibre Component - MapLibre GL based map (replacing Leaflet)
 * 
 * This component provides map functionality using MapLibre GL including:
 * - Vector-based map rendering
 * - Multiple map styles (street, satellite, hybrid)
 * - Custom markers with popups
 * - Route rendering
 * - Map controls
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapComponentProps, Property } from '../types';
import { DEFAULT_MAP_CONFIG, PROPERTY_TYPE_LABELS } from '../constants';
import { MapControls } from './MapControls';
import { useFullscreen } from '../hooks/useFullscreen';
import { useGeolocation } from '../hooks/useGeolocation';

const MAP_STYLES = {
  street: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  satellite: 'https://tiles.stadiamaps.com/styles/alidade_satellite.json',
  hybrid: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
};

/**
 * Get property type color
 */
function getPropertyTypeColor(type: string): string {
  switch (type) {
    case 'residential':
      return '#3b82f6'; // blue-500
    case 'commercial':
      return '#8b5cf6'; // violet-500
    case 'land':
      return '#10b981'; // emerald-500
    default:
      return '#6b7280'; // gray-500
  }
}

/**
 * MapLibre GL Component
 */
export function MapLibre({
  properties,
  viewport,
  onViewportChange,
  selectedProperty,
  onPropertySelect,
  mapStyle,
  onStyleChange,
  routeDestinationId,
}: MapComponentProps & { routeDestinationId?: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const isAnimatingRef = useRef(false);
  const initialFitDoneRef = useRef(false);
  const [isClient, setIsClient] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Store route data to persist across style changes
  const routeDataRef = useRef<{
    coordinates: [number, number][];
    bounds: maplibregl.LngLatBounds;
  } | null>(null);

  // Fullscreen management
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  // Geolocation management
  const { getCurrentLocation } = useGeolocation();

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get user location on mount
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const location = await getCurrentLocation();
        if (location) {
          setUserLocation(location);
        }
      } catch (error) {
        console.error('Failed to get user location:', error);
        // Fallback to default location
        setUserLocation(DEFAULT_MAP_CONFIG.defaultCenter);
      }
    };

    getUserLocation();
  }, [getCurrentLocation]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current || !isClient) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLES[mapStyle],
      center: [viewport.center.lng, viewport.center.lat],
      zoom: viewport.zoom,
      minZoom: DEFAULT_MAP_CONFIG.minZoom,
      maxZoom: DEFAULT_MAP_CONFIG.maxZoom,
      attributionControl: false,
      scrollZoom: false, // Disable default scroll zoom
    });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-right'
    );

    map.on('moveend', () => {
      if (isAnimatingRef.current) {
        isAnimatingRef.current = false;
        return;
      }
      const center = map.getCenter();
      const zoom = map.getZoom();
      const bounds = map.getBounds();

      onViewportChange({
        center: { lat: center.lat, lng: center.lng },
        zoom,
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        },
      });
    });

    // Set map as loaded when ready
    map.on('load', () => {
      setMapLoaded(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [isClient]);

  // Custom Ctrl+Scroll zoom behavior
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !mapRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      // Only zoom if Ctrl (or Cmd on Mac) is pressed
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        const map = mapRef.current;
        if (!map) return;

        // Calculate zoom delta - normalize scroll speed for natural zooming
        // Trackpads produce smaller deltaY values, so we use a higher multiplier
        const zoomSpeed = 0.05;
        const delta = -e.deltaY * zoomSpeed;
        const currentZoom = map.getZoom();
        const newZoom = Math.max(
          DEFAULT_MAP_CONFIG.minZoom,
          Math.min(DEFAULT_MAP_CONFIG.maxZoom, currentZoom + delta)
        );

        map.zoomTo(newZoom, { duration: 150 });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isClient]);

  // Update map style
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(MAP_STYLES[mapStyle]);
  }, [mapStyle]);

  // Render user location marker
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
      return;
    }

    const el = document.createElement('div');
    el.innerHTML = `
      <div style="position: relative;">
        <div style="width: 16px; height: 16px; border-radius: 50%; background: #3b82f6; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
        <div style="position: absolute; inset: 0; width: 16px; height: 16px; border-radius: 50%; background: rgba(59, 130, 246, 0.5); animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      </div>
    `;

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(mapRef.current);

    userMarkerRef.current = marker;
  }, [userLocation]);

  // Create popup HTML (memoized to prevent unnecessary recreations)
  const createPopupHTML = useCallback((property: Property) => {
    // Get badge color based on property type
    const getBadgeColor = (type: string) => {
      switch (type) {
        case 'residential':
          return 'background: rgba(59, 130, 246, 0.2); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.3);';
        case 'commercial':
          return 'background: rgba(139, 92, 246, 0.2); color: #c4b5fd; border: 1px solid rgba(139, 92, 246, 0.3);';
        case 'land':
          return 'background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3);';
        default:
          return 'background: rgba(107, 114, 128, 0.2); color: #d4d4d8; border: 1px solid rgba(107, 114, 128, 0.3);';
      }
    };

    return `
      <div class="location-popup" style="min-width: 220px; max-width: 280px; padding: 12px; color: #fff;">
        <div class="popup-header" style="margin-bottom: 2px;">
          <div class="popup-title-section">
            <h3 style="font-size: 14px; font-weight: 700; color: #fff; margin: 0 0 2px 0; line-height: 1.3;">${property.title}</h3>
          </div>
        </div>
        
        <p style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: #a1a1aa; margin-bottom: 8px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${property.address}
        </p>
        
        <div style="display: flex; align-items: center; justify-content: flex-end; font-size: 10px;">
          <span style="color: #71717a;">Listed ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    `;
  }, []);

  // Update markers - only when properties or selection changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Add new markers
    properties.forEach((property) => {
      const color = getPropertyTypeColor(property.type);
      const isSelected = selectedProperty?.id === property.id;

      // Create marker element
      const el = document.createElement('div');
      el.className = 'marker-container';
      el.style.cursor = 'pointer';
      el.innerHTML = `
        <div class="marker-inner" style="position: relative; transition: transform 0.2s; transform-origin: center bottom; ${isSelected ? 'transform: scale(1.25);' : ''}">
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.164 0 0 7.164 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.164 24.836 0 16 0Z" fill="${isSelected ? '#3b82f6' : color}"/>
            <circle cx="16" cy="14" r="6" fill="white"/>
          </svg>
          ${isSelected ? '<div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 16px; height: 16px; border-radius: 50%; background: rgba(59, 130, 246, 0.3); animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
        </div>
      `;

      // Get the inner marker element for hover effects
      const markerInner = el.querySelector('.marker-inner') as HTMLElement;

      let hoverTimeout: NodeJS.Timeout | null = null;

      // Add hover effect
      el.addEventListener('mouseenter', () => {
        if (!isSelected && markerInner) {
          markerInner.style.transform = 'scale(1.1)';
        }

        // Clear any existing timeout
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          hoverTimeout = null;
        }

        // Show popup on hover
        if (popupRef.current) {
          popupRef.current.remove();
        }

        const popup = new maplibregl.Popup({
          offset: [0, -35],
          closeButton: false,
          closeOnClick: false,
          className: 'property-hover-popup',
          maxWidth: '280px',
        })
          .setLngLat([property.coordinates.lng, property.coordinates.lat])
          .setHTML(createPopupHTML(property))
          .addTo(mapRef.current!);

        popupRef.current = popup;
      });

      el.addEventListener('mouseleave', () => {
        if (!isSelected && markerInner) {
          markerInner.style.transform = 'scale(1)';
        }

        // Remove popup after delay
        hoverTimeout = setTimeout(() => {
          if (popupRef.current) {
            popupRef.current.remove();
            popupRef.current = null;
          }
        }, 150);
      });

      // Click handler
      el.addEventListener('click', () => {
        onPropertySelect(property);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([property.coordinates.lng, property.coordinates.lat])
        .addTo(mapRef.current!);

      markersRef.current.set(property.id, marker);
    });

    // Fit bounds to show all properties on initial load
    if (!initialFitDoneRef.current && properties.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      properties.forEach((property) => {
        bounds.extend([property.coordinates.lng, property.coordinates.lat]);
      });

      isAnimatingRef.current = true;
      mapRef.current.fitBounds(bounds, {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        maxZoom: 14, // Don't zoom in too close even if properties are clustered
      });
      initialFitDoneRef.current = true;
    }
  }, [properties, selectedProperty?.id, createPopupHTML, onPropertySelect, mapLoaded]);

  // Draw route on map
  const drawRoute = useCallback((map: maplibregl.Map, coordinates: [number, number][]) => {
    if (map.getLayer('route-line')) map.removeLayer('route-line');
    if (map.getLayer('route-line-outline')) map.removeLayer('route-line-outline');
    if (map.getSource('route')) map.removeSource('route');

    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      },
    });

    map.addLayer({
      id: 'route-line-outline',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#1d4ed8',
        'line-width': 8,
        'line-opacity': 0.4,
      },
    });

    map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 4,
        'line-opacity': 1,
      },
    });
  }, []);

  // Fetch and render route from OSRM
  useEffect(() => {
    if (!routeDestinationId || !userLocation) {
      routeDataRef.current = null;
      return;
    }

    const destination = properties.find((p) => p.id === routeDestinationId);
    if (!destination) {
      routeDataRef.current = null;
      return;
    }

    const fetchRoute = async () => {
      const start = `${userLocation.lng},${userLocation.lat}`;
      const end = `${destination.coordinates.lng},${destination.coordinates.lat}`;

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          const coordinates = data.routes[0].geometry.coordinates as [number, number][];
          const bounds = new maplibregl.LngLatBounds();
          bounds.extend([userLocation.lng, userLocation.lat]);
          bounds.extend([destination.coordinates.lng, destination.coordinates.lat]);
          coordinates.forEach((coord) => bounds.extend(coord));

          routeDataRef.current = { coordinates, bounds };

          const map = mapRef.current;
          if (map) {
            drawRoute(map, coordinates);
            isAnimatingRef.current = true;
            map.fitBounds(bounds, { padding: 80 });
          }
        }
      } catch (error) {
        console.error('Failed to fetch route:', error);
      }
    };

    fetchRoute();
  }, [routeDestinationId, userLocation, properties, drawRoute]);

  // Clear route when destination is removed
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const clearRoute = () => {
      if (map.getLayer('route-line')) map.removeLayer('route-line');
      if (map.getLayer('route-line-outline')) map.removeLayer('route-line-outline');
      if (map.getSource('route')) map.removeSource('route');
    };

    if (!routeDestinationId) {
      clearRoute();
    }
  }, [routeDestinationId]);

  // Restore route after style change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleStyleLoad = () => {
      if (routeDataRef.current && routeDestinationId) {
        drawRoute(map, routeDataRef.current.coordinates);
      }
    };

    map.on('style.load', handleStyleLoad);

    return () => {
      map.off('style.load', handleStyleLoad);
    };
  }, [drawRoute, routeDestinationId]);

  // Handle viewport changes
  useEffect(() => {
    if (!mapRef.current) return;

    isAnimatingRef.current = true;
    mapRef.current.flyTo({
      center: [viewport.center.lng, viewport.center.lat],
      zoom: viewport.zoom,
      essential: true,
    });
  }, [viewport.center.lat, viewport.center.lng, viewport.zoom]);

  /**
   * Handle zoom in
   */
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  /**
   * Handle zoom out
   */
  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  /**
   * Handle reset view to default
   */
  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [DEFAULT_MAP_CONFIG.defaultCenter.lng, DEFAULT_MAP_CONFIG.defaultCenter.lat],
        zoom: DEFAULT_MAP_CONFIG.defaultZoom,
        essential: true,
      });
    }
  };

  /**
   * Handle map style toggle
   */
  const handleToggleStyle = () => {
    const styles: Array<'street' | 'satellite' | 'hybrid'> = ['street', 'satellite', 'hybrid'];
    const currentIndex = styles.indexOf(mapStyle);
    const nextIndex = (currentIndex + 1) % styles.length;
    onStyleChange(styles[nextIndex]);
  };

  /**
   * Handle user location centering
   */
  const handleLocateUser = async () => {
    try {
      const location = await getCurrentLocation();
      if (mapRef.current && location) {
        mapRef.current.flyTo({
          center: [location.lng, location.lat],
          zoom: 15,
          essential: true,
        });
      }
    } catch (error) {
      console.error('Failed to get user location:', error);
    }
  };

  // Don't render map on server side
  if (!isClient) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Enhanced Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onToggleFullscreen={toggleFullscreen}
        onToggleStyle={handleToggleStyle}
        onLocateUser={handleLocateUser}
        fullscreenActive={isFullscreen}
        currentStyle={mapStyle}
      />

      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .property-hover-popup .maplibregl-popup-content {
          background: rgba(24, 24, 27, 0.98);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .property-hover-popup .maplibregl-popup-tip {
          border-top-color: rgba(24, 24, 27, 0.98);
        }
      `}</style>
    </div>
  );
}
