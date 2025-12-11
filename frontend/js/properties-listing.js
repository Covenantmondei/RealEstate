// Properties Listing Page Script

let currentPage = 1
let currentFilters = {}
let currentViewMode = "grid"

// Declare getAllProperties and formatCurrency functions or import them
async function getAllProperties(filters) {
  // Placeholder implementation for getAllProperties
  // Replace with actual API call or data fetching logic
  return {
    properties: [],
    total: 0,
    limit: 12,
  }
}

function formatCurrency(amount) {
  // Placeholder implementation for formatCurrency
  // Replace with actual currency formatting logic
  return `$${amount}`
}

// Initialize page on load
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners()
  loadProperties()
})

function initializeEventListeners() {
  // Filter buttons
  document.getElementById("applyFiltersBtn").addEventListener("click", applyFilters)
  document.getElementById("clearFiltersBtn").addEventListener("click", clearFilters)

  // View toggle
  document.getElementById("gridViewBtn").addEventListener("click", () => setViewMode("grid"))
  document.getElementById("listViewBtn").addEventListener("click", () => setViewMode("list"))

  // Sort
  document.getElementById("sortBy").addEventListener("change", loadProperties)

  // Get filters from URL if present
  const params = new URLSearchParams(window.location.search)
  if (params.get("location")) {
    document.getElementById("locationFilter").value = params.get("location")
  }
  if (params.get("type")) {
    document.getElementById("typeFilter").value = params.get("type")
  }
  if (params.get("maxPrice")) {
    document.getElementById("maxPrice").value = params.get("maxPrice")
  }
}

function applyFilters() {
  currentPage = 1
  currentFilters = {
    location: document.getElementById("locationFilter").value,
    type: document.getElementById("typeFilter").value,
    minPrice: document.getElementById("minPrice").value,
    maxPrice: document.getElementById("maxPrice").value,
    bedrooms: document.getElementById("bedroomsFilter").value,
    bathrooms: document.getElementById("bathroomsFilter").value,
  }
  loadProperties()
}

function clearFilters() {
  document.getElementById("locationFilter").value = ""
  document.getElementById("typeFilter").value = ""
  document.getElementById("minPrice").value = ""
  document.getElementById("maxPrice").value = ""
  document.getElementById("bedroomsFilter").value = ""
  document.getElementById("bathroomsFilter").value = ""
  currentFilters = {}
  currentPage = 1
  loadProperties()
}

function setViewMode(mode) {
  currentViewMode = mode
  const container = document.getElementById("propertiesContainer")

  if (mode === "grid") {
    container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    document.getElementById("gridViewBtn").classList.remove("btn-secondary")
    document.getElementById("gridViewBtn").classList.add("btn-primary")
    document.getElementById("listViewBtn").classList.remove("btn-primary")
    document.getElementById("listViewBtn").classList.add("btn-secondary")
  } else {
    container.className = "space-y-4"
    document.getElementById("listViewBtn").classList.remove("btn-secondary")
    document.getElementById("listViewBtn").classList.add("btn-primary")
    document.getElementById("gridViewBtn").classList.remove("btn-primary")
    document.getElementById("gridViewBtn").classList.add("btn-secondary")
  }
}

async function loadProperties() {
  document.getElementById("loadingOverlay").classList.remove("hidden")

  const sort = document.getElementById("sortBy").value
  const filters = {
    ...currentFilters,
    page: currentPage,
    limit: 12,
    sort,
  }

  const data = await getAllProperties(filters)
  document.getElementById("loadingOverlay").classList.add("hidden")

  if (!data || !data.properties) {
    document.getElementById("propertiesContainer").innerHTML =
      '<p class="col-span-full text-center text-gray-600 py-8">No properties found. Try adjusting your filters.</p>'
    return
  }

  renderProperties(data.properties)
  renderPagination(data.total, data.limit)
}

function renderProperties(properties) {
  const container = document.getElementById("propertiesContainer")

  if (currentViewMode === "grid") {
    container.innerHTML = properties
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
  } else {
    container.innerHTML = properties
      .map(
        (property) => `
        <div class="bg-white rounded-lg shadow p-4 flex gap-4 cursor-pointer hover:shadow-lg transition" onclick="window.location.href='/property-detail.html?id=${property.id}'">
            <img src="${property.images[0]?.url || "/diverse-property-showcase.png"}" alt="${property.title}" class="w-32 h-32 object-cover rounded">
            <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-900 mb-1">${property.title}</h3>
                <p class="text-blue-600 font-bold text-lg mb-2">${formatCurrency(property.price)}</p>
                <p class="text-gray-600 text-sm mb-2">📍 ${property.city}, ${property.state}</p>
                <p class="text-gray-600 text-sm">${property.bedrooms} bed • ${property.bathrooms} bath • ${property.area} sqft</p>
            </div>
        </div>
        `,
      )
      .join("")
  }
}

function renderPagination(total, limit) {
  const totalPages = Math.ceil(total / limit)
  const container = document.getElementById("paginationContainer")

  if (totalPages <= 1) {
    container.innerHTML = ""
    return
  }

  let html = ""

  if (currentPage > 1) {
    html += `<button onclick="goToPage(${currentPage - 1})" class="btn btn-secondary">← Previous</button>`
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<button class="btn btn-primary">${i}</button>`
    } else if (i <= 3 || i > totalPages - 3 || Math.abs(i - currentPage) <= 2) {
      html += `<button onclick="goToPage(${i})" class="btn btn-secondary">${i}</button>`
    } else if (i === 4 || i === totalPages - 3) {
      html += `<span class="px-2 py-2">...</span>`
    }
  }

  if (currentPage < totalPages) {
    html += `<button onclick="goToPage(${currentPage + 1})" class="btn btn-secondary">Next →</button>`
  }

  container.innerHTML = html
}

function goToPage(page) {
  currentPage = page
  loadProperties()
  window.scrollTo({ top: 0, behavior: "smooth" })
}
