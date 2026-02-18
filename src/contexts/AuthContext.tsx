import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore' // ← Esta línea
import { auth, db } from '@/config/firebase'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User | null>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Escuchar cambios de autenticación en Firebase
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (docSnap.exists()) {
          const data = docSnap.data()
          const userData: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: data.name || 'Usuario',
            role: data.role,
            createdAt: data.createdAt?.toDate() ?? new Date(),
          }
          setUser(userData)
          console.log('[AuthContext] Usuario autenticado:', userData)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    // console.log('[AuthContext] Usuario autenticado:', user)

    // Cleanup: dejar de escuchar cuando el componente se desmonte
    return () => unsubscribe()
  }, [])

  const login = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid))
    if (docSnap.exists()) {
      const data = docSnap.data()
      const userData: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: data.name || 'Usuario',
        role: data.role,
        createdAt: data.createdAt?.toDate() ?? new Date(),
      }
      setUser(userData)
      console.log('[AuthContext] Usuario logueado:', userData)
      return userData
    }
    setUser(null)
    return null
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
      // console.log('✅ Usuario desconectado')
      // El onAuthStateChanged automáticamente limpiará el estado
    } catch (error: any) {
      console.error('❌ Error en logout:', error.message)
      throw error
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(userCredential.user, { displayName: name })

      // Actualizar el perfil con el nombre
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        name: name,
        role: 'user', // ← El rol va como campo del documento
        createdAt: new Date(),
      })

      // console.log('✅ Usuario registrado:', userCredential.user.email)
      // El onAuthStateChanged automáticamente actualizará el estado
    } catch (error: any) {
      console.error('❌ Error en registro:', error.code, error.message)
      throw error // Re-lanzar el error para que la UI lo maneje
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
