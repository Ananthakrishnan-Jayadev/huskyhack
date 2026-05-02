import { Howl } from 'howler';

type SoundKey = 'arcDraw' | 'reveal' | 'silenceTone';

const sources: Record<SoundKey, string> = {
  arcDraw: '/sounds/arc-draw.mp3',
  reveal: '/sounds/reveal.mp3',
  silenceTone: '/sounds/silence-tone.mp3',
};

const volumes: Record<SoundKey, number> = {
  arcDraw: 0.4,
  reveal: 0.5,
  silenceTone: 0.3,
};

function createSound(key: SoundKey): Howl | null {
  try {
    return new Howl({
      src: [sources[key]],
      volume: volumes[key],
      preload: true,
      html5: true,
    });
  } catch {
    return null;
  }
}

export const arcDraw = createSound('arcDraw');
export const reveal = createSound('reveal');
export const silenceTone = createSound('silenceTone');

export function playSound(sound: Howl | null) {
  try {
    sound?.play();
  } catch {
    // Sound should never block visuals.
  }
}
