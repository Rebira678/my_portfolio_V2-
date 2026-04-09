'use client';

import { useEffect, useRef } from 'react';
import { useAppContext } from '@/components/AppProvider';
import { useDeviceType } from '@/hooks/useDeviceType';
import CinematicIntro from '@/components/CinematicIntro';
import Hero from '@/components/Hero';
import gsap from 'gsap';

export default function Home() {
  const { stage, setStage } = useAppContext();
  const { isTouchDevice } = useDeviceType();
  const mainRef = useRef<HTMLDivElement>(null);



  // Cinematic GSAP reveal after lanyard drag (only for non-touch devices)
  useEffect(() => {
    if (stage === 'cinematic' && mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { scale: 1.15, opacity: 0, filter: 'blur(24px)', y: '4vh' },
        {
          delay: 0.1,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          y: '0vh',
          duration: 1.4,
          ease: 'power3.out',
          onComplete: () => setStage('home'),
        }
      );
    }
  }, [stage, setStage]);

  // Lanyard is gone, so hero layout uses standard stage checks or none at all since CinematicIntro covers the screen.
  const isIntro = stage === 'preloading' || stage === 'lanyard';

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* Hero is always mounted to preload the video */}
      <div
        ref={mainRef}
        style={{
          opacity: isIntro ? 0 : 1,
          transform: isIntro ? 'scale(1.15) translateY(4vh)' : 'scale(1) translateY(0)',
          filter: isIntro ? 'blur(24px)' : 'none',
          transition: 'none', // GSAP controls transitions, not CSS
          willChange: 'transform, opacity, filter',
        }}
        className="w-full h-full"
      >
        <Hero />
      </div>

      {/* Cinematic Intro overlay — rendered for all devices */}
      <CinematicIntro />
    </main>
  );
}
