"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import the MapRenderer with no SSR
const MapRenderer = dynamic(() => import("./locations-map-renderer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-900 animate-pulse rounded-3xl flex items-center justify-center">
       <p className="text-zinc-500 uppercase tracking-widest text-sm">Loading Map...</p>
    </div>
  ),
});

export function LocationsMap() {
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
         className="h-[600px] w-full border-t border-white/10"
      >
           <MapRenderer />
      </motion.div>
    </section>
  );
}
