"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Html,
  useProgress,
  Bounds,
  Center,
  Stage,
} from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} dispose={null} />;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-gold-400" />
        <span className="text-[10px] font-medium text-white/60">
          {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
}

export function Hero3D({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.1}>
            <Center>
              <Model url={modelUrl} />
            </Center>
          </Bounds>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={1.2}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          makeDefault
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-white/70 backdrop-blur-md">
        Aylantirish uchun torting
      </div>
    </div>
  );
}
