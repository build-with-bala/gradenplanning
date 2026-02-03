import React from 'react';
import { Leaf } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between text-white bg-black/10 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-400" />
                <span className="text-xl font-serif font-bold tracking-wide">GardenGuide</span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-medium text-sm">
                <a href="#hero" className="hover:text-green-300 transition-colors">Home</a>
                <a href="#seasonal" className="hover:text-green-300 transition-colors">Seasonal</a>
                <a href="#plants" className="hover:text-green-300 transition-colors">Plants</a>
                <a href="#tips" className="hover:text-green-300 transition-colors">Tips</a>
                <a href="#tutorials" className="hover:text-green-300 transition-colors">Tutorials</a>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105">
                Get Started
            </button>
        </nav>
    );
};

export default Navbar;
