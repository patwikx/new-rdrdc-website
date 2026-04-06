'use client';

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LocationsMapWithList } from "@/components/locations-map-with-list";
import { Button } from "@/components/ui/button";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Footer } from "@/components/footer";
import { TenantTicker } from "@/components/tenant-ticker";
import { SuccessStories } from "@/components/success-stories";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
   return (
      <main className="min-h-screen bg-zinc-950 text-white selection:bg-white selection:text-black">
         <ScrollToTop />
         <Navbar />
         <Hero />

         {/* About / Manifesto Section */}
         <section className="py-24 md:py-40 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
            <div className="container max-w-6xl mx-auto px-6 relative z-10">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
               >
                  <h2 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-16">
                     About The Company
                  </h2>
               </motion.div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  {/* Left: Bold Statement */}
                  <div className="lg:col-span-5">
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                     >
                        <h2 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tighter text-white mb-8">
                           Building the <span className="font-bold">future</span> of
                           Mindanao since <span className="text-zinc-500 italic">1985</span>.
                        </h2>
                        <div className="h-px w-24 bg-blue-500 mb-8" />
                        <p className="text-xl text-zinc-400 font-medium leading-relaxed">
                           The largest property owner and trendsetter in General Santos City&apos;s leasing industry.
                        </p>
                     </motion.div>
                  </div>

                  {/* Right: Company Description */}
                  <div className="lg:col-span-7 space-y-8">
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-zinc-400 text-lg leading-relaxed space-y-6"
                     >
                        <p>
                           <span className="text-white font-semibold">RD REALTY DEVELOPMENT CORPORATION</span> is the property holding firm of the Realty Development Group which was established and registered far earlier dated back <span className="text-white">June 24, 1985</span>. It is the largest property owner and considered as the trendsetter in the leasing industry in General Santos City which today operates a growing inventory of <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">45,000 sqm</span> leasable building spaces across the country and overseas.
                        </p>
                        <p>
                           Since then it grew by having <span className="text-zinc-200">Richmond Builders Ltd.</span> operating in Madang Papua New Guinea and <span className="text-zinc-200">Richmond Land Innovations, Inc.</span> developing La Cassandra Subdivision and La Cassandra Residences, Norfolk Pine, RD City, RD Mall and soon to rise RD Homes.
                        </p>
                     </motion.div>

                     {/* Quick Stats */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-900"
                     >
                        {[
                           { value: "45,000", unit: "sqm", label: "Leasable Space" },
                           { value: "250+", unit: "", label: "Employees" },
                           { value: "28+", unit: "", label: "Properties" },
                        ].map((stat) => (
                           <div key={stat.label}>
                              <p className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
                                 {stat.value}
                                 {stat.unit && <span className="text-base text-zinc-500 font-normal ml-1">{stat.unit}</span>}
                              </p>
                              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mt-1">
                                 {stat.label}
                              </p>
                           </div>
                        ))}
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>

         {/* Tenant Ticker Section */}
         <TenantTicker />

         {/* Interactive Locations Map */}
         <LocationsMapWithList />

         {/* Success Stories Section */}
         <SuccessStories />

         {/* Footer CTA */}
         <section className="py-24 md:py-40 bg-zinc-950 border-t border-zinc-900 overflow-hidden relative">
            <div className="container max-w-6xl mx-auto px-6 relative z-10">
               <div className="max-w-4xl mx-auto text-center">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                  >
                     <h2 className="text-5xl md:text-8xl font-light leading-[1.1] tracking-tighter text-white mb-8">
                        Start your <span className="font-bold">journey</span> in Mindanao&apos;s premier <span className="text-zinc-500 italic">locations</span>.
                     </h2>

                     <div className="h-px w-24 bg-blue-500 mx-auto mb-12" />

                     <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed mb-16">
                        Discover unparalleled <span className="text-white">leasing opportunities</span> tailored to your business needs.
                        Partner with the leader in General Santos City&apos;s leasing industry and secure your strategic address today.
                     </p>

                     <div className="flex items-center justify-center">
                        <Button
                           asChild
                           className="bg-white text-black hover:bg-zinc-200 rounded-none h-12 px-12 md:px-16 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                           <Link href="/contact">
                              Inquire Now
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                           </Link>
                        </Button>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         <Footer />
      </main>
   );
}
