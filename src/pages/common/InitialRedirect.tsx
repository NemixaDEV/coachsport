import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function InitialRedirect() {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated && user?.role === 'admin') return <Navigate to="/admin" replace />
  if (isAuthenticated) return <Navigate to="/home" replace />
  return <Navigate to="/login" replace />
}
