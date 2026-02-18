import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { routes } from './routes'
import SplashScreen from './pages/SplashScreen'

function App() {
  const { loading } = useAuth()
  const element = useRoutes(routes)

  if (loading) {
    return <SplashScreen />
  }

  return <Suspense fallback={<SplashScreen />}>{element}</Suspense>
}

export default App
