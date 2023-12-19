import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useState } from "react";
import { Arancino } from "./Arancino";
import { Santa } from "./Santa";
import { useThree } from "@react-three/fiber";
import { Color } from "three";

const ARANCINI = 20;

export const Scene = () => {
  const randomArancini = useMemo(() => {
    const rand = [];
    for (let i = 0; i < ARANCINI; i++) {
      const x = Math.floor(Math.random() * 100) - 50;
      const z = Math.floor(Math.random() * 100) - 50;
      rand.push([x, 0.6, z] as [number, number, number]);
    }
    return rand;
  }, []);

  const {scene} = useThree();
  useEffect(()=>{
    scene.background = new Color("lightblue")
  },[])

  const [aranciniCollisions,setAranciniCollisions] = useState(() => new Array(ARANCINI).fill(true))

  const handleCollision = (index:number) => {
    setAranciniCollisions((prev)=> prev.map((value,i) => i === index ? false :value ))
  }

  return (
    <>
      {/* <ContactShadows
        opacity={1}
        scale={100}
        blur={1}
        far={20}
        resolution={256}
        color={"#000000"}
      /> */}

      <directionalLight color="white" intensity={4} position={[10, 10, 10]} />
      <ambientLight intensity={1.2} />
      <Santa score={aranciniCollisions.reduce((acc,prev) => { return !prev ? acc + 1 : acc},0)} />
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <mesh>
          <boxGeometry args={[100, 1, 100]} />
          <meshStandardMaterial color="#dddddd" />
        </mesh>
      </RigidBody>
      {randomArancini.map((randomArancino, index) => (
        <Arancino position={randomArancino} key={index} visible={aranciniCollisions[index]} setVisible={() => handleCollision(index)} />
      ))}


    </>
  );
};
