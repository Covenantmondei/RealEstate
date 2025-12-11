"use client"

import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import PropertyCard from "../../components/PropertyCard"
import { PropertyCardSkeleton } from "../../components/Skeleton"
import EmptyState from "../../components/EmptyState"
import api from "../../utils/api"
import { useToast } from "../../context/ToastContext"

const MyFavoritesPage = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      const response = await api.get("/properties/favorites/me")
      setFavorites(response.data.favorites || [])
    } catch (error) {
      console.error("Error fetching favorites:", error)
      addToast("Error loading favorites", "error")
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (propertyId) => {
    try {
      await api.delete(`/properties/${propertyId}/unfavorite`)
      setFavorites(favorites.filter((fav) => fav.property_id !== propertyId))
      addToast("Removed from favorites", "success")
    } catch (error) {
      addToast("Error removing favorite", "error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.property_id} className="relative">
                <PropertyCard property={favorite} isFavorited={true} />
                <button
                  onClick={() => removeFavorite(favorite.property_id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Remove from favorites"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🤍"
            title="No Favorites Yet"
            description="Start saving properties to your favorites list"
            actionText="Browse Properties"
            actionLink="/properties"
          />
        )}
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default MyFavoritesPage
