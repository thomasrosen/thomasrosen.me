import { Shine } from '@/components/Shine'

export function Emoji(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <Shine puffyness="2">
      <span {...props} />
    </Shine>
  )
}
