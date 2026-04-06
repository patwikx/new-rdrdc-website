'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      {/* Editorial Header */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-20 container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl leading-[0.85] font-bold tracking-tighter mix-blend-difference mb-12">
            WHO WE ARE
          </h1>
          <div className="w-full h-[1px] bg-white/20 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div>
              <p className="text-2xl md:text-4xl font-light leading-tight">
                We are the architects of{" "}
                <span className="text-zinc-500">commerce</span>. Building the
                stage for Mindanao&apos;s next generation of business leaders.
              </p>
            </div>
            <div className="space-y-8 text-zinc-400 text-lg leading-relaxed">
              <p>
                RD Realty Development Corporation is a member of RD Group of
                Companies that engaged in the development of real estate
                projects, property management, and construction of many of the
                company&apos;s future developments. It has grown into a very
                integrated company providing employment to over 250 people.
              </p>
              <p>
                It is the largest property owner and considered as the
                trendsetter in the leasing industry in General Santos City which
                today operates a growing inventory of 45,000 sqm leasable
                building spaces across the country and overseas.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Affiliation */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
          >
            <div className="md:col-span-4">
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                Affiliation
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                RD Group of Companies
              </h2>
            </div>
            <div className="md:col-span-8 text-zinc-400 text-lg leading-relaxed">
              <p>
                RD Realty Development Corporation was established &amp; registered
                on{" "}
                <span className="text-white font-semibold">June 24, 1985</span>{" "}
                and is one of the subsidiaries of the RD Group of Companies
                under the management and direction of{" "}
                <span className="text-white font-semibold">
                  Mr. Roy C. Rivera
                </span>
                . Since then it grew by having{" "}
                <span className="text-zinc-300">Richmond Builders Ltd.</span>{" "}
                operating in Madang Papua New Guinea and{" "}
                <span className="text-zinc-300">
                  Richmond Land Innovations, Inc.
                </span>{" "}
                developing La Cassandra Subdivision, La Cassandra Residences,
                Norfolk Pine, RD City, RD Mall and soon to rise RD Homes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Break — Team Photo */}
      <section className="h-[80vh] w-full bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCVzlko3wVNRBlKFcok7yYQhSWTa5MeEtJXLsOU')] bg-cover bg-bottom" />
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-32 border-t border-zinc-900">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-16">
              Our Foundation
            </h2>

            <div className="grid md:grid-cols-3 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  MISSION
                </h3>
                <div className="h-px w-12 bg-blue-500" />
                <p className="text-zinc-400 leading-relaxed">
                  We are committed to a sustainable and profitable real estate
                  development and business transactions through fostering a
                  mutually beneficial relationship with our stakeholders. We aim
                  to uplift the quality of life of the communities where we
                  operate and glorify God in everything we do.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  VISION
                </h3>
                <div className="h-px w-12 bg-blue-500" />
                <p className="text-zinc-400 leading-relaxed">
                  A diversified real estate company delivering maximum value to
                  customers and stockholders guided by the highest ethical
                  standards of practice and strong faith in God.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  CORE VALUES
                </h3>
                <div className="h-px w-12 bg-blue-500" />
                <ul className="space-y-4 text-zinc-400">
                  {[
                    "Integrity",
                    "Innovation",
                    "Excellence",
                    "Interdependence",
                    "Godliness",
                  ].map((value) => (
                    <li key={value} className="flex items-center gap-4">
                      <span className="h-px w-6 bg-zinc-600" />
                      <span className="font-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
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
                Partner with{" "}
                <span className="font-bold">Mindanao&apos;s</span> leading{" "}
                <span className="text-zinc-500 italic">real estate group.</span>.
              </h2>

              <div className="h-px w-24 bg-blue-500 mx-auto mb-12" />

              <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed mb-16">
                Whether you&apos;re looking for a strategic leasing address or
                exploring investment opportunities, we&apos;re ready to talk.
              </p>

              <div className="flex items-center justify-center">
                <Button
                  asChild
                  className="bg-white text-black hover:bg-zinc-200 rounded-none h-12 px-12 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Link href="/contact">
                    Get In Touch
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
