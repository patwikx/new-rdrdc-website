'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase } from "lucide-react";

export default function CareersPage() {
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
            CAREERS
          </h1>
          <div className="w-full h-[1px] bg-white/20 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div>
              <p className="text-2xl md:text-4xl font-light leading-tight">
                Shape the <span className="text-zinc-500">future</span> of
                Mindanao&apos;s real estate landscape with us.
              </p>
            </div>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                We&apos;re always looking for passionate, driven individuals who
                want to make a real impact. Join the team behind General Santos
                City&apos;s largest property portfolio and help us build what&apos;s
                next.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Open Positions — Empty State */}
      <section className="pb-32 container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-12">
            Open Positions
          </h2>

          <div className="py-20 flex flex-col items-center justify-center border border-zinc-900 bg-zinc-900/20">
            <Briefcase className="w-10 h-10 text-zinc-700 mb-6" />
            <p className="text-xl font-bold text-zinc-300 tracking-tight mb-2">
              No openings at this time
            </p>
            <p className="text-sm text-zinc-500 max-w-md text-center">
              We currently don&apos;t have any open positions, but we&apos;re always
              looking for great talent. Send your resume to our HR team and
              we&apos;ll reach out when a role fits.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Why Join Us */}
      <section className="py-32 border-t border-zinc-900">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-light leading-[1.1] tracking-tighter text-white mb-8">
              Why join{" "}
              <span className="font-bold">RD Realty Group</span>
              <span className="font-bold">?</span>
            </h2>
            <div className="h-px w-24 bg-blue-500 mb-16" />

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  label: "Growth",
                  title: "CAREER DEVELOPMENT",
                  description:
                    "We invest in our people with training programs, mentorship, and clear paths for advancement within the RD Group of Companies.",
                },
                {
                  label: "Impact",
                  title: "MEANINGFUL WORK",
                  description:
                    "Contribute to projects that shape communities — from commercial hubs to residential developments across Mindanao and beyond.",
                },
                {
                  label: "Culture",
                  title: "TEAM ENVIRONMENT",
                  description:
                    "Join a team of 250+ professionals who value integrity, innovation, excellence, interdependence, and godliness.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                    {item.label}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
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
                Ready to build{" "}
                <span className="font-bold">your career</span> with{" "}
                <span className="text-zinc-500 italic">us</span>?
              </h2>

              <div className="h-px w-24 bg-blue-500 mx-auto mb-12" />

              <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed mb-16">
                Send your resume and cover letter to our HR team.
                <br />
                We&apos;ll get back to you as soon as a matching opportunity opens.
              </p>

              <a
                href="mailto:hr@rdrealty.com.ph"
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-zinc-200 rounded-none h-12 md:h-12 px-12 md:px-16 text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95"
              >
                hr@rdrealty.com.ph
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
