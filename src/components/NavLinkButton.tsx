'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button asChild size="lg" variant={isActive ? 'secondary' : 'glass'}>
      <Link className="is-button" href={href}>
        {children}
      </Link>
    </Button>
  )
}
