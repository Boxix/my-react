import { describe, expect, test, vi, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import TopNav from './TopNav'
import { AuthContext, IAuthContext } from '../context/AuthProvider'
import { ReactNode } from 'react'

const customRender = (ui: ReactNode, { providerProps, ...renderOptions }: { providerProps: IAuthContext }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions,
  )
}

describe('test for TopNav', () => {
  let providerProps: IAuthContext

  beforeEach(() => {
    vi.mock('react-router-dom', () => ({
      ...vi.importActual('react-router-dom'),
      useNavigate: () => (vi.fn()),
    }))
    providerProps = {
      token: 'cja',
      signIn: vi.fn((token) => {
        providerProps.token = token
      }),
      signOut: vi.fn(() => {
        providerProps.token = null
      }),
    }
  })

  afterEach(() => {
    vi.resetAllMocks()
    cleanup()
  })

  test("菜单项包含'首页', '专利'", () => {
    customRender(<TopNav />, { providerProps })
    expect(screen.findAllByText(/首页/)).toBeDefined()
    expect(screen.findAllByText(/专利/)).toBeDefined()
  })
})
