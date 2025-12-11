"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "buyer",
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      addToast("Passwords do not match", "error")
      return
    }

    setLoading(true)

    const result = await register({
      email: formData.email,
      password: formData.password,
      full_name: formData.fullName,
      role: formData.role,
    })

    if (result.success) {
      addToast("Registration successful! Please log in.", "success")
      navigate("/login")
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
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-slate-600 mb-8">Join our real estate platform</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">I want to sign up as</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input-field"
                >
                  <option value="buyer">Buyer</option>
                  <option value="agent">Agent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-slate-600 text-sm mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-slate-900 font-semibold hover:underline">
                Sign in
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

export default RegisterPage
