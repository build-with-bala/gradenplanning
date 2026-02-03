import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Experience from '../components/Experience';

const LandingPage = () => {
    return (
        <>
            <div className="h-screen w-full bg-stone-50">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 10], fov: 40 }}
                >
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Canvas>
            </div>
            <Loader />
        </>
    );
};

export default LandingPage;
