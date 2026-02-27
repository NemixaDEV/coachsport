import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/hooks/useTheme'
import { images } from '@/constants/images'

export default function RegisterScreen() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { isDarkMode } = useTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Por favor completa todos los campos')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    const passwordErrors: string[] = []
    if (password.length < 8) passwordErrors.push('Mínimo 8 caracteres')
    if (!/[A-Z]/.test(password)) passwordErrors.push('Al menos una mayúscula')
    if (!/[a-z]/.test(password)) passwordErrors.push('Al menos una minúscula')
    if (!/[0-9]/.test(password)) passwordErrors.push('Al menos un número')
    if (!/[!@#$%^&*]/.test(password))
      passwordErrors.push('Al menos un símbolo (!@#$%^&*)')
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join(', '))
      return
    }

    setLoading(true)
    setError('')

    try {
      await register(email, password, name)
      navigate('/profile-setup')
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario')
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
          <p className="text-muted-foreground">
            Completa tus datos para comenzar
          </p>
        </div>

        <form onSubmit={handleRegister} className="mb-6">
          <Input
            label="Nombre completo"
            type="text"
            placeholder="Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
          />
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={100}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={50}
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            maxLength={50}
          />
          {error && <p className="text-cinnabar text-sm mb-4">{error}</p>}
          <Button type="submit" loading={loading} className="w-full mb-4">
            Registrarse
          </Button>
        </form>

        <div className="text-center">
          <p className="text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-cinnabar hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
