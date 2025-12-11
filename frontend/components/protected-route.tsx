"use client"

import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"
import { LoadingSpinner } from "./loading-spinner"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: "buyer" | "agent" | "admin"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  if (requiredRole && user?.role !== requiredRole) {
    router.push("/")
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
