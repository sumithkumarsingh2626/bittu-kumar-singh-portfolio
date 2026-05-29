export type ParticleFieldItem = {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
};

function pseudoRandom(seed: number, index: number, channel: number) {
  const value = Math.sin(seed * 127.1 + index * 311.7 + channel * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

export function createParticleField(count: number, seed: number): ParticleFieldItem[] {
  return Array.from({ length: count }, (_, index) => {
    const size = pseudoRandom(seed, index, 1) * 2 + 1;

    return {
      id: index,
      size,
      top: pseudoRandom(seed, index, 2) * 100,
      left: pseudoRandom(seed, index, 3) * 100,
      duration: pseudoRandom(seed, index, 4) * 5 + 3,
      delay: pseudoRandom(seed, index, 5) * 5,
      opacity: pseudoRandom(seed, index, 6) * 0.5 + 0.2,
    };
  });
}
