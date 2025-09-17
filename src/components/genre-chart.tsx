'use client'

import { Line, LineChart, XAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export function GenreChart({
  chartData,
}: {
  chartData: (({ date: string } & Record<string, number>) | { date: string })[]
}) {
  const dataKeys = [
    ...new Set(chartData?.flatMap((entry) => Object.keys(entry).filter((key) => key !== 'date'))),
  ]
  // const dataKeysAmount = dataKeys.length

  const amountPerDataKey = dataKeys.reduce(
    (acc, key) => {
      acc[key] = chartData.reduce((acc2, entry) => {
        return acc2 + entry[key as keyof Omit<typeof entry, 'date'>]
      }, 0)
      return acc
    },
    {} as Record<string, number>
  )

  chartData = chartData
    .map((entry) => {
      const keys = Object.keys(entry).filter((key) => key !== 'date')
      return {
        ...entry,
        ...keys.reduce(
          (acc, key) => {
            const value = entry[key as keyof Omit<typeof entry, 'date'>]
            acc[key] = value
            // if (value) {
            //   acc[key] = Math.min(10, Math.max(0, value))
            // } else {
            //   acc[key] = 10
            // }
            return acc
          },
          {} as Record<string, number>
        ),
      }
    })
    .reverse()

  const chartConfig = dataKeys
    // .sort((a, b) => a.localeCompare(b))
    .sort((a, b) => amountPerDataKey[a] - amountPerDataKey[b])
    // .reverse()
    .reduce(
      (acc, dataKey) => {
        const color = `hsl(${100 - (dataKeys.indexOf(dataKey) / dataKeys.length) * 360} 100% 60%)`

        acc[dataKey] = {
          label: dataKey,
          color,
        }
        return acc
      },
      {} as Record<string, { label: string; color: string }>
    ) satisfies ChartConfig

  return (
    <ChartContainer className="-mx-[32px] mt-[32px] h-96 w-[calc(100%+64px)]" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 0,
          right: 32,
          left: 32,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid vertical={true} /> */}
        <XAxis
          allowDataOverflow={true}
          axisLine={false}
          dataKey="date"
          // tickCount={10}
          // tickFormatter={(value) => value.slice(0, 4)}
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString('de-DE', {
              year: 'numeric',
              // month: 'short',
              // day: 'numeric',
            })
          }}
          tickLine={false}
          tickMargin={0}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              includeHidden={true}
              indicator="dot"
              labelFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'short',
                  // day: 'numeric',
                })
              }}
            />
          }
          cursor={true}
        />
        <ChartLegend content={<ChartLegendContent payload={dataKeys} />} verticalAlign="bottom" />
        {dataKeys
          // .sort((a, b) => a.localeCompare(b))
          .sort((a, b) => amountPerDataKey[a] - amountPerDataKey[b])
          // .reverse()
          .map((dataKey) => {
            const color = `hsl(${100 - (dataKeys.indexOf(dataKey) / dataKeys.length) * 360} 100% 60%)`
            return (
              <Line
                activeDot={{
                  clipDot: false,
                  fill: color,
                  r: 32,
                  style: {
                    zIndex: 1000,
                  },
                }}
                // connectNulls
                dataKey={dataKey}
                dot={{
                  clipDot: false,
                  fill: color,
                  r: 16,
                }}
                isAnimationActive={false}
                key={dataKey}
                // label={{ fill: 'white', fontSize: 14, fontWeight: 'bold' }}
                // legendType="square"
                name={dataKey}
                stroke={color}
                strokeWidth={4}
                type="linear"
              />
            )
          })}
      </LineChart>
    </ChartContainer>
  )
}
