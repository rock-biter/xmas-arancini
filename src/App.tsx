import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Scene } from "./components/Scene";
import { Physics } from "@react-three/rapier";
import { useMemo } from "react";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}
function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );
  return (
    <KeyboardControls map={map}>
      <Canvas>
        <Physics>
          <Scene />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
