"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyHeroProps {
  images: string[];
  category: string;
  name: string;
  location: string;
}

export function PropertyHero({ images, category, name, location }: PropertyHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full bg-zinc-950 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-transparent h-32 z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/30 to-transparent" />

      {/* Navigation - Only show if multiple images */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white hover:bg-white/10 rounded-none h-12 w-12 border border-white/10 backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white hover:bg-white/10 rounded-none h-12 w-12 border border-white/10 backdrop-blur-sm transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Indicators */}
          <div className="absolute bottom-32 left-0 w-full flex justify-center gap-2 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? "w-10 bg-white"
                    : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <div className="container max-w-6xl mx-auto px-6 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1.5 px-4 border border-white/20 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 backdrop-blur-md bg-white/5">
              {category}
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-4">
              {name.toUpperCase()}
            </h1>
            <p className="text-base md:text-lg text-zinc-400 flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-zinc-500" />
              {location}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-24 right-6 z-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
            {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </section>
  );
}
