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
} from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} dispose={null} />;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ivory-200/20 border-t-gold-400" />
        <span className="price-text text-[10px] font-medium text-ivory-200/80">
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
        camera={{ position: [0, 0.5, 5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#e8af42" />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.15}>
            <Center>
              <Model url={modelUrl} />
            </Center>
          </Bounds>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.6}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.75}
          makeDefault
        />
      </Canvas>

      {/* Pastdagi maslahat */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-ivory-200/15 bg-charcoal-800/30 px-3.5 py-1.5 text-[10px] font-medium tracking-wider text-ivory-200/70 backdrop-blur-md">
        Aylantirish uchun torting
      </div>
    </div>
  );
}
