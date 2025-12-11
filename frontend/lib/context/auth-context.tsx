"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/utils/api"

interface User {
  id: string
  email: string
  full_name: string
  role: "buyer" | "agent" | "admin"
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  register: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (storedToken) {
        try {
          const response = await api.get("/auth/verify-token")
          setUser(response.data.user)
          setToken(storedToken)
        } catch (error) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token")
            localStorage.removeItem("refresh_token")
          }
          setToken(null)
        }
      }
      setLoading(false)
    }

    verifyToken()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { access_token, refresh_token, user } = response.data

      if (typeof window !== "undefined") {
        localStorage.setItem("token", access_token)
        localStorage.setItem("refresh_token", refresh_token)
      }

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`

      setToken(access_token)
      setUser(user)

      return { success: true, user }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      }
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await api.post("/auth/register", userData)
      return { success: true, data: response.data }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("refresh_token")
    }
    delete api.defaults.headers.common["Authorization"]
    setUser(null)
    setToken(null)
    router.push("/login")
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
