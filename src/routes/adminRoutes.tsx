import { lazy } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '@/contexts/AuthContext'

function AdminGuard() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user?.role !== 'admin') return <Navigate to="/home" replace />
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const AdminDashboardScreen = lazy(
  () => import('../pages/admin/AdminDashboardScreen'),
)
const AdminClientsScreen = lazy(
  () => import('../pages/admin/AdminClientsScreen'),
)
const AdminExercisesScreen = lazy(
  () => import('../pages/admin/AdminExercisesScreen'),
)

export const adminRoutes: RouteObject[] = [
  {
    element: <AdminGuard />,
    children: [
      {
        path: '/admin',
        element: <AdminDashboardScreen />,
      },
      {
        path: '/admin/clients',
        element: <AdminClientsScreen />,
      },
      {
        path: '/admin/exercises',
        element: <AdminExercisesScreen />,
      },
    ],
  },
]
