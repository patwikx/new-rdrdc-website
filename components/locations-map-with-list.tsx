"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { QueryProvider } from "@/features/locations-dashboard/providers/QueryProvider";
import { DEFAULT_MAP_CONFIG } from "@/features/locations-dashboard/constants";
import { adaptPropertiesToDashboard } from "@/lib/property-adapter";
import { properties as originalProperties } from "@/lib/data";
import { Search, Navigation2, Route, Loader2, ChevronLeft, ChevronRight, MapPin, Building2, X } from "lucide-react";
import type { Property as DashboardProperty } from "@/features/locations-dashboard/types";
import { PROPERTY_TYPE_LABELS } from "@/features/locations-dashboard/constants";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

// Dynamically import just the Map component with no SSR
const Map = dynamic(
  () => import("@/features/locations-dashboard").then((mod) => ({ default: mod.Map })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-zinc-900 animate-pulse flex items-center justify-center">
        <p className="text-zinc-500 uppercase tracking-widest text-sm">Loading Map...</p>
      </div>
    ),
  }
);

export function LocationsMapWithList() {
  const properties = adaptPropertiesToDashboard();
  const [selectedProperty, setSelectedProperty] = useState<DashboardProperty | null>(null);
  const [routeDestinationId, setRouteDestinationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterByBounds, setFilterByBounds] = useState(false);
  const [mapStyle, setMapStyle] = useState<'street' | 'satellite' | 'hybrid'>('street');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isGeneratingRoute, setIsGeneratingRoute] = useState(false);
  const [viewport, setViewport] = useState({
    center: DEFAULT_MAP_CONFIG.defaultCenter,
    zoom: DEFAULT_MAP_CONFIG.defaultZoom,
    bounds: {
      north: DEFAULT_MAP_CONFIG.defaultCenter.lat + 0.1,
      south: DEFAULT_MAP_CONFIG.defaultCenter.lat - 0.1,
      east: DEFAULT_MAP_CONFIG.defaultCenter.lng + 0.1,
      west: DEFAULT_MAP_CONFIG.defaultCenter.lng - 0.1,
    },
  });

  // Filter properties based on current map bounds
  const filteredProperties = useMemo(() => {
    if (!filterByBounds) return properties;

    return properties.filter((property) => {
      const { lat, lng } = property.coordinates;
      return (
        lat >= viewport.bounds.south &&
        lat <= viewport.bounds.north &&
        lng >= viewport.bounds.west &&
        lng <= viewport.bounds.east
      );
    });
  }, [properties, viewport.bounds, filterByBounds]);

  // Handle search - geocode the location and pan map
  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilterByBounds(false);
      return;
    }

    setIsSearching(true);
    try {
      // Use Nominatim for geocoding (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        // Calculate bounds from bounding box if available
        let newBounds;
        if (result.boundingbox) {
          newBounds = {
            south: parseFloat(result.boundingbox[0]),
            north: parseFloat(result.boundingbox[1]),
            west: parseFloat(result.boundingbox[2]),
            east: parseFloat(result.boundingbox[3]),
          };
        } else {
          // Default bounds around the point
          newBounds = {
            north: lat + 0.05,
            south: lat - 0.05,
            east: lng + 0.05,
            west: lng - 0.05,
          };
        }

        setViewport({
          center: { lat, lng },
          zoom: 12,
          bounds: newBounds,
        });
        setFilterByBounds(true);
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Handle viewport change from map
  const handleViewportChange = useCallback((newViewport: typeof viewport) => {
    setViewport(newViewport);
  }, []);

  // Clear search and show all properties
  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setFilterByBounds(false);
  }, []);

  const handlePropertyClick = (property: DashboardProperty) => {
    setSelectedProperty(property);
    setRouteDestinationId(null); // Clear any existing route
    // Zoom to the property location
    setViewport({
      center: property.coordinates,
      zoom: 16,
      bounds: {
        north: property.coordinates.lat + 0.005,
        south: property.coordinates.lat - 0.005,
        east: property.coordinates.lng + 0.005,
        west: property.coordinates.lng - 0.005,
      },
    });
  };

  const handleGenerateRoute = (property: DashboardProperty) => {
    // Set loading state and trigger route generation
    setIsGeneratingRoute(true);
    setRouteDestinationId(property.id);

    // Clear loading state after a reasonable time
    // The actual route generation happens in MapLibre component
    setTimeout(() => {
      setIsGeneratingRoute(false);
    }, 5000);
  };

  // Get badge color based on property type
  const getPropertyTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'residential':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'commercial':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'land':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      default:
        return 'bg-zinc-500/20 text-zinc-300 border-zinc-400/30';
    }
  };

  return (
    <section className="bg-zinc-950 text-white pt-24 pb-0 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
          >
            OUR PROPERTIES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-zinc-500 text-xl"
          >
            Explore our portfolio of premier properties across the region.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-[800px] w-full border-t border-zinc-800 relative overflow-hidden"
      >
        {/* Map - Full Width */}
        <div className="absolute inset-0">
          <QueryProvider>
            <Map
              properties={properties}
              viewport={viewport}
              onViewportChange={handleViewportChange}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
              mapStyle={mapStyle}
              onStyleChange={setMapStyle}
              routeDestinationId={routeDestinationId}
            />
          </QueryProvider>
        </div>

        {/* Floating Property List Panel - Left Side */}
        <AnimatePresence mode="wait">
          {sidebarCollapsed ? (
            /* Collapsed Icon Sidebar */
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-4 top-20 bottom-4 w-14 z-40 flex flex-col gap-2"
            >
              {/* Expand Button */}
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="w-14 h-14 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center hover:bg-black hover:scale-105 transition-all duration-200 group"
                title="Show property list"
              >
                <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </button>

              {/* Property Icons */}
              <div className="flex-1 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent p-2 space-y-1">
                  <TooltipProvider delayDuration={100}>
                    {filteredProperties.slice(0, 15).map((property) => {
                      const isSelected = selectedProperty?.id === property.id;
                      return (
                        <Tooltip key={property.id}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handlePropertyClick(property)}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${isSelected
                                ? 'bg-blue-500/30 border border-blue-400/50 scale-110'
                                : 'bg-zinc-900/50 border border-zinc-800/60 hover:bg-zinc-800/70 hover:scale-105'
                                }`}
                            >
                              {property.type === 'commercial' ? (
                                <Building2 className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-400'}`} />
                              ) : (
                                <MapPin className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-400'}`} />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="bg-zinc-900 text-white border border-zinc-700 max-w-[200px]">
                            <p className="font-medium text-sm">{property.title}</p>
                            <p className="text-zinc-400 text-xs">{property.address}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                  {filteredProperties.length > 15 && (
                    <div className="text-center py-2">
                      <span className="text-[10px] text-zinc-500">+{filteredProperties.length - 15}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Expanded Sidebar */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-4 top-20 bottom-4 w-80 z-40 flex flex-col gap-3"
            >
              {/* Header Card */}
              <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white">
                      {filterByBounds ? 'Properties in View' : 'All Properties'}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {filteredProperties.length} of {properties.length} properties
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {filterByBounds && (
                      <button
                        onClick={handleClearSearch}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs text-zinc-300 hover:text-white transition-all duration-200"
                      >
                        Show All
                      </button>
                    )}
                    <button
                      onClick={() => setSidebarCollapsed(true)}
                      className="w-8 h-8 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 flex items-center justify-center transition-all duration-200 group"
                      title="Collapse sidebar"
                    >
                      <ChevronLeft className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative">
                  {isSearching ? (
                    <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 animate-spin" />
                  ) : (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  )}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search location (e.g. Manila, Cebu)..."
                    className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </form>
              </div>

              {/* Selected Property Detail Card */}
              <AnimatePresence>
                {selectedProperty && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-500/30 overflow-hidden">
                      {/* Close Button */}
                      <button
                        onClick={() => {
                          setSelectedProperty(null);
                          setRouteDestinationId(null);
                        }}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-all"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>

                      {/* Property Image */}
                      {(() => {
                        const originalIndex = properties.findIndex(p => p.id === selectedProperty.id);
                        const originalProp = originalProperties[originalIndex];
                        return originalProp?.images && originalProp.images.length > 0 && (
                          <div className="relative w-full h-40 overflow-hidden">
                            <img
                              src={originalProp.images[0]}
                              alt={selectedProperty.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <span className={`absolute bottom-3 left-3 px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide border ${getPropertyTypeBadgeColor(selectedProperty.type)}`}>
                              {PROPERTY_TYPE_LABELS[selectedProperty.type]}
                            </span>
                          </div>
                        );
                      })()}

                      {/* Property Details */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight mb-1">
                            {selectedProperty.title}
                          </h3>
                          <p className="text-xs text-zinc-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {selectedProperty.address}
                          </p>
                        </div>

                        {/* Specs */}
                        {(() => {
                          const originalIndex = properties.findIndex(p => p.id === selectedProperty.id);
                          const originalProp = originalProperties[originalIndex];
                          return originalProp && (
                            <div className="flex items-center gap-2 py-2 border-y border-zinc-800">
                              <span className="text-[10px] text-zinc-500 uppercase">Area:</span>
                              <span className="text-sm font-semibold text-white">{originalProp.specs.sqm}</span>
                            </div>
                          );
                        })()}

                        {/* Description */}
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {selectedProperty.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleGenerateRoute(selectedProperty)}
                            disabled={isGeneratingRoute}
                            className={`flex-1 flex items-center justify-center gap-2 text-white rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${isGeneratingRoute
                              ? 'bg-blue-500/70 cursor-wait'
                              : 'bg-blue-500 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]'
                              }`}
                          >
                            {isGeneratingRoute ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Getting Location...
                              </>
                            ) : (
                              <>
                                <Route className="w-3.5 h-3.5" />
                                Get Directions
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Properties List - Scrollable */}
              <div
                className="flex-1 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                onWheel={(e) => e.stopPropagation()}
              >
                <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                  <div className="p-2 space-y-2">
                    {isSearching ? (
                      /* Loading Skeleton */
                      <>
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-full p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60 animate-pulse"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-14 h-14 rounded-lg bg-zinc-700/50 flex-shrink-0" />
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-zinc-700/50 rounded w-3/4" />
                                <div className="h-3 bg-zinc-700/50 rounded w-1/2" />
                                <div className="flex gap-2">
                                  <div className="h-4 bg-zinc-700/50 rounded w-16" />
                                  <div className="h-4 bg-zinc-700/50 rounded w-12" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : filteredProperties.length === 0 ? (
                      <div className="text-center py-8 text-zinc-400">
                        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No properties found in this area</p>
                        <button
                          onClick={handleClearSearch}
                          className="mt-2 text-xs text-blue-400 hover:text-blue-300"
                        >
                          Show all properties
                        </button>
                      </div>
                    ) : (
                      filteredProperties.map((property) => {
                        const originalIndex = properties.findIndex(p => p.id === property.id);
                        const originalProp = originalProperties[originalIndex];
                        const isSelected = selectedProperty?.id === property.id;

                        return (
                          <button
                            key={property.id}
                            onClick={() => handlePropertyClick(property)}
                            className={`w-full p-3 text-left rounded-xl transition-all duration-200 group ${isSelected
                              ? 'bg-blue-500/25 border border-blue-400/40 shadow-lg shadow-blue-500/20'
                              : 'bg-zinc-900/50 border border-zinc-800/60 hover:bg-zinc-800/70 hover:border-zinc-700 hover:shadow-lg'
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Thumbnail */}
                              {originalProp?.images && originalProp.images.length > 0 && (
                                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={originalProp.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h4 className={`text-sm font-semibold leading-tight line-clamp-1 transition-colors ${isSelected ? 'text-white' : 'text-zinc-100 group-hover:text-white'
                                    }`}>
                                    {property.title}
                                  </h4>
                                </div>
                                <p className={`text-xs mb-1 line-clamp-1 transition-colors ${isSelected ? 'text-zinc-200' : 'text-zinc-400 group-hover:text-zinc-300'
                                  }`}>
                                  {property.address}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide border ${getPropertyTypeBadgeColor(property.type)}`}>
                                    {PROPERTY_TYPE_LABELS[property.type]}
                                  </span>
                                  <span className="text-[10px] text-zinc-500">
                                    {originalProp?.specs.sqm || 'N/A'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
