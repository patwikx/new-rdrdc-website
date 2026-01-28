'use client';

import { motion } from 'framer-motion';
import { Quote, ArrowUpRight } from 'lucide-react';

const TENANT_STORIES = [
    {
        id: "01",
        tenant: "PAG-IBIG FUND",
        project: "Regional Operations Center",
        quote: "Relocating our regional operations to an RD Realty development has transformed how we serve the public. The strategic location and state-of-the-art facilities have allowed us to increase our service capacity significantly while providing a professional environment for our members.",
        stat: "40% Service Growth",
        tag: "Government Sector"
    },
    {
        id: "02",
        tenant: "JOLLIBEE",
        project: "Flagship Branch",
        quote: "Our partnership with RD Realty has been instrumental in our regional growth. Their understanding of prime commercial hubs and commitment to property maintenance ensures that our branches remain top-performing locations year after year.",
        stat: "High-Volume Performance",
        tag: "Food & Beverage"
    },
    {
        id: "03",
        tenant: "GOLDEN ARCHES (MCDONALD'S)",
        project: "Strategic Retail Site",
        quote: "Location is the most critical factor in our industry. RD Realty provides more than just a space; they provide the infrastructure and strategic positioning that drive consistent footfall and long-term business success in Mindanao.",
        stat: "Premier Strategic Site",
        tag: "International Retail"
    }
];

function StoryItem({ story, index }: { story: typeof TENANT_STORIES[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start group py-20 border-b border-zinc-900 last:border-0"
        >
            {/* Column 1: Index */}
            <div className="lg:col-span-1">
                <span className="text-4xl font-bold text-zinc-900 group-hover:text-blue-500/20 transition-colors duration-700 block cursor-default select-none leading-none">
                    {story.id}
                </span>
            </div>

            {/* Column 2: Identity & Stat */}
            <div className="lg:col-span-4 lg:pl-4">
                <div className="space-y-12">
                    <div>
                        <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">
                            {story.tag}
                        </span>
                        <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                            {story.tenant}
                        </h3>
                        <p className="text-zinc-500 text-lg font-medium italic mt-4">
                            {story.project}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-white text-3xl font-bold tracking-tighter">
                            {story.stat}
                        </p>
                        <div className="flex items-center gap-3">
                            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                                Performance Metric
                            </p>
                            <ArrowUpRight className="w-4 h-4 text-blue-500 group-hover:scale-125 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 3: Narrative Quote */}
            <div className="lg:col-span-7 xl:pl-16">
                <div className="relative pt-4">
                    <Quote className="absolute -left-12 -top-8 w-24 h-24 text-zinc-900 group-hover:text-blue-500/5 transition-colors duration-1000 -z-10" />
                    <p className="text-white text-xl md:text-2xl lg:text-3xl font-light leading-[1.5] text-zinc-400 group-hover:text-white transition-colors duration-500 tracking-tight">
                        <span className="text-blue-500 mr-2 opacity-50 font-serif">"</span>
                        {story.quote}
                        <span className="text-blue-500 ml-2 opacity-50 font-serif">"</span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export function SuccessStories() {
    return (
        <section className="py-40 bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mb-32">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-6"
                    >
                        Tenant Partnerships
                    </motion.h3>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-light leading-[1.1] tracking-tighter text-white mb-8"
                    >
                        Building <span className="font-bold">legacies</span> of <br />
                        commercial <span className="text-zinc-500 italic">success</span>.
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1 }}
                        className="h-px w-24 bg-blue-500 mb-8 origin-left"
                    />
                </div>

                <div className="divide-y divide-zinc-900">
                    {TENANT_STORIES.map((story, index) => (
                        <StoryItem key={story.id} story={story} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
