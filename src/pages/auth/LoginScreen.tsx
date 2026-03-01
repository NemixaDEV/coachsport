import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/hooks/useTheme'
import { images } from '@/constants/images'

export default function LoginScreen() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const { isDarkMode } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    setError('')

    try {
      const user = await login(email, password)
      if (user) {
        if (user.role === 'admin') {
          navigate('/admin')
        } else if (user.role === 'suscriptor') {
          navigate('/home')
        } else {
          // user (sin suscripción)
          navigate('/profile')
        }
      } else {
        setError('Credenciales incorrectas')
      }
    } catch (err) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <img
            src={
              isDarkMode
                ? images.logoLetrasRojasFondoTransp
                : images.logoLetrasDegradadoFondoTransp
            }
            alt="CoachSport Logo"
            className="mb-4 mx-auto max-w-xs"
          />
          <p className="text-muted-foreground">Inicia sesión en tu cuenta</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mb-6">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-cinnabar hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          {error && <p className="text-cinnabar text-sm mb-4">{error}</p>}
          <Button type="submit" loading={loading} className="w-full mb-4">
            Iniciar Sesión
          </Button>
        </form>

        <div className="text-center">
          <p className="text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-cinnabar hover:underline">
              Regístrate
            </Link>
          </p>
        </div>

        {/* Contact button */}
        <div className="mt-8 text-center">
          <Link to="/contact">
            <Button variant="outline" className="w-full">
              Contáctanos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
