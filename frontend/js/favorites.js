// Favorites Module

const isAuthenticated = () => {
  // Implementation of isAuthenticated function
  return true // Placeholder for actual implementation
}

const showToast = (message, type) => {
  // Implementation of showToast function
  console.log(`${type}: ${message}`) // Placeholder for actual implementation
}

const fetchAPI = async (url, options) => {
  // Implementation of fetchAPI function
  const response = await fetch(url, options)
  return response.json() // Placeholder for actual implementation
}

const addToFavorites = async (propertyId) => {
  if (!isAuthenticated()) {
    showToast("Please login to save favorites", "info")
    window.location.href = "/login.html"
    return false
  }

  const data = await fetchAPI(`/properties/${propertyId}/favorite`, {
    method: "POST",
  })

  if (data) {
    showToast("Added to favorites!", "success")
    return true
  }
  return false
}

const removeFromFavorites = async (propertyId) => {
  const data = await fetchAPI(`/properties/${propertyId}/unfavorite`, {
    method: "DELETE",
  })

  if (data) {
    showToast("Removed from favorites!", "success")
    return true
  }
  return false
}

const getFavorites = async () => {
  return fetchAPI("/properties/favorites/me")
}
