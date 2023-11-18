
import { Shine } from '@/components/Shine';

export function Dot({
  color = 'var(--text-color)',
}) {
  return <Shine><div style={{
    display: 'inline-block',
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    verticalAlign: 'middle',
    marginInlineEnd: '0.8rem',
    backgroundColor: color,
  }} /></Shine>
}
