import { Dot } from '@/components/Dot'
import { Typo } from '@/components/Typo'
import Link from 'next/link'

export function DotLinkRow({
  'data-umami-event': dataUmamiEvent,
  href,
  color,
  label,
  value,
}: {
  color: string
  'data-umami-event': string
  href: string
  label: string
  value: string
}) {
  return (
    <Link
      className="group/link !no-underline col-span-full grid grid-cols-subgrid"
      data-umami-event={dataUmamiEvent}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Typo as="h3" className="!no-underline !text-foreground flex items-center gap-3 text-md">
        <Dot className="transition-transform group-hover/link:scale-150" color={color} />
        {label}
      </Typo>
      <span className="group-hover/link:underline">{value}</span>
    </Link>
  )
}
