// Agent Dashboard Script

let agentProperties = []

// Mock functions to be replaced with actual API calls
function getAgentStats() {
  return {
    activeListings: 12,
    totalViews: 1250,
    pendingApprovals: 2,
    totalValue: 4500000,
  }
}

function getAgentProperties() {
  return {
    properties: [
      {
        id: 1,
        title: "Modern Apartment",
        status: "approved",
        price: 350000,
        views: 245,
        city: "New York",
        state: "NY",
        images: [{ url: "image1.jpg" }],
      },
      {
        id: 2,
        title: "Luxury House",
        status: "pending",
        price: 750000,
        views: 180,
        city: "Los Angeles",
        state: "CA",
        images: [{ url: "image2.jpg" }],
      },
    ],
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function showToast(message, type) {
  console.log(`${type}: ${message}`)
}

function isAuthenticated() {
  return !!localStorage.getItem("access_token")
}

function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".dashboard-tab").forEach((tab) => tab.classList.add("hidden"))
  document.querySelectorAll(".dashboard-tab-btn").forEach((btn) => {
    btn.classList.remove("active", "border-blue-600")
    btn.classList.add("text-gray-600")
  })

  // Show selected tab
  document.getElementById(tabName + "Tab").classList.remove("hidden")
  event.target.classList.add("active", "border-blue-600")
  event.target.classList.remove("text-gray-600")

  // Load specific tab data
  if (tabName === "properties") {
    loadPropertiesTab()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  if (!isAuthenticated()) {
    window.location.href = "/login.html"
    return
  }

  loadDashboardData()
  initializeEventListeners()
})

function initializeEventListeners() {
  document.getElementById("propertyForm").addEventListener("submit", submitPropertyForm)
  document.getElementById("propertyImages").addEventListener("change", handleImageUpload)

  // Image drag and drop
  const dragArea = document.querySelector(".border-dashed")
  dragArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    dragArea.classList.add("bg-gray-100")
  })
  dragArea.addEventListener("dragleave", () => {
    dragArea.classList.remove("bg-gray-100")
  })
  dragArea.addEventListener("drop", (e) => {
    e.preventDefault()
    dragArea.classList.remove("bg-gray-100")
    document.getElementById("propertyImages").files = e.dataTransfer.files
    handleImageUpload()
  })
}

function loadDashboardData() {
  const stats = getAgentStats()

  document.getElementById("activeListingsCount").textContent = stats.activeListings
  document.getElementById("totalViewsCount").textContent = stats.totalViews
  document.getElementById("pendingApprovalsCount").textContent = stats.pendingApprovals
  document.getElementById("totalValue").textContent = formatCurrency(stats.totalValue)

  loadRecentProperties()
  loadPerformanceStats()
}

function loadRecentProperties() {
  const data = getAgentProperties()
  agentProperties = data.properties || []

  const container = document.getElementById("recentPropertiesContainer")

  if (agentProperties.length === 0) {
    container.innerHTML = '<p class="text-gray-600">No properties yet</p>'
    return
  }

  container.innerHTML = agentProperties
    .slice(0, 5)
    .map(
      (property) => `
    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
      <div>
        <h4 class="font-bold text-gray-900">${property.title}</h4>
        <p class="text-sm text-gray-600">${formatCurrency(property.price)}</p>
      </div>
      <span class="px-3 py-1 rounded-full text-sm font-bold ${property.status === "approved" ? "bg-green-100 text-green-800" : property.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}">
        ${property.status.charAt(0).toUpperCase() + property.status.slice(1)}
      </span>
    </div>
    `,
    )
    .join("")
}

function loadPerformanceStats() {
  const container = document.getElementById("performanceStatsContainer")

  const stats = [
    { label: "Average Views per Property", value: "104" },
    { label: "Properties This Month", value: "3" },
    { label: "Avg. Days to Sell", value: "45 days" },
    { label: "Client Satisfaction", value: "4.8/5" },
  ]

  container.innerHTML = stats
    .map(
      (stat) => `
    <div class="flex justify-between items-center p-3 border-b border-gray-200">
      <span class="text-gray-600">${stat.label}</span>
      <span class="font-bold text-gray-900">${stat.value}</span>
    </div>
    `,
    )
    .join("")
}

