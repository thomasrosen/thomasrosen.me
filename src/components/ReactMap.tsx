import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import useDarkTheme from '@/components/hooks/useDarkTheme'
import type { TimelineEntry } from '@/types'

function absoluteStyle(_previousStyle: any, nextStyle: any) {
  return nextStyle
  // return {
  //   ...nextStyle,
  //   // make relative paths absolute
  //   sprite: [
  //     ...nextStyle.sprite.map((s: any) => {
  //       return {
  //         ...s,
  //         url: s.url, // new URL(s.url, window.location.href).href,
  //       }
  //     }),
  //   ],
  //   // URL will % encode the {} in nextStyle.glyphs, so assemble the URL manually
  //   glyphs: nextStyle.glyphs, // window.location.origin +
  //   sources: {
  //     'versatiles-shortbread': {
  //       ...nextStyle.sources['versatiles-shortbread'],
  //       // tiles: [window.location.origin + nextStyle.sources['versatiles-shortbread'].tiles[0]],
  //       tiles: [
  //         `https://vector.openstreetmap.org${nextStyle.sources['versatiles-shortbread'].tiles[0]}`,
  //       ],
  //     },
  //   },
  // }
}

export function ReactMap({
  entries,
  onEntryMarkerClick,
  renderEntryMarker,
}: {
  entries: TimelineEntry[]
  onEntryMarkerClick: ({ entry }: { entry: TimelineEntry }) => void
  renderEntryMarker: ({ entry, index }: { entry: TimelineEntry; index: number }) => React.ReactNode
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markersCacheRef = useRef<any[]>([])
  const markerElementRefs = useRef<any>({})

  const userWantsDarkmode = useDarkTheme()
  const mapStylePath = userWantsDarkmode
    ? '/map_styles/liberty-dark.json'
    : '/map_styles/liberty.json' // https://tiles.openfreemap.org/styles/liberty

  useEffect(() => {
    // this useEffect is only called once. all changes to the map must be in other useEffects

    if (map.current) {
      // stops map from intializing more than once
      return
    }

    if (!mapContainer.current) {
      return
    }

    maplibregl.setRTLTextPlugin(
      'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js',
      true // Lazy load the plugin
    )

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // style: 'https://vector.openstreetmap.org/demo/shortbread/colorful.json',
      // center: [lng, lat],
      // zoom,
      center: [7, 50],
      zoom: 1,
      hash: true,
      minZoom: 2.5,
      maxZoom: 18, // A zoom level this high is a bit silly but helps testing
      canvasContextAttributes: { antialias: true }, // create the gl context with MSAA antialiasing, so custom layers are antialiased
    })
    map.current.setStyle(mapStylePath, {
      // The paths in the style are relative, but MapLibre GL JS needs
      // absolute URLs. This is done below, taking the URL of the page
      // for the path. This is because the page could be served on
      // multiple domains, e.g. 127.0.0.1, vector.openstreetmap.org,
      // or a specific server.
      transformStyle: mapStylePath.startsWith('http') ? undefined : absoluteStyle,
    })

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    map.current.on('style.load', () => {
      if (!map.current || map.current === null) {
        return
      }

      map.current.setProjection({
        type: 'globe', // Set projection to globe
      })
    })
  }, [mapStylePath])

  useEffect(() => {
    if (!map.current || map.current === null) {
      // only change if map exists
      return
    }

    map.current.setStyle(mapStylePath, {
      // The paths in the style are relative, but MapLibre GL JS needs
      // absolute URLs. This is done below, taking the URL of the page
      // for the path. This is because the page could be served on
      // multiple domains, e.g. 127.0.0.1, vector.openstreetmap.org,
      // or a specific server.
      transformStyle: mapStylePath.startsWith('http') ? undefined : absoluteStyle,
    })
  }, [mapStylePath])

  useEffect(() => {
    if (!map.current || map.current === null) {
      // only change if map exists
      return
    }

    function clearMarkers() {
      for (const { marker, element, func } of markersCacheRef.current) {
        element.removeEventListener('click', func)
        marker.remove()
      }
      markersCacheRef.current = []
    }

    map.current.on('style.load', () => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      clearMarkers()
      for (const entry of entries) {
        if (!(entry.id && !!entry.longitude && !!entry.latitude)) {
          continue
        }

        const marker_element = markerElementRefs.current[entry.id]
        const cloned_marker_element = marker_element.cloneNode(true)
        const onMarkerClickFunc = () => {
          onEntryMarkerClick({ entry })
        }
        cloned_marker_element.addEventListener('click', onMarkerClickFunc)

        const newMarker = new maplibregl.Marker({
          element: cloned_marker_element,
          opacity: '1',
          opacityWhenCovered: '0',
        })
          .setLngLat({ lng: entry.longitude, lat: entry.latitude })
          .addTo(map.current)
        markersCacheRef.current.push({
          marker: newMarker,
          element: cloned_marker_element,
          func: onMarkerClickFunc,
        })
      }
    })

    return () => {
      clearMarkers()
    }
  }, [entries, onEntryMarkerClick])

  return (
    <>
      <div className="h-full w-full" ref={mapContainer} />

      <div className="absolute hidden h-[0px] w-[0px]">
        {entries.map((entry, index) => {
          const markerComponent = renderEntryMarker({ entry, index })
          return (
            <div
              className="relative z-10 hover:z-20"
              key={entry.id}
              ref={(el) => {
                if (entry.id) {
                  markerElementRefs.current[entry.id] = el
                }
              }}
            >
              {markerComponent}
            </div>
          )
        })}
      </div>
    </>
  )
}
