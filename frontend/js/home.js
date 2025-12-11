// Load featured properties on home page
const loadFeaturedProperties = async () => {
  const carousel = document.getElementById("featuredCarousel")
  if (!carousel) return

  const showLoading = () => {
    // Implementation for showLoading
    document.getElementById("loadingSpinner").style.display = "block"
  }

  const hideLoading = () => {
    // Implementation for hideLoading
    document.getElementById("loadingSpinner").style.display = "none"
  }

  const fetchAPI = async (url) => {
    // Implementation for fetchAPI
    const response = await fetch(url)
    return response.json()
  }

  const formatCurrency = (amount) => {
    // Implementation for formatCurrency
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  showLoading()
  const data = await fetchAPI("/properties/all?limit=6")
  hideLoading()

  if (!data || !data.properties) {
    carousel.innerHTML = '<p class="text-gray-600">No properties found</p>'
    return
  }

  carousel.innerHTML = data.properties
    .map(
      (property) => `
        <div class="property-card" onclick="window.location.href='/property-detail.html?id=${property.id}'">
            <div class="property-card-image" style="background-image: url('${property.images[0]?.url || "/diverse-property-showcase.png"}'); background-size: cover;"></div>
            <div class="property-card-content">
                <h3 class="property-card-title">${property.title}</h3>
                <p class="property-card-price">${formatCurrency(property.price)}</p>
                <p class="property-card-location">📍 ${property.city}, ${property.state}</p>
                <div class="property-card-features">
                    <span>🛏️ ${property.bedrooms}</span>
                    <span>🚿 ${property.bathrooms}</span>
                    <span>📐 ${property.area} sqft</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Hero search form
const heroSearchForm = document.getElementById("heroSearchForm")
if (heroSearchForm) {
  heroSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = document.getElementById("heroLocation").value
    const type = document.getElementById("heroPropertyType").value
    const maxPrice = document.getElementById("heroPrice").value

    let query = ""
    if (location) query += `&location=${encodeURIComponent(location)}`
    if (type) query += `&type=${type}`
    if (maxPrice) query += `&maxPrice=${maxPrice}`

    window.location.href = `/properties.html?${query.substring(1)}`
  })
}

// Load on page load
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedProperties()
})
