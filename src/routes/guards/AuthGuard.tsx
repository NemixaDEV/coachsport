import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import { Navigate, Outlet } from 'react-router-dom'
import { AdminViewSwitcher } from '@/components/AdminViewSwitcher'

export function AuthGuard() {
  const { loading, isAuthenticated } = useAuth()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return (
    <Layout>
      <AdminViewSwitcher />
      <Outlet />
    </Layout>
  )
}
