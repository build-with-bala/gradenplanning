import React, { useRef } from 'react';
import { useScroll, Stars, Float, Sparkles, Cloud, Sky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import CinematicCamera from './CinematicCamera';
import Terrain from './Terrain';
import GrassField from './GrassField';

const GardenScene = () => {
    const scroll = useScroll();
    const sunRef = useRef();

    useFrame((state) => {
        // Sun Movement
        if (sunRef.current) {
            const angle = scroll.offset * Math.PI; // 0 to PI
            sunRef.current.position.x = Math.cos(angle) * 30;
            sunRef.current.position.y = Math.sin(angle) * 20;
        }
    });

    return (
        <>
            <CinematicCamera />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow color="#fff7ed" />
            <pointLight ref={sunRef} position={[30, 0, -20]} intensity={2} color="#fcd34d" />

            {/* Environment */}
            <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={300} scale={[20, 10, 60]} size={6} speed={0.4} opacity={0.6} color="#bef264" position={[0, 2, 0]} />

            {/* World Objects */}
            <Terrain />
            <GrassField count={8000} />

            {/* Clouds */}
            <Cloud opacity={0.6} speed={0.2} width={20} depth={2} segments={20} position={[0, 10, -20]} color="#f0fdf4" />

            {/* Post Processing */}
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
                {/* DoF can be heavy, enable with care. Focusing on distance 20 (start) */}
                {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
            </EffectComposer>
        </>
    );
};

export default GardenScene;
