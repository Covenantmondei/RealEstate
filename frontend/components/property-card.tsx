"use client"

import Link from "next/link"
import { useState } from "react"

interface PropertyCardProps {
  property: any
  isFavorited?: boolean
  onFavoriteToggle?: (propertyId: string) => void
}

export default function PropertyCard({ property, isFavorited, onFavoriteToggle }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="card hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden">
      <Link href={`/properties/${property.id}`} className="block">
        <div className="relative h-48 bg-slate-200 overflow-hidden rounded-lg mb-4">
          {!imageError && property.image_url ? (
            <img
              src={property.image_url || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-300">
              <span className="text-slate-500">No image</span>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold">
            ${property.price?.toLocaleString()}
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2">{property.title}</h3>
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">{property.description}</p>

        <div className="flex gap-4 text-sm text-slate-600 mb-4">
          <span>🛏️ {property.bedrooms}</span>
          <span>🚿 {property.bathrooms}</span>
          <span>📐 {property.area} sqft</span>
        </div>

        <p className="text-slate-700 text-sm mb-3">
          {property.city}, {property.state}
        </p>
      </Link>

      {onFavoriteToggle && (
        <button
          onClick={(e) => {
            e.preventDefault()
            onFavoriteToggle(property.id)
          }}
          className={`w-full py-2 px-4 rounded-lg font-medium transition ${
            isFavorited ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
      )}
    </div>
  )
}
