"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const auth = localStorage.getItem("adminAuthenticated")
      setIsAuthenticated(auth === "true")
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Redirect unauthenticated users
    if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would validate credentials against your backend
    if (email === "admin@nkrecruitment.com" && password === "admin123") {
      localStorage.setItem("adminAuthenticated", "true")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("adminAuthenticated")
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{!isLoading && children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
