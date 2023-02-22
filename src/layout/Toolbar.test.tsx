import AuthProvider, { AuthContext, IAuthContext } from "@/context/AuthProvider"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it } from "vitest"
import Toolbar from "./Toolbar"

const customRender = (ui: any, { providerProps, ...renderOptions }: { providerProps: IAuthContext }) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      {ui}
    </AuthContext.Provider>,
  )
}
describe('test for Toolbar', () => {
  it('Sign out', async () => {
    const spy = vi.fn()
    const { container } = customRender(<Toolbar />, {
      providerProps: {
        token: '',
        signOut: spy,
        signIn: vi.fn(),
      }
    })
    const user = userEvent.setup({ delay: null })
    const icon = container.querySelector('#topnav-toolbar [data-icon=user]')!
    await user.click(icon)
    const signout = screen.getByText(/退出系统/)
    await user.click(signout)
    expect(spy).toHaveBeenCalled()
  })
})
