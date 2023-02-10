import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

export async function waitFakeTimer(advanceTime = 1000, times = 20) {
  for (let i = 0; i < times; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await Promise.resolve();

      if (advanceTime > 0) {
        vi.advanceTimersByTime(advanceTime);
      } else {
        vi.runAllTimers();
      }
    });
  }
}

describe('Test for Login.tsx', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', () => ({
      ...vi.importActual('react-router-dom'),
      useNavigate: () => (vi.fn()),
    }))

    document.body.innerHTML = '';
    vi.useFakeTimers();
  })

  afterAll(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });


  it('require username and password', async () => {
    const user = userEvent.setup()
    const { container } = render(<Login />)
    const signInBtn = screen.getByTestId('siginin')
    user.click(signInBtn)
    await waitFakeTimer()
    expect(container.querySelector('#signin-form')).toHaveTextContent('请输入登录账号')
  })

})
