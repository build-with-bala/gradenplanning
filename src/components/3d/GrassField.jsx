import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import grassImg from '../../assets/textures/grass_blade.png';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition; 
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wind Effect
    // Only move the top of the blade (y > 0)
    float windStrength = 0.4; // Stronger wind
    float windSpeed = 1.5;
    
    // Complex Noise-based Sway
    float swayX = sin(uTime * windSpeed + instanceMatrix[3][0] * 0.3 + instanceMatrix[3][2] * 0.3) * windStrength * pos.y;
    float swayZ = cos(uTime * (windSpeed * 0.8) + instanceMatrix[3][2] * 0.5) * (windStrength * 0.5) * pos.y;
    
    pos.x += swayX;
    pos.z += swayZ;

    // Curvature for realism (bend the blade slightly)
    pos.z -= pow(pos.y, 2.0) * 0.2; 

    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vPosition = mvPosition.xyz;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D map;
  
  void main() {
    vec4 texColor = texture2D(map, vUv);
    
    // If transparent part of texture, discard
    if (texColor.a < 0.5) discard;
    
    // Color Variation (mix texture with some green tint)
    vec3 tint = vec3(0.5, 1.0, 0.5); 
    gl_FragColor = vec4(texColor.rgb * tint, 1.0);
    
    // Simple lighting approximation
    // gl_FragColor.rgb *= 0.8; // Darken slightly
  }
`;

const GrassField = ({ count = 10000 }) => {
    const meshRef = useRef();
    const grassTexture = useTexture(grassImg);

    // Create single blade geometry
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(0.3, 1.5, 2, 4); // Wider, taller, more segments
        geo.translate(0, 0.75, 0); // Pivot at bottom
        return geo;
    }, []);

    // Material setup
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                map: { value: grassTexture }
            },
            side: THREE.DoubleSide,
            transparent: true,
            alphaTest: 0.5
        });
    }, [grassTexture]);

    // Instance distribution
    const tempObject = new THREE.Object3D();

    useEffect(() => {
        if (!meshRef.current) return;

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 60; // Spread X wider
            const z = (Math.random() - 0.5) * 120 - 10; // Spread Z longer
            const y = -2.0; // Terrain Level

            // Random scale/rotation
            const scale = 0.8 + Math.random() * 0.6;
            const rotY = Math.random() * Math.PI * 2;

            tempObject.position.set(x, y, z);
            tempObject.rotation.set(0, rotY, 0);
            tempObject.scale.set(scale, scale, scale);
            tempObject.updateMatrix();

            meshRef.current.setMatrixAt(i, tempObject.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [count, tempObject]);

    useFrame((state) => {
        if (material.uniforms) {
            material.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[geometry, material, count]} />
    );
};

export default GrassField;
