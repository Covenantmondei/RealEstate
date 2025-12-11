// Properties Module

const API_BASE_URL = "https://api.example.com" // Declare API_BASE_URL
const fetchAPI = async (url, options = {}) => {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

const getToken = () => {
  // Implement token retrieval logic here
  return localStorage.getItem("token")
}

const showLoading = () => {
  // Implement loading indicator here
  console.log("Loading...")
}

const hideLoading = () => {
  // Implement loading indicator removal here
  console.log("Loading finished.")
}

const showToast = (message, type) => {
  // Implement toast notification here
  console.log(`${type}: ${message}`)
}

const getAllProperties = async (filters = {}) => {
  let query = ""
  if (filters.location) query += `&location=${filters.location}`
  if (filters.type) query += `&type=${filters.type}`
  if (filters.minPrice) query += `&minPrice=${filters.minPrice}`
  if (filters.maxPrice) query += `&maxPrice=${filters.maxPrice}`
  if (filters.bedrooms) query += `&bedrooms=${filters.bedrooms}`
  if (filters.bathrooms) query += `&bathrooms=${filters.bathrooms}`
  if (filters.page) query += `&page=${filters.page}`
  if (filters.limit) query += `&limit=${filters.limit}`
  if (filters.sort) query += `&sort=${filters.sort}`

  return fetchAPI(`/properties/all?${query.substring(1)}`)
}

const getPropertyDetail = async (propertyId) => {
  return fetchAPI(`/properties/${propertyId}`)
}

const getAgentProperties = async () => {
  return fetchAPI("/properties/agent/me")
}

const createProperty = async (propertyData) => {
  showLoading()
  const data = await fetchAPI("/properties/create", {
    method: "POST",
    body: JSON.stringify(propertyData),
  })
  hideLoading()

  if (data) {
    showToast("Property created successfully!", "success")
    return data
  }
  return null
}

const updateProperty = async (propertyId, propertyData) => {
  showLoading()
  const data = await fetchAPI(`/properties/${propertyId}/update`, {
    method: "PUT",
    body: JSON.stringify(propertyData),
  })
  hideLoading()

  if (data) {
    showToast("Property updated successfully!", "success")
    return data
  }
  return null
}

const deleteProperty = async (propertyId) => {
  if (!confirm("Are you sure you want to delete this property?")) return false

  showLoading()
  const data = await fetchAPI(`/properties/${propertyId}/delete`, {
    method: "DELETE",
  })
  hideLoading()

  if (data) {
    showToast("Property deleted successfully!", "success")
    return true
  }
  return false
}

const uploadPropertyImages = async (propertyId, formData) => {
  showLoading()
  const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  })

  const data = await response.json()
  hideLoading()

  if (response.ok) {
    showToast("Images uploaded successfully!", "success")
    return data
  } else {
    showToast(data.message || "Upload failed", "error")
    return null
  }
}
