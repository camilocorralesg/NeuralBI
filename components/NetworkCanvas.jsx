'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ParticleNetwork = ({ count = 200, radius = 10, maxDistance = 2.5 }) => {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Create initial random positions and velocities
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Random slow velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions: pos, velocities: vel };
  }, [count, radius]);

  // Max lines = count * count / 2. We use a pre-allocated buffer.
  const maxLines = count * 20; // safe estimation
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineOpacities = useMemo(() => new Float32Array(maxLines * 2), [maxLines]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    // Slowly rotate the whole network for cinematic feel
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.025;
    linesRef.current.rotation.x = state.clock.elapsedTime * 0.025;

    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] += velocities[i * 3];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce off invisible boundary (soft clamp)
      const x = positionsArray[i * 3];
      const y = positionsArray[i * 3 + 1];
      const z = positionsArray[i * 3 + 2];
      const dist = Math.sqrt(x*x + y*y + z*z);
      
      if (dist > radius) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Calculate lines between close particles
    let lineIndex = 0;
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;
          
          if (lineIndex < maxLines) {
            linePositions[lineIndex * 6] = positionsArray[i * 3];
            linePositions[lineIndex * 6 + 1] = positionsArray[i * 3 + 1];
            linePositions[lineIndex * 6 + 2] = positionsArray[i * 3 + 2];
            linePositions[lineIndex * 6 + 3] = positionsArray[j * 3];
            linePositions[lineIndex * 6 + 4] = positionsArray[j * 3 + 1];
            linePositions[lineIndex * 6 + 5] = positionsArray[j * 3 + 2];
            
            lineOpacities[lineIndex * 2] = alpha;
            lineOpacities[lineIndex * 2 + 1] = alpha;
            
            lineIndex++;
          }
        }
      }
    }

    // Update lines geometry
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.15} 
          color="#c6ff34" 
          transparent 
          opacity={0.8} 
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-opacity"
            count={maxLines * 2}
            array={lineOpacities}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#c6ff34" 
          transparent 
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
};

export default function NetworkCanvas() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', backgroundColor: '#0a0a0a' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={['#0a0a0a']} />
        
        {/* Post-processing ambient light for some volume */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#c6ff34" />
        
        <ParticleNetwork count={350} radius={12} maxDistance={3.5} />
        
        {/* Orbit controls allows mouse interaction */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.5} 
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
