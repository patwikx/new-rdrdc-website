import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import Link from "next/link";

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />
      
      <section className="pt-32 pb-12 md:pt-48 md:pb-32 container mx-auto px-6">
        <h1 className="text-[10vw] leading-[0.8] font-bold tracking-tighter mb-12 uppercase text-end">
           Our <br/> Properties
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-24">
           {properties.map((prop, i) => (
             <Link key={prop.id} href={`/properties/${prop.slug}`} className={`group relative aspect-[4/5] bg-zinc-900 overflow-hidden block ${i % 2 === 1 ? 'md:mt-24' : ''}`}>
                <div 
                   className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                   style={{ backgroundImage: `url(${prop.images[0]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                 
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <span className="bg-white/10 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-widest rounded-full border border-white/10">{prop.category}</span>
                   </div>
                   
                   <div>
                      <h3 className="text-3xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{prop.name}</h3>
                      <p className="text-zinc-400 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">{prop.location}</p>
                   </div>
                </div>
             </Link>
           ))}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
