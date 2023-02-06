import { ReactNode, createContext, useState } from 'react'

export type TUser = {
  sid: number
  username: string
  email: string
}

export interface IAuthContext {
  user: TUser | null
  signIn: (user: TUser, cb?: VoidFunction) => void
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
  const [user, setUser] = useState<TUser | null>(null)
  let signIn = (newUser: TUser, cb?: VoidFunction) => {
    return provider.signIn(() => {
      setUser(newUser)
      cb?.()
    })
  }
  let signOut = (cb?: VoidFunction) => {
    return provider.signOut(() => {
      setUser(null)
      cb?.()
    })
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider


