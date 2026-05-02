// src/app/App.tsx
import { DotWall } from '@/map/DotWall';
import { Transition } from '@/seam/Transition';
import { FramingCard } from '@/pipeline/cards/FramingCard';
import { OriginCard } from '@/pipeline/cards/OriginCard';
import { Pipeline } from '@/pipeline/Pipeline';
import { tagline, title } from '@/shared/copy';
import { useAppStore } from './store';

export function App() {
  const phase = useAppStore((state) => state.phase);
  const setPhase = useAppStore((state) => state.setPhase);

  // Pipeline / framing / origin / outcome screens (teammate's branch)
  if (phase === 'framing') {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-200">
        <FramingCard />
        <DevPhaseIndicator phase={phase} />
      </main>
    );
  }

  if (phase === 'origin') {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-200">
        <OriginCard />
        <DevPhaseIndicator phase={phase} />
      </main>
    );
  }

  if (phase === 'pipeline') {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-200">
        <Pipeline />
        <DevPhaseIndicator phase={phase} />
      </main>
    );
  }

  // Seam transition (your branch)
  if (phase === 'seam') {
    return (
      <>
        <Transition />
        <DevPhaseIndicator phase={phase} />
      </>
    );
  }

  // Final map (your branch)
  if (phase === 'map') {
    return (
      <>
        <DotWall />
        <DevPhaseIndicator phase={phase} />
      </>
    );
  }

  // Default: title screen (your branch)
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
          Canada soccer pipeline
        </p>
        <h1 className="text-5xl font-black leading-tight md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{tagline}</p>
        <button
          className="mt-10 w-fit rounded bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
          type="button"
          onClick={() => setPhase('framing')}
        >
          Start
        </button>
      </section>
      <DevPhaseIndicator phase={phase} />
    </main>
  );
}

function DevPhaseIndicator({ phase }: { phase: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="fixed bottom-2 right-2 z-50 rounded bg-black/80 px-2 py-1 font-mono text-xs text-white/60">
      phase: {phase}
    </div>
  );
}