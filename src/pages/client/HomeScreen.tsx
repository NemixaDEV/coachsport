import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/Card'
import { Dumbbell, TrendingUp, Pencil } from 'lucide-react'
import { useAdminView } from '@/contexts/AdminViewContext'
import { Button } from '@/components/ui/Button'

export default function HomeScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { viewMode } = useAdminView()

  const effectiveRole = user?.role === 'admin' ? viewMode : user?.role

  const canAccessPremium =
    effectiveRole === 'suscriptor' || effectiveRole === 'admin'

  const SHORTS = [
    {
      id: 'pOPpa09aKuc?si=DSTbxDpbnUMFnIJE',
      title: 'Sentadillas correctas',
      premium: false,
    },
    {
      id: 'Qz7vx5hZkUA?si=lfpbfQrzy0K8e-_F',
      title: 'Core challenge',
      premium: true,
    },
    {
      id: 'qFBcn2QiGUQ?si=E5BSxPRk1tiUSg_s',
      title: 'Core challenge',
      premium: true,
    },
    {
      id: 'IUe-AyhQ4QE?si=Xgo8Sj03ZpOAHFfY',
      title: 'Core challenge',
      premium: false,
    },
    {
      id: '/I-ocDR-pipI?si=ojBmNgmNx-8rtSAH',
      title: 'Arrancando un dia',
      premium: true,
    },
    {
      id: 't86Rh_6gKPk?si=HBkDvs2jyOdxnzKE',
      title: 'Juanetes Separados',
      premium: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm">Hoy se entrena</p>
            <h1 className="text-foreground text-2xl font-bold">{user?.name}</h1>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="mt-0">
          <h2 className="text-foreground text-lg font-semibold">
            La Frase del Día
          </h2>
          <div className="mt-2">
            <div>
              <div>
                {' '}
                <Card>
                  <p className="text-foreground text-2xl font-bold">
                    El éxito es la suma de pequeños esfuerzos repetidos día tras
                    día.
                  </p>
                </Card>
              </div>
              <div className="flex justify-end">
                {user?.role === 'admin' && viewMode === 'admin' && (
                  <Button size="sm" className="mt-2">
                    <Pencil size={24} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-foreground text-lg font-semibold">Esta Semana</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Card>
              <p className="text-muted-foreground text-xs mb-1">
                Entrenamientos
              </p>
              <p className="text-foreground text-2xl font-bold">3</p>
            </Card>
            <Card>
              <p className="text-muted-foreground text-xs mb-1">Tiempo total</p>
              <p className="text-foreground text-2xl font-bold">2.5h</p>
            </Card>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-foreground text-lg font-semibold">
            Accesos Rápidos
          </h2>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              onClick={() => navigate('/exercises')}
              className="border border-border rounded-lg p-4 text-left hover:opacity-80 transition-colors"
              style={{ backgroundColor: 'var(--button-background)' }}
            >
              <Dumbbell size={24} className="text-cinnabar mb-2" />
              <p className="text-foreground font-semibold">Biblioteca</p>
              <p className="text-muted-foreground text-xs">
                Explora ejercicios
              </p>
            </button>
            <button
              onClick={() => navigate('/progress')}
              className="border border-border rounded-lg p-4 text-left hover:opacity-80 transition-colors"
              style={{ backgroundColor: 'var(--button-background)' }}
            >
              <TrendingUp size={24} className="text-medium-jungle mb-2" />
              <p className="text-foreground font-semibold">Progreso</p>
              <p className="text-muted-foreground text-xs">Ver estadísticas</p>
            </button>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-foreground text-lg font-semibold">
            Equipo Leo Últimos Entrenamientos
          </h2>
          <div className="mt-2">
            <Card>
              <div className="text-foreground">
                Motivate como yo. Segui mis entrenamientos y entrenate conmigo.
                Juntos vamos a lograr tus objetivos.
              </div>
              <div className="mt-5">
                <h2 className="text-foreground text-lg font-semibold mb-2">
                  Video del Coach
                </h2>
                <div
                  className="relative w-full rounded-xl overflow-hidden"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/QhYKHUqgGbI?si=fuHADfP3Hz94BSxR`}
                    title="Empezar de Cero"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="flex justify-end">
                {user?.role === 'admin' && viewMode === 'admin' && (
                  <Button size="sm" className="mt-2">
                    <Pencil size={24} />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-foreground text-lg font-semibold">Shorts</h2>
          <div className="mt-2">
            <Card>
              <div className="text-foreground">
                Unite al canal de shorts para ver videos cortos con tips,
                ejercicios y motivación diaria.
              </div>
              <div className="mt-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                  {SHORTS.map((short) => {
                    const isLocked = short.premium && !canAccessPremium

                    return (
                      <div key={short.id} className="relative">
                        <div
                          className={`relative w-full rounded-xl overflow-hidden ${
                            isLocked
                              ? 'opacity-40 pointer-events-none'
                              : 'cursor-pointer'
                          }`}
                          style={{ paddingBottom: '177.78%' }}
                          onClick={() => {
                            if (!isLocked) {
                              window.open(
                                `https://www.youtube.com/shorts/${short.id}`,
                                '_blank',
                                'noopener,noreferrer',
                              )
                            }
                          }}
                        >
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${short.id}`}
                            title={short.title}
                            allowFullScreen
                          />

                          {!isLocked && <div className="absolute inset-0" />}
                        </div>

                        {isLocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                            <span className="text-white font-semibold">
                              Solo para suscriptores
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex justify-end">
                {user?.role === 'admin' && viewMode === 'admin' && (
                  <Button size="sm" className="mt-2">
                    <Pencil size={24} />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
