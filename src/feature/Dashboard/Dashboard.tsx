import AuthStatus from "./AuthStatus"
import clsx from 'clsx'
import ChartWrapper from "@/components/Chart"

const card = clsx('p-4 rounded shadow b b-solid m-8')

function Dashboard() {
  return (
    <>
      <div className={card}>
        <AuthStatus />
      </div>
      <div className={card}>
        <ChartWrapper chartId="12312312" />
      </div>
    </>
  )
}

export default Dashboard

