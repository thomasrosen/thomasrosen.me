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
      href={href}
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
