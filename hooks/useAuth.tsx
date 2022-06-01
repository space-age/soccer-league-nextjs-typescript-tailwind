import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

interface AuthProviderProps {
  //this is just the type needed because we will using this
  // AuthProvider function to wrap our entire application
  // so when using children as in the return statement, this is the type neeeded
  children: React.ReactNode
}

const AuthContext = createContext<IAuth>({
  user: null,
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)

  const router = useRouter()

  //Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push('/login-master-creator')
        }

        setInitialLoading(false)
      }),
    [auth]
  )
  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('./master-creator')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      signIn,
      logout,
      error,
      loading,
    }),
    [user, loading]
  )
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
