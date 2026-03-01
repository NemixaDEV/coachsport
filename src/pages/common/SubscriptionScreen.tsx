import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, CreditCard, Check, Crown, Calendar } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
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
  const { user, hasSubscription } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans: SubscriptionPlan[] = [
    // {
    //   id: 'user',
    //   name: 'Plan Iniciado',
    //   price: 0,
    //   description: 'Para los que estan comenzando su viaje fitness',
    //   features: [
    //     'Unite a mi red de usuarios de email para enterarte de las ultimas noticias',
    //     'Plan de entrenamiento basico para que todos estemos saludables',
    //   ],
    //   icon: <Zap size={24} className="text-foreground" />,
    // },
    {
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
    },
  ]

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date))
  }

  const subscription = user?.subscription
  const currentPlan = plans.find((p) =>
    hasSubscription ? p.id === 'suscripto' : p.id === 'user',
  )

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

          {/* Estado Actual de la Suscripción */}
          {hasSubscription && subscription ? (
            <>
              <div className="mb-4 p-4 rounded-lg border-2 border-medium-jungle bg-medium-jungle/10">
                <div className="flex items-center mb-3">
                  <div className="mr-3">{currentPlan?.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-bold text-lg">
                      Plan Actual: {currentPlan?.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center mt-3 pt-3 border-t border-border">
                  <Calendar size={16} className="text-foreground mr-2" />
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs mb-1">
                      Período de suscripción
                    </p>
                    <p className="text-foreground text-sm font-semibold">
                      Desde: {formatDate(subscription.startDate)}
                    </p>
                    <p className="text-foreground text-sm font-semibold">
                      Hasta: {formatDate(subscription.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-lg border-2 border-border bg-muted/30">
              <div className="flex items-center">
                <CreditCard size={20} className="text-muted-foreground mr-3" />
                <div>
                  <p className="text-foreground font-semibold">
                    No tienes un plan activo
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Selecciona un plan para comenzar
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Card 2: Cambiar de Plan / Planes Disponibles */}
        <Card className="mb-4">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <CreditCard size={20} className="text-foreground mr-2" />
              <h2 className="text-foreground text-xl font-bold">
                {hasSubscription ? 'Cambiar de Plan' : 'Planes Disponibles'}
              </h2>
            </div>
            <p className="text-muted-foreground text-sm">
              {hasSubscription
                ? 'Elige un nuevo plan o renueva el actual'
                : 'Selecciona el plan que mejor se adapte a tus necesidades'}
            </p>
          </div>

          <div className="space-y-4">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id
              const isCurrentPlan = hasSubscription
                ? plan.id === 'suscripto'
                : plan.id === 'user'

              const cardBorder = isSelected
                ? 'border-cinnabar bg-cinnabar/10'
                : plan.popular
                  ? 'border-medium-jungle bg-medium-jungle/10'
                  : 'border-border'

              const buttonLabel = isCurrentPlan
                ? 'Renovar Plan'
                : hasSubscription
                  ? 'Cambiar a este Plan'
                  : 'Suscribirse'

              return (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-4 transition-all ${cardBorder}`}
                >
                  {plan.popular && (
                    <div className="flex items-center justify-center mb-2">
                      <span className="bg-medium-jungle text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        Más Popular
                      </span>
                    </div>
                  )}

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

                  <ul className="mb-4 space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check
                          size={16}
                          className="text-medium-jungle mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-foreground text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? 'positive' : 'primary'}
                    className="w-full"
                    onClick={() => {
                      setSelectedPlan(plan.id)
                      // handleSubscribeClick(plan.id)
                    }}
                  >
                    {buttonLabel}
                  </Button>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-muted-foreground text-xs text-center">
              Los pagos se procesan de forma segura a través de MercadoPago
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
