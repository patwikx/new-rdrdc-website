'use client';

/**
 * MapControls Component - Enhanced map control buttons
 * 
 * This component provides custom control buttons for:
 * - Zoom in/out
 * - Reset view to default
 * - Fullscreen toggle
 * - Map style/layer switching
 * - User location centering
 * 
 * Requirements: 5.1, 5.2, 5.5
 */

import {
  Plus,
  Minus,
  Locate,
  Compass,
  Layers,
  Map,
  Mountain,
  Satellite,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MapControlsProps, MapStyle } from '../types';
import { cn } from '@/lib/utils';

/**
 * Map style configuration
 */
const mapStyles = [
  {
    id: 'street' as MapStyle,
    name: 'Street',
    icon: Map,
    description: 'Dark theme map',
  },
  {
    id: 'satellite' as MapStyle,
    name: 'Satellite',
    icon: Satellite,
    description: 'Aerial view',
  },
  {
    id: 'hybrid' as MapStyle,
    name: 'Hybrid',
    icon: Mountain,
    description: 'Mixed view',
  },
];

/**
 * MapControls Component
 * 
 * Provides a set of custom control buttons for map interaction:
 * - Zoom controls (in/out/reset)
 * - Fullscreen toggle
 * - Map style/layer switcher
 * - User location centering
 */
export function MapControls({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleFullscreen,
  onStyleChange,
  onLocateUser,
  fullscreenActive,
  currentStyle,
}: MapControlsProps) {
  const handleStyleChange = (style: MapStyle) => {
    onStyleChange(style);
  };

  return (
    <>
      {/* Top Right Controls - Map Style Selector */}
      <div className="absolute top-4 right-4 z-[1000]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-11 h-11 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-black/95 hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-200 flex items-center justify-center group"
              title="Change map style"
            >
              <Layers className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors duration-200" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-black/95 backdrop-blur-xl border-white/10"
          >
            {mapStyles.map((style) => {
              const Icon = style.icon;
              return (
                <DropdownMenuItem
                  key={style.id}
                  onClick={() => handleStyleChange(style.id)}
                  className={cn(
                    'gap-3 cursor-pointer text-white hover:text-blue-400 hover:bg-white/10',
                    currentStyle === style.id && 'bg-white/10 text-blue-400'
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium">{style.name}</span>
                    <span className="text-xs text-zinc-400">
                      {style.description}
                    </span>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bottom Right Controls */}
      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
        {/* Locate User */}
        <button
          onClick={onLocateUser}
          className="w-11 h-11 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-black/95 hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-200 flex items-center justify-center group"
          title="Center on my location"
        >
          <Locate className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors duration-200" />
        </button>

        {/* Reset View */}
        <button
          onClick={onResetView}
          className="w-11 h-11 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-black/95 hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-200 flex items-center justify-center group"
          title="Reset view"
        >
          <Compass className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors duration-200" />
        </button>

        {/* Zoom Controls - Grouped */}
        <div className="flex flex-col rounded-lg border border-white/10 bg-black/80 backdrop-blur-xl shadow-xl overflow-hidden">
          <button
            onClick={onZoomIn}
            className="w-11 h-11 border-b border-white/10 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all duration-200 group"
            title="Zoom in"
          >
            <Plus className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors duration-200" />
          </button>
          <button
            onClick={onZoomOut}
            className="w-11 h-11 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all duration-200 group"
            title="Zoom out"
          >
            <Minus className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors duration-200" />
          </button>
        </div>
      </div>
    </>
  );
}
