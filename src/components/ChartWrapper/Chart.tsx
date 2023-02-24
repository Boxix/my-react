import { ReloadOutlined } from '@ant-design/icons'
import { useChart } from './useChart'

function ChartWrapper(props: { chartId: string }) {
  const { container, reloadData } = useChart(props.chartId)
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
