import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      
      <div className="grid lg:grid-cols-2 min-h-screen">
          <div className="pt-32 px-6 md:px-12 flex flex-col justify-between pb-12">
              <div>
                  <div className="mb-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                      GET IN TOUCH WITH US
                    </h1>
                  </div>
                  <p className="text-xl text-zinc-400 max-w-md">
                      Have a project in mind? Looking for the perfect space? 
                      Let's start the conversation.
                  </p>
                                <div className="space-y-8 mt-12 lg:mt-0">
                 <div className="mt-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Visit Us</h3>
                    <p className="text-lg">RD Realty Dev't Corporation, Cagampang Ext. Brgy Bula, General Santos City, Philippines, 9500</p>
                 </div>
                 <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Contact</h3>
                    <p className="text-lg hover:text-zinc-300 transition-colors cursor-pointer">marketing@rdrealty.com.ph</p>
                    <p className="text-lg">(083) 552-4435</p>
                 </div>
                 <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Scan to Connect</h3>
                    <div className="bg-white p-3 rounded-lg inline-block">
                      <img 
                        src="/XRNB.png" 
                        alt="QR Code - Scan to connect with RD Realty" 
                        className="w-32 h-32"
                      />
                    </div>
                 </div>
              </div>
                  {/* Embedded Map */}
                  <div className="mt-8 h-[300px] md:h-[500px] w-full bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.9!2d125.1807528!3d6.1088039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79fa2a141eaa9%3A0xae033527655cd4a6!2sRD%20Realty%20Development%20Corporation!5e0!3m2!1sen!2sph!4v1703830000000!5m2!1sen!2sph" 
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
          
          <div className="bg-black pt-32 px-6 md:px-12 pb-12 flex flex-col justify-center min-h-screen">
              <div className="w-full max-w-lg mx-auto">
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">I am interested in</Label>
                        <Select>
                          <SelectTrigger className="w-full bg-zinc-950 border-zinc-800 rounded-xl px-4 py-6 text-base text-white focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                            <SelectItem value="commercial">Commercial Leasing</SelectItem>
                            <SelectItem value="residential">Residential Properties</SelectItem>
                            <SelectItem value="industrial">Industrial Spaces</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Name</Label>
                            <Input 
                                className="bg-zinc-950 border-zinc-800 rounded-xl px-4 py-6 text-base text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-700" 
                                placeholder="John Doe" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Contact No.</Label>
                            <Input 
                                className="bg-zinc-950 border-zinc-800 rounded-xl px-4 py-6 text-base text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-700" 
                                placeholder="+63 912..." 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email</Label>
                        <Input 
                            className="bg-zinc-950 border-zinc-800 rounded-xl px-4 py-6 text-base text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-700" 
                            placeholder="john@company.com" 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</Label>
                        <Textarea 
                            className="bg-zinc-950 border-zinc-800 rounded-xl px-4 py-4 text-base text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-700 min-h-[120px] resize-none" 
                            placeholder="Tell us about your requirements..." 
                        />
                    </div>
                    
                    <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-full h-14 text-sm font-bold uppercase tracking-widest mt-4">
                        Send Message
                    </Button>
                </form>
              </div>
          </div>
      </div>
      
      <Footer />
    </main>
  );
}
