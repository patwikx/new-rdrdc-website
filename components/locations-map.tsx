"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { QueryProvider } from "@/features/locations-dashboard/providers/QueryProvider";
import { DEFAULT_MAP_CONFIG } from "@/features/locations-dashboard/constants";
import { adaptPropertiesToDashboard } from "@/lib/property-adapter";

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

export function LocationsMap() {
  const properties = adaptPropertiesToDashboard();

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
            OUR LOCATIONS
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
        className="h-[800px] w-full border-t border-white/10"
      >
        <QueryProvider>
          <Map
            properties={properties}
            viewport={{
              center: DEFAULT_MAP_CONFIG.defaultCenter,
              zoom: DEFAULT_MAP_CONFIG.defaultZoom,
              bounds: {
                north: DEFAULT_MAP_CONFIG.defaultCenter.lat + 0.1,
                south: DEFAULT_MAP_CONFIG.defaultCenter.lat - 0.1,
                east: DEFAULT_MAP_CONFIG.defaultCenter.lng + 0.1,
                west: DEFAULT_MAP_CONFIG.defaultCenter.lng - 0.1,
              },
            }}
            onViewportChange={() => {}}
            selectedProperty={null}
            onPropertySelect={() => {}}
            mapStyle="street"
            onStyleChange={() => {}}
          />
        </QueryProvider>
      </motion.div>
    </section>
  );
}
