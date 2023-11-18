'use client'

// source: https://twitter.com/artur_bien/status/1714744102070231413
// source: https://codesandbox.io/p/sandbox/shine-effect-pvyr2j?file=%2Fsrc%2FShine.tsx%3A1%2C1

import React from "react";

function getBounds(children: HTMLDivElement) {
  return new Promise<IntersectionObserverEntry["boundingClientRect"]>((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      // Loop through all `entries` returned by the observer
      for (const entry of entries) {
        // The `entry.boundingClientRect` is where all the dimensions are stored
        resolve(entry.boundingClientRect)
        observer.disconnect();
        break;
      }
    }, {
      threshold: [],
    });

    observer.observe(children as Element);
  })
}

export function Shine ({
  children,
  lightColor = "#666666",
  puffyness = "1",
  ...otherProps
}: {
  children: React.ReactNode
  lightColor?: `#${string}`
  puffyness?: "0" | "0.5" | "0.75" | "1" | "1.25" | "1.5" | "1.75" | "2" | "3"
} & React.ComponentProps<"div">) {
  const filterId = React.useId();
  const filterRef = React.useRef<SVGFilterElement>(null);
  const childrenWrapperRef = React.useRef<HTMLDivElement>(null);
  const mouse = React.useRef({
    x: -9999,
    y: -9999,
  });

  React.useEffect(() => {
    const children = childrenWrapperRef.current;
    const filterElement = filterRef.current;
    const lightElement = filterElement?.querySelector("fePointLight");
    if (!filterElement || !children || !lightElement) return;

    const setPos = async () => {
      // const childrenBox = children.getBoundingClientRect();
      const childrenBox = await getBounds(children);

      lightElement.setAttribute('y', String(mouse.current.y - childrenBox.top));
      lightElement.setAttribute('x', String(mouse.current.x - childrenBox.left));
    }

    const onPointerMove = (event: PointerEvent) => {
      mouse.current = {
        x: event.pageX - window.scrollX,
        y: event.pageY - window.scrollY,
      };
      setPos();
    };

    const onScroll = () => setPos()

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("scroll", onScroll);
    }
  }, [])

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none",
      }}
      {...otherProps}
    >
      <svg
        width="0"
        height="0"
        // This is crucial. Without these styles the effect breaks on some browsers
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <filter id={filterId} ref={filterRef} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation={puffyness} />
          <feSpecularLighting
            result="light-source"
            // represents the height of the surface for a light filter primitive
            surfaceScale="2"
            // The bigger the value the bigger the reflection
            specularConstant="0.75"
            // controls the focus for the light source. The bigger the value the brighter the light
            specularExponent="120"
            lightingColor={lightColor}
          >
            <fePointLight x={mouse.current.x} y={mouse.current.y} z="300" />
          </feSpecularLighting>
          <feComposite
            result="reflections"
            in="light-source"
            in2="SourceAlpha"
            operator="in"
          />
          <feComposite
            in="SourceGraphic"
            in2="reflections"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>
      </svg>
      <div
        style={{ filter: `url(#${filterId})`, isolation: "isolate" }}
        ref={childrenWrapperRef}
      >
        {children}
      </div>
    </div>
  );
}
