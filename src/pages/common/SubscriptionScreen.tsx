import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Trophy } from 'lucide-react'
import { ArrowLeft, CreditCard, Crown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useAdminView } from '@/contexts/AdminViewContext'
interface SubscriptionPlan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  icon: React.ReactNode
  popular?: boolean
}

export default function SubscriptionScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { viewMode } = useAdminView()

  const effectiveRole = user?.role === 'admin' ? viewMode : user?.role

  const plan: SubscriptionPlan = {
    id: 'suscripto',
    name: 'Equipo Leo',
    price: 40000,
    description: 'Experiencia completa y premium',
    features: [
      'Todo lo del plan iniciado',
      'Mas rutinas y ejercicios exclusivos',
      'Videos exclusivos de youtube',
    ],
    icon: <Crown size={24} className="text-foreground" />,
    popular: true,
  }

  console.log('role real:', user?.role)
  console.log('viewMode:', viewMode)
  console.log('effectiveRole:', effectiveRole)

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold">
          Gestionar Suscripciones
        </h1>
      </div>

      <div className="px-6 pb-6">
        {/* Card 1: Plan de Suscripción Actual */}
        <Card className="mb-4">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <CreditCard size={20} className="text-foreground mr-2" />
              <h2 className="text-foreground text-xl font-bold">
                Plan de Suscripción
              </h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Gestiona tu plan actual y configura la renovación
            </p>
          </div>
          {effectiveRole === 'admin' ? (
            <div className="mb-4 p-4 rounded-lg border-2 border-medium-jungle bg-medium-jungle/10">
              <p className="text-foreground text-sm">
                Modo Administrador Activo
              </p>
            </div>
          ) : effectiveRole === 'user' ? (
            <>
              <div className="p-4 rounded-lg border-2 border-border bg-muted/30">
                <div className="flex items-center">
                  <CreditCard
                    size={20}
                    className="text-muted-foreground mr-3"
                  />
                  <div>
                    <p className="text-foreground font-semibold">
                      No tienes un plan activo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border-2 border-border bg-muted/30 mt-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="mr-3">{plan.icon}</div>
                    <div>
                      <h3 className="text-foreground font-bold text-lg">
                        {plan.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline mb-2">
                    <span className="text-foreground text-2xl font-bold">
                      ${plan.price.toLocaleString('es-AR')}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      ARS/mes
                    </span>
                  </div>
                </div>
                <button className="w-full p-4 rounded-lg border-2 font-semibold border-medium-jungle bg-medium-jungle/10 hover:bg-green-600 transition-colors">
                  Suscribirse
                </button>
              </div>
            </>
          ) : effectiveRole === 'suscriptor' ? (
            <>
              <div className="p-4 rounded-lg border-2 border-border bg-muted/30">
                <div className="flex items-center">
                  <Trophy size={20} className="text-muted-foreground mr-3" />
                  <div>
                    <p className="text-foreground font-semibold">
                      Gracias por ser parte de nuestro equipo premium.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border-2 border-border bg-muted/30 mt-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="mr-3">{plan.icon}</div>
                    <div>
                      <h3 className="text-foreground font-bold text-lg">
                        {plan.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline mb-2">
                    <span className="text-foreground text-2xl font-bold">
                      ${plan.price.toLocaleString('es-AR')}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      ARS/mes
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </Card>
      </div>
    </div>
  )
}
