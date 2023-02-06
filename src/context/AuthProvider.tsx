import { ReactNode, createContext, useState, useEffect } from 'react'

export type TUserToken = string

export interface IAuthContext {
  token: TUserToken | null
  signIn: (token: TUserToken, cb?: VoidFunction) => void
  signOut: (cb?: VoidFunction) => void
}

export let AuthContext = createContext<IAuthContext | null>(null)

const provider = {
  isAuthenticated: false,
  signIn(cb: VoidFunction) {
    this.isAuthenticated = true
    cb()
  },
  signOut(cb: VoidFunction) {
    this.isAuthenticated = false
    cb()
  },
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<TUserToken | null>(null)
  let signIn = (token: TUserToken, cb?: VoidFunction) => {
    return provider.signIn(() => {
      setToken(token)
      cb?.()
    })
  }
  let signOut = (cb?: VoidFunction) => {
    return provider.signOut(() => {
      setToken(null)
      cb?.()
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken('cja')
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token: token, signIn, signOut, }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider


