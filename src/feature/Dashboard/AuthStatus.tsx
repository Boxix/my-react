import { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

const useAuth = () => useContext(AuthContext)

const AuthStatus = () => {
  let auth = useAuth()
  let { token } = auth!

  if (!token) return <p>没有登录</p>
  return (
    <>
      <p>你好! </p>
    </>
  )
}

export default AuthStatus
