import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Dumbbell,
  Calendar,
  TrendingUp,
  User,
  // Users,
  Settings,
  // LayoutDashboard,
} from 'lucide-react'

export type NavRole = 'admin' | 'user' | 'suscriptor'

export interface NavItem {
  path: string
  roles: NavRole[]
  label: string
  icon: LucideIcon
}

// Footer Menu
export const NAV_ITEMS: NavItem[] = [
  // admin
  // { path: '/admin', roles: ['admin'], label: 'Inicio', icon: LayoutDashboard },
  // { path: '/admin/clients', roles: ['admin'], label: 'Clientes', icon: Users },
  // {
  //   path: '/admin/exercises',
  //   roles: ['admin'],
  //   label: 'Ejercicios',
  //   icon: Dumbbell,
  // },
  {
    path: '/home',
    roles: ['user', 'suscriptor', 'admin'],
    label: 'Inicio',
    icon: Home,
  },
  // user / suscripto
  {
    path: '/routines',
    roles: ['user', 'suscriptor', 'admin'],
    label: 'Rutinas',
    icon: Calendar,
  },
  {
    path: '/exercises',
    roles: ['user', 'suscriptor', 'admin'],
    label: 'Ejercicios',
    icon: Dumbbell,
  },
  {
    path: '/progress',
    roles: ['user', 'suscriptor', 'admin'],
    label: 'Progreso',
    icon: TrendingUp,
  },
  {
    path: '/profile',
    roles: ['user', 'suscriptor', 'admin'],
    label: 'Perfil',
    icon: User,
  },
  {
    path: '/settings',
    roles: ['user', 'suscriptor', 'admin'],
    label: 'Config',
    icon: Settings,
  },
]
