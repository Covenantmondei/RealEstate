"use client"

import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import Skeleton from "../../components/Skeleton"
import EmptyState from "../../components/EmptyState"
import api from "../../utils/api"
import { useToast } from "../../context/ToastContext"

const UsersManagementPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get("/admin/users")
      setUsers(response.data.users || [])
    } catch (error) {
      console.error("Error fetching users:", error)
      addToast("Error loading users", "error")
    } finally {
      setLoading(false)
    }
  }

  const suspendUser = async (userId) => {
    try {
      await api.post(`/admin/users/suspend`, { user_id: userId })
      setUsers(users.map((user) => (user.id === userId ? { ...user, is_suspended: true } : user)))
      addToast("User suspended", "success")
    } catch (error) {
      addToast("Error suspending user", "error")
    }
  }

  const unsuspendUser = async (userId) => {
    try {
      await api.post(`/admin/users/${userId}/unsuspend`)
      setUsers(users.map((user) => (user.id === userId ? { ...user, is_suspended: false } : user)))
      addToast("User unsuspended", "success")
    } catch (error) {
      addToast("Error unsuspending user", "error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Users Management</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold">Name</th>
                  <th className="text-left py-4 px-4 font-semibold">Email</th>
                  <th className="text-left py-4 px-4 font-semibold">Role</th>
                  <th className="text-left py-4 px-4 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-4 px-4">{user.full_name}</td>
                    <td className="py-4 px-4">{user.email}</td>
                    <td className="py-4 px-4 capitalize">{user.role}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.is_suspended ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.is_suspended ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {user.is_suspended ? (
                        <button
                          onClick={() => unsuspendUser(user.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                        >
                          Unsuspend
                        </button>
                      ) : (
                        <button
                          onClick={() => suspendUser(user.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                        >
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon="👥" title="No Users Found" description="No users registered on the platform yet" />
        )}
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default UsersManagementPage
