import gsap from 'gsap';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { useGSAP } from '@gsap/react';

import Scene from './Scene';

gsap.registerPlugin(useGSAP);

function Experience() {
  const container = useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    const introTl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

    introTl
      .from('.intro-heading', { opacity: 0, y: 50, scale: 0.8 })
      .from('.intro-subheading', { opacity: 0, y: 30 }, '-=0.5');
  });

  return (
    <main ref={container} className="font-heading h-screen w-screen bg-[#1a1919] text-slate-50">
      <header className="flex flex-col items-center justify-center">
        <h1 className="intro-heading pt-20 text-center text-8xl">Silent Edge</h1>
        <p className="intro-subheading text-2xl">
          Click on different parts of the blade to inspect them
        </p>
      </header>
      <View className="sticky top-0 -mt-[100vh] h-screen w-screen">
        <Scene />
      </View>
      <Canvas eventSource={container} camera={{ position: [0, 1.5, 4], fov: 45 }}>
        <View.Port />
      </Canvas>
    </main>
  );
}

export default Experience;
