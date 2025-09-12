'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function NavLinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <Button size="lg" variant={isActive ? 'secondary' : 'accent'}>
        {children}
      </Button>
    </Link>
  )
}
