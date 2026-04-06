'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpRight } from "lucide-react";

export default function ContactPage() {
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
            GET IN TOUCH
          </h1>
          <div className="w-full h-[1px] bg-white/20 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div>
              <p className="text-2xl md:text-4xl font-light leading-tight">
                Start your <span className="text-zinc-500">journey</span> to
                the perfect space with us.
              </p>
            </div>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                Whether you&apos;re looking for commercial, residential, or
                industrial spaces — our leasing team is ready to help you find
                the right fit.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Form + Contact Info */}
      <section className="pb-24 border-t border-zinc-900">
        <div className="container max-w-6xl mx-auto px-6 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left: Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-10">
                  Inquiry Form
                </h2>

                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                        First Name
                      </Label>
                      <Input
                        className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-600 transition-all font-medium"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                        Last Name
                      </Label>
                      <Input
                        className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-600 transition-all font-medium"
                        placeholder="Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                        Email
                      </Label>
                      <Input
                        className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-600 transition-all font-medium"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                        Inquiry Subject
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus:ring-0 focus:border-white transition-all font-medium">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white rounded-none">
                          <SelectItem value="commercial">Commercial Leasing</SelectItem>
                          <SelectItem value="residential">Residential Properties</SelectItem>
                          <SelectItem value="industrial">Industrial Spaces</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                        Phone
                      </Label>
                      <Input
                        className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-600 transition-all font-medium"
                        placeholder="+63 900 000 0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                        Preferred Location
                      </Label>
                      <Input
                        className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-600 transition-all font-medium"
                        placeholder="e.g. Brgy Bula"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                      Message
                    </Label>
                    <Textarea
                      className="bg-transparent border-0 border-b border-zinc-800 rounded-none min-h-[100px] px-0 py-4 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-600 transition-all resize-none font-medium"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <div className="pt-2">
                    <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-12 px-12 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95">
                      Send Message
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Right: Contact Details */}
            <div className="lg:col-span-1" />

            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-12"
              >
                {/* Office */}
                <div>
                  <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                    Location
                  </h3>
                  <div className="border-l-2 border-blue-500 pl-6">
                    <p className="text-lg font-bold text-white mb-2 leading-tight">
                      RD Realty Dev&apos;t Corp.
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                      Cagampang Ext. Brgy Bula,<br />
                      General Santos City, 9500<br />
                      Philippines
                    </p>
                  </div>
                </div>

                {/* Direct Channels */}
                <div>
                  <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                    Channels
                  </h3>
                  <div className="space-y-6 border-l-2 border-zinc-800 pl-6">
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:marketing@rdrealty.com.ph"
                        className="text-base font-bold text-white hover:text-blue-400 transition-colors"
                      >
                        marketing@rdrealty.com.ph
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">
                        Direct Line
                      </p>
                      <p className="text-base font-bold text-white">
                        (083) 552-4435
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div>
                  <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                    Digital Business Card
                  </h3>
                  <div className="p-6 bg-zinc-900/30 border border-zinc-900 flex items-center gap-6 group">
                    <div className="flex-1">
                      <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                        Scan to save our contact details instantly.
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded-none grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src="/XRNB.png" alt="QR Code" className="w-34 h-34" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[550px] border-t border-zinc-900 transition-all duration-1000">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.9!2d125.1807528!3d6.1088039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79fa2a141eaa9%3A0xae033527655cd4a6!2sRD%20Realty%20Development%20Corporation!5e0!3m2!1sen!2sph!4v1703830000000!5m2!1sen!2sph"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </main>
  );
}
