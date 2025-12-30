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
    slug: "general-santos-business-park",
    name: "General Santos Business Park",
    category: "Commercial & Business",
    location: "National Highway, General Santos City",
    description: "A premier business hub designed for global enterprises. General Santos Business Park offers state-of-the-art office spaces, robust infrastructure, and easy access to major transportation links, making it the ideal location for your corporate headquarters.",
    specs: {
      sqm: "10 Hectares",
      floors: "Various",
      parking: "Central Parking",
      completion: "2010",
    },
    features: [
      "PEZA Accredited",
      "Wide Concrete Roads",
      "Reliable Power & Water",
      "Fiber Internet Ready",
      "24/7 Security",
    ],
    images: [
      "https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCVdfzRNFbRBELGVUnYXZNcgxKSew4PDqzI8Of1",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d589.7088575595329!2d125.18415197668385!3d6.120942090212717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1767089485385!5m2!1sen!2sph",
    lat: 6.120896242042584,
    lng: 125.18461618455164,
    availableUnits: [
      { id: "u1", name: "Block 3 Lot 5", size: "1,500 sqm", type: "Commercial Lot", status: "Available" },
    ],
  },
  {
    id: "2",
    slug: "rd-city",
    name: "RD City",
    category: "Mixed-Use Township",
    location: "Polomolok/GenSan Boundary",
    description: "A revolutionary integrated community combining residential, commercial, and recreational spaces. RD City features a medical center, educational institutions, techno park, and manufacturing zones—a self-sustaining metropolis in the making.",
    specs: {
      sqm: "66 Hectares",
      floors: "Mixed",
      parking: "Integrated",
      completion: "Ongoing",
    },
    features: [
      "Special Economic Zone",
      "RD Maer Summit Hotel",
      "St. Elizabeth Hospital",
      "DLSU - GenSan Campus",
      "Commercial Strip",
    ],
    images: [
      "https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCVVg2KbATnl8YJnfQXZwHKRbB5kUFVSIov20cm",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7901940583324!2d125.11864247598632!3d6.158847893828337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f799727ac9b2ff%3A0xced8b402de2cbb6c!2sRD%20City%20Central%20Business%20District!5e0!3m2!1sen!2sph!4v1767089545244!5m2!1sen!2sph",
    lat: 6.159114566560914,
    lng: 125.12127104078687,
    availableUnits: [
      { id: "r1", name: "Retail Space 101", size: "120 sqm", type: "Retail", status: "Available" },
    ],
  },
  {
    id: "3",
    slug: "la-cassandra-residence",
    name: "La Cassandra Residence",
    category: "Residential",
    location: "Calumpang, General Santos City",
    description: "Experience serene living at La Cassandra. A master-planned residential community offering modern homes, lush parks, and a secure environment perfect for growing families.",
    specs: {
      sqm: "180 - 300 sqm (Lot)",
      floors: "2 Storeys",
      parking: "Private Garage",
      completion: "2023",
    },
    features: [
      "Clubhouse & Pool",
      "Gated Community",
      "Wide Roads",
      "Parks & Playground",
    ],
    images: [
      "https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCVOm2EmT7GY7PtskD6VZpxrq8LEdQvmhiWj4zo",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9224572846756!2d125.1253042759862!3d6.1411185938457855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79f32847e5431%3A0x6e34bbb559328ee4!2sLa%20Cassandra%20Residences!5e0!3m2!1sen!2sph!4v1767089610925!5m2!1sen!2sph",
    lat: 6.141257268307123,
    lng: 125.1278684677712,
    availableUnits: [
      { id: "h1", name: "Model House A", size: "150 sqm FA", type: "Single Detached", status: "Available" },
    ],
  },
  {
    id: "4",
    slug: "rd-mall",
    name: "RD Mall",
    category: "Commercial",
    location: "Pendatun Avenue, General Santos City",
    description: "The crown jewel of General Santos City's business district. RD Plaza offers premium Grade A office spaces designed for multinational corporations and local enterprises. With its iconic glass façade, it stands as a symbol of economic progress.",
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
    ],
    images: [
      "https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCVIaWGU02IFANEyS7PYa4J13wKirZxo9nqbC0s",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.826624035538!2d125.15727187598623!3d6.153969693833147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79e8ffe85770d%3A0x617fe9eb8aaa65b3!2sRD%20Mall%20Mabuhay!5e0!3m2!1sen!2sph!4v1767089652284!5m2!1sen!2sph",
    lat: 6.154161699977468,
    lng: 125.15984679660714,
    availableUnits: [
      { id: "u1", name: "Unit 801", size: "150 sqm", type: "Corner Office", status: "Available" },
    ],
  },
  {
    id: "5",
    slug: "norfolk-pine",
    name: "Norfolk Pine Residence",
    category: "Residential",
    location: "Various Locations",
    description: "Quality affordable housing for every Filipino family. RD Homes builds communities with durability and comfort in mind, ensuring your investment lasts a lifetime.",
    specs: {
      sqm: "80 - 150 sqm (Lot)",
      floors: "1-2 Storeys",
      parking: "Shared/Private",
      completion: "Various",
    },
    features: [
      "Affordable Financing",
      "Durable Construction",
      "Strategic Locations",
      "Community Facilities",
    ],
    images: [
      "https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCVxUq8UuauWJcdCKQ0Z1E8Pn7sSew4vUgo6khM",
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.909135758828!2d125.12799187598637!3d6.1429065938440885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79ecc6af12e99%3A0xff817c7c97ae04d7!2sNorfolk%20Pine%20Subdivision!5e0!3m2!1sen!2sph!4v1767089731596!5m2!1sen!2sph",
    lat: 6.143055935068667,
    lng: 125.1305131524277,
    availableUnits: [
      { id: "h2", name: "Rowhouse Unit", size: "40 sqm FA", type: "Socialized", status: "Available" },
    ],
  },
];
