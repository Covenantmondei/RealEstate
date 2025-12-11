"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import PropertyCard from "../../components/PropertyCard"
import { PropertyCardSkeleton } from "../../components/Skeleton"
import EmptyState from "../../components/EmptyState"
import api from "../../utils/api"

const HomePage = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchLocation, setSearchLocation] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 })

  useEffect(() => {
    fetchFeaturedProperties()
  }, [])

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get("/properties/all?limit=6")
      setProperties(response.data.properties || [])
    } catch (err) {
      console.error("Error fetching properties:", err)
      setError("Failed to load properties")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Find Your Dream Property</h1>
            <p className="text-xl text-slate-600 mb-8">
              Explore thousands of premium properties and connect with trusted agents
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="input-field"
              />
              <Link to="/properties" className="btn-primary w-full">
                Search Properties
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Houses", "Apartments", "Condos", "Land"].map((category) => (
              <div key={category} className="card text-center cursor-pointer hover:bg-slate-50 transition">
                <div className="text-3xl mb-2">🏠</div>
                <p className="font-medium">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-slate-600">Check out our latest premium listings</p>
          </div>

          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700 mb-4">{error}</p>
              <button onClick={fetchFeaturedProperties} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              <div className="text-center">
                <Link to="/properties" className="btn-primary">
                  View All Properties
                </Link>
              </div>
            </>
          ) : (
            <EmptyState
              icon="🏚️"
              title="No Properties Available"
              description="Check back soon for new listings"
              actionText="Browse All"
              actionLink="/properties"
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to List Your Property?</h2>
          <p className="text-slate-300 mb-8">Join our network of successful agents and reach thousands of buyers</p>
          <Link to="/register" className="btn-primary bg-white text-slate-900 hover:bg-slate-100">
            Become an Agent
          </Link>
        </div>
      </section>

      <Footer />
      <Toast />
    </div>
  )
}

export default HomePage
