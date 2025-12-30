import { properties } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { PropertyHero } from "@/components/property-hero";

// Correctly typing params for Next.js 15+ (if strictly typed) or standard 14.
// `params` is a promise in newer versions, but standard objects in 14.
// We'll treat it as a standard object for now, or handle the promise if it errors.
interface PageProps {
  params: { slug: string };
}

export default async function PropertySlugPage({ params }: PageProps) {
  // Await params if using Next.js 15, but for safety in 14/15 transition:
  const { slug } = await Promise.resolve(params); 
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      <PropertyHero 
         images={property.images}
         category={property.category}
         name={property.name}
         location={property.location}
      />

      {/* Content Grid */}
      <section className="py-24 container mx-auto px-6">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left: Description & Features */}
            <div className="lg:col-span-8">
               <h3 className="text-2xl font-bold mb-8">Overview</h3>
               <p className="text-xl text-zinc-400 leading-relaxed mb-12">
                  {property.description}
               </p>

               <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-8">Building Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                     {property.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 border border-zinc-800 rounded bg-zinc-900/50">
                           <div className="h-2 w-2 bg-white rounded-full" />
                           <span className="text-zinc-300">{feature}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Availability Table */}
               <div>
                  <h3 className="text-2xl font-bold mb-8">Available Spaces</h3>
                  <div className="w-full overflow-x-auto">
                     <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                           <tr className="text-zinc-500 text-xs uppercase tracking-widest bg-transparent">
                              <th className="py-4 px-6">Unit</th>
                              <th className="py-4 px-6">Size</th>
                              <th className="py-4 px-6">Type</th>
                              <th className="py-4 px-6">Status</th>
                              <th className="py-4 px-6 text-right">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {property.availableUnits.map((unit) => (
                              <tr key={unit.id} className="group transition-colors bg-zinc-900/50 hover:bg-zinc-800 rounded-2xl">
                                 <td className="py-6 px-6 font-medium rounded-l-2xl">{unit.name}</td>
                                 <td className="py-6 px-6 text-zinc-400">{unit.size}</td>
                                 <td className="py-6 px-6 text-zinc-400">{unit.type}</td>
                                 <td className="py-6 px-6">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium uppercase tracking-wide ${
                                       unit.status === 'Available' ? 'bg-green-950 text-green-400' : 'bg-zinc-800 text-zinc-500'
                                    }`}>
                                       {unit.status}
                                    </span>
                                 </td>
                                 <td className="py-6 px-6 text-right rounded-r-2xl">
                                    <Button variant="link" className="text-white p-0 h-auto hover:text-zinc-300">
                                       Inquire &rarr;
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Property Map */}
               <div className="mt-24">
                  <h3 className="text-2xl font-bold mb-8">Location</h3>
                  <div className="h-[400px] w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                     <iframe 
                        src={property.mapEmbedUrl}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="transition-opacity duration-500"
                     />
                  </div>
               </div>
            </div>

            {/* Right: Quick Specs Sticky */}
            <div className="lg:col-span-4">
               <div className="sticky top-32 p-8 border border-zinc-800 rounded-lg bg-zinc-900/30 backdrop-blur-sm">
                  <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-8">Property Data</h4>
                  
                  <div className="space-y-6">
                     <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                        <span className="text-zinc-400">Total Area</span>
                        <span className="font-bold">{property.specs.sqm}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                        <span className="text-zinc-400">Floors</span>
                        <span className="font-bold">{property.specs.floors}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                        <span className="text-zinc-400">Parking</span>
                        <span className="font-bold">{property.specs.parking}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                        <span className="text-zinc-400">Completion</span>
                        <span className="font-bold">{property.specs.completion}</span>
                     </div>
                  </div>

                  <Button className="w-full mt-8 bg-white text-black hover:bg-zinc-200 h-14 rounded-full text-lg">
                     Schedule Viewing
                  </Button>
               </div>
            </div>

         </div>
      </section>

      <Footer />
    </main>
  );
}
