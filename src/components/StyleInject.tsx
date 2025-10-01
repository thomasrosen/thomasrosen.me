'use client'

import { useEffect } from 'react'

export function StyleInject({
  selector = 'body',
  className,
}: {
  selector?: string
  className?: string
}) {
  useEffect(() => {
    console.log('selector', selector)
    console.log('className', className)

    const element = document.querySelector(selector)
    console.log('element', element)
    if (!element) {
      return
    }

    element.classList.add(className || '')

    // cleanup to reset the style when the component is unmounted or className changes
    return () => {
      element.classList.remove(className || '')
    }
  }, [selector, className])

  return null
}
