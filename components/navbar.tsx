"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 text-white",
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-xl py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group z-50">
          <div className="relative w-10 h-10 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110">
            <Image
              src="/rdrdc-logo.png"
              alt="RD Realty Logo"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex flex-col justify-center border-l border-zinc-800 pl-4 h-10 md:h-12">
            <span className="text-base md:text-lg font-black tracking-tighter uppercase leading-[0.8] mb-1 text-white">
              RD Realty
            </span>
            <span className="text-[10px] md:text-xs font-bold tracking-tighter uppercase leading-[0.8] text-zinc-500">
              Dev&apos;t Corporation<span className="text-blue-500 ml-0.5">.</span>
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {["About", "Leasing", "Properties", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="group relative py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <span className="relative z-10">{item}</span>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-500 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Button
            asChild
            className="rounded-none bg-white text-black hover:bg-zinc-200 px-8 h-12 font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg shadow-black/20"
          >
            <Link href="/contact">Inquire Now</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
