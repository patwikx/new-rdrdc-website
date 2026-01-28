'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Facebook, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle architectural background element */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Company Identity */}
          <div className="lg:col-span-6">
            <Link href="/" className="group block mb-10">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/rdrdc-logo.png"
                    alt="RD Realty Logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] text-white group-hover:text-white/90 transition-colors uppercase">
                    RD Realty<br />
                    Dev&apos;t Corporation<span className="text-blue-500">.</span>
                  </h3>
                </div>
              </div>
            </Link>
            <p className="text-zinc-500 text-lg max-w-sm leading-relaxed mb-10">
              Building the foundations for Mindanao's economic ascension
              through strategic property development and management.
            </p>
            <div className="h-px w-12 bg-zinc-800" />
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 lg:col-start-9">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-8">Navigation</h4>
            <nav className="flex flex-col gap-4 text-zinc-500 font-medium">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Locations", href: "/locations" },
                { name: "Leasing", href: "/leasing" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-between hover:text-white transition-all duration-300"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2 lg:col-start-11">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-8">Socials</h4>
            <nav className="flex flex-col gap-4 text-zinc-500 font-medium">
              {[
                { name: "Facebook", href: "https://facebook.com", icon: <Facebook className="w-4 h-4" /> },
                { name: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin className="w-4 h-4" /> },
                { name: "Instagram", href: "https://instagram.com", icon: <Instagram className="w-4 h-4" /> }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between hover:text-white transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-900 text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
          <div className="flex items-center gap-8">
            <p>© 2026 RD REALTY DEVELOPMENT CORP.</p>
            <p className="hidden md:block">ALL RIGHTS RESERVED.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">A MEMBER OF RD GROUP OF COMPANIES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
