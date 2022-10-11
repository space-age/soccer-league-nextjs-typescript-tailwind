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

/**
 * Typescript Interface for context IAuth
 */
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

/**
 * Context created with the interface type IAuth
 */
const AuthContext = createContext<IAuth>({
  user: null,
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

/**
 *
 * @param children {AuthProviderProps}
 * @returns
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)

  const router = useRouter()

  /**
   * Runs on first render and when firebase auth has been changed. Persisting the user
   * If there is a user,
   *     set the user state with the current user, user logged in
   *     set loading state to false
   * else
   *    set user to null, no user found or not logged in
   *    set loading to true
   */
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
          // router.push('/login-master-creator')
        }
        setInitialLoading(false)
      }),
    [auth]
  )

  /**
   * Uses firabase function to sign in with emal and password
   *    Sets user state to the user that sign in
   *    routes to the page 'master-creator', into the portal main page
   * @param email {string}
   * @param password {string}
   */
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

  /**
   * Uses firebase signOut function to sign out current user
   * Then, sets the user to state as null, as there is no user logged in anymore
   */
  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  /**
   * Will only recompute the values when user or loading have been changed
   */
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

  /**
   * returns the provider with the value memoedValue which holds the states and functions
   * if is not at initial loading, returns the children,
   * _app.tsx will be wrapped with <AuthProvider>, wrapping entire app, therefore children is everything in the app
   */
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

/**
 * Exports the function to use the AuthContext values and functions inside AuthProvider
 * @returns the current context values (AuthContext)
 */
export default function useAuth() {
  return useContext(AuthContext)
}
