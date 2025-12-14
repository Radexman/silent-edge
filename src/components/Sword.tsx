import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useRef } from 'react';
import { useGLTF, Float, useCursor } from '@react-three/drei';
import { useControls } from 'leva';

gsap.registerPlugin(useGSAP);

type SwordProps = {
  camera: THREE.Camera;
  defaultCameraPos: THREE.Vector3;
};

function Sword({ camera, defaultCameraPos }: SwordProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);
  const tween = useRef<gsap.core.Tween | null>(null);
  const swordGroup = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/sword_hp.glb');

  const { speed, rotationIntensity, floatIntensity, floatingRange } = useControls(
    'Floating Sword',
    {
      speed: { value: 0.8, min: 0, max: 20, step: 0.1 },
      rotationIntensity: { value: 1.5, min: 0, max: 20, step: 0.1 },
      floatIntensity: { value: 0, min: 0, max: 20, step: 1 },
      floatingRange: { value: [1, 10], min: 0, max: 100, step: 1 },
    }
  );

  useGSAP(() => {
    if (!swordGroup.current) return;

    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

    tl.from(swordGroup.current.position, { z: -3, duration: 3 });
  }, []);

  const resetCamera = () => {
    if (!focused) return;

    tween.current?.kill();

    tween.current = gsap.to(camera.position, {
      x: defaultCameraPos.x,
      y: defaultCameraPos.y,
      z: defaultCameraPos.z,
      duration: 1.1,
      ease: 'power3.out',
      onComplete: () => setFocused(false),
    });
  };

  const focusMesh = (mesh: THREE.Mesh) => {
    const target = new THREE.Vector3();
    mesh.getWorldPosition(target);

    const direction = new THREE.Vector3().subVectors(camera.position, target).normalize();

    const distance = 1.8;
    const newCameraPos = target.clone().add(direction.multiplyScalar(distance));

    tween.current?.kill();

    tween.current = gsap.to(camera.position, {
      x: newCameraPos.x,
      y: newCameraPos.y,
      z: newCameraPos.z,
      duration: 1.2,
      ease: 'power3.out',
      onComplete: () => setFocused(true),
    });
  };

  const handleMeshClick = (e: any) => {
    e.stopPropagation();
    if (focused) return;

    focusMesh(e.object as THREE.Mesh);
  };

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
      floatingRange={floatingRange}
    >
      <group
        ref={swordGroup}
        dispose={null}
        position={[0, 0, -1]}
        rotation-x={1}
        onPointerMissed={resetCamera}
      >
        <mesh
          name="blade"
          onClick={handleMeshClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          geometry={nodes.blade.geometry}
          material={materials.blade}
          position={[-0.105, 1.094, 0.801]}
          rotation={[-0.007, -0.225, -0.16]}
        />
        <mesh
          name="upper_guard"
          onClick={handleMeshClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          geometry={nodes.upper_guard.geometry}
          material={materials.guard}
          position={[-1.218, 1.276, 0.571]}
          rotation={[-0.007, -0.225, -0.16]}
          scale={[1.062, 1.062, 0.891]}
        />
        <mesh
          name="lower_guard"
          onClick={handleMeshClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          geometry={nodes.lower_guard.geometry}
          material={materials.guard}
          position={[-1.919, 1.389, 0.455]}
          rotation={[0.044, 0.091, 2.985]}
          scale={[1.071, 1.157, 0.963]}
        />
        <mesh
          name="handle"
          onClick={handleMeshClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          geometry={nodes.handle.geometry}
          material={materials.handle}
          position={[-1.744, 1.363, 0.469]}
          rotation={[-0.007, -0.225, -0.16]}
        />
      </group>
    </Float>
  );
}

useGLTF.preload('/sword_hp.glb');

export default Sword;