function loadPropertiesTab() {
  const container = document.getElementById("propertiesTableBody")
  const emptyState = document.getElementById("emptyPropertiesState")

  if (agentProperties.length === 0) {
    container.innerHTML = ""
    emptyState.classList.remove("hidden")
    return
  }

  emptyState.classList.add("hidden")

  container.innerHTML = agentProperties
    .map(
      (property) => `
    <tr>
      <td class="font-bold text-gray-900">${property.title}</td>
      <td>
        <span class="px-3 py-1 rounded-full text-sm font-bold ${property.status === "approved" ? "bg-green-100 text-green-800" : property.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}">
          ${property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </span>
      </td>
      <td class="font-bold text-blue-600">${formatCurrency(property.price)}</td>
      <td>${property.views}</td>
      <td class="text-gray-600">${property.city}, ${property.state}</td>
      <td>
        <div class="flex gap-2">
          <button onclick="editProperty(${property.id})" class="btn btn-secondary btn-sm">Edit</button>
          <button onclick="deleteProperty(${property.id})" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </td>
    </tr>
    `,
    )
    .join("")
}

function filterProperties() {
  const status = document.getElementById("propertyStatusFilter").value
  const container = document.getElementById("propertiesTableBody")

  const filtered = status ? agentProperties.filter((p) => p.status === status) : agentProperties

  if (filtered.length === 0) {
    container.innerHTML = '<tr><td colspan="6" class="text-center py-4">No properties found</td></tr>'
    return
  }

  loadPropertiesTab()
}

function handleImageUpload() {
  const files = document.getElementById("propertyImages").files
  const preview = document.getElementById("imagePreviewContainer")

  preview.innerHTML = ""

  for (const file of files) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const div = document.createElement("div")
      div.className = "relative"
      div.innerHTML = `
        <img src="${e.target.result}" alt="Preview" class="w-full h-24 object-cover rounded">
        <button type="button" onclick="this.parentElement.remove()" class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
      `
      preview.appendChild(div)
    }
    reader.readAsDataURL(file)
  }
}

async function submitPropertyForm(e) {
  e.preventDefault()

  const formData = {
    title: document.getElementById("propertyTitle").value,
    description: document.getElementById("propertyDescription").value,
    type: document.getElementById("propertyType").value,
    price: Number.parseFloat(document.getElementById("propertyPrice").value),
    address: document.getElementById("propertyAddress").value,
    city: document.getElementById("propertyCity").value,
    state: document.getElementById("propertyState").value,
    zip: document.getElementById("propertyZip").value,
    bedrooms: Number.parseInt(document.getElementById("propertyBedrooms").value),
    bathrooms: Number.parseFloat(document.getElementById("propertyBathrooms").value),
    area: Number.parseInt(document.getElementById("propertyArea").value),
    year_built: Number.parseInt(document.getElementById("propertyYear").value),
    amenities: getSelectedAmenities(),
  }

  console.log("Submitting property:", formData)
  showToast("Property created successfully!", "success")

  document.getElementById("propertyFormSuccess").textContent = "Property created and pending admin approval"
  document.getElementById("propertyFormSuccess").classList.remove("hidden")

  setTimeout(() => {
    document.getElementById("propertyForm").reset()
    document.getElementById("imagePreviewContainer").innerHTML = ""
    switchTab("properties")
  }, 1500)
}

function getSelectedAmenities() {
  const amenities = []
  const amenityCheckboxes = document.querySelectorAll('input[id^="amenity-"]')

  amenityCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      amenities.push(checkbox.labels[0].textContent)
    }
  })

  return amenities
}

function editProperty(propertyId) {
  const property = agentProperties.find((p) => p.id === propertyId)
  if (property) {
    showToast("Edit feature coming soon", "info")
  }
}

function deleteProperty(propertyId) {
  if (confirm("Are you sure you want to delete this property?")) {
    agentProperties = agentProperties.filter((p) => p.id !== propertyId)
    loadPropertiesTab()
    showToast("Property deleted successfully", "success")
  }
}

function logoutUser() {
  localStorage.removeItem("access_token")
  localStorage.removeItem("user_role")
  localStorage.removeItem("user_id")
  showToast("Logged out successfully", "success")
  setTimeout(() => {
    window.location.href = "/index.html"
  }, 1000)
}
