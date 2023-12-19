import { Center, Text3D, useKeyboardControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useRef } from "react";
import {
  Group,
  Mesh,
  Object3D,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import Font from "three/examples/fonts/helvetiker_bold.typeface.json";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Controls } from "../App";

const _VECTOR = new Vector3(0, 0, 0);

export const Santa = ({ score }: { score: number }) => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<Mesh>(null);
  const [_, get] = useKeyboardControls<Controls>();
  const models = useLoader(
    OBJLoader,
    "/assets/xmas-models/ChristmasAssets.obj"
  );
  const map = useLoader(
    TextureLoader,
    "/assets/xmas-models/Texture/Texture_Christmas.png"
  );

  map.colorSpace = SRGBColorSpace;

  models.traverse((mesh: Object3D) => {
    if (mesh instanceof Mesh) {
      mesh.position.set(0, 0, 0);
      mesh.scale.setScalar(0.075);
      mesh.geometry.center();
      mesh.geometry.translate(0, 12, 0);
      mesh.geometry.rotateY(Math.PI * 0.5);
      mesh.material.map = map;
    }
  });

  useFrame(({ camera }, delta) => {
    const { forward, back, left, right } = get();
    if (!bodyRef.current) {
      return;
    }

    if (forward) {
      bodyRef.current?.applyImpulse({ x: 0, y: 0, z: -delta * 10 }, true);
    }
    if (back) {
      bodyRef.current?.applyImpulse({ x: 0, y: 0, z: delta * 10 }, true);
    }
    if (left) {
      bodyRef.current?.applyImpulse({ x: -delta * 10, y: 0, z: 0 }, true);
    }
    if (right) {
      bodyRef.current?.applyImpulse({ x: delta * 10, y: 0, z: 0 }, true);
    }

    const { x, y, z } = bodyRef.current.translation();
    _VECTOR.set(x, 10 + y, 10 + z);
    camera.position.copy(_VECTOR);
    camera.lookAt(x, y, z);

    _VECTOR.set(x,  y, z);
    if(!meshRef.current){
      return;
    }
    meshRef.current.position.lerp(_VECTOR,delta*20)
    meshRef.current.lookAt(_VECTOR);

  });

  return (
    <>
      <primitive object={models.children[6]} ref={meshRef}></primitive>
      <RigidBody
        position={[0, 1, 0]}
        ref={bodyRef}
        colliders={false}
        friction={0.5}
      >
        <CylinderCollider args={[0.5, 0.6]} />
        <group position={[0, 3.5, 0]}>
          <Center>
            <Text3D font={Font}>
              {score}
              <meshStandardMaterial color="lime" />
            </Text3D>
          </Center>
        </group>
      </RigidBody>
    </>
  );
};
