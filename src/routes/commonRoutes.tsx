import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import { AuthGuard } from './guards/AuthGuard'

const SubscriptionScreen = lazy(
  () => import('../pages/common/SubscriptionScreen'),
)
const SettingsScreen = lazy(() => import('../pages/common/SettingsScreen'))
const HelpScreen = lazy(() => import('../pages/common/HelpScreen'))
const PrivacyScreen = lazy(() => import('../pages/common/PrivacyScreen'))
const ProfileScreen = lazy(() => import('../pages/client/ProfileScreen'))
const AboutScreen = lazy(() => import('../pages/common/AboutScreen'))
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

export const commonRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/home',
        element: <HomeScreen />,
      },
      {
        path: '/subscriptions',
        element: <SubscriptionScreen />,
      },
      {
        path: '/settings',
        element: <SettingsScreen />,
      },
      {
        path: '/help',
        element: <HelpScreen />,
      },
      {
        path: '/privacy',
        element: <PrivacyScreen />,
      },
      {
        path: '/about',
        element: <AboutScreen />,
      },
      {
        path: '/profile',
        element: <ProfileScreen />,
      },
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
    ],
  },
]
