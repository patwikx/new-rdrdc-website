import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function LeasingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />
      
      <section className="pt-32 pb-12 md:pt-48 md:pb-24 container mx-auto px-6">
        <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter mb-16">
           LEASING
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-4">
              <p className="text-2xl text-zinc-400 sticky top-32">
                 Your journey to the perfect workspace begins here. Simple, transparent, and professional.
              </p>
           </div>
           
           <div className="lg:col-span-8 space-y-0">
              {[
                { step: "01", title: "Inquire", desc: "Reach out to our leasing team with your requirements." },
                { step: "02", title: "View", desc: "Schedule a private tour of our available properties." },
                { step: "03", title: "Propose", desc: "Submit your letter of intent and business proposal." },
                { step: "04", title: "Move In", desc: "Sign the lease and begin your fit-out construction." }
              ].map((item) => (
                 <div key={item.step} className="group border-t border-zinc-800 py-16 transition-colors hover:bg-zinc-900/50">
                    <div className="flex flex-col md:flex-row gap-8 md:items-baseline">
                       <span className="text-sm font-bold text-zinc-600 uppercase tracking-widest">{item.step}</span>
                       <h2 className="text-4xl md:text-6xl font-bold tracking-tight group-hover:text-zinc-200 transition-colors">{item.title}</h2>
                       <p className="md:ml-auto text-zinc-500 max-w-xs">{item.desc}</p>
                    </div>
                 </div>
              ))}
              <div className="border-t border-zinc-800" />
           </div>
        </div>
      </section>

      <section className="py-24 bg-white text-black px-6">
          <div className="container mx-auto flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">READY TO START?</h2>
              <div className="flex flex-col md:flex-row gap-6">
                 <Button className="bg-black text-white hover:bg-zinc-800 rounded-full h-14 px-8 text-lg uppercase tracking-wide">
                    Download Requirements
                 </Button>
                 <Button variant="outline" className="border-black text-black hover:bg-zinc-100 rounded-full h-14 px-8 text-lg uppercase tracking-wide">
                    Contact Agent
                 </Button>
              </div>
          </div>
      </section>
      
      <Footer />
    </main>
  );
}
