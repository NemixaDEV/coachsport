import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import { Navigate, Outlet } from 'react-router-dom'

export function AdminGuard() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user?.role !== 'admin') return <Navigate to="/home" replace />
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
