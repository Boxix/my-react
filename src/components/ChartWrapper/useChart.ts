import { Chart } from "@antv/g2"
import { Interval } from "@antv/g2/lib/api/mark/mark"
import { useRequest } from "ahooks"
import { useRef, useEffect } from "react"
import { getChartById } from "./service"

export function useChart(chartId: string) {
  const container = useRef<HTMLDivElement | null>(null)
  const chart = useRef<Chart | null>(null)
  const { run } = useRequest(getChartById, {
    debounceWait: 100,  // react strict mode下会调用两遍
    defaultParams: [chartId],
    onSuccess(result) {
      updateChart(chart.current, result)
    }
  })

  useEffect(() => {
    if (container.current) {
      const cht = new Chart({
        container: container.current,
        autoFit: true,
      })

      cht
        .interval() // 创建一个 Interval 标记
        .encode('x', 'genre') // 编码 x 通道
        .encode('y', 'sold') // 编码 y 通道
        .encode('key', 'genre') // 指定 key
        .animate('updateDuration', 300) // 指定更新动画的时

      chart.current = cht
    }

  }, [container])


  function updateChart(chart: Chart | null, data: unknown) {
    if (!chart) return

    const interval = chart.getNodesByType('interval')[0] as Interval
    interval.data(data)
    chart.render()
  }

  function reloadData() {
    run(chartId)
  }

  return {
    container,
    reloadData,
  }
}
