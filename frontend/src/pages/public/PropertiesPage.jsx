"use client"

import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import PropertyCard from "../../components/PropertyCard"
import FilterSidebar from "../../components/FilterSidebar"
import Pagination from "../../components/Pagination"
import { PropertyCardSkeleton } from "../../components/Skeleton"
import EmptyState from "../../components/EmptyState"
import ErrorFallback from "../../components/ErrorFallback"
import api from "../../utils/api"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"

const PropertiesPage = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [filters, setFilters] = useState({})
  const { isAuthenticated } = useAuth()
  const { addToast } = useToast()

  useEffect(() => {
    fetchProperties()
    if (isAuthenticated) fetchFavorites()
  }, [currentPage, filters, isAuthenticated])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...filters,
      })
      const response = await api.get(`/properties/all?${params}`)
      setProperties(response.data.properties || [])
      setTotalPages(response.data.total_pages || 1)
    } catch (err) {
      console.error("Error fetching properties:", err)
      setError("Failed to load properties")
      addToast("Error loading properties", "error")
    } finally {
      setLoading(false)
    }
  }

  const fetchFavorites = async () => {
    try {
      const response = await api.get("/properties/favorites/me")
      setFavorites(response.data.favorites?.map((fav) => fav.property_id) || [])
    } catch (error) {
      console.error("Error fetching favorites:", error)
    }
  }

  const toggleFavorite = async (propertyId) => {
    if (!isAuthenticated) {
      addToast("Please login to add favorites", "error")
      return
    }

    try {
      if (favorites.includes(propertyId)) {
        await api.delete(`/properties/${propertyId}/unfavorite`)
        setFavorites(favorites.filter((id) => id !== propertyId))
        addToast("Removed from favorites", "success")
      } else {
        await api.post(`/properties/${propertyId}/favorite`)
        setFavorites([...favorites, propertyId])
        addToast("Added to favorites", "success")
      }
    } catch (error) {
      addToast("Error updating favorite", "error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar onFilterChange={setFilters} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">All Properties</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-slate-900 text-white" : "bg-slate-200"}`}
                  aria-label="Grid view"
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-slate-900 text-white" : "bg-slate-200"}`}
                  aria-label="List view"
                >
                  ≡
                </button>
              </div>
            </div>

            {error ? (
              <ErrorFallback error={error} action="Try Again" />
            ) : loading ? (
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {[...Array(12)].map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            ) : properties.length > 0 ? (
              <>
                <div
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6 mb-8`}
                >
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorited={favorites.includes(property.id)}
                      onFavoriteToggle={toggleFavorite}
                    />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            ) : (
              <EmptyState
                icon="🔍"
                title="No Properties Found"
                description="Try adjusting your filters or search criteria"
                actionText="Clear Filters"
                actionLink="/properties"
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default PropertiesPage
