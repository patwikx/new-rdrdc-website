"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-950 font-sans">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
          className="h-full w-full object-cover opacity-30"
        >
          {/* Placeholder video URL - normally use local asset or cdn */}
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-white mix-blend-difference">
            RD REALTY
          </h1>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
           <h2 className="text-[2vw] font-light text-white-500 tracking-[0.2em] uppercase mt-4">
              Development Corporation
           </h2>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
           <p className="text-xs md:text-sm font-medium text-white-500 tracking-[0.3em] uppercase mt-8">
              A Member of RD Group of Companies
           </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="absolute bottom-12 flex flex-col items-center gap-2"
        >
           <span className="text-xs uppercase tracking-widest text-zinc-500">Scroll to Explore</span>
           <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
