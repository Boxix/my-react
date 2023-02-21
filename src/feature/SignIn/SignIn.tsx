import { useCallback, useContext, useEffect } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Button, Checkbox, Form, Input, notification } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { AuthContext } from '../../context/AuthProvider'
import { signIn, TSignIn } from './service/signin'

const useAuth = () => useContext(AuthContext)

function SignIn() {
  const auth = useAuth()
  const navigate = useNavigate()
  const { runAsync } = useRequest(signIn, {
    manual: true,
  })

  const handleFinished = async (values: TSignIn) => {
    runAsync(values).then((data) => {
      const token = data.token

      if (values.remember) {
        localStorage.setItem('token', token)
      }

      notification.success({
        message: '操作成功',
        description: `${values.username}登录成功`,
        duration: 1,
      })
      setTimeout(() => {
        auth?.signIn(token, () => {
          navigate('/', { replace: true })
        })
      }, 1000)
    })
  }

  return (
    <div className="max-w-xl ma" id="signin-form">
      <Form
        className="mt-24"
        name="signin"
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
          <Input prefix={<UserOutlined />} />
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
          <Button type="primary" htmlType="submit" data-testid="siginin">登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignIn
