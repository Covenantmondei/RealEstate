// Admin Dashboard Script

let allUsers = []
let allActivityLogs = []
let currentApprovalItem = null
let currentRejectItem = null

// Mock functions to be replaced with actual API calls
function getAdminStats() {
  return {
    totalUsers: 156,
    totalAgents: 28,
    totalProperties: 342,
    pendingApprovals: 5,
    platformValue: 125000000,
  }
}

function getPendingAgents() {
  return {
    agents: [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        license: "LIC-2024-001",
        joinedDate: "2024-01-15",
        status: "pending",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        license: "LIC-2024-002",
        joinedDate: "2024-01-16",
        status: "pending",
      },
    ],
  }
}

function getPendingProperties() {
  return {
    properties: [
      {
        id: 1,
        title: "Luxury Penthouse",
        agent: "John Smith",
        price: 1500000,
        submittedDate: "2024-01-18",
        status: "pending",
      },
      {
        id: 2,
        title: "Beach House",
        agent: "Sarah Johnson",
        price: 800000,
        submittedDate: "2024-01-19",
        status: "pending",
      },
    ],
  }
}

function getAllUsers() {
  return {
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "buyer",
        status: "active",
        joinedDate: "2023-12-01",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "agent",
        status: "active",
        joinedDate: "2023-12-05",
      },
      {
        id: 3,
        name: "Bob Wilson",
        email: "bob@example.com",
        role: "buyer",
        status: "suspended",
        joinedDate: "2023-11-20",
      },
    ],
  }
}

