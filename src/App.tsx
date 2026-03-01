import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { routes } from './routes'
import SplashScreen from './pages/common/SplashScreen'

function App() {
  const { loading } = useAuth()
  const element = useRoutes(routes)

  if (loading) {
    return <SplashScreen />
  }

  return <Suspense fallback={null}>{element}</Suspense>
}

export default App
