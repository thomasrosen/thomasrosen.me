'use client'

import { Emoji } from '@/components/Emoji'
import { NavLinkButton } from '@/components/NavLinkButton'
import { Shine } from '@/components/Shine'
import { Typo } from '@/components/Typo'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

export function Header({ className }: { className?: string }) {
  return (
    <div className={cn('@container/header !flex shrink-0 flex-col gap-y-12', className)}>
      <header className="flex-wrap @lg/header:flex-nowrap">
        <Shine puffyness="3">
          <div
            aria-hidden="true"
            className="headerImageOfMe @lg/header:h-[150px] @sm/header:h-[100px] h-[64px] @lg/header:w-[150px] @sm/header:w-[100px] w-[64px] rounded-3xl"
            title="Thomas Rosen eating a slice of watermelon."
          />
        </Shine>

        <Typo
          aria-label="Thomas Rosen"
          as="h1"
          className="!text-[40px] @lg/header:!text-[80px] @sm/header:!text-[60px]"
        >
          <motion.span layoutId="website-title-first">Thomas</motion.span>
          <br />
          <motion.span layoutId="website-title-last">Rosen</motion.span>
        </Typo>
      </header>

      <nav className="!flex flex-row flex-wrap gap-2">
        <NavLinkButton href="/">Hi!</NavLinkButton>
        <NavLinkButton href="/articles/">
          <Emoji aria-hidden="true">📝</Emoji> Blog
        </NavLinkButton>
        <NavLinkButton href="/press/">
          <Emoji aria-hidden="true">📰</Emoji> In the Press
        </NavLinkButton>
        <NavLinkButton href="/playlists/">
          <Emoji aria-hidden="true">🎸</Emoji> Playlists
        </NavLinkButton>
        <NavLinkButton href="/shared/">
          <Emoji aria-hidden="true">🔗</Emoji> Interesting Links
        </NavLinkButton>
        {/*
        <NavLinkButton href="/map/">
          <Emoji aria-hidden="true">🗺️</Emoji> Places
        </NavLinkButton>
        */}
      </nav>
    </div>
  )
}
