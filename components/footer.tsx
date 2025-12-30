import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <Image 
                 src="/rdrdc-logo.png" 
                 alt="RD Realty Logo" 
                 width={40} 
                 height={40} 
                 className="w-10 h-10 object-contain"
                 unoptimized
               />
               <h3 className="text-xl font-bold tracking-tighter">RD REALTY DEVELOPMENT CORPORATION</h3>
            </div>
            <p className="text-zinc-500 max-w-xs">
              Building the foundations for Mindanao's economic ascension.
            </p>
          </div>
          
          <div className="flex gap-12 text-sm uppercase tracking-widest text-zinc-500">
             <div className="flex flex-col gap-4">
                <span className="text-white mb-2">Sitemap</span>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                <Link href="/properties" className="hover:text-white transition-colors">Properties</Link>
                <Link href="/leasing" className="hover:text-white transition-colors">Leasing</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
             </div>
             <div className="flex flex-col gap-4">
                <span className="text-white mb-2">Socials</span>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-zinc-900 pt-12 text-xs uppercase tracking-widest text-zinc-600">
           <p>© 2025 RD Realty Development Corp. All rights reserved.</p>
           <p>
              A member of <span className="text-zinc-400 font-bold">RD Group of Companies</span>
           </p>
        </div>
      </div>
    </footer>
  );
}
