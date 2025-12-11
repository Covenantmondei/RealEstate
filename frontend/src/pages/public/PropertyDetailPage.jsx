"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import PropertyCard from "../../components/PropertyCard"
import api from "../../utils/api"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"

const PropertyDetailPage = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [similarProperties, setSimilarProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const { isAuthenticated } = useAuth()
  const { addToast } = useToast()

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/properties/${id}`)
      setProperty(response.data.property)

      // Fetch similar properties
      const similarResponse = await api.get(`/properties/similar/${id}`)
      setSimilarProperties(similarResponse.data.properties || [])
    } catch (error) {
      console.error("Error fetching property:", error)
      addToast("Error loading property", "error")
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      addToast("Please login to add favorites", "error")
      return
    }

    try {
      if (isFavorited) {
        await api.delete(`/properties/${id}/unfavorite`)
        setIsFavorited(false)
        addToast("Removed from favorites", "success")
      } else {
        await api.post(`/properties/${id}/favorite`)
        setIsFavorited(true)
        addToast("Added to favorites", "success")
      }
    } catch (error) {
      addToast("Error updating favorite", "error")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-slate-300 border-t-slate-900 rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-600">Property not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const images = property.images || [property.image_url]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery */}
        <div className="mb-8">
          <div className="relative h-96 bg-slate-300 rounded-2xl overflow-hidden mb-4">
            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${property.title} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="bg-white/80 hover:bg-white p-3 rounded-full transition"
                >
                  ❮
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                  className="bg-white/80 hover:bg-white p-3 rounded-full transition"
                >
                  ❯
                </button>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                    idx === currentImageIndex ? "border-slate-900" : "border-slate-300"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
                  <p className="text-slate-600">
                    {property.city}, {property.state}
                  </p>
                </div>
                <button
                  onClick={toggleFavorite}
                  className={`text-3xl ${isFavorited ? "text-red-500" : "text-slate-400"}`}
                >
                  {isFavorited ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="text-4xl font-bold text-slate-900 mb-6">${property.price?.toLocaleString()}</div>

              <div className="grid grid-cols-4 gap-4 mb-6 pb-6 border-b border-slate-200">
                <div>
                  <p className="text-slate-600 text-sm">Bedrooms</p>
                  <p className="text-2xl font-bold">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Bathrooms</p>
                  <p className="text-2xl font-bold">{property.bathrooms}</p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Area</p>
                  <p className="text-2xl font-bold">{property.area} sqft</p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Type</p>
                  <p className="text-2xl font-bold capitalize">{property.property_type}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-slate-700 leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Map */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="h-96 bg-slate-200 rounded-lg flex items-center justify-center">
                <p className="text-slate-600">Google Maps Embed Placeholder</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Agent Card */}
            <div className="card mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
                <div>
                  <p className="font-semibold">{property.agent_name}</p>
                  <p className="text-sm text-slate-600">{property.agent_email}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">{property.agent_phone}</p>
              <button className="btn-primary w-full">Contact Agent</button>
            </div>

            {/* CTA */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Interested in this property?</h3>
              <button className="btn-primary w-full mb-2">Schedule Tour</button>
              <button className="btn-secondary w-full">Make an Offer</button>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default PropertyDetailPage
