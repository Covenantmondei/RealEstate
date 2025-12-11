// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api"

// Helper Functions
const showToast = (message, type = "info", duration = 3000) => {
  const toastContainer = document.getElementById("toastContainer")
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.innerHTML = `
        <div class="flex justify-between items-center">
            <span>${message}</span>
            <button class="ml-4 text-gray-500 hover:text-gray-700" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `
  toastContainer.appendChild(toast)

  if (duration > 0) {
    setTimeout(() => toast.remove(), duration)
  }
}

const showLoading = () => {
  document.getElementById("loadingOverlay").classList.remove("hidden")
}

const hideLoading = () => {
  document.getElementById("loadingOverlay").classList.add("hidden")
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  return password.length >= 8
}

const getToken = () => {
  return localStorage.getItem("authToken")
}

const setToken = (token) => {
  localStorage.setItem("authToken", token)
}

const removeToken = () => {
  localStorage.removeItem("authToken")
}

const getUserRole = () => {
  return localStorage.getItem("userRole")
}

const setUserRole = (role) => {
  localStorage.setItem("userRole", role)
}

const getUserId = () => {
  return localStorage.getItem("userId")
}

const setUserId = (userId) => {
  localStorage.setItem("userId", userId)
}

const isAuthenticated = () => {
  return !!getToken()
}

const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getToken()

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    let response = await fetch(url, {
      ...options,
      headers,
    })

    // Handle token refresh
    if (response.status === 401) {
      const refreshed = await refreshToken()
      if (refreshed) {
        const newToken = getToken()
        headers["Authorization"] = `Bearer ${newToken}`
        response = await fetch(url, {
          ...options,
          headers,
        })
      } else {
        window.location.href = "/login.html"
        return null
      }
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "API Error")
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
    showToast(error.message, "error")
    return null
  }
}

const refreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()
      setToken(data.access_token)
      return true
    }
    return false
  } catch (error) {
    console.error("Token refresh error:", error)
    return false
  }
}

const updateNavigation = () => {
  const isAuth = isAuthenticated()
  const role = getUserRole()
  const navAuthLinks = document.getElementById("navAuthLinks")
  const navMobileAuthLinks = document.getElementById("navMobileAuthLinks")

  if (isAuth && navAuthLinks) {
    let dashboardUrl = "/dashboard/buyer.html"
    if (role === "agent") dashboardUrl = "/dashboard/agent.html"
    if (role === "admin") dashboardUrl = "/dashboard/admin.html"

    navAuthLinks.innerHTML = `
            <a href="${dashboardUrl}" class="text-gray-700 hover:text-blue-600 transition">Dashboard</a>
            <button onclick="logoutUser()" class="text-gray-700 hover:text-red-600 transition">Logout</button>
        `
  }

  if (isAuth && navMobileAuthLinks) {
    let dashboardUrl = "/dashboard/buyer.html"
    if (role === "agent") dashboardUrl = "/dashboard/agent.html"
    if (role === "admin") dashboardUrl = "/dashboard/admin.html"

    navMobileAuthLinks.innerHTML = `
            <a href="${dashboardUrl}" class="flex-1 text-center text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Dashboard</a>
            <button onclick="logoutUser()" class="flex-1 text-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Logout</button>
        `
  }
}

const logoutUser = () => {
  removeToken()
  localStorage.removeItem("userRole")
  localStorage.removeItem("userId")
  showToast("Logged out successfully", "success")
  setTimeout(() => {
    window.location.href = "/index.html"
  }, 1000)
}

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  updateNavigation()

  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Close mobile menu on link click
  const mobileMenuLinks = document.querySelectorAll("#mobileMenu a, #mobileMenu button")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
    })
  })
})

// Auto-refresh token every 30 minutes
setInterval(
  () => {
    if (isAuthenticated()) {
      refreshToken()
    }
  },
  30 * 60 * 1000,
)
