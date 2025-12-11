"use client"

import { useState } from "react"

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "all",
    bedrooms: "all",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="card">
      <h3 className="font-bold text-lg mb-6">Filters</h3>

      <div className="space-y-4">
        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <input
            type="text"
            name="state"
            value={filters.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="input-field"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="input-field"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min price"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max price"
            className="input-field"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Property Type</label>
          <select name="propertyType" value={filters.propertyType} onChange={handleChange} className="input-field">
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium mb-2">Bedrooms</label>
          <select name="bedrooms" value={filters.bedrooms} onChange={handleChange} className="input-field">
            <option value="all">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
