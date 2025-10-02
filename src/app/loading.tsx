import { Icon } from '@/components/Icon'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <Icon className="animate-spin" name="loading" size="xl" />
      <span className="opacity-60">Loading…</span>
    </div>
  )
}
