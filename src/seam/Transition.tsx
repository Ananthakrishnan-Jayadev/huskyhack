import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/app/store';
import { closingLine } from '@/shared/copy';
import { playSound, silenceTone } from '@/shared/sounds';

export function Transition() {
  const setPhase = useAppStore((state) => state.setPhase);
  const hasPlayedSilence = useRef(false);

  useEffect(() => {
    const soundTimer = window.setTimeout(() => {
      if (!hasPlayedSilence.current) {
        hasPlayedSilence.current = true;
        playSound(silenceTone);
      }
    }, 12000);

    const mapTimer = window.setTimeout(() => {
      setPhase('map');
    }, 15000);

    return () => {
      window.clearTimeout(soundTimer);
      window.clearTimeout(mapTimer);
    };
  }, [setPhase]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <motion.div
        className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-amber-200 shadow-[0_0_40px_rgba(253,230,138,0.9)]"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 22, 120], opacity: [0, 1, 0.24] }}
        transition={{ duration: 8, times: [0, 0.45, 1], ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-x-0 top-1/2 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-amber-200 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0.35] }}
        transition={{ duration: 8, delay: 2.8, ease: 'easeInOut' }}
      />
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="text-lg text-white/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -8] }}
          transition={{ duration: 7, delay: 7.8, times: [0, 0.18, 0.78, 1] }}
        >
          You are one of these.
        </motion.p>
        <motion.h2
          className="mt-8 max-w-4xl text-3xl font-black leading-tight md:text-6xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 12 }}
        >
          {closingLine}
        </motion.h2>
      </section>
    </main>
  );
}
