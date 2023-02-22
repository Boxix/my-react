import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import * as Service from './service/signin'
import AuthProvider from '@/context/AuthProvider'

export async function waitFakeTimer(advanceTime = 1000, times = 20) {
  for (let i = 0; i < times; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await Promise.resolve()

      if (advanceTime > 0) {
        vi.advanceTimersByTime(advanceTime)
      } else {
        vi.runAllTimers()
      }
    })
  }
}

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...mod,
    useNavigate: () => mockNavigate,
  }
})

describe('test for SignIn', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.resetAllMocks()
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('require username and password', async () => {
    const user = userEvent.setup({ delay: null })
    const { container } = render(<SignIn />)
    const signInBtn = container.querySelector('#signin-btn')!
    await user.click(signInBtn)
    await waitFakeTimer()
    const form = container.querySelector('#signin-form')
    expect(form).toHaveTextContent('请输入登录账号')
    expect(form).toHaveTextContent('请输入登录密码')
  })

  it('actual sign in without remember', async () => {
    const spy = vi.spyOn(Service, 'signIn')
    spy.mockImplementationOnce(() => {
      return Promise.resolve({ token: 'xxxxxxxx' })
    })
    const user = userEvent.setup({ delay: null })
    const { container } = render(
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    )
    const usernameIpt = container.querySelector('#signin_username')!
    const passwordIpt = container.querySelector('#signin_password')!
    await user.type(usernameIpt, '123')
    await user.type(passwordIpt, '123')
    const signInBtn = container.querySelector('#signin-btn')!
    await user.click(signInBtn)
    await waitFakeTimer()
    expect(spy).toHaveBeenCalledWith({
      username: '123',
      password: '123',
      remember: false,
    })
    expect(screen.findAllByText(/操作成功/)).toBeDefined()
    await vi.advanceTimersToNextTimer()
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
  })

  it('actual sign in with remember', async () => {
    const fakeToken = 'xxxxxxxx'
    const spy = vi.spyOn(Service, 'signIn')
    spy.mockImplementationOnce(() => {
      return Promise.resolve({ token: fakeToken })
    })

    const spyStorage = vi.spyOn(localStorage, 'setItem')

    const user = userEvent.setup({ delay: null })
    const { container } = render(
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    )
    const usernameIpt = container.querySelector('#signin_username')!
    const passwordIpt = container.querySelector('#signin_password')!
    const rememberChk = container.querySelector('#signin_remember')!
    await user.type(usernameIpt, '123')
    await user.type(passwordIpt, '123')
    await user.click(rememberChk)
    const signInBtn = container.querySelector('#signin-btn')!
    await user.click(signInBtn)
    await waitFakeTimer()
    expect(spyStorage).toHaveBeenCalledWith('token', fakeToken)
  })
})
