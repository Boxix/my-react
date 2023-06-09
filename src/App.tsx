import { Route, Routes } from 'react-router-dom'
import Page404 from './error/404'
import Main from './layout/Main'
import Dashboard from './feature/Dashboard/Dashboard'
import SignIn from './feature/SignIn/SignIn'
import Patent from './feature/Patent'
import AuthProvider from './context/AuthProvider'
import RequireAuth from './components/RequireAuth'

function App() {
  const routes = (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }></Route>
          <Route path="patent" element={<Patent />}></Route>
        </Route>

        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </AuthProvider>
  )
  return routes
}

export default App
