import { Shine } from '@/components/Shine'

export function Dot({ color = 'var(--foreground)', className = '' }) {
  return (
    <Shine className="inline-flex items-center justify-center" puffyness="1" specularConstant="1">
      <div
        className={className}
        style={{
          display: 'inline-block',
          width: '0.8rem',
          height: '0.8rem',
          borderRadius: '50%',
          verticalAlign: 'middle',
          // marginInlineEnd: '0.8rem',
          backgroundColor: color,
        }}
      />
    </Shine>
  )
}
