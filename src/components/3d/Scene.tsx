"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense } from "react";
import HeroText from "./HeroText";
import * as THREE from "three";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]} // Support high DPI displays but cap at 2 for performance
      gl={{ antialias: false, alpha: true }} // antialias is usually false when using postprocessing
      className="w-full h-full"
    >
      <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={45} />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#A7C7FF" />
      <directionalLight position={[-10, -10, 5]} intensity={0.5} color="#7FA4D6" />
      <pointLight position={[0, 0, 10]} intensity={5} color="#ffffff" distance={20} />

      <Suspense fallback={null}>
        <Environment preset="city" /> {/* For metallic reflections */}
        <HeroText />
        
        {/* Post-Processing Effects */}
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <Bloom
            luminanceThreshold={0.5}
            mipmapBlur
            intensity={1.5}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.002, 0.002)}
          />
        </EffectComposer>
      </Suspense>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  );
}
