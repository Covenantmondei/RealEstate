// Admin Module

const fetchAPI = async (url, options = {}) => {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

const getAdminDashboard = async () => {
  return fetchAPI("/admin/dashboard")
}

const getPendingAgents = async () => {
  return fetchAPI("/admin/agents/pending")
}

const approveAgent = async (agentId, reason = "") => {
  return fetchAPI(`/admin/agents/approve`, {
    method: "POST",
    body: JSON.stringify({ agent_id: agentId, reason }),
  })
}

const rejectAgent = async (agentId, reason) => {
  return fetchAPI(`/admin/agents/reject`, {
    method: "POST",
    body: JSON.stringify({ agent_id: agentId, reason }),
  })
}

const getPendingProperties = async () => {
  return fetchAPI("/admin/properties/pending")
}

const approveProperty = async (propertyId, reason = "") => {
  return fetchAPI(`/admin/properties/approve`, {
    method: "POST",
    body: JSON.stringify({ property_id: propertyId, reason }),
  })
}

const rejectProperty = async (propertyId, reason) => {
  return fetchAPI(`/admin/properties/reject`, {
    method: "POST",
    body: JSON.stringify({ property_id: propertyId, reason }),
  })
}

const getAllUsers = async (filters = {}) => {
  let query = ""
  if (filters.role) query += `&role=${filters.role}`
  if (filters.page) query += `&page=${filters.page}`

  return fetchAPI(`/admin/users?${query.substring(1)}`)
}

const suspendUser = async (userId) => {
  return fetchAPI(`/admin/users/suspend`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  })
}

const unsuspendUser = async (userId) => {
  return fetchAPI(`/admin/users/${userId}/unsuspend`, {
    method: "POST",
  })
}

const getActivityLogs = async (filters = {}) => {
  let query = ""
  if (filters.page) query += `&page=${filters.page}`
  if (filters.limit) query += `&limit=${filters.limit}`

  return fetchAPI(`/admin/activity-logs?${query.substring(1)}`)
}
