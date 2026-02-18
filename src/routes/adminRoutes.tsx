import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'

const AdminDashboardScreen = lazy(
  () => import('../pages/admin/AdminDashboardScreen'),
)
// const AdminTrainersScreen = lazy(
//   () => import('../pages/admin/AdminTrainersScreen'),
// )
const AdminClientsScreen = lazy(
  () => import('../pages/admin/AdminClientsScreen'),
)
const AdminExercisesScreen = lazy(
  () => import('../pages/admin/AdminExercisesScreen'),
)

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: (
      <Layout>
        <AdminDashboardScreen />
      </Layout>
    ),
  },
  // {
  //   path: '/admin/trainers',
  //   element: (
  //     <Layout>
  //       <AdminTrainersScreen />
  //     </Layout>
  //   ),
  // },
  {
    path: '/admin/clients',
    element: (
      <Layout>
        <AdminClientsScreen />
      </Layout>
    ),
  },
  {
    path: '/admin/exercises',
    element: (
      <Layout>
        <AdminExercisesScreen />
      </Layout>
    ),
  },
]
