"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { properties } from "@/lib/data";
import L from "leaflet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

// Custom Icon for Pins
const createIcon = (category: string) => {
  return L.divIcon({
    className: "bg-transparent",
    html: `
      <div class="relative flex items-center justify-center w-12 h-12">
        <div class="absolute inset-0 bg-red-500 rounded-full opacity-30 animate-ping"></div>
        <div class="relative w-8 h-8 bg-red-500 border-4 border-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold text-white z-10">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div class="absolute -bottom-2 w-1 h-4 bg-red-900/50 blur-[2px]"></div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48], // Tip of the pin
    popupAnchor: [0, -48],
  });
};

export default function LocationsMapRenderer() {
  // Center roughly on General Santos City
  const center: [number, number] = [6.1164, 125.1716]; 
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="h-full w-full bg-zinc-950 relative z-0">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="h-full w-full z-0 outline-none"
        style={{ height: '100%', width: '100%', background: '#09090b', outline: 'none' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((prop) => (
          <Marker 
             key={prop.id} 
             position={[prop.lat, prop.lng]} 
             icon={createIcon(prop.category)}
          >
            <Popup className="custom-popup" closeButton={false}>
              <div className="p-1 min-w-[200px] text-zinc-950">
                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">{prop.category}</p>
                <h3 className="font-bold text-lg leading-tight mb-3">{prop.name}</h3>
                <Link href={`/properties/${prop.slug}`}>
                  <Button size="sm" className="w-full bg-zinc-950 text-white hover:bg-zinc-800 h-8 text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Overlay Controls */}
      <div className="absolute bottom-6 left-6 z-[400] flex items-center gap-2 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
             <p className="text-xs uppercase tracking-widest text-white/80 font-bold">Interactive Map</p>
          </div>
      </div>

      <div className="absolute top-6 right-6 z-[400] pointer-events-auto">
          <button 
            onClick={toggleFullScreen}
            className="bg-zinc-950 text-white p-3 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800 shadow-xl"
            title="Toggle Fullscreen"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M8 3H5a2 2 0 0 0-2 2v3" />
               <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
               <path d="M3 16v3a2 2 0 0 0 2 2h3" />
               <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
      </div>
    </div>
  );
}
