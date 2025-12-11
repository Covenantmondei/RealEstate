// Property Detail Page Script

let propertyId = null
let isFavorited = false

// Declare functions that were previously undeclared
function showToast(message, type) {
  console.log(`Toast: ${message} (${type})`)
}

async function getPropertyDetail(id) {
  // Mock function to simulate fetching property detail
  return {
    property: {
      id: id,
      images: [{ url: "image.jpg" }],
      title: "Sample Property",
      city: "Sample City",
      state: "Sample State",
      price: 500000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      created_at: "2022-01-01T00:00:00Z",
      description: "This is a sample property description.",
      amenities: ["Air Conditioning", "Swimming Pool"],
      agent: { name: "John Doe", phone: "123-456-7890", email: "john.doe@example.com" },
    },
  }
}

function formatCurrency(amount) {
  return `$${amount.toLocaleString()}`
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
}

async function getAllProperties(filters) {
  // Mock function to simulate fetching all properties
  return {
    properties: [
      { id: 1, images: [{ url: "image1.jpg" }], title: "Property 1", price: 400000 },
      { id: 2, images: [{ url: "image2.jpg" }], title: "Property 2", price: 600000 },
      { id: 3, images: [{ url: "image3.jpg" }], title: "Property 3", price: 550000 },
    ],
  }
}

function isAuthenticated() {
  // Mock function to simulate authentication check
  return true
}

function addToFavorites(id) {
  console.log(`Added property ${id} to favorites`)
}

function removeFromFavorites(id) {
  console.log(`Removed property ${id} from favorites`)
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search)
  propertyId = params.get("id")

  if (!propertyId) {
    showToast("Property not found", "error")
    window.location.href = "/properties.html"
    return
  }

  loadPropertyDetail()
  initializeEventListeners()
})

function initializeEventListeners() {
  document.getElementById("contactAgentBtn").addEventListener("click", openContactModal)
  document.getElementById("scheduleViewBtn").addEventListener("click", () => {
    showToast("Schedule viewing feature coming soon", "info")
  })
  document.getElementById("favoriteBtn").addEventListener("click", toggleFavorite)
  document.getElementById("contactForm").addEventListener("submit", submitContactForm)
}

async function loadPropertyDetail() {
  document.getElementById("loadingOverlay").classList.remove("hidden")

  const data = await getPropertyDetail(propertyId)
  document.getElementById("loadingOverlay").classList.add("hidden")

  if (!data || !data.property) {
    showToast("Failed to load property", "error")
    return
  }

  const property = data.property
  renderPropertyDetail(property)
  loadSimilarProperties(property)
}

function renderPropertyDetail(property) {
  // Main image
  document.getElementById("mainImage").src = property.images[0]?.url || "/diverse-property-showcase.png"
  document.getElementById("mainImage").alt = property.title

  // Thumbnails
  const thumbnailContainer = document.getElementById("thumbnailContainer")
  thumbnailContainer.innerHTML = property.images
    .map(
      (img, idx) => `
    <img src="${img.url}" alt="Thumbnail ${idx}" class="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-75 transition" onclick="document.getElementById('mainImage').src='${img.url}'">
    `,
    )
    .join("")

  // Title and location
  document.getElementById("propertyTitle").textContent = property.title
  document.getElementById("propertyLocation").textContent = `📍 ${property.city}, ${property.state}`

  // Price
  document.getElementById("propertyPrice").textContent = formatCurrency(property.price)

  // Features
  const featuresContainer = document.getElementById("propertyFeatures")
  featuresContainer.innerHTML = `
    <div class="text-center">
      <p class="text-2xl font-bold text-gray-900">🛏️</p>
      <p class="text-gray-600">${property.bedrooms} Bedrooms</p>
    </div>
    <div class="text-center">
      <p class="text-2xl font-bold text-gray-900">🚿</p>
      <p class="text-gray-600">${property.bathrooms} Bathrooms</p>
    </div>
    <div class="text-center">
      <p class="text-2xl font-bold text-gray-900">📐</p>
      <p class="text-gray-600">${property.area} sqft</p>
    </div>
    <div class="text-center">
      <p class="text-2xl font-bold text-gray-900">📅</p>
      <p class="text-gray-600">${new Date(property.created_at).getFullYear()}</p>
    </div>
  `

  // Description
  document.getElementById("propertyDescription").textContent = property.description || "No description available"

  // Amenities
  const amenitiesList = document.getElementById("amenitiesList")
  const amenities = property.amenities || []
  amenitiesList.innerHTML = amenities
    .map((amenity) => `<div class="flex items-center gap-2"><span class="text-green-600">✓</span> ${amenity}</div>`)
    .join("")

  // Agent info
  const agent = property.agent || {}
  document.getElementById("agentName").textContent = agent.name || "Loading..."
  document.getElementById("agentTitle").textContent = "Real Estate Agent"
  document.getElementById("agentPhone").textContent = `📞 ${agent.phone || "Contact for details"}`
  document.getElementById("agentEmail").textContent = `📧 ${agent.email || "Contact for details"}`

  // Stats
  const statsContainer = document.getElementById("propertyStats")
  statsContainer.innerHTML = `
    <div class="flex justify-between">
      <span class="text-gray-600">Type:</span>
      <span class="font-bold text-gray-900">${property.type || "N/A"}</span>
    </div>
    <div class="flex justify-between">
      <span class="text-gray-600">Status:</span>
      <span class="font-bold text-gray-900">${property.status || "Available"}</span>
    </div>
    <div class="flex justify-between">
      <span class="text-gray-600">Listed:</span>
      <span class="font-bold text-gray-900">${formatDate(property.created_at)}</span>
    </div>
  `
}

async function loadSimilarProperties(property) {
  const filters = {
    type: property.type,
    limit: 3,
  }

  const data = await getAllProperties(filters)

  if (!data || !data.properties) return

  const similar = data.properties.filter((p) => p.id !== propertyId).slice(0, 3)

  const container = document.getElementById("similarPropertiesContainer")
  container.innerHTML = similar
    .map(
      (prop) => `
    <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer" onclick="window.location.href='/property-detail.html?id=${prop.id}'">
        <img src="${prop.images[0]?.url || "/diverse-property-showcase.png"}" alt="${prop.title}" class="w-full h-40 object-cover">
        <div class="p-3">
            <h4 class="font-bold text-gray-900 text-sm truncate">${prop.title}</h4>
            <p class="text-blue-600 font-bold">${formatCurrency(prop.price)}</p>
        </div>
    </div>
    `,
    )
    .join("")
}

function toggleFavorite() {
  if (!isAuthenticated()) {
    showToast("Please login to save favorites", "info")
    window.location.href = "/login.html"
    return
  }

  isFavorited = !isFavorited
  const icon = document.getElementById("favoriteIcon")

  if (isFavorited) {
    icon.classList.add("text-red-600")
    icon.setAttribute("fill", "currentColor")
    addToFavorites(propertyId)
  } else {
    icon.classList.remove("text-red-600")
    icon.removeAttribute("fill")
    removeFromFavorites(propertyId)
  }
}

function openContactModal() {
  document.getElementById("contactModal").classList.remove("hidden")
}

function submitContactForm(e) {
  e.preventDefault()

  const name = document.getElementById("contactName").value
  const email = document.getElementById("contactEmail").value
  const phone = document.getElementById("contactPhone").value
  const message = document.getElementById("contactMessage").value

  showToast("Message sent to agent successfully!", "success")
  document.getElementById("contactModal").classList.add("hidden")
  document.getElementById("contactForm").reset()
}
