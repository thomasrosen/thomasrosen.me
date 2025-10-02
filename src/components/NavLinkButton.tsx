'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <Button size="lg" variant={isActive ? 'secondary' : 'glass'}>
        {children}
      </Button>
    </Link>
  )
}
