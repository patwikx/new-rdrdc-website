import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google"; // Import Outfit
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RD Realty Development Corporation",
    template: "%s | RD Realty",
  },
  description:
    "Premium commercial spaces across General Santos City and Mindanao. RD Realty focuses on leasing quality real estate for your business growth.",
  keywords: [
    "RD Realty",
    "Real Estate",
    "General Santos City",
    "Mindanao",
    "Leasing",
    "Commercial Space",
    "Office Space",
  ],
  authors: [{ name: "RD Realty Development Corporation" }],
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://rdrealty.com.ph",
    siteName: "RD Realty Development Corporation",
    title: "RD Realty Development Corporation | General Santos City",
    description:
      "Premium commercial leasing in General Santos City and Mindanao.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <SmoothScroll>
          <main className="flex-1">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
