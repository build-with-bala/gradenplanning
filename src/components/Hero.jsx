import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="h-screen w-full flex items-center justify-center relative pointer-events-none">
            {/* Content Overlay */}
            <div className="text-center px-4 max-w-4xl mx-auto pointer-events-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-stone-900 tracking-tight leading-none mb-6 drop-shadow-sm">
                        Cultivate Your <br />
                        <span className="text-green-600 italic">Dream Garden</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-stone-700 max-w-2xl mx-auto mb-10 font-medium drop-shadow-sm"
                >
                    The complete guide to growing beautiful plants, flowers, and vegetables.
                    From seasonal tips to expert tutorials.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button className="px-8 py-4 bg-green-700 text-white rounded-full font-semibold text-lg hover:bg-green-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Start Growing
                    </button>
                    <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-stone-800 rounded-full font-semibold text-lg hover:bg-white transition-all shadow-sm hover:shadow-md border border-stone-200">
                        View Galleries
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
