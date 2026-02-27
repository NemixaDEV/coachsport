import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

import { lazy } from 'react'
import Layout from '@/components/Layout'

function AuthGuard() {
  const { loading, isAuthenticated } = useAuth()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const SubscriptionScreen = lazy(() => import('../pages/SubscriptionScreen'))
const SettingsScreen = lazy(() => import('../pages/SettingsScreen'))
const HelpScreen = lazy(() => import('../pages/HelpScreen'))
const PrivacyScreen = lazy(() => import('../pages/PrivacyScreen'))
const ProfileScreen = lazy(() => import('../pages/client/ProfileScreen'))
const AboutScreen = lazy(() => import('../pages/AboutScreen'))
const HomeScreen = lazy(() => import('../pages/client/HomeScreen'))

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
    ],
  },
]
