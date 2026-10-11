"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  useGLTF,
  Html,
  useProgress,
  Bounds,
} from "@react-three/drei";
import { Pause, Play, Maximize2, Minimize2, Camera, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- 3D Model ---------- */
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} dispose={null} />;
}

/* ---------- WebGL kontekst yo'qolsa tiklash ---------- */
function ContextLossHandler({ onLost }: { onLost: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = (e: Event) => {
      e.preventDefault();
      console.warn("WebGL context lost. Attempting to restore...");
      onLost();
    };
    const handleRestored = () => {
      console.log("WebGL context restored.");
    };
    canvas.addEventListener("webglcontextlost", handleLost as EventListener, false);
    canvas.addEventListener("webglcontextrestored", handleRestored, false);
    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost as EventListener);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
    };
  }, [gl, onLost]);
  return null;
}

/* ---------- Yuklanish indikatori ---------- */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-gold-400" />
        <span className="text-xs font-medium text-white/80">{progress.toFixed(0)}%</span>
        <span className="text-[10px] text-white/50">3D model yuklanmoqda...</span>
      </div>
    </Html>
  );
}

/* ---------- Foto fallback ---------- */
function FallbackViewer({ image, name }: { image?: string; name: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden gradient-petrol">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="font-display text-[120px] font-black text-white/20">
          {name.charAt(0)}
        </span>
      )}
      <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-graphite-900/60 px-4 py-3 text-center text-xs text-white/80 backdrop-blur-md">
        3D model hozircha mavjud emas - foto korsatilmoqda
      </div>
    </div>
  );
}

/* ---------- Asosiy viewer ---------- */
export function ProductViewer({
  modelUrl,
  fallbackImage,
  productName,
}: {
  modelUrl?: string;
  fallbackImage?: string;
  productName: string;
}) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [error, setError] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Fullscreen holatini tinglash */
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  /* WebGL kontekst yo'qolsa — foto rejimiga o'tish */
  const handleContextLost = () => {
    setContextLost(true);
    setError(true);
  };

  /* 3D yo'q, xatolik, yoki foto rejimi */
  if (!modelUrl || error || showPhoto) {
    return (
      <div className="relative aspect-square w-full">
        <FallbackViewer image={fallbackImage} name={productName} />
        {(modelUrl && !error) && (
          <button
            onClick={() => setShowPhoto(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md hover:bg-white/20"
          >
            3D korinishga qaytish
          </button>
        )}
        {contextLost && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-500/90 px-3 py-2 text-xs text-white backdrop-blur-md">
            <AlertTriangle className="h-3.5 w-3.5" />
            3D vaqtincha o'chirildi
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl bg-graphite-900",
        isFullscreen ? "h-screen" : "aspect-square"
      )}
    >
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
      >
        <ContextLossHandler onLost={handleContextLost} />
        <color attach="background" args={["#0f0f0f"]} />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.2}>
            <Stage
              environment="city"
              intensity={0.6}
              shadows={{ type: "contact", opacity: 0.5, blur: 2.5 }}
              adjustCamera={false}
            >
              <Model url={modelUrl} />
            </Stage>
          </Bounds>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          makeDefault
        />
      </Canvas>

      {/* Yuqori chap — maslahat */}
      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between">
        <div className="pointer-events-auto rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
          Aylantirish · Zoom
        </div>
      </div>

      {/* Pastdagi boshqaruv paneli */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <button
          onClick={() => setAutoRotate((v) => !v)}
          aria-label={autoRotate ? "Avtoaylanishni toxtatish" : "Avtoaylanishni yoqish"}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full backdrop-blur-md transition-all",
            autoRotate
              ? "bg-gold-400 text-graphite-900"
              : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        <button
          onClick={() => setShowPhoto(true)}
          aria-label="Foto korinishiga otish"
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          <Camera className="h-4 w-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Kichiklashtirish" : "Butun ekran"}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

        <div className="rounded-full bg-white/10 px-3 py-2 text-[11px] font-medium text-white backdrop-blur-md">
          3D
        </div>
      </div>
    </div>
  );
}
