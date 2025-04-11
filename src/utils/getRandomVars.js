export function getRandomVars() {
  return {
    '--rotate': `${Math.random() * 16 - 8}deg`, // -20 to 20
    '--scale-start': `${Math.random() * 1 + 1}`, // 1 to 2
    '--scale-end': `${Math.random() * 1 + 2}`, // 2 to 3
    '--opacity-start': `${Math.random() * 0.5 + 0.5}`, // 0.5 to 1
    '--opacity-end': `${Math.random() * 1 + 0}`, // 0 to 1
    '--duration': `${Math.random() * 20 + 10}s`, // 10s to 30s
  }
}
