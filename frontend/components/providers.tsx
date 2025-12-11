"use client"

import type React from "react"

import { AuthProvider } from "@/lib/context/auth-context"
import { ToastProvider } from "@/lib/context/toast-context"
import Toast from "./toast"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
        <Toast />
      </ToastProvider>
    </AuthProvider>
  )
}
