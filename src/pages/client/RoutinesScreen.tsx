import { useAuth } from '@/contexts/AuthContext'
import { useAdminView } from '@/contexts/AdminViewContext'
import { ClipboardList, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function RoutinesScreen() {
  const { user } = useAuth()
  const { viewMode } = useAdminView()

  const effectiveRole = user?.role === 'admin' ? viewMode : user?.role
  const canAccessPremium =
    effectiveRole === 'suscriptor' || effectiveRole === 'admin'

  const ROUTINES = [
    {
      id: 1,
      name: 'Rutina Inicial Full Body',
      premium: false,
    },
    {
      id: 2,
      name: 'Hipertrofia Avanzada',
      premium: true,
    },
    {
      id: 3,
      name: 'Core & Funcional Pro',
      premium: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <h1 className="text-foreground text-2xl font-bold mb-2">Mis Rutinas</h1>
        <p className="text-muted-foreground">Gestiona tus entrenamientos</p>
      </div>

      <div className="px-6 space-y-4">
        {ROUTINES.map((routine) => {
          const isLocked = !canAccessPremium && routine.premium

          return (
            <div key={routine.id} className="relative">
              <div
                className={`p-5 rounded-xl border border-border bg-muted/30 transition ${
                  isLocked
                    ? 'opacity-50 pointer-events-none'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ClipboardList size={24} className="text-primary mr-3" />
                    <div>
                      <p className="text-foreground font-semibold">
                        {routine.name}
                      </p>
                      {routine.premium && (
                        <p className="text-xs text-muted-foreground">
                          Solo suscriptores
                        </p>
                      )}
                    </div>
                  </div>

                  <Button size="sm">Ver rutina</Button>
                </div>
              </div>

              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                  <div className="flex items-center text-white font-semibold">
                    <Lock size={18} className="mr-2" />
                    Solo para suscriptores
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
