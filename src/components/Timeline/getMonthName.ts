export function getMonthName(monthIndex: number) {
  // Use a fixed locale and options to ensure consistent rendering
  const options = { month: 'long' } as const
  return new Date(2000, monthIndex, 1).toLocaleString('en-US', options)
}
