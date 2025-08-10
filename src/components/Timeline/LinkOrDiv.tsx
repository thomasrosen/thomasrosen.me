import Link from 'next/link'
import { cn } from '@/lib/utils'

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
      className={cn('!text-inherit !no-underline !hover:no-underline', className)}
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
