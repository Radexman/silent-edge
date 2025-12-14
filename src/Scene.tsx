import * as THREE from 'three';
import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Clouds, Cloud } from '@react-three/drei';

import Sword from './components/Sword';

function Scene() {
  const { camera } = useThree();
  const defaultCameraPos = useRef(camera.position.clone());

  return (
    <>
      <color attach="background" args={['#1a1919']} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 3, 4]} intensity={4} />
      <Perf position="top-left" />
      <Sword camera={camera} defaultCameraPos={defaultCameraPos.current} />
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={2}
          segments={10}
          bounds={[0.25, 0.25, 0.25]}
          volume={2}
          color="gray"
          position-y={-3}
          fade={100}
          speed={0.2}
        />
        <Cloud
          seed={3}
          segments={5}
          bounds={[0.25, 0.3, 0.25]}
          volume={2}
          color="gray"
          position-y={-3}
          position-x={-2}
          fade={100}
          speed={0.2}
        />
        <Cloud
          seed={5}
          segments={7}
          bounds={[0.25, 0.25, 0.25]}
          volume={3}
          color="gray"
          position-y={-3}
          position-x={2}
          fade={120}
          speed={0.3}
        />
      </Clouds>
    </>
  );
}

export default Scene;
