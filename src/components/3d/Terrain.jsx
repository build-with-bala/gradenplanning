import React, { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import soilImg from '../../assets/textures/soil_diffuse.png';

const Terrain = () => {
    const soilTexture = useTexture(soilImg);

    useEffect(() => {
        // Configure texture for realism - Repeat pattern
        soilTexture.wrapS = soilTexture.wrapT = THREE.RepeatWrapping;
        soilTexture.repeat.set(16, 32); // High repeat for detail
        // soilTexture.encoding = THREE.sRGBEncoding; // Handled auto in newer R3F
    }, [soilTexture]);

    return (
        <group position={[0, -2, 0]}>
            {/* Main Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 200, 128, 128]} />
                <meshStandardMaterial
                    map={soilTexture}
                    displacementMap={soilTexture} // Use same texture for displacement for bumpiness
                    displacementScale={0.5}
                    roughness={0.8} // Soil is rough
                    metalness={0.1}
                    color="#aa9988" // Tint slightly warm
                />
            </mesh>
        </group>
    );
};

export default Terrain;
