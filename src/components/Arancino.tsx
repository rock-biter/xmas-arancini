import { Cylinder } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { DoubleSide, MathUtils, Mesh, TextureLoader, Vector3 } from "three";

interface ArancinoProps{
    position:[number,number,number],
    visible:boolean;
    setVisible: () => void
}

const _VECTOR = new Vector3(0,0,0);


export const Arancino = ({position,visible, setVisible}:ArancinoProps) => {
  const meshRef = useRef<Mesh>(null);
  const map = useLoader(TextureLoader,"/assets/gold.png");



  const handleIntersection = () => {
    setVisible();
  }

  useFrame((state,delta)=>{
    if(!meshRef.current){
      return;
    }
    if(!visible){
      const o = meshRef.current.material.opacity;
      meshRef.current.material.opacity = MathUtils.lerp(o,0,delta*3);
      _VECTOR.copy(meshRef.current.position)
      _VECTOR.y = 3;
      meshRef.current.position.lerp(_VECTOR,delta*3)
      const meshY = meshRef.current.rotation.y
      meshRef.current.rotation.y = MathUtils.lerp(meshY,Math.PI,delta*3)
    }else{
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime())*0.5 + 1
    }
  })
  return (
    <RigidBody colliders={false} position={position} sensor type="fixed" onIntersectionEnter={handleIntersection}>
      <CylinderCollider args={[0.5,1.25]} />
      <mesh ref={meshRef}>
        <planeGeometry args={[1,1]}  />
        <meshStandardMaterial transparent={true} map={map} side={DoubleSide} />
      </mesh>

    </RigidBody>
  );
};
