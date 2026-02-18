import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Dumbbell,
  Calendar,
  TrendingUp,
  User,
  Users,
  Settings,
} from 'lucide-react'

export type NavRole = 'admin' | 'user' | 'suscripto' | 'suscripto_full'

export interface NavItem {
  path: string
  roles: NavRole[]
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  // Admin
  { path: '/admin', roles: ['admin'], label: 'Inicio', icon: Home },
  { path: '/admin/clients', roles: ['admin'], label: 'Clientes', icon: Users },
  {
    path: '/admin/exercises',
    roles: ['admin'],
    label: 'Ejercicios',
    icon: Dumbbell,
  },
  { path: '/settings', roles: ['admin'], label: 'Config', icon: Settings },
  // user / suscripto / suscripto_full
  {
    path: '/home',
    roles: ['user', 'suscripto', 'suscripto_full'],
    label: 'Inicio',
    icon: Home,
  },
  {
    path: '/routines',
    roles: ['suscripto', 'suscripto_full'],
    label: 'Rutinas',
    icon: Calendar,
  },
  {
    path: '/exercises',
    roles: ['suscripto_full'],
    label: 'Ejercicios',
    icon: Dumbbell,
  },
  {
    path: '/progress',
    roles: ['suscripto_full'],
    label: 'Progreso',
    icon: TrendingUp,
  },
  {
    path: '/profile',
    roles: ['user', 'suscripto', 'suscripto_full'],
    label: 'Perfil',
    icon: User,
  },
  {
    path: '/settings',
    roles: ['user', 'suscripto', 'suscripto_full'],
    label: 'Config',
    icon: Settings,
  },
]
