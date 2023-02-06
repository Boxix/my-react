import { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

const useAuth = () => useContext(AuthContext)

const AuthStatus = () => {
  let auth = useAuth()
  let { user } = auth!

  if (!user) return <p>没有登录</p>
  return (
    <>
      <p>你好 {user.username}! </p>
    </>
  )
}

export default AuthStatus
