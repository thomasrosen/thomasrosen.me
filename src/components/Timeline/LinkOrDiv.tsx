import { type TimelineEntry } from '@/lib/loadTimeline'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function LinkOrDiv({
  entry,
  children,
  className,
}: {
  entry: TimelineEntry
  children: React.ReactNode
  className?: string
}) {
  const linkUrl = entry.url
  const isExternalLink = Boolean(linkUrl?.startsWith('http'))

  return linkUrl ? (
    <Link
      href={linkUrl}
      target={isExternalLink ? '_blank' : '_self'}
      rel={isExternalLink ? 'noreferrer' : undefined}
      className={cn(
        '!text-inherit !hover:no-underline !no-underline',
        className
      )}
    >
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  )
}
