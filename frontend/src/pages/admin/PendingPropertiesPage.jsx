"use client"

import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import Skeleton from "../../components/Skeleton"
import EmptyState from "../../components/EmptyState"
import api from "../../utils/api"
import { useToast } from "../../context/ToastContext"

const PendingPropertiesPage = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchPendingProperties()
  }, [])

  const fetchPendingProperties = async () => {
    try {
      setLoading(true)
      const response = await api.get("/admin/properties/pending")
      setProperties(response.data.properties || [])
    } catch (error) {
      console.error("Error fetching pending properties:", error)
      addToast("Error loading pending properties", "error")
    } finally {
      setLoading(false)
    }
  }

  const approveProperty = async (propertyId) => {
    try {
      await api.post(`/admin/properties/approve`, { property_id: propertyId })
      setProperties(properties.filter((prop) => prop.id !== propertyId))
      addToast("Property approved", "success")
    } catch (error) {
      addToast("Error approving property", "error")
    }
  }

  const rejectProperty = async (propertyId) => {
    try {
      await api.post(`/admin/properties/reject`, { property_id: propertyId })
      setProperties(properties.filter((prop) => prop.id !== propertyId))
      addToast("Property rejected", "success")
    } catch (error) {
      addToast("Error rejecting property", "error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Pending Properties</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className="card flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{property.title}</h3>
                  <p className="text-slate-600">
                    {property.city}, {property.state} • ${property.price?.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500">Submitted by: {property.agent_name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => approveProperty(property.id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectProperty(property.id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="✅"
            title="No Pending Properties"
            description="All properties have been reviewed and approved"
          />
        )}
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default PendingPropertiesPage
