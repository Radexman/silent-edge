import { OrbitControls, useGLTF } from '@react-three/drei';
import { Perf } from 'r3f-perf';

function Experience() {
  const sword = useGLTF('./sword_hp.glb');

  return (
    <>
      <color args={['#1a1919']} attach="background" />
      <OrbitControls makeDefault />
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Perf position="top-left" />
      <primitive object={sword.scene} />
    </>
  );
}

export default Experience;
