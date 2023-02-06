import { UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { useContext } from 'react'
import { AuthContext, IAuthContext } from '../context/AuthProvider'

const useAuth = () => useContext(AuthContext)

const items = [
  {
    key: 'logout',
    label: '退出系统',
  }
]

function Toolbar() {
  const auth = useAuth()
  const { signOut } = auth as IAuthContext

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      signOut()
    }
  }

  return (
    <div id="topnav-toolbar" className="flex p-2">
      <Dropdown menu={{ items, onClick }} trigger={['click']}>
        <UserOutlined
          className="hover-drop-shadow-md cursor-pointer"
          style={{
            fontSize: 20,
          }}
        />
      </Dropdown>
    </div>
  )
}

export default Toolbar
