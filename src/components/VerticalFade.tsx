import { cn } from '@/lib/utils'
import { ProgressiveBlur } from './progressive-blur'

// make sure typescript understand css variables in styles
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number // cause we are using a custom css-property
  }
}

export function VerticalFade({
  direction,
  className,
  children,
  style,
  classNameContent,
}: {
  direction?: 'top' | 'bottom'
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  classNameContent?: string
}) {
  return (
    <div
      className={cn(
        'pointer-events-none',
        'sticky w-full',
        'z-50',
        direction === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{
        '--fade-background': 'var(--background)',
        ...style,
      }}
    >
      <div
        className={cn(
          'z-10',
          'pointer-events-none absolute h-[100%] min-h-12 w-full',
          'from-10% from-[var(--fade-background)]',
          direction === 'top' ? 'bottom-0 bg-gradient-to-b' : 'top-0 bg-gradient-to-t'
        )}
      />
      <ProgressiveBlur
        blurIntensity={1}
        className={cn(
          'z-20',
          'pointer-events-none absolute left-0 h-[100%] min-h-12 w-full',
          direction === 'top' ? 'bottom-0' : 'top-0'
        )}
        direction={direction}
      />
      <div
        className={cn(
          'z-30',
          'pointer-events-none absolute h-[100%] min-h-12 w-full',
          'from-10% from-[var(--fade-background)]',
          direction === 'top' ? 'bottom-0 bg-gradient-to-b' : 'top-0 bg-gradient-to-t'
        )}
      />
      {children ? (
        <div
          className={cn(
            'pointer-events-auto relative z-40 h-auto',
            direction === 'top' ? 'mb-6' : 'mt-6',
            classNameContent
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}

export function VerticalFadeStyles() {
  return (
    <style
      // biome-ignore lint/security/noDangerouslySetInnerHtml: we know the code is safe
      dangerouslySetInnerHTML={{
        __html: `.verticalFade {
              position: absolute;
              pointer-events: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              user-select: none;
              width: 100%;
              left: 0;
              -webkit-backdrop-filter: blur(var(--fade, 1px));
              backdrop-filter: blur(var(--fade, 1px));
              will-change: transform;
            }
            .verticalFade.top {
              bottom: 0;
              background: linear-gradient(
                to bottom,
                var(--fade-background) 0%,
                transparent 25%
              );
              -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent);
              mask-image: linear-gradient(to bottom, black 0%, transparent);
            }
            .verticalFade.bottom {
              top: 0;
              background: linear-gradient(
                to top,
                var(--fade-background) 0%,
                transparent 25%
              );
              -webkit-mask-image: linear-gradient(to top, black 0%, transparent);
              mask-image: linear-gradient(to top, black 0%, transparent);
            }`.replace(/^(\s+)/gm, ''),
      }}
    />
  )
}
