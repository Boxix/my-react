import { ReactNode, useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { AuthContext, IAuthContext } from '../context/AuthProvider'

const useAuth = () => useContext(AuthContext)

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  let { token } = auth!
  let location = useLocation()

  if (!token && !location.pathname.includes('signin')) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
