import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Leaf, Snowflake, ArrowRight } from 'lucide-react';
import Modal from './Modal';
import springImg from '../assets/season-spring.png';
import summerImg from '../assets/season-summer.png';
import autumnImg from '../assets/season-autumn.png';
import winterImg from '../assets/season-winter.png';

// Data strictly kept same, just UI styles tweaked for overlay
const seasons = [
    { id: 'spring', name: 'Spring', icon: Cloud, image: springImg, description: 'The season of new beginnings.', details: '...', color: 'bg-green-100' },
    { id: 'summer', name: 'Summer', icon: Sun, image: summerImg, description: 'Peak growing season.', details: '...', color: 'bg-orange-100' },
    { id: 'autumn', name: 'Autumn', icon: Leaf, image: autumnImg, description: 'Harvest time and preparation.', details: '...', color: 'bg-amber-100' },
    { id: 'winter', name: 'Winter', icon: Snowflake, image: winterImg, description: 'Planning and maintenance.', details: '...', color: 'bg-blue-100' },
];

const SeasonalGuides = () => {
    const [selectedSeason, setSelectedSeason] = useState(null);

    return (
        <section id="seasonal" className="py-24 px-6 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Year-Round Care</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-3">Seasonal Guides</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {seasons.map((season, index) => (
                            <motion.div
                                key={season.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedSeason(season)}
                                className="group cursor-pointer relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all bg-white"
                            >
                                <div className="h-48 w-full overflow-hidden">
                                    <img
                                        src={season.image}
                                        alt={season.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <season.icon className="w-5 h-5 text-stone-600" />
                                        <h3 className="text-xl font-serif font-bold text-stone-800">{season.name}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={!!selectedSeason}
                onClose={() => setSelectedSeason(null)}
                title={selectedSeason?.name}
            >
                <p>Details for {selectedSeason?.name}...</p>
            </Modal>
        </section>
    );
};

export default SeasonalGuides;
