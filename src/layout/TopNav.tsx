import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useCallback, useState } from 'react'
import ReactLogo from '../assets/react.svg'
import { useNavigate, useRouteLoaderData, useRoutes } from 'react-router-dom'
import Toolbar from './Toolbar'

const items: MenuProps['items'] = [
  {
    label: '首页',
    key: '/',
  },
  {
    label: '专利',
    key: '/patent',
  }
]

function TopNav() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('/')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    navigate(e.key)
  }

  return (
    <div id="topnav" className="h-12 shadow-md flex">
      <img src={ReactLogo} alt="logo" className="h-8 vertical-mid inline-block m-2" />
      <div className="flex-1 mt-2px">
        <Menu className="b-b-0" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}></Menu>
      </div>
      <Toolbar />
    </div>
  )
}

export default TopNav
