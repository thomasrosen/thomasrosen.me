'use client'

import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import useDarkTheme from '@/components/hooks/useDarkTheme'
import { cn } from '@/lib/utils'

function absoluteStyle(_previousStyle: any, nextStyle: any) {
  return {
    ...nextStyle,
    // make relative paths absolute
    sprite: [
      ...nextStyle.sprite.map((s: any) => {
        return {
          ...s,
          url: s.url, // new URL(s.url, window.location.href).href,
        }
      }),
    ],
    // URL will % encode the {} in nextStyle.glyphs, so assemble the URL manually
    glyphs: nextStyle.glyphs, // window.location.origin +
    sources: {
      'versatiles-shortbread': {
        ...nextStyle.sources['versatiles-shortbread'],
        // tiles: [window.location.origin + nextStyle.sources['versatiles-shortbread'].tiles[0]],
        tiles: [
          `https://vector.openstreetmap.org${nextStyle.sources['versatiles-shortbread'].tiles[0]}`,
        ],
      },
    },
  }
}

export function ReactMap({ markers }: { markers: any }) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maplibregl.Map | null>(null)

  const userWantsDarkmode = useDarkTheme()
  const mapStylePath = userWantsDarkmode ? '/map_styles/eclipse.json' : '/map_styles/colorful.json'

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
      transformStyle: absoluteStyle,
    })

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    map.current.on('style.load', () => {
      if (!map.current || map.current === null) {
        return
      }

      map.current.setProjection({
        type: 'globe', // Set projection to globe
      })

      map.current.addSource('markers', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
          properties: {},
        },
      })
      map.current.addLayer({
        id: 'markers',
        type: 'symbol',
        source: 'markers',
        layout: {
          'icon-image': 'airport',
        },
      })

      /*
      const layers = map.current.getStyle().layers
      // Find the index of the first symbol layer in the map style
      let firstSymbolId: string | undefined
      for (const layer of layers) {
        if (layer.type === 'symbol') {
          firstSymbolId = layer.id
          break
        }
      }
      map.current.addSource('urban-areas', {
        type: 'geojson',
        data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_urban_areas.geojson',
      })
      map.current.addLayer(
        {
          id: 'urban-areas-fill',
          type: 'fill',
          source: 'urban-areas',
          layout: {},
          paint: {
            'fill-color': '#f08',
            'fill-opacity': 0.4,
          },
          // This is the important part of this example: the addLayer
          // method takes 2 arguments: the layer as an object, and a string
          // representing another layer's name. if the other layer
          // exists in the stylesheet already, the new layer will be positioned
          // right before that layer in the stack, making it possible to put
          // 'overlays' anywhere in the layer stack.
          // Insert the layer beneath the first symbol layer.
        },
        firstSymbolId
      )
      */
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
      transformStyle: absoluteStyle,
    })
  }, [mapStylePath])

  useEffect(() => {
    if (!map.current || map.current === null) {
      // only change if map exists
      return
    }

    map.current.on('style.load', () => {
      const marker_element = document.createElement('div')
      marker_element.className = 'marker'
      marker_element.style.backgroundImage = 'url(https://picsum.photos/32/32/)'
      marker_element.style.width = `${32}px`
      marker_element.style.height = `${32}px`
      // const onclick = () => {
      //   window.alert('hello world')
      // }
      // marker_element.addEventListener('click', onclick)

      // new maplibregl.Marker({ element: marker_element })
      //   .setLngLat([139.7525, 35.6846])
      //   .addTo(map.current)

      console.log('markers', markers)

      const json = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [139.7525, 35.6846],
        },
        properties: {},
      }
      // Update the drone symbol's location on the map
      // @ts-expect-error setData exists. TS jsut does not know about it.
      map.current.getSource('markers')?.setData(json)
    })

    // return () => {
    //   marker_element.removeEventListener('click', onclick)
    // }
  }, [markers])

  return (
    <div
      className={cn(
        'h-full w-full',
        userWantsDarkmode ? 'darkmode bg-hsl(33,48%,5%)' : 'lightmode bg-[rgb(249,244,238)]'
      )}
      ref={mapContainer}
    />
  )
}
