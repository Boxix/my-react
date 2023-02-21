import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import AuthProvider, { AuthContext, IAuthContext } from './AuthProvider'
import { useContext } from 'react'
import { TOKEN } from '../test/__mock__/auth'

const CustomTest = () => {
  const { token, signIn, signOut } = useContext(AuthContext) as IAuthContext

  return (
    <div>
      <div data-testid="isSignIn">{token ? 'sign in' : 'unsign'}</div>
      <div data-testid="token">{token}</div>
      <button data-testid="signin" onClick={() => signIn(TOKEN)}>Sign In</button>
      <button data-testid="signout" onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

describe('Test for AuthProvider', () => {
  it('show unsign', () => {
    render(
      <AuthProvider>
        <CustomTest />
      </AuthProvider>
    )

    expect(screen.getByTestId('isSignIn')).toHaveTextContent('unsign')
    expect(screen.getByTestId('token')).toBeEmptyDOMElement()
  })

  it('do sign in', () => {
    render(
      <AuthProvider>
        <CustomTest />
      </AuthProvider>
    )

    const signInBtn = screen.getByTestId('signin')
    fireEvent.click(signInBtn)
    expect(screen.getByTestId('isSignIn')).toHaveTextContent('sign in')
    expect(screen.getByTestId('token')).toHaveTextContent(TOKEN)
  })

  it('do sign out', () => {
    render(
      <AuthProvider>
        <CustomTest />
      </AuthProvider>
    )
    const signInBtn = screen.getByTestId('signin')
    fireEvent.click(signInBtn)
    expect(screen.getByTestId('token')).toHaveTextContent(TOKEN)
    const signOutBtn = screen.getByTestId('signout')
    fireEvent.click(signOutBtn)
    expect(screen.getByTestId('isSignIn')).toHaveTextContent('unsign')
    expect(screen.getByTestId('token')).toBeEmptyDOMElement()
  })

  it('start with token', () => {
    localStorage.setItem('token', TOKEN)
    render(
      <AuthProvider>
        <CustomTest />
      </AuthProvider>
    )
    expect(screen.getByTestId('token')).toHaveTextContent(TOKEN)
  })
})
