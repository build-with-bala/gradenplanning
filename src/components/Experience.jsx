import React from 'react';
import { ScrollControls, Scroll } from '@react-three/drei';
import GardenScene from './3d/GardenScene';
import Hero from './Hero';
import SeasonalGuides from './SeasonalGuides';
import PlantCategories from './PlantCategories';
import BeginnerTips from './BeginnerTips';
import VideoTutorials from './VideoTutorials';

const Experience = () => {
    return (
        <ScrollControls pages={6} damping={0.25}>
            {/* The 3D World */}
            <GardenScene />

            {/* The HTML Interface Overlay */}
            <Scroll html style={{ width: '100%' }}>

                {/* Helper to spacing sections out */}
                <section className="w-full">
                    <Hero />
                </section>

                <section className="w-full">
                    <SeasonalGuides />
                </section>

                <section className="w-full">
                    <PlantCategories />
                </section>

                <section className="w-full">
                    <BeginnerTips />
                </section>

                <section className="w-full">
                    <VideoTutorials />
                </section>

                {/* Footer Area */}
                <div className="h-[50vh] flex items-end justify-center pb-10 pointer-events-none">
                    <h2 className="text-4xl font-serif text-green-800 font-bold bg-white/80 p-4 rounded-xl">Grow Your World.</h2>
                </div>

            </Scroll>
        </ScrollControls>
    );
};

export default Experience;
