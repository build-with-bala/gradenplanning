import React from 'react';
import { motion } from 'framer-motion';
import vegImg from '../assets/category-vegetables.png';
import flowerImg from '../assets/category-flowers.png';
import herbImg from '../assets/category-herbs.png';
import indoorImg from '../assets/category-indoor.png';

const categories = [
    { id: 'vegetables', name: 'Vegetables', image: vegImg, count: '42 varieties' },
    { id: 'flowers', name: 'Flowers', image: flowerImg, count: '68 varieties' },
    { id: 'herbs', name: 'Herbs', image: herbImg, count: '25 varieties' },
    { id: 'indoor', name: 'Indoor Plants', image: indoorImg, count: '30 varieties' },
];

const PlantCategories = () => {
    return (
        <section id="plants" className="py-24 px-6 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 bg-white/80 p-6 rounded-2xl backdrop-blur-sm">
                    <motion.div>
                        <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Explore</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-3">Plant Categories</h2>
                    </motion.div>
                    <button className="text-stone-600 font-medium hover:text-green-700 transition-colors mt-4 md:mt-0">
                        View all categories →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border-4 border-white"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <h3 className="text-3xl font-serif font-bold mb-1">{category.name}</h3>
                                <p className="opacity-80 font-medium">{category.count}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlantCategories;
