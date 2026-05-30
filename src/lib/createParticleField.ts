export type ParticleFieldItem = {
  id: number;
  size: string;
  top: string;
  left: string;
  duration: string;
  delay: string;
  opacity: string;
};

function pseudoRandom(seed: number, index: number, channel: number) {
  const value = Math.sin(seed * 127.1 + index * 311.7 + channel * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

export function createParticleField(count: number, seed: number): ParticleFieldItem[] {
  return Array.from({ length: count }, (_, index) => {
    return {
      id: index,
      size: (pseudoRandom(seed, index, 1) * 2 + 1).toFixed(2),
      top: (pseudoRandom(seed, index, 2) * 100).toFixed(2),
      left: (pseudoRandom(seed, index, 3) * 100).toFixed(2),
      duration: (pseudoRandom(seed, index, 4) * 5 + 3).toFixed(2),
      delay: (pseudoRandom(seed, index, 5) * 5).toFixed(2),
      opacity: (pseudoRandom(seed, index, 6) * 0.5 + 0.2).toFixed(3),
    };
  });
}
