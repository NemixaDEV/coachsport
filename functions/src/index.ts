import { setGlobalOptions } from 'firebase-functions'
import { beforeUserCreated } from 'firebase-functions/v2/identity'

setGlobalOptions({ maxInstances: 10 })

export const validatePasswordOnRegister = beforeUserCreated((event) => {
  const password = (event.credential as any)?.rawNonce

  if (!password) return

  const errors: string[] = []

  if (password.length < 8) errors.push('Mínimo 8 caracteres')
  if (!/[A-Z]/.test(password)) errors.push('Al menos una mayúscula')
  if (!/[a-z]/.test(password)) errors.push('Al menos una minúscula')
  if (!/[0-9]/.test(password)) errors.push('Al menos un número')
  if (!/[!@#$%^&*]/.test(password))
    errors.push('Al menos un símbolo (!@#$%^&*)')

  if (errors.length > 0) {
    throw new Error(errors.join(', '))
  }
})
