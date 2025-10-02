import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <body>
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <Typo as="h1">Not Found</Typo>
        <Typo as="p">Could not find requested resource</Typo>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </body>
  )
}
