'use client' // Error components must be Client Components

import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <body>
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <Typo as="h1">Something went wrong!</Typo>
        <Typo as="p">{String(error)}</Typo>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          type="button"
        >
          Try again
        </Button>
      </div>
    </body>
  )
}
