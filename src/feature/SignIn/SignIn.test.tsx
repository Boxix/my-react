import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from './SignIn'
import { Mock, vi } from 'vitest'

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

describe('Test for SignIn.tsx', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', () => ({
      ...vi.importActual('react-router-dom'),
      useNavigate: () => vi.fn(),
    }))



    document.body.innerHTML = ''
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('require username and password', async () => {
    const user = userEvent.setup({ delay: null })
    const { container } = render(<SignIn />)
    const signInBtn = screen.getByTestId('siginin')
    await user.click(signInBtn)
    await waitFakeTimer()
    const form = container.querySelector('#signin-form')
    expect(form).toHaveTextContent('请输入登录账号')
    expect(form).toHaveTextContent('请输入登录密码')
  })
})
