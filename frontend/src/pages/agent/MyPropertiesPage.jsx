"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import Skeleton from "../../components/Skeleton"
import EmptyState from "../../components/EmptyState"
import api from "../../utils/api"
import { useToast } from "../../context/ToastContext"

const MyPropertiesPage = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchMyProperties()
  }, [])

  const fetchMyProperties = async () => {
    try {
      setLoading(true)
      const response = await api.get("/properties/agent/me")
      setProperties(response.data.properties || [])
    } catch (error) {
      console.error("Error fetching properties:", error)
      addToast("Error loading properties", "error")
    } finally {
      setLoading(false)
    }
  }

  const deleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await api.delete(`/properties/${propertyId}/delete`)
        setProperties(properties.filter((prop) => prop.id !== propertyId))
        addToast("Property deleted", "success")
      } catch (error) {
        addToast("Error deleting property", "error")
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Properties</h1>
          <Link to="/agent/properties/create" className="btn-primary">
            + Create New
          </Link>
        </div>

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
                  <p className="text-sm text-slate-500">
                    Status: <span className="font-semibold capitalize">{property.status}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/properties/${property.id}`} className="btn-secondary">
                    View
                  </Link>
                  <Link to={`/agent/properties/${property.id}/edit`} className="btn-outline">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProperty(property.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🏠"
            title="No Properties Yet"
            description="Start by creating your first property listing"
            actionText="Create Listing"
            actionLink="/agent/properties/create"
          />
        )}
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default MyPropertiesPage
