import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const LoginScreen = lazy(() => import('../pages/auth/LoginScreen'))
const RegisterScreen = lazy(() => import('../pages/auth/RegisterScreen'))
const ProfileSetupScreen = lazy(
  () => import('../pages/auth/ProfileSetupScreen'),
)
const ForgotPasswordScreen = lazy(
  () => import('../pages/auth/ForgotPasswordScreen'),
)
const ContactScreen = lazy(() => import('../pages/auth/ContactScreen'))

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/register',
    element: <RegisterScreen />,
  },
  {
    path: '/profile-setup',
    element: <ProfileSetupScreen />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordScreen />,
  },
  {
    path: '/contact',
    element: <ContactScreen />,
  },
]
