export const possibleImageAspectRatios: Record<string, string> = {
  '0.25': 'aspect-[0.25]',
  '0.5': 'aspect-[0.5]',
  '0.57': 'aspect-[0.57]',
  '0.75': 'aspect-[0.75]',
  '1': 'aspect-[1]',
  '1.5': 'aspect-[1.5]',
  '2': 'aspect-[2]',
  '3': 'aspect-[3]',
  '4': 'aspect-[4]',
  '9': 'aspect-[9]',
}

export function findNearestRatio(target: number): string {
  const availableRatios = Object.keys(possibleImageAspectRatios).map(Number)
  return String(
    availableRatios.reduce((prev, curr) =>
      Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
    )
  )
}
