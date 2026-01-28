'use client';

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
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-zinc-950 text-white font-sans selection:bg-blue-500 selection:text-white">

      {/* Above the fold: Combined Header, Form and Info */}
      <section className="pt-24 pb-16 px-6 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left: Branding & Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-10"
              >
                <h3 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                  Secure Your Space
                </h3>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-8">
                  <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-[0.85] uppercase">
                    Get in <br className="hidden md:block" /> Touch<span className="text-blue-500">.</span>
                  </h1>
                  <div className="flex-1 md:text-right md:pt-1">
                    <p className="text-4xl md:text-[5.5rem] font-light tracking-tighter leading-[0.85] uppercase text-zinc-600">
                      Start your <br className="hidden md:block" /> <span className="text-white font-bold">Journey</span><span className="text-zinc-500 italic">.</span>
                    </p>
                  </div>
                </div>
                <div className="h-px w-full bg-zinc-900 border-b border-zinc-900" />
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white block">First Name</Label>
                    <Input
                      className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-700 transition-all font-medium"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white block">Last Name</Label>
                    <Input
                      className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-700 transition-all font-medium"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white block">Email</Label>
                    <Input
                      className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-700 transition-all font-medium"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white block">Inquiry Subject</Label>
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
                    <Label className="text-xs font-bold uppercase tracking-widest text-white block">Phone</Label>
                    <Input
                      className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-700 transition-all font-medium"
                      placeholder="+63 900 000 0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white block">Preferred Location</Label>
                    <Input
                      className="bg-transparent border-0 border-b border-zinc-800 rounded-none h-10 px-0 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-700 transition-all font-medium"
                      placeholder="e.g. Brgy Bula"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white block">Message</Label>
                  <Textarea
                    className="bg-transparent border-0 border-b border-zinc-800 rounded-none min-h-[100px] px-0 py-4 text-base text-white focus-visible:ring-0 focus-visible:border-white placeholder:text-zinc-700 transition-all resize-none font-medium"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <div className="pt-4">
                  <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-14 px-12 text-sm font-black uppercase transition-all">
                    Send Message
                  </Button>
                </div>
              </motion.form>
            </div>

            {/* Right: Contact Details & Access */}
            <div className="lg:col-span-1" /> {/* Spacer */}

            <div className="lg:col-span-4 space-y-10 lg:pt-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-12"
              >
                {/* Office */}
                <div className="border-l-2 border-blue-500 pl-8">
                  <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Location</h3>
                  <p className="text-xl font-bold text-white mb-2 leading-tight uppercase">RD Realty Dev&apos;t Corp.</p>
                  <p className="text-zinc-400 font-medium leading-relaxed">
                    Cagampang Ext. Brgy Bula,<br />
                    General Santos City, 9500<br />
                    Philippines
                  </p>
                </div>

                {/* Direct */}
                <div className="border-l-2 border-zinc-800 hover:border-blue-500 pl-8 transition-colors duration-500">
                  <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Channels</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest mb-1">Email</p>
                      <a href="mailto:marketing@rdrealty.com.ph" className="text-lg font-bold text-white hover:text-blue-500 transition-colors">
                        marketing@rdrealty.com.ph
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest mb-1">Direct Line</p>
                      <p className="text-lg font-bold text-white">
                        (083) 552-4435
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Access - Compact */}
                <div className="p-8 bg-zinc-900/30 border border-zinc-900 flex items-center gap-8 group">
                  <div className="flex-1">
                    <h3 className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Digital Business Card</h3>
                    <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase">Scan to save our <br /> contact details.</p>
                  </div>
                  <div className="bg-white p-2 rounded-none grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="/XRNB.png" alt="QR" className="w-30 h-30" />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section - Simplified Full-width */}
      <section className="h-[450px] border-t border-zinc-900 grayscale hover:grayscale-0 transition-all duration-1000">
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
