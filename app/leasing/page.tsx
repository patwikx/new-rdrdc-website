'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  Eye,
  FileText,
  KeyRound,
  ArrowUpRight,
  Building2,
  Ruler,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Inquire",
    desc: "Reach out to our leasing team with your space requirements, preferred location, and business profile.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "View",
    desc: "Schedule a private tour of our available properties and explore the spaces that fit your needs.",
    icon: Eye,
  },
  {
    step: "03",
    title: "Propose",
    desc: "Submit your letter of intent and business proposal for review by our leasing committee.",
    icon: FileText,
  },
  {
    step: "04",
    title: "Move In",
    desc: "Sign the lease agreement, begin your fit-out construction, and start operating in your new space.",
    icon: KeyRound,
  },
];

const highlights = [
  {
    icon: Building2,
    stat: "45,000 sqm",
    label: "Total Leasable Area",
    description: "Commercial, retail, and industrial spaces across multiple strategic properties.",
  },
  {
    icon: Ruler,
    stat: "Flexible",
    label: "Space Configurations",
    description: "From compact office suites to large-format retail floors — tailored to your business.",
  },
  {
    icon: ShieldCheck,
    stat: "Since 1985",
    label: "Trusted Operations",
    description: "Nearly four decades of professional property management and tenant partnerships.",
  },
];

export default function LeasingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-20 container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl leading-[0.85] font-bold tracking-tighter mix-blend-difference mb-12">
            LEASING
          </h1>
          <div className="w-full h-[1px] bg-white/20 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div>
              <p className="text-2xl md:text-4xl font-light leading-tight">
                Your journey to the perfect{" "}
                <span className="text-zinc-500">workspace</span> begins here.
              </p>
            </div>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                Simple, transparent, and professional. We make leasing
                straightforward so you can focus on growing your business in
                Mindanao&apos;s most strategic locations.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Highlights */}
      <section className="py-24 border-t border-zinc-900">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-16">
              Why Lease With Us
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <item.icon className="w-6 h-6 text-zinc-600 mb-6 group-hover:text-blue-500 transition-colors duration-300" />
                  <p className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1">
                    {item.stat}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4">
                    {item.label}
                  </p>
                  <p className="text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leasing Process */}
      <section className="py-24 border-t border-zinc-900">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
              How It Works
            </h2>
            <p className="text-2xl md:text-3xl font-light tracking-tight text-white mb-16">
              Four steps to your{" "}
              <span className="font-bold">new address</span>
              <span className="text-blue-500">.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12 space-y-0">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group border-t border-zinc-900 py-12 hover:bg-zinc-900/30 -mx-6 px-6 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] md:w-16 shrink-0">
                      {item.step}
                    </span>
                    <div className="flex items-center gap-4 md:w-72 shrink-0">
                      <item.icon className="w-5 h-5 text-zinc-600 group-hover:text-blue-500 transition-colors duration-300" />
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-zinc-400 md:ml-auto max-w-md leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-zinc-900" />
            </div>
          </div>
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
                Ready to secure{" "}
                <span className="font-bold">your space</span>
                <span className="text-zinc-500 italic">?</span>
              </h2>

              <div className="h-px w-24 bg-blue-500 mx-auto mb-12" />

              <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed mb-16">
                Get in touch with our leasing team to explore available
                properties and find the perfect fit for your business.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  className="bg-white text-black hover:bg-zinc-200 rounded-none h-12 px-12 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
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
