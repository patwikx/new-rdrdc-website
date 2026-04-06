'use client';

import { properties } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { notFound, useParams } from "next/navigation";
import { PropertyHero } from "@/components/property-hero";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export default function PropertySlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      <PropertyHero
        images={property.images}
        category={property.category}
        name={property.name}
        location={property.location}
      />

      {/* Breadcrumb */}
      <div className="border-b border-zinc-900">
        <div className="container max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]">
            <Link href="/properties" className="text-zinc-500 hover:text-white transition-colors">
              Properties
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-700" />
            <span className="text-zinc-300">{property.name}</span>
          </nav>
        </div>
      </div>

      {/* Content Grid */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left: Description & Features */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Overview */}
                <div className="mb-16">
                  <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                    Overview
                  </h3>
                  <p className="text-xl text-zinc-400 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-16">
                  <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                    Building Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {property.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 py-3 border-b border-zinc-900"
                      >
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full shrink-0" />
                        <span className="text-zinc-300 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Units */}
                {property.availableUnits.length > 0 && (
                  <div className="mb-16">
                    <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                      Available Spaces
                    </h3>
                    <div className="w-full overflow-x-auto border border-zinc-900">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-zinc-900 bg-zinc-900/50">
                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                              Unit
                            </th>
                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                              Size
                            </th>
                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                              Type
                            </th>
                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                              Status
                            </th>
                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 text-right">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {property.availableUnits.map((unit) => (
                            <tr
                              key={unit.id}
                              className="group border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors"
                            >
                              <td className="py-5 px-6 font-medium text-white">
                                {unit.name}
                              </td>
                              <td className="py-5 px-6 text-zinc-400">
                                {unit.size}
                              </td>
                              <td className="py-5 px-6 text-zinc-400">
                                {unit.type}
                              </td>
                              <td className="py-5 px-6">
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                    unit.status === "Available"
                                      ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                                      : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                                  }`}
                                >
                                  {unit.status}
                                </span>
                              </td>
                              <td className="py-5 px-6 text-right">
                                <Link
                                  href="/contact"
                                  className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-1"
                                >
                                  Inquire
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Location Map */}
                <div>
                  <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                    Location
                  </h3>
                  <div className="h-[400px] w-full bg-zinc-900 border border-zinc-900 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                    <iframe
                      src={property.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Quick Specs Sticky */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div className="sticky top-32 space-y-8">
                  <div className="border border-zinc-900 bg-zinc-900/20 p-8">
                    <h4 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">
                      Property Data
                    </h4>

                    <div className="space-y-0">
                      {[
                        { label: "Total Area", value: property.specs.sqm },
                        { label: "Floors", value: property.specs.floors },
                        { label: "Parking", value: property.specs.parking },
                        {
                          label: "Completion",
                          value: property.specs.completion,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex justify-between items-center py-4 border-b border-zinc-800/50"
                        >
                          <span className="text-zinc-500 text-sm">
                            {item.label}
                          </span>
                          <span className="font-bold text-white text-sm">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      className="w-full mt-8 bg-white text-black hover:bg-zinc-200 rounded-none h-12 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-95"
                    >
                      <Link href="/contact">
                        Schedule Viewing
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
