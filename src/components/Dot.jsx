import { Shine } from '@/components/Shine'

export function Dot({ color = 'var(--foreground)' }) {
  return (
    <Shine puffyness="1" specularConstant="1">
      <div
        style={{
          display: 'inline-block',
          width: '0.8rem',
          height: '0.8rem',
          borderRadius: '50%',
          verticalAlign: 'middle',
          marginInlineEnd: '0.8rem',
          backgroundColor: color,
        }}
      />
    </Shine>
  )
}
