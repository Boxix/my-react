import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import AuthProvider, { AuthContext, IAuthContext } from './AuthProvider'
import { useContext } from 'react'

const CustomTest = () => {
  const { user, signIn, signOut } = useContext(AuthContext) as IAuthContext

  return (
    <div>
      <div data-testid="isSignIn">{user ? 'sign in' : 'unsign'}</div>
      <div data-testid="username">{user?.username}</div>
      <button data-testid="signin" onClick={() => signIn({
        username: 'cja',
        sid: 1,
        email: 'cja@cja.com'
      })}>Sign In</button>
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
    expect(screen.getByTestId('username')).toBeEmptyDOMElement()
  })

  it('do sign in', () => {
    render(
      <AuthProvider>
        <CustomTest />
      </AuthProvider>
    )

    const loginBtn = screen.getByTestId('signin')
    fireEvent.click(loginBtn)
    expect(screen.getByTestId('isSignIn')).toHaveTextContent('sign in')
    expect(screen.getByTestId('username')).toHaveTextContent('cja')
  })

  it('do sign out', () => {
    render(
      <AuthProvider>
        <CustomTest />
      </AuthProvider>
    )
    const signInBtn = screen.getByTestId('signin')
    fireEvent.click(signInBtn)
    expect(screen.getByTestId('username')).toHaveTextContent('cja')
    const signOutBtn = screen.getByTestId('signout')
    fireEvent.click(signOutBtn)
    expect(screen.getByTestId('isSignIn')).toHaveTextContent('unsign')
    expect(screen.getByTestId('username')).toBeEmptyDOMElement()
  })
})
