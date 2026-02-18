import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'

const HomeScreen = lazy(() => import('../pages/client/HomeScreen'))
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
const ProfileScreen = lazy(() => import('../pages/client/ProfileScreen'))
const MessagesScreen = lazy(() => import('../pages/MessagesScreen'))
const ConversationScreen = lazy(() => import('../pages/ConversationScreen'))

export const clientRoutes: RouteObject[] = [
  {
    path: '/home',
    element: (
      <Layout>
        <ProtectedRoute>
          <HomeScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/exercises',
    element: (
      <Layout>
        <ProtectedRoute>
          <ExercisesScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/exercise/:id',
    element: (
      <Layout>
        <ProtectedRoute>
          <ExerciseDetailScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/routines',
    element: (
      <Layout>
        <ProtectedRoute>
          <RoutinesScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/routine/:id',
    element: (
      <Layout>
        <ProtectedRoute>
          <RoutineDetailScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/workout/:id',
    element: (
      <Layout>
        <ProtectedRoute>
          <WorkoutScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/workout/:id/complete',
    element: (
      <Layout>
        <ProtectedRoute>
          <WorkoutCompleteScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/progress',
    element: (
      <Layout>
        <ProtectedRoute>
          <ProgressScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/messages',
    element: (
      <Layout>
        <ProtectedRoute>
          <MessagesScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/conversation/:userId',
    element: (
      <Layout>
        <ProtectedRoute>
          <ConversationScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  // Rutas sin requerir suscripción
  {
    path: '/profile',
    element: (
      <Layout>
        <ProtectedRoute requireSubscription={false}>
          <ProfileScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
]
