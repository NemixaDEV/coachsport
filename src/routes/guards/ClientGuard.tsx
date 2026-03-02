import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import { Navigate, Outlet } from 'react-router-dom'

export function ClientGuard() {
  const { loading, user } = useAuth()
  if (loading) return null
  if (user?.role === 'user' || user?.role === 'suscriptor')
    return <Navigate to="/home" replace />
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
