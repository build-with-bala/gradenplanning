import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const CinematicCamera = () => {
    const scroll = useScroll();
    const cameraRef = useRef();

    // Define the path points - A journey through the garden
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 2, 20),    // Start: Gates
            new THREE.Vector3(0, 1, 10),    // Entering
            new THREE.Vector3(-5, 0.5, 5),  // Grass Level (Left)
            new THREE.Vector3(5, 1, 0),     // Pond Area (Right)
            new THREE.Vector3(0, 3, -10),   // Rising up
            new THREE.Vector3(0, 10, -30),  // Aerial View (Looking down)
            new THREE.Vector3(0, 2, -50),   // Final Sunset
        ], false, 'catmullrom', 0.5);
    }, []);

    const linePoints = useMemo(() => curve.getPoints(50), [curve]);

    useFrame((state, delta) => {
        if (!cameraRef.current) return;

        // map scroll (0-1) to curve position (0-1)
        const t = scroll.offset;

        // Position
        const point = curve.getPointAt(t);
        cameraRef.current.position.copy(point);

        // Look At: Look slightly ahead on the curve
        const tangent = curve.getTangentAt(t).normalize();
        const lookAtPoint = curve.getPointAt(Math.min(t + 0.05, 1)); // Look 5% ahead

        // Smoothly interpolate the lookAt for cinematic feel
        // Simple instant lookAt for now, can be dampened with state.camera.quaternion.slerp
        cameraRef.current.lookAt(lookAtPoint);
    });

    return (
        <group>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 20]} fov={50} />
            {/* Visual Debug Helper */}
            {/* 
            <line>
                <bufferGeometry>
                    <bufferAttribute 
                        attach="attributes-position" 
                        count={linePoints.length} 
                        array={new Float32Array(linePoints.flatMap(v => [v.x, v.y, v.z]))} 
                        itemSize={3} 
                    />
                </bufferGeometry>
                <lineBasicMaterial color="red" />
            </line>
            */}
        </group>
    );
};

export default CinematicCamera;
