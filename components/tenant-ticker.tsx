'use client';

import { motion } from 'framer-motion';

const TENANTS = [
    "PAG-IBIG FUND",
    "JOLLIBEE",
    "FOREVER LIVING PRODUCTS PHILIPPINES",
    "FORTUNE GENERAL INSURANCE",
    "FPG INSURANCE CO., INC.",
    "FREEMONT FOODS CORPORATION",
    "GARSUTA, FELIX JR. HORDISTA",
    "GBW BEAUTY PRODUCTS TRADING",
    "GCV COPIER SUPPLIES & SERVICES",
    "GEO SPHERE RECRUITMENT PH",
    "GESACOMM SALES AND SERVICES",
    "GOLDEN ARCHES DEVELOPMENT",
    "GOVERNMENT SERVICE INSURANCE",
    "GSC ICELAND REFRIGERATION",
    "HAN N' HYZ I.T. SERVICES",
    "HMT GROUP INC.",
    "HYKING MARINE TRADING",
    "O'MAI TAKOYAKI",
    "INNOVATIVE INVESTORS & FINANCING",
    "J-KICKS SHOES TRADING",
    "JAPAP FIRST CORPORATION",
    "JETTI PETROLEUM INC.",
    "JING TRAVEL WIDE",
    "JULIE BEAUTY CLINIC",
    "SOLOBEE AGRI STORE",
    "KNIGHTS TAEKWONDO ACADEMY"
];

export function TenantTicker() {
    // Triple the items to ensure seamless loop
    const tripleTenants = [...TENANTS, ...TENANTS, ...TENANTS];

    return (
        <section className="py-32 bg-zinc-950 overflow-hidden border-y border-zinc-900">
            <div className="container mx-auto px-6 mb-20 text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white text-sm md:text-base font-bold uppercase tracking-[0.4em] mb-4"
                >
                    Trusted by Industry Leaders
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-white text-5xl md:text-7xl font-light leading-[1.1] tracking-tighter"
                >
                    Join our network of <span className="font-bold text-white">200+</span><span className="text-zinc-500 italic"> tenants</span>.
                </motion.p>
            </div>

            <div className="relative flex overflow-x-hidden">
                {/* Gradients for smooth fade */}
                <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-10 pointer-events-none" />

                <motion.div
                    animate={{
                        x: [0, -4000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 60,
                            ease: "linear",
                        },
                    }}
                    className="flex whitespace-nowrap items-center"
                >
                    {tripleTenants.map((tenant, idx) => (
                        <div
                            key={idx}
                            className="flex items-center px-12 group cursor-default"
                        >
                            <span className="text-3xl md:text-5xl font-black text-white uppercase inline-flex items-center gap-12">
                                {tenant}
                                <span className="w-3 h-3 rounded-full bg-blue-600 opacity-50 block" />
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
