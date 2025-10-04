import { cn } from '@/lib/utils'

export function HR({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        'smooth-rounded-[3px] my-8 h-[3px] border-0 bg-[currentColor] opacity-90',
        className
      )}
    />
  )
}
