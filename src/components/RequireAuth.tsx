import { ReactNode, useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { AuthContext, IAuthContext } from '../context/AuthProvider'

const useAuth = () => useContext(AuthContext)

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  let { user } = auth!
  let location = useLocation()

  if (!user && !location.pathname.includes('login')) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
