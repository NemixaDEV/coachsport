import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { MoreHorizontal, ChevronLeft } from 'lucide-react'
import { NAV_ITEMS, NavRole } from '@/components/navConfig'

export default function BottomNav() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showMore, setShowMore] = useState(false)

  const currentRole = (user?.role ?? '') as NavRole

  // Footer Menu
  const navItems = useMemo(
    () => NAV_ITEMS.filter((item) => item.roles.includes(currentRole)),
    [currentRole],
  )

  // No mostrar navegación en pantallas de entrenamiento
  const showBottomNav = !location.pathname.includes('/workout/')

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  const maxVisible = 4 // Cantidad antes de ver el ...Mas
  const firstGroup = useMemo(() => navItems.slice(0, maxVisible), [navItems])
  const remainingItems = useMemo(() => navItems.slice(maxVisible), [navItems])
  const hasMore = remainingItems.length > 0

  const handleItemClick = (path: string) => {
    navigate(path)
  }

  // Resetear "Más" cuando navegues a una ruta del primer grupo
  const prevPathRef = useRef(location.pathname)
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname
      const activePath = location.pathname
      const isInFirstGroup = firstGroup.some((item) =>
        item.path === '/admin'
          ? activePath === item.path
          : activePath.startsWith(item.path),
      )
      if (isInFirstGroup && showMore) {
        setShowMore(false)
      }
    }
  }, [location.pathname, firstGroup, showMore])

  return (
    <>
      {showBottomNav && (
        <nav
          className="fixed bottom-0 left-0 right-0 border-t border-border h-20 z-50 shadow-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--navbar-background)',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          }}
        >
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{
              width: hasMore ? '200vw' : '100vw',
              transform: showMore ? 'translateX(-100vw)' : 'translateX(0)',
            }}
          >
            {/* Primera página de iconos */}
            <div
              className="flex justify-around items-center h-full flex-shrink-0"
              style={{ width: '100vw' }}
            >
              {firstGroup.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <button
                    key={item.path}
                    onClick={() => handleItemClick(item.path)}
                    className={`flex flex-col items-center justify-center px-4 py-2 transition-colors ${
                      active ? 'text-cinnabar' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon size={24} />
                    <span className="text-xs mt-1">{item.label}</span>
                  </button>
                )
              })}
              {hasMore && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowMore(true)
                  }}
                  className="flex flex-col items-center justify-center px-4 py-2 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <MoreHorizontal size={24} />
                  <span className="text-xs mt-1">Más</span>
                </button>
              )}
            </div>

            {/* Segunda página de iconos */}
            {hasMore && (
              <div
                className="flex justify-around items-center h-full flex-shrink-0"
                style={{ width: '100vw' }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowMore(false)
                  }}
                  className="flex flex-col items-center justify-center px-4 py-2 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <ChevronLeft size={24} />
                  <span className="text-xs mt-1">Volver</span>
                </button>
                {remainingItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.path)
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleItemClick(item.path)}
                      className={`flex flex-col items-center justify-center px-4 py-2 transition-colors ${
                        active ? 'text-cinnabar' : 'text-muted-foreground'
                      }`}
                    >
                      <Icon size={24} />
                      <span className="text-xs mt-1">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
