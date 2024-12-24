import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ConsolModel } from "./ConsolModel";
import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";

const ConsolModelContainer = () => {
  return (
    <Canvas>
      <Suspense fallback="loading...">
        <Stage environment="city" intensity={0.5}>
          <ConsolModel />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate/>
        <PerspectiveCamera position={[-1,0,1.8]} zoom={0.5} makeDefault/>
      </Suspense>
    </Canvas>
  );
};

export default ConsolModelContainer;
