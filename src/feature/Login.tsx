import { useCallback, useContext } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, notification } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { AuthContext } from '../context/AuthProvider'

const useAuth = () => useContext(AuthContext)

function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleFinished = (values: Record<string, unknown>) => {
    localStorage.setItem('token', '1')

    notification.success({
      message: '操作成功',
      description: `${values.username}登录成功`,
      duration: 1,
    })
    setTimeout(() => {
      auth?.signIn({
        sid: 1,
        username: values.username as string,
        email: 'test@test.com',
      }, () => {
        navigate('/', { replace: true })
      })
    }, 1000)
  }

  return (
    <div className="max-w-xl ma">
      <Form
        className="mt-24"
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        requiredMark={false}
        onFinish={handleFinished}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入登录账号' },
          ]}
        >
          <Input prefix={<UserOutlined />}/>
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入登录密码' },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>7天免登录</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
