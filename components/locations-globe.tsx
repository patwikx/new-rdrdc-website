"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { properties } from "@/lib/data";

export default function LocationsGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  
  // Add refs for vertical interaction
  const pointerInteractingY = useRef<number | null>(null);
  const pointerInteractionMovementY = useRef(0);

  useEffect(() => {
    let phi = 3.8;
    let theta = 0.2; // Initialize theta
    let width = 0;
    
    // ... resize logic ...
    const onResize = () => {
       if (canvasRef.current) {
          width = canvasRef.current.offsetWidth;
       }
    }
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [1, 0.6, 0],
      glowColor: [0.2, 0.2, 0.2],
      markers: properties.map((prop) => ({
        location: [prop.lat, prop.lng],
        size: 0.05,
      })),
      onRender: (state) => {
        if (!canvasRef.current) return;

        // Drag logic Horizontal
        if (pointerInteracting.current !== null) {
          const delta = pointerInteracting.current - pointerInteractionMovement.current;
          pointerInteractionMovement.current = pointerInteracting.current;
          phi += delta / 200;
        }
        
        // Drag logic Vertical
        if (pointerInteractingY.current !== null) {
             const delta = pointerInteractingY.current - pointerInteractionMovementY.current;
             pointerInteractionMovementY.current = pointerInteractingY.current;
             theta += delta / 200;
             // Clamp theta to avoid flipping (approx +/- 80 degrees)
             theta = Math.max(-1.4, Math.min(1.4, theta)); 
        }

        state.phi = phi;
        state.theta = theta;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 z-10 pointer-events-none" />
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          pointerInteractingY.current = e.clientY - pointerInteractionMovementY.current;
          document.body.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          pointerInteractingY.current = null;
          document.body.style.cursor = 'default';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          pointerInteractingY.current = null;
          document.body.style.cursor = 'default';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
          }
          if (pointerInteractingY.current !== null) {
             const delta = e.clientY - pointerInteractingY.current;
             pointerInteractionMovementY.current = delta;
           }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
          }
           if (pointerInteractingY.current !== null && e.touches[0]) {
             const delta = e.touches[0].clientY - pointerInteractingY.current;
             pointerInteractionMovementY.current = delta;
           }
        }}
        className="w-full h-full opacity-100 transition-opacity duration-1000 ease-in-out cursor-grab active:cursor-grabbing"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
       {/* Overlay Text */}
      <div className="absolute bottom-12 left-0 w-full text-center z-20 pointer-events-none">
         <p className="text-zinc-500 text-sm uppercase tracking-widest">
            Operating in <span className="text-white font-bold">General Santos City, Philippines</span>
         </p>
      </div>
    </div>
  );
}
