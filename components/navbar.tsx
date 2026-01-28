"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 flex items-center justify-between text-white",
        scrolled
          ? "bg-gradient-to-b from-black/90 to-transparent pb-12 pt-6"
          : "bg-gradient-to-b from-black/60 to-transparent py-6"
      )}
    >
      <Link href="/" className="flex items-center gap-3 z-50">
        <Image
          src="/rdrdc-logo.png"
          alt="RD Realty Logo"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          unoptimized
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tighter uppercase whitespace-nowrap md:hidden">
            RD Realty
          </span>
          <span className="hidden md:block text-lg md:text-xl font-bold tracking-tighter uppercase whitespace-nowrap">
            RD Realty Development Corporation
          </span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-12">
        {["About", "Leasing", "Properties", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-sm font-medium uppercase tracking-widest hover:underline underline-offset-4 decoration-white/50"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button 
            asChild
            className="rounded-full bg-white text-black hover:bg-zinc-200 px-6 font-medium uppercase tracking-wider text-xs"
        >
          <Link href="/contact">Inquire</Link>
        </Button>
      </div>
    </nav>
  );
}
