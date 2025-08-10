'use client'

// source: https://twitter.com/artur_bien/status/1714744102070231413
// source: https://codesandbox.io/p/sandbox/shine-effect-pvyr2j?file=%2Fsrc%2FShine.tsx%3A1%2C1

import { useEffect, useId, useRef } from 'react'

export function Shine({
  children,
  lightColor = '#666666',
  puffyness = '1',
  ...otherProps
}: {
  children: React.ReactNode
  lightColor?: `#${string}`
  puffyness?: '0' | '0.5' | '0.75' | '1' | '1.25' | '1.5' | '1.75' | '2' | '3'
} & React.ComponentProps<'div'>) {
  const filterId = useId()
  const filterRef = useRef<SVGFilterElement>(null)
  const childrenWrapperRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({
    x: -9999,
    y: -9999,
  })

  useEffect(() => {
    const children = childrenWrapperRef.current
    const filterElement = filterRef.current
    const lightElement = filterElement?.querySelector('fePointLight')
    if (!(filterElement && children && lightElement)) return

    function getBounds(children: HTMLDivElement) {
      return new Promise<IntersectionObserverEntry['boundingClientRect']>((resolve) => {
        const observer = new IntersectionObserver(
          (entries) => {
            // Loop through all `entries` returned by the observer
            for (const entry of entries) {
              // The `entry.boundingClientRect` is where all the dimensions are stored
              resolve(entry.boundingClientRect)
              observer.disconnect()
              break
            }
          },
          {
            threshold: [],
          }
        )

        observer.observe(children as Element)
      })
    }

    const setPos = async () => {
      // const childrenBox = children.getBoundingClientRect();
      const childrenBox = await getBounds(children)

      lightElement.setAttribute('y', String(mouse.current.y - childrenBox.top))
      lightElement.setAttribute('x', String(mouse.current.x - childrenBox.left))
    }

    const onPointerMove = (event: PointerEvent) => {
      mouse.current = {
        x: event.pageX - window.scrollX,
        y: event.pageY - window.scrollY,
      }
      setPos()
    }

    const onScroll = () => setPos()

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        userSelect: 'none',
      }}
      {...otherProps}
    >
      <svg
        height="0"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        // This is crucial. Without these styles the effect breaks on some browsers
        width="0"
      >
        <filter colorInterpolationFilters="sRGB" id={filterId} ref={filterRef}>
          <feGaussianBlur in="SourceAlpha" stdDeviation={puffyness} />
          <feSpecularLighting
            lightingColor={lightColor}
            // represents the height of the surface for a light filter primitive
            result="light-source"
            // The bigger the value the bigger the reflection
            specularConstant="0.75"
            // controls the focus for the light source. The bigger the value the brighter the light
            specularExponent="120"
            surfaceScale="2"
          >
            <fePointLight x={mouse.current.x} y={mouse.current.y} z="300" />
          </feSpecularLighting>
          <feComposite in="light-source" in2="SourceAlpha" operator="in" result="reflections" />
          <feComposite
            in="SourceGraphic"
            in2="reflections"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            operator="arithmetic"
          />
        </filter>
      </svg>
      <span
        ref={childrenWrapperRef}
        style={{
          display: 'inline-block',
          filter: `url(#${filterId})`,
          isolation: 'isolate',
        }}
      >
        {children}
      </span>
    </span>
  )
}
