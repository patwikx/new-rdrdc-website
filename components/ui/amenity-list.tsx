import {
  Wifi,
  Car,
  Utensils,
  Waves,
  Wind,
  Tv,
  Coffee,
  Bath,
  Refrigerator,
  Shirt,
  Lock,
  Phone,
  Sparkles,
  Mountain,
  TreePalm,
  UtensilsCrossed,
  Dumbbell,
  Flower2,
  Baby,
  Dog,
  Cigarette,
  Wine,
  Music,
  Gamepad2,
  Projector,
  Printer,
  Landmark,
  type LucideIcon,
} from "lucide-react";

// Icon mapping for amenity names
const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  parking: Car,
  restaurant: Utensils,
  pool: Waves,
  "air-conditioning": Wind,
  ac: Wind,
  tv: Tv,
  coffee: Coffee,
  bathroom: Bath,
  refrigerator: Refrigerator,
  fridge: Refrigerator,
  laundry: Shirt,
  safe: Lock,
  telephone: Phone,
  housekeeping: Sparkles,
  "mountain-view": Mountain,
  "garden-view": TreePalm,
  "room-service": UtensilsCrossed,
  gym: Dumbbell,
  spa: Flower2,
  "baby-friendly": Baby,
  "pet-friendly": Dog,
  smoking: Cigarette,
  minibar: Wine,
  entertainment: Music,
  gaming: Gamepad2,
  projector: Projector,
  "business-center": Printer,
  landmark: Landmark,
};

interface AmenityBadgeProps {
  name: string;
  icon?: string;
  showIcon?: boolean;
}

export function AmenityBadge({ name, icon, showIcon = true }: AmenityBadgeProps) {
  const IconComponent = icon ? iconMap[icon.toLowerCase()] : null;

  return (
    <span className="amenity-badge">
      {showIcon && IconComponent && <IconComponent className="h-4 w-4" />}
      {name}
    </span>
  );
}

interface AmenityListProps {
  amenities: {
    name: string;
    icon?: string;
  }[];
  showIcons?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function AmenityList({
  amenities,
  showIcons = true,
  columns = 2,
  className = "",
}: AmenityListProps) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-3 ${className}`}>
      {amenities.map((amenity) => (
        <div
          key={amenity.name}
          className="flex items-center gap-3 text-sm text-foreground"
        >
          {showIcons && (
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {(() => {
                const IconComponent = amenity.icon
                  ? iconMap[amenity.icon.toLowerCase()]
                  : null;
                return IconComponent ? (
                  <IconComponent className="h-4 w-4 text-primary" />
                ) : (
                  <Sparkles className="h-4 w-4 text-primary" />
                );
              })()}
            </span>
          )}
          <span>{amenity.name}</span>
        </div>
      ))}
    </div>
  );
}
