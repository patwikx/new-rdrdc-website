"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: {
    url: string;
    alt: string;
  }[];
  aspectRatio?: "property" | "room" | "square";
}

export function ImageGallery({ images, aspectRatio = "room" }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const aspectClass = {
    property: "aspect-property",
    room: "aspect-room",
    square: "aspect-square",
  }[aspectRatio];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
        {/* Main Image */}
        <div
          className={`md:col-span-2 md:row-span-2 relative ${aspectClass} md:aspect-auto md:h-full rounded-lg overflow-hidden cursor-pointer group`}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={images[0].url}
            alt={images[0].alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Secondary Images */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className={`relative aspect-room rounded-lg overflow-hidden cursor-pointer group ${
              index >= 2 ? "hidden md:block" : ""
            }`}
            onClick={() => {
              setCurrentIndex(index + 1);
              setIsLightboxOpen(true);
            }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  +{images.length - 5} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black border-none">
          <DialogTitle className="sr-only">Image Gallery</DialogTitle>
          <div className="relative aspect-video">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
            />
            
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="bg-black/90 p-4 overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 ${
                    index === currentIndex
                      ? "ring-2 ring-secondary"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
