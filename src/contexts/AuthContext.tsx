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
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import { AuthContextType, User } from '@/types'

interface AuthProviderProps {
  children: ReactNode
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // ==== FIREBASE AUTH STATE CHANGE ====
  useEffect(() => {
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
            subscription: data.subscription_start
              ? {
                  startDate: data.subscription_start.toDate(),
                  endDate: data.subscription_end?.toDate() ?? new Date(),
                }
              : undefined,
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
        subscription: data.subscription_start
          ? {
              startDate: data.subscription_start.toDate(),
              endDate: data.subscription_end?.toDate() ?? new Date(),
            }
          : undefined,
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
    } catch (error: any) {
      console.error('Error en logout:', error.message)
      throw error
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(userCredential.user, { displayName: name })
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        name: name,
        role: 'user',
        createdAt: new Date(),
        subscription_plan: null,
        subscription_start: null,
        subscription_end: null,
      })
    } catch (error: any) {
      console.error('Error en registro:', error.code, error.message)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    hasSubscription: ['suscriptor', 'admin'].includes(user?.role ?? ''),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
