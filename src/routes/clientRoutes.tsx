import { lazy } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '@/contexts/AuthContext'

function ClientGuard() {
  const { loading, hasSubscription } = useAuth()
  if (loading) return null
  if (!hasSubscription) return <Navigate to="/login" replace />
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const ExercisesScreen = lazy(() => import('../pages/client/ExercisesScreen'))
const ExerciseDetailScreen = lazy(
  () => import('../pages/client/ExerciseDetailScreen'),
)
const RoutinesScreen = lazy(() => import('../pages/client/RoutinesScreen'))
const RoutineDetailScreen = lazy(
  () => import('../pages/client/RoutineDetailScreen'),
)
const WorkoutScreen = lazy(() => import('../pages/client/WorkoutScreen'))
const WorkoutCompleteScreen = lazy(
  () => import('../pages/client/WorkoutCompleteScreen'),
)
const ProgressScreen = lazy(() => import('../pages/client/ProgressScreen'))
const MessagesScreen = lazy(() => import('../pages/MessagesScreen'))
const ConversationScreen = lazy(() => import('../pages/ConversationScreen'))

export const clientRoutes: RouteObject[] = [
  {
    element: <ClientGuard />,
    children: [
      {
        path: '/exercises',
        element: <ExercisesScreen />,
      },
      {
        path: '/exercise/:id',
        element: <ExerciseDetailScreen />,
      },
      {
        path: '/routines',
        element: <RoutinesScreen />,
      },

      {
        path: '/progress',
        element: <ProgressScreen />,
      },
      {
        path: '/routine/:id',
        element: <RoutineDetailScreen />,
      },
      {
        path: '/workout/:id',
        element: <WorkoutScreen />,
      },
      {
        path: '/workout/:id/complete',
        element: <WorkoutCompleteScreen />,
      },
      {
        path: '/messages',
        element: <MessagesScreen />,
      },
      {
        path: '/conversation/:userId',
        element: <ConversationScreen />,
      },
    ],
  },
]
