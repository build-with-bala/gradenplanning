import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-green-950 text-green-100 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-400" />
                    <span className="font-serif text-lg font-bold">GardenGuide</span>
                </div>
                <div className="text-sm opacity-60">
                    © {new Date().getFullYear()} Garden Guide. All rights reserved.
                </div>
                <div className="flex gap-6 text-sm font-medium">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
