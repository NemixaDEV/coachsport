import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import { Navigate, Outlet } from 'react-router-dom'

export function ClientGuard() {
  const { loading, hasSubscription } = useAuth()
  if (loading) return null
  if (!hasSubscription) return <Navigate to="/home" replace />
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
