import { render, screen } from '@testing-library/react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { AuthContext, IAuthContext } from '../context/AuthProvider'
import RequireAuth from './RequireAuth'

const customRender = (ui: any, { providerProps, route, ...renderOptions }: { providerProps: IAuthContext, route: string }) => {
  window.history.pushState({}, 'test page', route)
  return render(
    <AuthContext.Provider value={providerProps}>
      <RequireAuth>{ui}</RequireAuth>
    </AuthContext.Provider>,
    { wrapper: BrowserRouter },
  )
}

const LocationDisplay = () => {
  const location = useLocation()
  return <div data-testid="location-display">{location.pathname}</div>
}


describe('test for RequireAuth', () => {
  let providerProps = {
    signIn: vi.fn(),
    signOut: vi.fn(),
  }

  it('direct to /signin', () => {
    customRender(<LocationDisplay />, {
      providerProps: {
        ...providerProps,
        token: null
      },
      route: '/'
    })
    expect(screen.getByTestId('location-display')).toHaveTextContent('/signin')
  })

  it('pathname equals route', () => {
    customRender(<LocationDisplay />, {
      providerProps: {
        ...providerProps,
        token: '1',
      },
      route: '/path-of-any'
    })
    expect(screen.getByTestId('location-display')).toHaveTextContent('/path-of-any')
  })
})
