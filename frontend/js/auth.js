// Authentication Module

const showLoading = () => {
  // Implementation for showLoading
}

const hideLoading = () => {
  // Implementation for hideLoading
}

const fetchAPI = async (url, options) => {
  // Implementation for fetchAPI
  const response = await fetch(url, options)
  return response.json()
}

const showToast = (message, type) => {
  // Implementation for showToast
}

const setToken = (token) => {
  // Implementation for setToken
  localStorage.setItem("access_token", token)
}

const setUserRole = (role) => {
  // Implementation for setUserRole
  localStorage.setItem("role", role)
}

const setUserId = (userId) => {
  // Implementation for setUserId
  localStorage.setItem("user_id", userId)
}

const registerUser = async (formData) => {
  showLoading()
  const data = await fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
  })
  hideLoading()

  if (data) {
    showToast("Registration successful! Redirecting to login...", "success")
    setTimeout(() => {
      window.location.href = "/login.html"
    }, 1500)
    return true
  }
  return false
}

const loginUser = async (email, password) => {
  showLoading()
  const data = await fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  hideLoading()

  if (data) {
    setToken(data.access_token)
    setUserRole(data.role)
    setUserId(data.user_id)
    showToast("Login successful!", "success")

    const redirectUrl =
      data.role === "agent"
        ? "/dashboard/agent.html"
        : data.role === "admin"
          ? "/dashboard/admin.html"
          : "/dashboard/buyer.html"

    setTimeout(() => {
      window.location.href = redirectUrl
    }, 1000)
    return true
  }
  return false
}

const verifyEmail = async (token) => {
  const data = await fetchAPI(`/auth/verify-email?token=${token}`)
  if (data) {
    showToast("Email verified successfully!", "success")
    return true
  }
  return false
}