function getActivityLogs() {
  return {
    logs: [
      {
        id: 1,
        user: "John Doe",
        action: "Property Viewed",
        details: "Viewed Luxury Penthouse",
        timestamp: "2024-01-19T10:30:00Z",
      },
      {
        id: 2,
        user: "Jane Smith",
        action: "Property Listed",
        details: "Listed Beach House",
        timestamp: "2024-01-19T09:15:00Z",
      },
      {
        id: 3,
        user: "Admin",
        action: "Property Approved",
        details: "Approved Modern Apartment",
        timestamp: "2024-01-19T08:00:00Z",
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

function formatDateTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
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
    btn.classList.remove("active", "border-blue-600", "text-gray-900")
    btn.classList.add("text-gray-600")
  })

  // Show selected tab
  document.getElementById(tabName + "Tab").classList.remove("hidden")
  event.target.classList.add("active", "border-blue-600", "text-gray-900")
  event.target.classList.remove("text-gray-600")

  // Load specific tab data
  if (tabName === "agents") {
    loadAgentsTab()
  } else if (tabName === "properties") {
    loadPropertiesTab()
  } else if (tabName === "users") {
    loadUsersTab()
  } else if (tabName === "activity") {
    loadActivityTab()
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
  document.getElementById("approvalForm").addEventListener("submit", submitApproval)
  document.getElementById("rejectForm").addEventListener("submit", submitReject)
}

function loadDashboardData() {
  const stats = getAdminStats()

  document.getElementById("totalUsersCount").textContent = stats.totalUsers
  document.getElementById("totalAgentsCount").textContent = stats.totalAgents
  document.getElementById("totalPropertiesCount").textContent = stats.totalProperties
  document.getElementById("totalPendingCount").textContent = stats.pendingApprovals
  document.getElementById("platformValue").textContent = formatCurrency(stats.platformValue)

  // Load users and activity for overview
  allUsers = getAllUsers().users
  allActivityLogs = getActivityLogs().logs

  loadRecentActivity()
  updateQuickActionLabels()
}

function loadRecentActivity() {
  const container = document.getElementById("recentActivityContainer")

  container.innerHTML = allActivityLogs
    .slice(0, 5)
    .map(
      (log) => `
    <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
      <div class="flex-1">
        <p class="font-bold text-gray-900">${log.action}</p>
        <p class="text-sm text-gray-600">${log.user} - ${log.details}</p>
        <p class="text-xs text-gray-500 mt-1">${formatDateTime(log.timestamp)}</p>
      </div>
    </div>
    `,
    )
    .join("")
}

function updateQuickActionLabels() {
  const pendingAgents = getPendingAgents().agents.length
  const pendingProps = getPendingProperties().properties.length

  document.getElementById("pendingAgentsLabel").textContent =
    pendingAgents > 0 ? `${pendingAgents} pending` : "No pending"
  document.getElementById("pendingPropsLabel").textContent = pendingProps > 0 ? `${pendingProps} pending` : "No pending"
}

function loadAgentsTab() {
  const data = getPendingAgents()
  const agents = data.agents || []

  const container = document.getElementById("pendingAgentsContainer")
  const emptyState = document.getElementById("emptyAgentsState")

  if (agents.length === 0) {
    container.innerHTML = ""
    emptyState.classList.remove("hidden")
    return
  }

  emptyState.classList.add("hidden")

  container.innerHTML = agents
    .map(
      (agent) => `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-bold text-gray-900">${agent.name}</h3>
          <p class="text-gray-600">${agent.email}</p>
          <p class="text-sm text-gray-500 mt-1">License: ${agent.license}</p>
        </div>
        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">Pending</span>
      </div>
      <p class="text-sm text-gray-600 mb-4">Applied: ${formatDate(agent.joinedDate)}</p>
      <div class="flex gap-2">
        <button onclick="openApprovalModal('agent', ${agent.id}, '${agent.name}')" class="btn btn-success flex-1">Approve</button>
        <button onclick="openRejectModal('agent', ${agent.id}, '${agent.name}')" class="btn btn-danger flex-1">Reject</button>
      </div>
    </div>
    `,
    )
    .join("")
}

function loadPropertiesTab() {
  const data = getPendingProperties()
  const properties = data.properties || []

  const container = document.getElementById("pendingPropertiesContainer")
  const emptyState = document.getElementById("emptyPropertiesState")

  if (properties.length === 0) {
    container.innerHTML = ""
    emptyState.classList.remove("hidden")
    return
  }

  emptyState.classList.add("hidden")

  container.innerHTML = properties
    .map(
      (property) => `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-bold text-gray-900">${property.title}</h3>
          <p class="text-gray-600">Agent: ${property.agent}</p>
          <p class="text-blue-600 font-bold text-lg mt-1">${formatCurrency(property.price)}</p>
        </div>
        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">Pending</span>
      </div>
      <p class="text-sm text-gray-600 mb-4">Submitted: ${formatDate(property.submittedDate)}</p>
      <div class="flex gap-2">
        <button onclick="openApprovalModal('property', ${property.id}, '${property.title}')" class="btn btn-success flex-1">Approve</button>
        <button onclick="openRejectModal('property', ${property.id}, '${property.title}')" class="btn btn-danger flex-1">Reject</button>
      </div>
    </div>
    `,
    )
    .join("")
}

function loadUsersTab() {
  const container = document.getElementById("usersTableBody")

  if (allUsers.length === 0) {
    container.innerHTML = '<tr><td colspan="6" class="text-center py-4">No users found</td></tr>'
    return
  }

  container.innerHTML = allUsers
    .map(
      (user) => `
    <tr>
      <td class="font-bold text-gray-900">${user.name}</td>
      <td class="text-gray-600">${user.email}</td>
      <td>
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
          ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </td>
      <td>
        <span class="px-3 py-1 ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full text-sm font-bold">
          ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </td>
      <td class="text-gray-600">${formatDate(user.joinedDate)}</td>
      <td>
        <button onclick="toggleUserStatus(${user.id}, '${user.status}')" class="btn ${user.status === "active" ? "btn-danger" : "btn-success"} btn-sm">
          ${user.status === "active" ? "Suspend" : "Activate"}
        </button>
      </td>
    </tr>
    `,
    )
    .join("")
}

function loadActivityTab() {
  const container = document.getElementById("activityTableBody")

  container.innerHTML = allActivityLogs
    .map(
      (log) => `
    <tr>
      <td class="font-bold text-gray-900">${log.user}</td>
      <td class="text-gray-600">${log.action}</td>
      <td class="text-gray-600">${log.details}</td>
      <td class="text-gray-600">${formatDateTime(log.timestamp)}</td>
    </tr>
    `,
    )
    .join("")
}

function filterUsers() {
  const role = document.getElementById("roleFilter").value

  if (!role) {
    loadUsersTab()
    return
  }

  const filtered = allUsers.filter((u) => u.role === role)
  const container = document.getElementById("usersTableBody")

  if (filtered.length === 0) {
    container.innerHTML = '<tr><td colspan="6" class="text-center py-4">No users found</td></tr>'
    return
  }

  container.innerHTML = filtered
    .map(
      (user) => `
    <tr>
      <td class="font-bold text-gray-900">${user.name}</td>
      <td class="text-gray-600">${user.email}</td>
      <td>
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
          ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </td>
      <td>
        <span class="px-3 py-1 ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full text-sm font-bold">
          ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </td>
      <td class="text-gray-600">${formatDate(user.joinedDate)}</td>
      <td>
        <button onclick="toggleUserStatus(${user.id}, '${user.status}')" class="btn ${user.status === "active" ? "btn-danger" : "btn-success"} btn-sm">
          ${user.status === "active" ? "Suspend" : "Activate"}
        </button>
      </td>
    </tr>
    `,
    )
    .join("")
}

function openApprovalModal(type, id, name) {
  currentApprovalItem = { type, id, name }
  document.getElementById("approvalTitle").textContent = `Approve ${type === "agent" ? "Agent" : "Property"}`
  document.getElementById("approvalModal").classList.remove("hidden")
}

function openRejectModal(type, id, name) {
  currentRejectItem = { type, id, name }
  document.getElementById("rejectModal").classList.remove("hidden")
}

function submitApproval(e) {
  e.preventDefault()

  if (!currentApprovalItem) return

  showToast(`${currentApprovalItem.type === "agent" ? "Agent" : "Property"} approved successfully!`, "success")
  document.getElementById("approvalModal").classList.add("hidden")
  document.getElementById("approvalReason").value = ""

  if (currentApprovalItem.type === "agent") {
    loadAgentsTab()
  } else {
    loadPropertiesTab()
  }
}

function submitReject(e) {
  e.preventDefault()

  if (!currentRejectItem) return

  showToast(`${currentRejectItem.type === "agent" ? "Agent" : "Property"} rejected successfully!`, "success")
  document.getElementById("rejectModal").classList.add("hidden")
  document.getElementById("rejectReason").value = ""

  if (currentRejectItem.type === "agent") {
    loadAgentsTab()
  } else {
    loadPropertiesTab()
  }
}

function toggleUserStatus(userId, currentStatus) {
  const newStatus = currentStatus === "active" ? "suspended" : "active"
  const user = allUsers.find((u) => u.id === userId)

  if (user) {
    user.status = newStatus
    showToast(`User ${newStatus === "active" ? "activated" : "suspended"} successfully!`, "success")
    loadUsersTab()
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
