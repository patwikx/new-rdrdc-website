'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { properties } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { MapPin, ArrowUpRight, Building2 } from "lucide-react";

export default function PropertiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(properties.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return properties;
    return properties.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-16 container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl leading-[0.85] font-bold tracking-tighter mix-blend-difference mb-12">
            PROPERTIES
          </h1>
          <div className="w-full h-[1px] bg-white/20 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div>
              <p className="text-2xl md:text-4xl font-light leading-tight">
                Explore our{" "}
                <span className="text-zinc-500">portfolio</span> across
                Mindanao and beyond.
              </p>
            </div>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                From flagship commercial hubs to master-planned townships and
                residential communities — discover the spaces that define
                General Santos City&apos;s growth.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Category Filter + Count */}
      <section className="container max-w-6xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            {filtered.length} {filtered.length === 1 ? "Property" : "Properties"}
          </p>
        </motion.div>
      </section>

      {/* Properties Grid */}
      <section className="pb-32 container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filtered.map((prop, i) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.5) }}
              className={i % 2 === 1 ? "md:mt-12" : ""}
            >
              <Link
                href={`/properties/${prop.slug}`}
                className="group relative aspect-[4/5] bg-zinc-900 overflow-hidden block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-50"
                  style={{ backgroundImage: `url(${prop.images[0]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  {/* Top: Category + Specs */}
                  <div className="flex justify-between items-start">
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
                      {prop.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {prop.specs.sqm}
                    </span>
                  </div>

                  {/* Bottom: Name + Location */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {prop.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-1.5 text-zinc-400 text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        {prop.location}
                      </p>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
