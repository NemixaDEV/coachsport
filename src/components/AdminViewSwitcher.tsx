import { useAuth } from '@/contexts/AuthContext'
import { useAdminView, ViewMode } from '@/contexts/AdminViewContext'
import { Dumbbell, LayoutDashboard, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const MODOS: { key: ViewMode; label: string }[] = [
  { key: 'admin', label: 'Admin' },
  { key: 'user', label: 'Usuario' },
  { key: 'suscriptor', label: 'Suscriptor' },
]

const RUTAS_ADMIN = [
  { key: '1', path: '/admin', icon: LayoutDashboard },
  { key: '2', path: '/admin/clients', icon: User },
  { key: '3', path: '/admin/exercises', icon: Dumbbell },
]

export function AdminViewSwitcher() {
  const { user } = useAuth()
  const { viewMode, setViewMode } = useAdminView()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) =>
    path === '/admin'
      ? location.pathname === path
      : location.pathname.startsWith(path)

  if (user?.role !== 'admin') return null

  return (
    <div className="sticky top-0 z-50 flex flex-col border sm:flex-row justify-between bg-muted items-center p-2 mt-5 mx-5">
      <div className="gap-2 bg-muted bg-red-50 mt-2 sm:mt-0">
        {MODOS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setViewMode(key)}
            className={`flex-1 font-semibold py-1.5 px-2 transition-all ${
              viewMode === key
                ? 'bg-cinnabar text-white'
                : 'text-muted-foreground hover:text-black'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-10 rounded-lg mr-2 mt-5 mb-2 sm:my-0">
        {RUTAS_ADMIN.map((rutas) => (
          <button
            key={rutas.key}
            onClick={() => navigate(rutas.path)}
            className="flex items-center justify-center hover:opacity-80 transition-colors"
          >
            <rutas.icon
              size={24}
              className={
                isActive(rutas.path) ? 'text-cinnabar' : 'text-foreground'
              }
            />
          </button>
        ))}
      </div>
    </div>
  )
}
