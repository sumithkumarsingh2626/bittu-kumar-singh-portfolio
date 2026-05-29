"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Placeholder serif font for 3D Text
const fontUrl = "https://threejs.org/examples/fonts/gentilis_regular.typeface.json";

export default function HeroText() {
  const groupRef = useRef<THREE.Group>(null);
  const layersRef = useRef<THREE.Mesh[]>([]);

  // Proxy object to hold scroll animation values
  const animProxy = useRef({ progress: 0 });

  useEffect(() => {
    // We assume the HeroSection is pinning a container with height 300vh.
    // The window scroll over the first 200vh will drive this progress.
    ScrollTrigger.create({
      trigger: "body", // Simplification, ideally tied to the HeroSection container
      start: "top top",
      end: "+=2000",
      scrub: 1,
      onUpdate: (self) => {
        animProxy.current.progress = self.progress;
      }
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const progress = animProxy.current.progress;

    // Base rotation tied to mouse
    const targetRotX = (state.pointer.y * Math.PI) / 10;
    const targetRotY = (state.pointer.x * Math.PI) / 10;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);

    // Float animation when not scrolling
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      Math.sin(t) * 0.5 - (progress * 10), // Move down as scroll progresses
      0.1
    );

    // Sliced Text Effect
    // We have 5 layers. As progress increases, they separate on the Z axis and Z-rotate slightly
    layersRef.current.forEach((layer, i) => {
      if (!layer) return;
      
      const layerOffset = i - 2; // -2, -1, 0, 1, 2 (center is 0)
      
      // Target Z separation based on scroll progress
      const targetZ = layerOffset * progress * 15;
      
      // Target rotation based on scroll progress (shatter effect)
      const targetRotZ = layerOffset * progress * 0.2;
      const targetRotXLayer = (i % 2 === 0 ? 1 : -1) * progress * 0.5;

      layer.position.z = THREE.MathUtils.lerp(layer.position.z, targetZ, 0.1);
      layer.rotation.z = THREE.MathUtils.lerp(layer.rotation.z, targetRotZ, 0.1);
      layer.rotation.x = THREE.MathUtils.lerp(layer.rotation.x, targetRotXLayer, 0.1);
      
      // Fade out outer layers as they spread
      const material = layer.material as THREE.MeshStandardMaterial;
      if (material) {
        material.transparent = true;
        material.opacity = THREE.MathUtils.lerp(1, 1 - (progress * Math.abs(layerOffset) * 0.4), 0.1);
      }
    });
  });

  // Material setup: Metallic, low roughness
  const materialProps = {
    color: "#FFFFFF",
    metalness: 0.8,
    roughness: 0.2,
    envMapIntensity: 1,
  };

  return (
    <group ref={groupRef}>
      <Center>
        {/* Create 5 overlapping layers of the same text */}
        {[...Array(5)].map((_, i) => (
          <Text3D
            key={i}
            ref={(el) => {
              if (el) layersRef.current[i] = el as THREE.Mesh;
            }}
            font={fontUrl}
            size={3}
            height={0.5} // Extrude depth
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.1}
            bevelSize={0.05}
            bevelOffset={0}
            bevelSegments={5}
            lineHeight={0.8}
            position={[0, 0, 0]} // Initial stacked position
          >
            {`hey welcome\nto my profile`}
            <meshStandardMaterial {...materialProps} />
          </Text3D>
        ))}
      </Center>
    </group>
  );
}
