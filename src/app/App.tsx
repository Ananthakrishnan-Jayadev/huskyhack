import { Map } from '@/map/Map';
import { Transition } from '@/seam/Transition';
import { tagline, title } from '@/shared/copy';
import { useAppStore } from './store';

export function App() {
  const phase = useAppStore((state) => state.phase);
  const startDemoMap = useAppStore((state) => state.startDemoMap);

  if (phase === 'seam') return <Transition />;
  if (phase === 'map') return <Map mode="all" />;

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
          onClick={startDemoMap}
        >
          Start map reveal
        </button>
      </section>
    </main>
  );
}
