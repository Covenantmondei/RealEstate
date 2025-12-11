"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const navigate = useNavigate()

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token")
      if (storedToken) {
        try {
          const response = await api.get("/auth/verify-token")
          setUser(response.data.user)
          setToken(storedToken)
        } catch (error) {
          localStorage.removeItem("token")
          localStorage.removeItem("refresh_token")
          setToken(null)
        }
      }
      setLoading(false)
    }

    verifyToken()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { access_token, refresh_token, user } = response.data

      localStorage.setItem("token", access_token)
      localStorage.setItem("refresh_token", refresh_token)

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`

      setToken(access_token)
      setUser(user)

      return { success: true, user }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    delete api.defaults.headers.common["Authorization"]
    setUser(null)
    setToken(null)
    navigate("/login")
  }

  const value = {
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
