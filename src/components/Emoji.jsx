import { Shine } from '@/components/Shine';

export function Emoji(props) {
  return <Shine puffyness="2">
    <span {...props} />
  </Shine>
}
