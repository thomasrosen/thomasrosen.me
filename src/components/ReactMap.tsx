import useDarkTheme from '@/components/hooks/useDarkTheme'
import type { TimelineEntry } from '@/types'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useRef } from 'react'

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
    ? 'https://api.maptiler.com/maps/0199b5a8-a337-72d0-8131-30642ac6c1d3/style.json?key=o3zELAXbKePggwdGFWww' // '/map_styles/liberty-dark.json'
    : 'https://api.maptiler.com/maps/0199b5cc-cff4-7175-814c-751f58656516/style.json?key=o3zELAXbKePggwdGFWww' // 'https://tiles.openfreemap.org/styles/liberty' // /map_styles/liberty.json' // https://tiles.openfreemap.org/styles/liberty

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
      center: [13.405, 52.52], // [7, 50],
      zoom: 15,
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

  /*
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
          subpixelPositioning: true,
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
  */

  useEffect(() => {
    if (!map.current || map.current === null) {
      // only change if map exists
      return
    }

    // it is used but ts doesn't see it
    let htmlMarker: maplibregl.Marker | null = null
    let hoveredId: string | null = null

    const onPoiMouseenter = (e: any) => {
      console.log('onPoiMouseenter', e)
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      map.current.getCanvas().style.cursor = 'pointer'

      if (!map.current || map.current === null) {
        // if (!e.features || e.features.length === 0) {
        //   return
        // }

        // const f = e.features[0]

        // const el = document.createElement('div')
        // // el.className = '' // size via CSS
        // el.innerHTML = `<div class="open_marker">${f.properties.iconSvg}</div>`
        // // el.style.pointerEvents = 'none'
        // htmlMarker = new maplibregl.Marker({
        //   element: el,
        //   anchor: 'center',
        //   opacityWhenCovered: '0',
        //   subpixelPositioning: true,
        // })
        //   .setLngLat(f.geometry.coordinates)
        //   .addTo(map.current)

        // map.current.setFeatureState({ source: 'pois', id: f.id }, { hidden: true })

        // // The event object (e) contains information like the
        // // coordinates of the point on the map that was clicked.
        // console.log('A click event has occurred at:', e.lngLat)
        // // map.current.getCanvas().style.cursor = 'pointer'

        // only change if map exists
        return
      }

      const f = e?.features[0]
      if (!f || f.id === hoveredId) {
        return
      }

      if (hoveredId != null) {
        map.current.setFeatureState({ source: 'pois', id: hoveredId }, { hidden: false })
      }
      hoveredId = f.id

      if (hoveredId) {
        map.current.setFeatureState({ source: 'pois', id: hoveredId }, { hidden: true })
      }

      const el = document.createElement('div')
      // el.className = '' // size via CSS
      el.innerHTML = `<div class="open_marker">${f.properties.iconSvg}</div>`
      el.style.pointerEvents = 'none'

      htmlMarker = new maplibregl.Marker({
        element: el,
        anchor: 'center',
        opacityWhenCovered: '0',
        subpixelPositioning: true,
      })
        .setLngLat(f.geometry.coordinates)
        .addTo(map.current)

      setTimeout(() => {
        el.classList.add('is_being_hovered') // start animation
      }, 100)
    }
    /*
    const onPoiMousemove = (e: any) => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      const f = e?.features[0]
      if (!f || f.id === hoveredId) {
        return
      }

      if (hoveredId != null) {
        map.current.setFeatureState({ source: 'pois', id: hoveredId }, { hidden: false })
      }
      hoveredId = f.id

      if (hoveredId) {
        map.current.setFeatureState({ source: 'pois', id: hoveredId }, { hidden: true })
      }

      const el = document.createElement('div')
      // el.className = '' // size via CSS
      el.innerHTML = `<div class="open_marker">${f.properties.iconSvg}</div>`
      // el.style.pointerEvents = 'none'
      htmlMarker = new maplibregl.Marker({
        element: el,
        anchor: 'center',
        opacityWhenCovered: '0',
        subpixelPositioning: true,
      })
        .setLngLat(f.geometry.coordinates)
        .addTo(map.current)
    }
    */

    const onPoiMouseleave = (_e: any) => {
      console.log('onPoiMouseleave', _e)

      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      map.current.getCanvas().style.cursor = ''

      htmlMarker?.getElement().classList.remove('is_being_hovered') // remove animation
      setTimeout(() => {
        if (hoveredId !== null) {
          map.current?.setFeatureState({ source: 'pois', id: hoveredId }, { hidden: false })
          hoveredId = null
        }

        if (htmlMarker) {
          htmlMarker.remove()
        }
      }, 200)
    }

    map.current.on('load', async () => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      /*
      const pois = {
        type: 'FeatureCollection' as const,
        features: [
          {
            type: 'Feature' as const,
            geometry: { type: 'Point' as const, coordinates: [13.405, 52.52] },
            properties: {
              iconName: 'cafe_abc123_svg',
              iconUrl: '/icons/cafe.png',
              iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#f00"><path d="M538-80H423v-149H120l189-274h-95l266-377 266 377h-94l188 274H538v149ZM236-289h189-90 290-89 189-489Zm0 0h489L536-563h89L480-769 335-563h90L236-289Z"/></svg>`,
            },
          },
          {
            type: 'Feature' as const,
            geometry: { type: 'Point' as const, coordinates: [13.39, 52.51] },
            properties: {
              iconName: 'park_abc123_svg',
              iconUrl: '/icons/park.png',
              iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#0f0"><path d="M805-261q27 14 45.5-9t4.5-48l-71-134-54 147 75 44Zm-212-42h70l97-242q6-14 4.5-27.5T748-593l-83-36q-14-7-28 0t-15 21l-29 305Zm-296 0h69l-28-305q-1-15-13.5-22t-29.5 1l-79 34q-13 5-14.5 22.5T205-541l92 238Zm-142 42 75-44-54-147-71 139q-14 28 6 45.5t44 6.5Zm271-42h107l33-364q2-14-7.5-23.5T535-700H425q-16 0-24 9.5t-7 23.5l32 364ZM133-200q-39 0-66-28t-27-67q0-12 4.5-23.5T54-341l92-179q-15-39-3-77.5t48-54.5l83-34q16-6 32.5-7t30.5 8q8-32 32-53.5t56-21.5h110q32 0 56 20t32 51q15-6 31-5t31 8l84 34q37 14 49.5 52t-4.5 74l92 184q4 11 9 21.5t5 21.5q0 42-30 70.5T818-200q-11 0-20.5-4.5T778-213l-61-30H242l-58 30q-12 5-24.5 9t-26.5 4Zm347-280Z"/></svg>`,
            },
          },
        ],
      }
      */

      const imageUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'><rect width='1' height='1' fill='green'/></svg>`)}`

      const pois = {
        type: 'FeatureCollection' as const,
        features: [
          {
            id: 'poi_1',
            type: 'Feature' as const,
            geometry: { type: 'Point' as const, coordinates: [13.405, 52.52] },
            properties: {
              rank: 1,
              name: 'Cafe NAME',
              'name:en': 'Cafe NAME:EN',
              iconName: 'cafe_1',
              iconUrl: '/icons/cafe.png',
              // iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px"><path fill="#fff" d="M538-80H423v-149H120l189-274h-95l266-377 266 377h-94l188 274H538v149ZM236-289h189-90 290-89 189-489Zm0 0h489L536-563h89L480-769 335-563h90L236-289Z"/></svg>`,
              iconColor: '#FF9D00',
              iconSvg: `
<svg width="256" height="256" viewBox="-5 -5 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="m_icon_frame">
<g id="m_icon_wrapper">
<g id="m_image_wrapper">
<rect id="m_image" x="4" y="4" width="50" height="66" rx="4" transform="rotate(-5)" fill="url(#pattern0_1_74)" stroke="black" stroke-width="2" style="filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));"/>
</g>
<g id="m_note_group" style="filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));">
<rect id="m_note_bg" x="43.295" y="35.9396" width="32.8838" height="33.679" transform="rotate(12 43.295 35.9396)" fill="#75FDFF"/>

<foreignObject id="m_note_text" transform="translate(45.0685 38.2403) rotate(12)" width="32" height="32" style="line-height: 0;">
<body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0; padding: 0; word-wrap: break-word; white-space: normal; font-size: 5px; font-family: 'Ubuntu', sans-serif; color: black; margin: 0; padding: 0; font-weight: 400; letter-spacing: 0px; line-height: 1.1; overflow: hidden text-overflow: ellipsis; white-space: nowrap;"><span style="margin: 0; padding: 0; word-wrap: break-word; white-space: normal; font-size: 5px; font-family: 'Ubuntu', sans-serif; color: black; margin: 0; padding: 0; font-weight: 400; letter-spacing: 0px; line-height: 1.1; overflow: hidden text-overflow: ellipsis; white-space: nowrap;"><strong>Dies ist ein langer Text,</strong> der über mehrere Zeilen umgebrochen wird.</span></body>
</foreignObject>
</g>
<g id="m_icon_group" style="filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));">
<rect id="m_icon_bg" x="28" y="54.97" width="24" height="24" rx="12" fill="white"/>
<path id="m_icon" d="M40 58.97L41.7961 64.4978H47.6085L42.9062 67.9142L44.7023 73.4421L40 70.0257L35.2977 73.4421L37.0938 67.9142L32.3915 64.4978H38.2039L40 58.97Z" fill="#FF9D00"/>
</g>
</g>
</g>
<defs>
<pattern id="pattern0_1_74" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_1_74" transform="matrix(0.000634921 0 0 0.00047619 -0.566667 0)"/>
</pattern>
<image id="image0_1_74" data-name="Screenshot 2025-10-06 at 02.06.04.png" width="3360" height="2100" preserveAspectRatio="none" xlink:href="${imageUri}"/>
</defs>
</svg>
`,
            },
          },
        ],
      }

      /*
      <g id="m_note_text">
      <text transform="translate(45.0685 38.2403) rotate(12)" fill="black" xml:space="preserve" style="white-space: pre" font-family="Ubuntu" font-size="5" letter-spacing="0em"><tspan x="0" y="10.8575">Lorem </tspan><tspan x="0" y="16.8575">Ipsum dolor </tspan><tspan x="0" y="22.8575">sit amet </tspan><tspan x="0" y="28.8575">more text…</tspan></text>
<text transform="translate(45.0685 38.2403) rotate(12)" fill="black" xml:space="preserve" style="white-space: pre" font-family="Ubuntu" font-size="5" letter-spacing="0em"></text>
<text transform="translate(45.0685 38.2403) rotate(12)" fill="black" xml:space="preserve" style="white-space: pre" font-family="Ubuntu" font-size="5" font-weight="bold" letter-spacing="0em"><tspan x="0" y="4.8575">Hello World&#10;</tspan></text>
</g>
 */

      map.current.addSource('pois', { type: 'geojson', data: pois })

      // dedupe and preload all icons
      const unique = Array.from(
        new Map(
          pois.features.map((f) => {
            let iconSvg = f.properties.iconSvg

            if (iconSvg) {
              iconSvg = iconSvg.replace(/\n/g, '') // remove newlines

              return [
                f.properties.iconName,
                `data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSvg)}`,
              ]
            }

            if (f.properties.iconUrl) {
              return [f.properties.iconName, f.properties.iconUrl]
            }

            return [f.properties.iconName, ''] // should not happen
          })
        )
      )

      try {
        await Promise.all(
          unique.map(([name, url]) => {
            if (!map.current || map.current === null) {
              // only change if map exists
              return false
            }

            // check if image already exists
            if (map.current.hasImage(name)) {
              return false
            }

            // load image from URL and add to map
            const img = new Image()
            img.onload = () => {
              if (!map.current || map.current === null) {
                // only change if map exists
                return
              }

              map.current.addImage(name, img, { pixelRatio: 2 }) // crisp @2x
            }
            img.onerror = (error) => {
              console.warn('failed-to-load-image', name, url, error)
            }
            img.src = url

            return false
          })
        )
      } catch (e) {
        console.error('error loading images', e)
      }

      map.current.addLayer({
        id: 'poi-icons',
        type: 'symbol' as const,
        source: 'pois',
        minzoom: 0,
        layout: {
          // 'icon-image': 'park',
          // 'icon-image': ['coalesce', ['image', ['get', 'iconName']], ['image', 'park']],
          'icon-image': ['get', 'iconName'], // per-feature icon
          'icon-allow-overlap': false,
          'icon-size': 1,
          // 'icon-size': ['interpolate', ['linear'], ['zoom'], 5, 0.6, 15, 1.2],
          'symbol-sort-key': ['to-number', ['get', 'rank']],
          'text-anchor': 'top',
          'text-field': ['get', 'name'],
          'text-font': ['Ubuntu Medium', 'Noto Sans Medium'],
          'text-line-height': 0.9,
          'text-max-width': 12,
          'text-optional': true,
          'text-padding': 2,
          'text-size': 16,
          visibility: 'visible',
          'text-justify': 'center',
          'icon-anchor': 'bottom',
          'icon-text-fit': 'none',
          'text-offset': [0, 0],
          'text-overlap': 'never',
          'icon-overlap': 'never', // 'cooperative', // 'always', // 'never',
          'text-pitch-alignment': 'auto',
          'text-rotation-alignment': 'auto',
          'text-ignore-placement': false,
        },
        paint: {
          'icon-opacity': ['case', ['boolean', ['feature-state', 'hidden'], false], 0, 1],
          'text-color': ['get', 'iconColor'],
          'text-halo-blur': ['interpolate', ['linear'], ['zoom'], 12, 1, 14, 0.5, 16, 0],
          'text-halo-color': 'hsla(0, 0%, 0%, 0.5)',
          'text-halo-width': 2,
          'text-opacity': 1,
        },
      })

      map.current.on('mouseenter', 'poi-icons', onPoiMouseenter)
      // map.current.on('mousemove', 'poi-icons', onPoiMousemove)
      map.current.on('mouseleave', 'poi-icons', onPoiMouseleave)
    })

    return () => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      map.current.off('mouseenter', 'poi-icons', onPoiMouseenter)
      // map.current.off('mousemove', 'poi-icons', onPoiMousemove)
      map.current.off('mouseleave', 'poi-icons', onPoiMouseleave)
    }
  }, [])

  return (
    <>
      {/* <div className="hidden scale-50 cursor-pointer hover:scale-[0.6]" /> */}

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
