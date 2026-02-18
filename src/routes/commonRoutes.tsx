import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'

const SubscriptionScreen = lazy(() => import('../pages/SubscriptionScreen'))
const SettingsScreen = lazy(() => import('../pages/SettingsScreen'))
const HelpScreen = lazy(() => import('../pages/HelpScreen'))
const PrivacyScreen = lazy(() => import('../pages/PrivacyScreen'))
const AboutScreen = lazy(() => import('../pages/AboutScreen'))

export const commonRoutes: RouteObject[] = [
  {
    path: '/subscriptions',
    element: (
      <Layout>
        <ProtectedRoute requireSubscription={false}>
          <SubscriptionScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/settings',
    element: (
      <Layout>
        <ProtectedRoute requireSubscription={false}>
          <SettingsScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/help',
    element: (
      <Layout>
        <ProtectedRoute requireSubscription={false}>
          <HelpScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/privacy',
    element: (
      <Layout>
        <ProtectedRoute requireSubscription={false}>
          <PrivacyScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/about',
    element: (
      <Layout>
        <ProtectedRoute requireSubscription={false}>
          <AboutScreen />
        </ProtectedRoute>
      </Layout>
    ),
  },
]
