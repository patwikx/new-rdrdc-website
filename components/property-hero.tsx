"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <section className="relative h-[80vh] w-full bg-zinc-950 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

      {/* Navigation - Only show if multiple images */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 hover:text-white rounded-full h-12 w-12"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 hover:text-white rounded-full h-12 w-12"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          
          {/* Indicators */}
          <div className="absolute bottom-32 left-0 w-full flex justify-center gap-2 z-20">
             {images.map((_, i) => (
                <button
                   key={i}
                   onClick={() => setCurrentIndex(i)}
                   className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white'}`}
                />
             ))}
          </div>
        </>
      )}

      <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full z-10">
        <div className="container mx-auto">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
            {category}
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
            {name.toUpperCase()}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 flex items-center gap-2">
           {location}
          </p>
        </div>
      </div>
    </section>
  );
}
