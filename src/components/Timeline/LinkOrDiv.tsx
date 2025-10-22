import { cn } from '@/lib/utils'
import Link from 'next/link'

export function LinkOrDiv({
  children,
  className,
  href,
}: {
  children: React.ReactNode
  className?: string
  href?: string
}) {
  const isExternalLink = Boolean(href?.startsWith('http'))

  return href ? (
    <Link
      className={cn(
        'is-button',
        '!text-inherit !no-underline !hover:no-underline',
        'focus-visible:-outline-offset-3 focus-visible:outline-[3px] focus-visible:outline-ring focus-visible:outline-solid',
        className
      )}
      href={href}
      rel={isExternalLink ? 'noreferrer' : undefined}
      target={isExternalLink ? '_blank' : '_self'}
    >
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  )
}
