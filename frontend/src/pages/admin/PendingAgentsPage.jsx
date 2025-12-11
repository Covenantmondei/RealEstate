"use client"

import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import Skeleton from "../../components/Skeleton"
import EmptyState from "../../components/EmptyState"
import api from "../../utils/api"
import { useToast } from "../../context/ToastContext"

const PendingAgentsPage = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchPendingAgents()
  }, [])

  const fetchPendingAgents = async () => {
    try {
      setLoading(true)
      const response = await api.get("/admin/agents/pending")
      setAgents(response.data.agents || [])
    } catch (error) {
      console.error("Error fetching pending agents:", error)
      addToast("Error loading pending agents", "error")
    } finally {
      setLoading(false)
    }
  }

  const approveAgent = async (agentId) => {
    try {
      await api.post(`/admin/agents/approve`, { agent_id: agentId })
      setAgents(agents.filter((agent) => agent.id !== agentId))
      addToast("Agent approved", "success")
    } catch (error) {
      addToast("Error approving agent", "error")
    }
  }

  const rejectAgent = async (agentId) => {
    try {
      await api.post(`/admin/agents/reject`, { agent_id: agentId })
      setAgents(agents.filter((agent) => agent.id !== agentId))
      addToast("Agent rejected", "success")
    } catch (error) {
      addToast("Error rejecting agent", "error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Pending Agents</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : agents.length > 0 ? (
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="card flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{agent.full_name}</h3>
                  <p className="text-slate-600">{agent.email}</p>
                  <p className="text-sm text-slate-500">
                    Applied on: {new Date(agent.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => approveAgent(agent.id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectAgent(agent.id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="✅" title="No Pending Agents" description="All agent applications have been reviewed" />
        )}
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default PendingAgentsPage
