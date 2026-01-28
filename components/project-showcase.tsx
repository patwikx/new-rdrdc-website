"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import Link from "next/link";

export function ProjectShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // We have 1 Introduction Slide + N Projects.
  // Total width = 100vw * (properties.length + 1)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${properties.length * 100}vw`]);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-zinc-950">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          
          {/* Intro Slide */}
          <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 flex-shrink-0 relative z-10 border-r border-zinc-900">
             <div className="text-center px-4">
                <h2 className="text-[10vw] font-bold text-white leading-none tracking-tighter mb-4">
                   OUR <br/> PROJECTS
                </h2>
                <p className="text-zinc-500 text-xl max-w-sm mx-auto uppercase tracking-widest mt-8">
                    Swipe to explore
                </p>
             </div>
          </div>
          
          {/* Project Slides */}
          {properties.map((project) => (
            <div
              key={project.id}
              className="relative h-screen w-screen overflow-hidden bg-zinc-900 flex-shrink-0"
            >
              <div
                style={{
                  backgroundImage: `url(${project.images[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 transition-all duration-1000 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute inset-0 z-10 flex flex-col justify-end items-end p-6 md:p-24 pb-32">
                <div className="max-w-4xl text-right flex flex-col items-end">
                    <Badge variant="outline" className="text-white border-white/30 bg-black/20 backdrop-blur-sm mb-6 px-4 py-2 text-sm tracking-[0.2em] uppercase">
                        {project.category}
                    </Badge>
                    <h3 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter leading-none">
                    {project.name}
                    </h3>
                    <Button asChild className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-6 text-lg tracking-widest uppercase cursor-pointer relative z-50">
                        <Link href={`/properties/${project.slug}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
