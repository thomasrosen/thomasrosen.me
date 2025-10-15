/** biome-ignore-all assist/source/organizeImports: werd ide config */
import { Icon } from '@/components/Icon'
import { absoluteStyle } from '@/lib/client/absoluteStyle'
// import { onImagesLoaded } from '@/lib/client/onAllImagesLoaded'
import type { TimelineEntry } from '@/types'
import { toBlob as htmlToImage_toBlob } from 'html-to-image'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'

type MarkerFeature = {
  id: string
  type: 'Feature'
  geometry: { type: 'Point'; coordinates: number[] }
  properties: {
    entry: TimelineEntry
    rank: number
    name: string
    iconName: string
    iconUrl?: string
    iconSvg?: string
    iconImageData?: Uint8ClampedArray
    iconWidth?: number
    iconHeight?: number
  }
}

type MarkerFeatureCollection = {
  type: 'FeatureCollection'
  features: MarkerFeature[]
}

type EntryMarkerProps = {
  index: number
  entry: TimelineEntry
  element: HTMLDivElement | null
  dataUrl: string
  imageData?: Uint8ClampedArray
  width: number
  height: number
  state: 'loading' | 'finished' | 'error'
}

export function ReactMap({
  entries,
  onEntryMarkerClick,
  renderEntryMarker,
}: {
  entries: TimelineEntry[]
  onEntryMarkerClick: ({ entry }: { entry: TimelineEntry }) => void
  renderEntryMarker: ({
    entry,
    index,
    ref,
    onImageLoaded,
  }: {
    entry: TimelineEntry
    index: number
    ref?: (element: HTMLDivElement | null) => void
    onImageLoaded?: ({ element }: { element: HTMLDivElement | null }) => void
  }) => React.ReactNode
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maplibregl.Map | null>(null)
  // const markersCacheRef = useRef<any[]>([])
  const markerElementRefs = useRef<Record<string, EntryMarkerProps>>({})

  // const userWantsDarkmode = useDarkTheme()

  useEffect(() => {
    // this useEffect is only called once. all changes to the map must be in other useEffects

    if (map.current) {
      // stops map from intializing more than once
      return
    }

    if (!mapContainer.current) {
      return
    }

    // biome-ignore lint/correctness/noConstantCondition: testing
    const mapStylePath = true // userWantsDarkmode
      ? 'https://api.maptiler.com/maps/0199b5a8-a337-72d0-8131-30642ac6c1d3/style.json?key=o3zELAXbKePggwdGFWww' // '/map_styles/liberty-dark.json'
      : 'https://api.maptiler.com/maps/0199b5cc-cff4-7175-814c-751f58656516/style.json?key=o3zELAXbKePggwdGFWww' // 'https://tiles.openfreemap.org/styles/liberty' // /map_styles/liberty.json' // https://tiles.openfreemap.org/styles/liberty

    maplibregl.setRTLTextPlugin(
      'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js',
      true // Lazy load the plugin
    )

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // style: 'https://vector.openstreetmap.org/demo/shortbread/colorful.json',
      // center: [lng, lat],
      // zoom,
      center: [13.310_462, 52.503_92], // [13.405, 52.52], // [7, 50],
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

    // map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    // map.current.on('style.load', () => {
    //   if (!map.current || map.current === null) {
    //     return
    //   }

    //   map.current.setProjection({
    //     type: 'globe', // Set projection to globe
    //   })
    // })
  }, [])

  // useEffect(() => {
  //   if (!map.current || map.current === null) {
  //     // only change if map exists
  //     return
  //   }
  //
  //   map.current.setStyle(mapStylePath, {
  //     // The paths in the style are relative, but MapLibre GL JS needs
  //     // absolute URLs. This is done below, taking the URL of the page
  //     // for the path. This is because the page could be served on
  //     // multiple domains, e.g. 127.0.0.1, vector.openstreetmap.org,
  //     // or a specific server.
  //     transformStyle: mapStylePath.startsWith('http') ? undefined : absoluteStyle,
  //   })
  // }, [mapStylePath])

  const displayMarkers = useCallback(() => {
    if (!map.current || map.current === null) {
      // only change if map exists
      return
    }

    // it is used but ts doesn't see it
    const htmlMarker: Record<string, maplibregl.Marker> = {}
    let lastHoveredFeature: any = null

    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: should be okay
    const onPoiMouseenter = (event: any) => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      map.current.getCanvas().style.cursor = 'pointer'

      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      const f = event?.features[0]
      lastHoveredFeature = f
      if (!f) {
        return
      }

      const entry = (
        typeof f.properties.entry === 'string' ? JSON.parse(f.properties.entry) : f.properties.entry
      ) as TimelineEntry
      if (!entry.id) {
        return
      }

      if (f.id) {
        // map.current.setFeatureState(
        //   { source: 'pois', sourceLayer: 'pois-icons', id: f.id },
        //   { hidden: true }
        // )
        // map.current?.setFeatureState({ source: 'pois-icons', id: f.id }, { hidden: true })
        map.current?.setFeatureState({ source: 'pois', id: f.id }, { hidden: true })
        // map.current.triggerRepaint()
      }

      const marker_element = markerElementRefs.current[entry.id]
      if (!marker_element.element) {
        return
      }
      const cloned_marker_element = marker_element.element.cloneNode(true) as HTMLElement
      // cloned_marker_element.classList.add('open_marker')

      const el = document.createElement('div')
      // el.innerHTML = `<div class="open_marker">${f.properties.iconSvg}</div>`
      el.style.pointerEvents = 'none'
      el.appendChild(cloned_marker_element)

      htmlMarker[entry.id] = new maplibregl.Marker({
        element: el,
        anchor: 'center',
        opacityWhenCovered: '0',
        subpixelPositioning: true,
      })
        .setLngLat(f.geometry.coordinates)
        .addTo(map.current)

      setTimeout(() => {
        el.classList.add('hover') // start animation
      }, 100)
    }

    const onPoiMouseleave = (_event: any) => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      const f = lastHoveredFeature
      if (!f) {
        return
      }

      const entry = (
        typeof f.properties.entry === 'string' ? JSON.parse(f.properties.entry) : f.properties.entry
      ) as TimelineEntry
      if (!entry.id) {
        return
      }

      map.current.getCanvas().style.cursor = ''
      const thisMarker = htmlMarker[entry.id]
      thisMarker?.getElement().classList.remove('hover') // remove animation

      setTimeout(() => {
        if (f.id) {
          // map.current?.setFeatureState(
          //   { source: 'pois', sourceLayer: 'pois-icons', id: f.id },
          //   { hidden: false }
          // )
          // map.current?.setFeatureState({ source: 'pois-icons', id: f.id }, { hidden: false })
          map.current?.setFeatureState({ source: 'pois', id: f.id }, { hidden: false })
          // map.current?.triggerRepaint()
        }
        if (thisMarker) {
          thisMarker.remove()
        }
      }, 200)
    }

    const onPoiClick = (event: any) => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      onEntryMarkerClick({ entry: JSON.parse(event.features[0].properties.entry) })
    }

    const renderMarkers = async () => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      const pois: MarkerFeatureCollection = {
        type: 'FeatureCollection' as const,
        features: Object.values(markerElementRefs.current)
          .map(({ dataUrl, imageData, width, height, entry }) => {
            // let imageUri = ''
            // if (typeof entry.image === 'string') {
            //   const full_src = String(new URL(entry.image, String(window.location)))
            //   imageUri = await imageUrlToDataUrl(full_src)
            // } else if (typeof entry.image === 'object' && entry.image?.src) {
            //   const full_src = String(new URL(entry.image.src, String(window.location)))
            //   imageUri = await imageUrlToDataUrl(full_src)
            // }

            if (!(entry.id && entry.latitude && entry.longitude)) {
              return null
            }

            return {
              id: entry.id,
              type: 'Feature' as const,
              geometry: {
                type: 'Point' as const,
                coordinates: [entry.longitude, entry.latitude],
              },
              properties: {
                entry,
                rank: 1,
                name: entry.title || '',
                iconName: `poi_icon_${entry.id}`,
                iconUrl: dataUrl, // '/icons/cafe.png',
                iconImageData: imageData,
                iconWidth: width,
                iconHeight: height,
                // iconSvg,
              },
            }
          })
          .filter((f) => f !== null), // filter out nulls
      }

      const src = map.current.getSource('pois') as maplibregl.GeoJSONSource
      if (src) {
        // already exists; ensure it’s GeoJSON then update
        if ('setData' in src) {
          src.setData(pois)
        } else {
          throw new Error('Source "pois" exists but is not GeoJSON')
        }
      } else {
        map.current.addSource('pois', { type: 'geojson', data: pois, promoteId: 'id' })
      }

      try {
        await Promise.all(
          // deduplicate and preload all icons
          Array.from(
            new Map(
              pois.features.map(
                (
                  f
                ): [
                  string,
                  {
                    type: string
                    data: string | Uint8ClampedArray
                    width?: number
                    height?: number
                  },
                ] => {
                  if (!f) {
                    return ['unknown', { type: 'error', data: '' }]
                  }

                  if (!f.properties.iconName) {
                    return ['unknown', { type: 'error', data: '' }]
                  }

                  if (
                    f.properties.iconImageData &&
                    f.properties.iconWidth &&
                    f.properties.iconHeight
                  ) {
                    const width = f.properties.iconWidth
                    const height = f.properties.iconHeight
                    return [
                      f.properties.iconName,
                      { type: 'imageData', data: f.properties.iconImageData, width, height },
                    ]
                  }

                  if (f.properties.iconSvg) {
                    let iconSvg = f.properties.iconSvg
                    iconSvg = iconSvg.replace(/\n/g, '') // remove newlines

                    return [
                      f.properties.iconName,
                      {
                        type: 'dataUrl',
                        data: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSvg)}`,
                      },
                    ]
                  }

                  if (f.properties.iconUrl) {
                    return [f.properties.iconName, { type: 'dataUrl', data: f.properties.iconUrl }]
                  }

                  return [f.properties.iconName, { type: 'error', data: '' }] // should not happen
                }
              )
            )
          ).map(([name, { type, data, width, height }]) => {
            if (!(name && data)) {
              return Promise.resolve(false)
            }

            if (!map.current || map.current === null) {
              // only change if map exists
              return false
            }

            // check if image already exists
            if (map.current.hasImage(name)) {
              return false
            }

            if (type === 'dataUrl' && typeof data === 'string') {
              // load image from URL and add to map
              const img = new Image()
              img.onload = () => {
                if (!map.current || map.current === null) {
                  // only change if map exists
                  return
                }

                map.current.addImage(name, img, {
                  pixelRatio: 2, // crisp @2x
                  sdf: false,
                })
              }
              img.onerror = (error) => {
                console.warn('failed-to-load-image', name, data, error)
              }
              img.src = data
            } else if (
              type === 'imageData' &&
              data instanceof Uint8ClampedArray &&
              width &&
              height
            ) {
              map.current.addImage(
                name,
                { width, height, data },
                {
                  pixelRatio: 2, // crisp @2x
                  sdf: false,
                }
              )
            }

            return false
          })
        )
      } catch (e) {
        console.error('error loading images', e)
      }

      if (!map.current.getLayer('poi-icons')) {
        map.current.addLayer({
          id: 'poi-icons',
          type: 'symbol' as const,
          source: 'pois',
          minzoom: 0,
          layout: {
            'icon-image': ['get', 'iconName'], // per-feature icon
            'icon-allow-overlap': true,
            'icon-size': 1,
            'symbol-sort-key': ['to-number', ['get', 'rank']],
            'text-anchor': 'center',
            'text-field': ['get', 'name'],
            'text-font': ['Ubuntu Medium', 'Noto Sans Medium'],
            'text-line-height': 0.9,
            'text-max-width': 12,
            'text-optional': true,
            'text-padding': 2,
            'text-size': 16,
            visibility: 'visible',
            'text-justify': 'center',
            'icon-anchor': 'center',
            'icon-text-fit': 'none',
            'text-offset': [0, 0],
            'text-overlap': 'never',
            'icon-overlap': 'cooperative', // 'cooperative', // 'always', // 'never',
            'text-pitch-alignment': 'auto',
            'text-rotation-alignment': 'auto',
            'text-ignore-placement': false,
          },
          paint: {
            'icon-opacity': ['case', ['boolean', ['feature-state', 'hidden'], false], 0, 1],
            'text-opacity': ['case', ['boolean', ['feature-state', 'hidden'], false], 0, 1],
            'text-color': 'hsl(0 0% 100%)',
            'text-halo-blur': ['interpolate', ['linear'], ['zoom'], 12, 1, 14, 0.5, 16, 0],
            'text-halo-color': 'hsl(0 0% 0% / 0.5)',
            'text-halo-width': 2,
          },
        })
      }

      map.current.on('mouseenter', 'poi-icons', onPoiMouseenter)
      // map.current.on('mousemove', 'poi-icons', onPoiMousemove)
      map.current.on('mouseleave', 'poi-icons', onPoiMouseleave)
      map.current.on('click', 'poi-icons', onPoiClick)
    }

    if (map.current.loaded()) {
      renderMarkers()
    } else {
      map.current.on('load', renderMarkers)
    }

    return () => {
      if (!map.current || map.current === null) {
        // only change if map exists
        return
      }

      map.current.off('load', renderMarkers)
      map.current.off('mouseenter', 'poi-icons', onPoiMouseenter)
      // map.current.off('mousemove', 'poi-icons', onPoiMousemove)
      map.current.off('mouseleave', 'poi-icons', onPoiMouseleave)
      map.current.off('click', 'poi-icons', onPoiClick)
    }
  }, [onEntryMarkerClick])

  // const [counter, setCounter] = useState<number>(0)
  const cacheMarkerElement = useRef((element: HTMLDivElement | null, entry: any, index: number) => {
    const entryId = entry?.id
    if (!(element && entryId)) {
      return
    }

    // await onImagesLoaded(element) // wait for all images to load

    const width = element.offsetWidth
    const height = element.offsetHeight

    markerElementRefs.current[entryId] = {
      index,
      entry,
      element,
      dataUrl: '', // not loaded yet
      width,
      height,
      state: 'loading',
    }

    htmlToImage_toBlob(element, {
      // quality: 100,
      pixelRatio: 2,
      canvasWidth: width,
      canvasHeight: height,
      width,
      height,
      cacheBust: false,
      includeQueryParams: true,
    })
      .then(async (blobData) => {
        console.log('blobData', blobData)

        const imageData = blobData?.arrayBuffer
          ? new Uint8ClampedArray(new Uint8Array(await blobData.arrayBuffer()))
          : undefined

        if (!imageData) {
          throw new Error('could not load image')
        }

        markerElementRefs.current[entryId] = {
          ...markerElementRefs.current[entryId],
          // dataUrl,
          imageData,
          state: 'finished',
        }
      })
      .catch((err) => {
        markerElementRefs.current[entryId] = {
          ...markerElementRefs.current[entryId],
          state: 'error',
        }
        console.error('oops, something went wrong!', err)
      })
      .finally(() => {
        // check if there is still at least one entry to load
        const hasAtLeastOneToLoad = Object.values(markerElementRefs.current).find(
          (m: any) => m.state === 'loading'
        )
        if (!hasAtLeastOneToLoad) {
          // only trigger ui-rerender when all are loaded
          // setCounter((c) => c + 1)
          displayMarkers()
        }
      })
  })

  const entriesRendered = useMemo(() => {
    return entries.map((entry, index) => {
      return (
        <React.Fragment key={entry.id}>
          {renderEntryMarker({
            entry,
            index,
            onImageLoaded: ({ element }) => cacheMarkerElement.current(element, entry, index),
            // ref: (element) => cacheMarkerElement.current(element, entry, index),
          })}
        </React.Fragment>
      )
    })
  }, [entries, renderEntryMarker])

  const markersAreLoading =
    Object.values(markerElementRefs.current).filter((m: any) => m.state === 'loading').length > 0

  return (
    <>
      <div className="h-full w-full" ref={mapContainer} />

      {/* <div className="absolute hidden h-0 w-0">
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
      </div> */}

      <div className="absolute h-0 w-0 overflow-hidden">{entriesRendered}</div>

      {/* <h1>counter: {counter}</h1> */}

      {/* {Object.values(markerElementRefs.current)
        .filter((m: any) => m.state === 'finished')
        .sort((a: any, b: any) => a.index - b.index)
        .map(({ width, height, entry, dataUrl, index }) => {
          if (!entry.id) {
            return <React.Fragment key={index}>no-id-{index}</React.Fragment>
          }
          return (
            // biome-ignore lint/performance/noImgElement: testing
            <img alt="" height={height} key={entry.id} src={dataUrl} width={width} />
          )
        })} */}

      {markersAreLoading ? (
        <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none fixed top-1/2 left-1/2 z-20 flex h-auto w-auto items-center justify-center rounded-full bg-foreground p-1 text-background">
          <Icon className="animate-spin drop-shadow" name="loading" size="xl" />
        </div>
      ) : null}
    </>
  )
}
