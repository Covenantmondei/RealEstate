"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(email, password)
    if (result.success) {
      addToast("Login successful!", "success")
      const dashboardPaths = {
        buyer: "/buyer/dashboard",
        agent: "/agent/dashboard",
        admin: "/admin/dashboard",
      }
      navigate(dashboardPaths[result.user.role] || "/")
    } else {
      addToast(result.error, "error")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="card">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-slate-600 mb-8">Sign in to your account</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-slate-600 text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-slate-900 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default LoginPage
