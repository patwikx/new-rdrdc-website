export interface Unit {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "Available" | "Leased" | "Reserved";
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  description: string;
  specs: {
    sqm: string;
    floors: string;
    parking: string;
    completion: string;
  };
  features: string[];
  images: string[];
  mapEmbedUrl: string;
  lat: number;
  lng: number;
  availableUnits: Unit[];
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "rd-plaza",
    name: "RD Plaza",
    category: "Commercial Office",
    location: "Pendatun Avenue, General Santos City",
    description: "The crown jewel of General Santos City's business district. RD Plaza offers premium Grade A office spaces designed for multinational corporations and local enterprises. With its iconic glass façade and state-of-the-art infrastructure, it stands as a symbol of economic progress.",
    specs: {
      sqm: "12,500 sqm",
      floors: "12 Storeys",
      parking: "3 Levels Basement",
      completion: "2018",
    },
    features: [
      "24/7 Security & CCTV",
      "100% Backup Power",
      "Fiber Optic Internet Ready",
      "High-Speed Elevators",
      "VRF Air Conditioning",
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.632973713005!2d125.16853507560424!3d6.113915893872584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79f2ea7001923%3A0x867018865f0458df!2sRD%20Realty%20Development%20Corporation!5e0!3m2!1sen!2sph!4v1719821234567!5m2!1sen!2sph",
    lat: 6.1164,
    lng: 125.1716,
    availableUnits: [
      { id: "u1", name: "Unit 801", size: "150 sqm", type: "Corner Office", status: "Available" },
      { id: "u2", name: "Unit 802", size: "95 sqm", type: "Standard Office", status: "Available" },
      { id: "u3", name: "Penthouse A", size: "450 sqm", type: "Whole Floor", status: "Reserved" },
    ],
  },
  {
    id: "2",
    slug: "downtown-strip",
    name: "Downtown Strip",
    category: "Retail & Lifestyle",
    location: "Santiago Blvd, General Santos City",
    description: "A vibrant open-air lifestyle center combining retail, dining, and leisure. The Downtown Strip is the city's premier destination for culture and commerce, featuring a curated mix of international brands and homegrown concepts.",
    specs: {
      sqm: "8,000 sqm",
      floors: "2 Storeys",
      parking: "Open Parking",
      completion: "2020",
    },
    features: [
      "Al Fresco Dining Areas",
      "Event Activity Center",
      "Landscaped Walkways",
      "24/7 Roving Security",
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.632973713005!2d125.16853507560424!3d6.113915893872584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79f2ea7001923%3A0x867018865f0458df!2sRD%20Realty%20Development%20Corporation!5e0!3m2!1sen!2sph!4v1719821234567!5m2!1sen!2sph",
    lat: 6.1150,
    lng: 125.1750,
    availableUnits: [
      { id: "r1", name: "G-04", size: "80 sqm", type: "Retail / F&B", status: "Available" },
      { id: "r2", name: "L2-10", size: "120 sqm", type: "Wellness / Clinic", status: "Available" },
    ],
  },
  {
    id: "3",
    slug: "rd-industrial-park",
    name: "RD Industrial Park",
    category: "Industrial & Logistics",
    location: "National Highway, General Santos City",
    description: "Strategically located along the main logistics corridor, RD Industrial Park provides world-class warehousing and light industrial solutions. Designed for efficiency, it offers wide roads, high-ceiling distinct warehouses, and robust utility infrastructure.",
    specs: {
      sqm: "5 Hectares",
      floors: "High Ceiling",
      parking: "Truck Bays",
      completion: "2015",
    },
    features: [
      "Wide Access Roads",
      "Loading Docks",
      "Perimeter Fencing",
      "Industrial Power Supply",
    ],
    images: [
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2670&auto=format&fit=crop",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.632973713005!2d125.16853507560424!3d6.113915893872584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79f2ea7001923%3A0x867018865f0458df!2sRD%20Realty%20Development%20Corporation!5e0!3m2!1sen!2sph!4v1719821234567!5m2!1sen!2sph",
    lat: 6.1010,
    lng: 125.1950,
    availableUnits: [
      { id: "w1", name: "Warehouse A", size: "1,200 sqm", type: "Storage", status: "Available" },
      { id: "w2", name: "Warehouse B", size: "800 sqm", type: "Storage", status: "Available" },
    ],
  },
  {
    id: "4",
    slug: "sky-tower",
    name: "Sky Tower",
    category: "Mixed Use",
    location: "Lagao District, General Santos City",
    description: "The future height of luxury living and working. Sky Tower is an upcoming mixed-use development featuring a podium mall, office towers, and unparalleled residential views. Currently in pre-selling / pre-leasing stage.",
    specs: {
      sqm: "45,000 sqm",
      floors: "28 Storeys",
      parking: "5 Levels Podium",
      completion: "2027 (Est)",
    },
    features: [
      "Sky Garden",
      "Helipad",
      "Smart Building System",
      "LEED Certified Target",
    ],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.632973713005!2d125.16853507560424!3d6.113915893872584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79f2ea7001923%3A0x867018865f0458df!2sRD%20Realty%20Development%20Corporation!5e0!3m2!1sen!2sph!4v1719821234567!5m2!1sen!2sph",
    lat: 6.1250,
    lng: 125.1850,
    availableUnits: [
      { id: "p1", name: "High Zone", size: "1,000 sqm", type: "Office Floor", status: "Available" },
    ],
  },
];
