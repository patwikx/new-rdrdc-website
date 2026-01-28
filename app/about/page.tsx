import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />
      
      {/* Editorial Header */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-32 container mx-auto px-6">
        <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter mix-blend-difference mb-12">
           WHO WE ARE
        </h1>
        <div className="w-full h-[1px] bg-white/20 mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
           <div>
              <p className="text-2xl md:text-4xl font-light leading-tight">
                 We are the architects of <span className="text-zinc-500">commerce</span>. 
                 Building the stage for Mindanao's next generation of business leaders.
              </p>
               <div className="mt-12 p-6 border border-zinc-800 rounded-lg bg-zinc-900/50">
                   <p className="text-sm uppercase tracking-widest text-zinc-500 mb-2">Affiliation</p>
                   <p className="text-xl font-medium">RD Realty Development Corporation was established & registered in June 24, 1985 and is one of the subsidiaries of RD Group of Companies under the management and direction of Mr. Roy C. Rivera</p>
               </div>
           </div>
           <div className="space-y-8 text-zinc-400 text-lg leading-relaxed">
              <p>
    RD Realty Development Corporation is a member of RD Group of Companies that engaged in the development of real estate projects, property management, and construction of many of the company’s future developments. It has grown into a very integrated company providing employment to over 250 people.
              </p>
              <p>
RD Realty Development Corporation is the property holding firm of the Realty Development Group. It is the largest property owner and considered as the trendsetter in the leasing industry in General Santos City which today operates a growing inventory of 45,000 sqm leasable building spaces across the country and overseas.
              </p>
           </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="h-[60vh] w-full bg-zinc-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40" />
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-32 container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                  <h3 className="text-4xl font-bold tracking-tight text-white mb-6">MISSION</h3>
                  <p className="text-zinc-400 leading-relaxed">
      We are committed to a sustainable and profitable real estate development and business transactions through fostering a mutually beneficial relationship with our stakeholders.  We aim to uplift the quality of life of the communities where we operate and glorify God in everything we do.
                  </p>
              </div>
              <div className="space-y-4">
                  <h3 className="text-4xl font-bold tracking-tight text-white mb-6">VISION</h3>
                  <p className="text-zinc-400 leading-relaxed">
                      A diversified real estate company delivering maximum value to customers and stockholders guided by the highest ethical standards of practice and strong faith in God.
                  </p>
              </div>
              <div className="space-y-4">
                  <h3 className="text-4xl font-bold tracking-tight text-white mb-6">CORE VALUES</h3>
                  <ul className="space-y-4 text-zinc-400">
                      <li className="flex items-center gap-4">
                          <span className="h-px w-8 bg-white"/> Integrity
                      </li>
                      <li className="flex items-center gap-4">
                          <span className="h-px w-8 bg-white"/> Innovation
                      </li>
                      <li className="flex items-center gap-4">
                          <span className="h-px w-8 bg-white"/> Excellence
                      </li>
                      <li className="flex items-center gap-4">
                          <span className="h-px w-8 bg-white"/> Interdependence
                      </li>
                      <li className="flex items-center gap-4">
                          <span className="h-px w-8 bg-white"/> Godliness
                      </li>
                  </ul>
              </div>
          </div>
      </section>
      
      <Footer />
    </main>
  );
}
