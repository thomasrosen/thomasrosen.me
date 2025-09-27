export function pickFakeRandom(options: string[], fakeRandomness: number) {
  // biome-ignore lint/nursery/noBitwiseOperators: seems to be more complicated with Math functions.
  const hash = (fakeRandomness * 2_654_435_761) >>> 0 // Knuth multiplicative hash
  const randomOption = options[hash % options.length]
  return randomOption
}
