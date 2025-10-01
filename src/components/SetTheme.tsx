'use client'

import { useEffect } from 'react'

export default function SetTheme() {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  }, [])

  return null
}
