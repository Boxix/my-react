import { Outlet } from "react-router-dom"
import TopNav from "./TopNav"

function MainLayout() {
  return (
    <div className="main-layout">
      <TopNav />
      <Outlet />
    </div>
  )
}

export default MainLayout
