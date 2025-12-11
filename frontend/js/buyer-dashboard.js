// Buyer Dashboard Script

let currentUser = null

// Mock functions to be replaced with actual API calls
function getUserProfile() {
  return {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    createdAt: "2022-01-15",
    emailNotifications: true,
    marketingEmails: false,
  }
}

function getFavorites() {
  return {
    favorites: [
      {
        id: 1,
        title: "Beautiful House",
        price: 500000,
        city: "New York",
        state: "NY",
        images: [{ url: "image1.jpg" }],
      },
      {
        id: 2,
        title: "Modern Apartment",
        price: 300000,
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

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function showToast(message, type) {
  console.log(`${type}: ${message}`)
}

function isAuthenticated() {
  return !!localStorage.getItem("access_token")
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
  document.getElementById("profileForm").addEventListener("submit", saveProfile)
  document.getElementById("deleteAccountBtn").addEventListener("click", () => {
    document.getElementById("confirmDeleteModal").classList.remove("hidden")
  })
  document.getElementById("clearAllFavoritesBtn").addEventListener("click", clearAllFavorites)
}

async function loadDashboardData() {
  currentUser = getUserProfile()

  // Display user name
  document.getElementById("userName").textContent = currentUser.firstName

  // Display member since date
  document.getElementById("memberSince").textContent = formatDate(currentUser.createdAt)

  // Load favorites
  const favoritesData = getFavorites()
  const favorites = favoritesData.favorites || []

  document.getElementById("favoritesCount").textContent = favorites.length

  // Display recent favorites
  renderRecentFavorites(favorites)

  // Load profile form
  loadProfileForm()
}

function renderRecentFavorites(favorites) {
  const container = document.getElementById("recentFavoritesContainer")

  if (favorites.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8 text-gray-600">
        <p>No favorites yet. Start exploring properties!</p>
        <a href="../properties.html" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">Browse Properties</a>
      </div>
    `
    return
  }

  container.innerHTML = favorites
    .slice(0, 4)
    .map(
      (property) => `
    <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer" onclick="window.location.href='../property-detail.html?id=${property.id}'">
      <img src="${property.images[0]?.url || "/diverse-property-showcase.png"}" alt="${property.title}" class="w-full h-32 object-cover">
      <div class="p-3">
        <h4 class="font-bold text-gray-900 truncate">${property.title}</h4>
        <p class="text-blue-600 font-bold">${formatCurrency(property.price)}</p>
        <p class="text-gray-600 text-sm">${property.city}, ${property.state}</p>
      </div>
    </div>
    `,
    )
    .join("")
}

function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".dashboard-tab").forEach((tab) => tab.classList.add("hidden"))
  document.querySelectorAll(".dashboard-nav-link").forEach((link) => link.classList.remove("active"))

  // Show selected tab
  document.getElementById(tabName + "Tab").classList.remove("hidden")
  event.target.classList.add("active")

  // Load favorites if switching to favorites tab
  if (tabName === "favorites") {
    loadFavoritesTab()
  }
}

async function loadFavoritesTab() {
  const favoritesData = getFavorites()
  const favorites = favoritesData.favorites || []

  const container = document.getElementById("favoritesListContainer")
  const emptyState = document.getElementById("emptyFavoritesState")

  if (favorites.length === 0) {
    container.classList.add("hidden")
    emptyState.classList.remove("hidden")
    return
  }

  container.classList.remove("hidden")
  emptyState.classList.add("hidden")

  container.innerHTML = favorites
    .map(
      (property) => `
    <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img src="${property.images[0]?.url || "/diverse-property-showcase.png"}" alt="${property.title}" class="w-full h-48 object-cover cursor-pointer" onclick="window.location.href='../property-detail.html?id=${property.id}'">
      <div class="p-4">
        <h3 class="font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600" onclick="window.location.href='../property-detail.html?id=${property.id}'">${property.title}</h3>
        <p class="text-blue-600 font-bold text-lg mb-2">${formatCurrency(property.price)}</p>
        <p class="text-gray-600 text-sm mb-4">📍 ${property.city}, ${property.state}</p>
        <div class="flex gap-2">
          <button onclick="removeFavoriteProperty(${property.id})" class="btn btn-danger btn-sm flex-1">Remove</button>
          <a href="../property-detail.html?id=${property.id}" class="btn btn-primary btn-sm flex-1">View</a>
        </div>
      </div>
    </div>
    `,
    )
    .join("")
}

function loadProfileForm() {
  document.getElementById("firstName").value = currentUser.firstName
  document.getElementById("lastName").value = currentUser.lastName
  document.getElementById("email").value = currentUser.email
  document.getElementById("phone").value = currentUser.phone || ""
  document.getElementById("address").value = currentUser.address || ""
  document.getElementById("city").value = currentUser.city || ""
  document.getElementById("state").value = currentUser.state || ""
  document.getElementById("zipCode").value = currentUser.zipCode || ""
  document.getElementById("emailNotifications").checked = currentUser.emailNotifications
  document.getElementById("marketingEmails").checked = currentUser.marketingEmails
}

async function saveProfile(e) {
  e.preventDefault()

  const formData = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zip_code: document.getElementById("zipCode").value,
    email_notifications: document.getElementById("emailNotifications").checked,
    marketing_emails: document.getElementById("marketingEmails").checked,
  }

  const newPassword = document.getElementById("newPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if (newPassword) {
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error")
      return
    }
    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters", "error")
      return
    }
    formData.new_password = newPassword
    formData.current_password = document.getElementById("currentPassword").value
  }

  showToast("Profile updated successfully!", "success")
  document.getElementById("profileSuccess").textContent = "Profile updated successfully!"
  document.getElementById("profileSuccess").classList.remove("hidden")

  setTimeout(() => {
    document.getElementById("profileSuccess").classList.add("hidden")
  }, 3000)
}

function resetProfileForm() {
  loadProfileForm()
  document.getElementById("currentPassword").value = ""
  document.getElementById("newPassword").value = ""
  document.getElementById("confirmPassword").value = ""
}

async function removeFavoriteProperty(propertyId) {
  showToast("Property removed from favorites", "success")
  loadFavoritesTab()
}

async function clearAllFavorites() {
  if (confirm("Are you sure you want to clear all favorites?")) {
    showToast("All favorites cleared", "success")
    loadFavoritesTab()
  }
}

function confirmDeleteAccount() {
  showToast("Account deletion initiated. Redirecting...", "info")
  setTimeout(() => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user_role")
    localStorage.removeItem("user_id")
    window.location.href = "/index.html"
  }, 1500)
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
