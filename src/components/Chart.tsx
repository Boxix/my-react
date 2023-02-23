import { ReloadOutlined } from '@ant-design/icons'
import { Chart } from '@antv/g2'
import { Interval } from '@antv/g2/lib/api/mark/mark'
import { useEffect, useRef } from 'react'

function ChartWrapper(props: { chartId: string }) {
  const container = useRef<HTMLDivElement | null>(null)
  const chart = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chart.current && container.current) {
      chart.current = renderChart(container.current)
    }
  }, [])

  function renderChart(container: HTMLElement) {
    const chart = new Chart({
      container,
      autoFit: true,
    })

    // 准备数据
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]

    // 声明可视化
    chart
      .interval() // 创建一个 Interval 标记
      .data(data) // 绑定数据
      .encode('x', 'genre') // 编码 x 通道
      .encode('y', 'sold') // 编码 y 通道
      .encode('key', 'genre') // 指定 key
      .animate('updateDuration', 300) // 指定更新动画的时间

    // 渲染可视化
    chart.render()
    return chart
  }

  function updateChart(chart: Chart | null) {
    if (!chart) return

    const interval = chart.getNodesByType('interval')[0] as Interval

    // 模拟并且更新 Interval 的数据
    const newData = interval.data().map((d: { sold: number }) => ({
      ...d,
      sold: Math.random() * 400 + 100,
    }))

    interval.data(newData)
    chart.render()
  }

  function reloadData() {
    updateChart(chart.current)
  }

  return (
    <div className="c-chart relative">
      <div ref={container} className=" h-md w-full"></div>
      <div className="absolute right-2 top-2 hover-drop-shadow-md">
        <ReloadOutlined onClick={reloadData} />
      </div>
    </div>
  )
}

export default ChartWrapper
