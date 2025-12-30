import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectShowcase } from "@/components/project-showcase";
import { LocationsMap } from "@/components/locations-map";
import { Button } from "@/components/ui/button";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Footer } from "@/components/footer";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-white selection:text-black">
      <ScrollToTop />
      <Hero />
      
      {/* Manifesto / Vision Section - High Contrast Typography */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-24 container mx-auto px-6">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-light leading-[1.1] mb-12">
               We build the <span className="font-bold text-white">foundations</span> for 
               Mindanao's economic <span className="italic text-zinc-400">ascension</span>.
            </h2>
            <div className="border-t border-zinc-800 pt-12">
               <div className="text-zinc-500 max-w-4xl text-lg text-justify space-y-6">
                  <p>
                    RD REALTY DEVELOPMENT CORPORATION is the property holding firm of the Realty Development Group which was established and registered far earlier dated back June 24, 1985. It is the largest property owner and considered as the trendsetter in the leasing industry in General Santos City which today operates a growing inventory of 45,000 sqm leasable building spaces across the country and overseas. Since then it grew by having Richmond Builders Ltd. operating in Madang Papua New Guinea and Richmond Land Innovations, Inc. developing La Cassandra Subdivision and La Cassandra Residences, Norfolk Pine, RD City, RD Mall and soon to rise RD Homes.
                  </p>
                  <p>
                    The Realty Development Group is engaged in the development of commercial, residential, and industrial projects, property management, and construction of many of the company’s future developments.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Horizontal Scroll Showcase */}
      <ProjectShowcase />
      
      {/* Interactive Locations Map */}
      <LocationsMap />

      {/* Footer CTA */}
      <section className="h-screen flex items-center justify-center bg-zinc-950 text-white px-6 border-t border-zinc-900">
         <div className="text-center">
            <h2 className="text-[10vw] font-bold tracking-tighter leading-none mb-6">
               LET'S BUILD
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-xl mx-auto text-zinc-400">
               Your vision requires the perfect address. <br/>
               Secure your space in General Santos City's premier locations today.
            </p>
            <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full h-16 px-12 text-lg">
               <Link href="/contact">Inquire Now</Link>
            </Button>
         </div>
      </section>

      <Footer />
    </main>
  );
}
