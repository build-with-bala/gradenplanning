import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sun, Sprout, CheckCircle2 } from 'lucide-react';

const tips = [
    { icon: Droplets, title: 'Watering Wisely', desc: 'Deep watering is key.' },
    { icon: Sun, title: 'Understanding Light', desc: 'Observe sun patterns.' },
    { icon: Sprout, title: 'Soil Health', desc: 'Add compost regularly.' }
];

const BeginnerTips = () => {
    return (
        <section id="tips" className="py-24 px-6 min-h-screen flex items-center relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Content Side with solid background for readability */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/90 p-10 rounded-3xl shadow-xl backdrop-blur-md border border-white/50"
                >
                    <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Grow with Confidence</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-3 mb-8">Beginner's Guide</h2>

                    <div className="space-y-8">
                        {tips.map((tip, index) => (
                            <div key={index} className="flex gap-5">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                    <tip.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-800 mb-2">{tip.title}</h3>
                                    <p className="text-stone-600 leading-relaxed">{tip.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Empty side - allows 3D scene to show through */}
                <div className="hidden lg:block h-[500px]">
                    {/* The global 3D garden scene will be visible here */}
                </div>

            </div>
        </section>
    );
};

export default BeginnerTips;
