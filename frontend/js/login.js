// Login Page Script

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const email = document.getElementById("email")
  const password = document.getElementById("password")
  const rememberMe = document.getElementById("rememberMe")

  // Function to validate email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Function to validate password
  function validatePassword(password) {
    return password.length >= 8
  }

  // Function to show loading
  function showLoading() {
    document.getElementById("submitSpinner").classList.remove("hidden")
    document.getElementById("submitText").textContent = "Signing in..."
  }

  // Function to hide loading
  function hideLoading() {
    document.getElementById("submitSpinner").classList.add("hidden")
    document.getElementById("submitText").textContent = "Sign In"
  }

  // Function to set token
  function setToken(token) {
    localStorage.setItem("access_token", token)
  }

  // Function to set user role
  function setUserRole(role) {
    localStorage.setItem("user_role", role)
  }

  // Function to set user id
  function setUserId(userId) {
    localStorage.setItem("user_id", userId)
  }

  // Function to update navigation
  function updateNavigation() {
    const role = localStorage.getItem("user_role")
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      if (role === "agent" && link.href.includes("/dashboard/buyer.html")) {
        link.classList.add("hidden")
      } else if (role === "admin" && link.href.includes("/dashboard/agent.html")) {
        link.classList.add("hidden")
      } else {
        link.classList.remove("hidden")
      }
    })
  }

  // Function to show toast message
  function showToast(message, type) {
    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 3000)
  }

  const savedEmail = localStorage.getItem("rememberedEmail")
  if (savedEmail) {
    email.value = savedEmail
    rememberMe.checked = true
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Validate inputs
    const emailValue = email.value.trim()
    const passwordValue = password.value

    // Reset errors
    document.getElementById("emailError").classList.add("hidden")
    document.getElementById("passwordError").classList.add("hidden")
    document.getElementById("formError").classList.add("hidden")

    let isValid = true

    if (!validateEmail(emailValue)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address"
      document.getElementById("emailError").classList.remove("hidden")
      isValid = false
    }

    if (!validatePassword(passwordValue)) {
      document.getElementById("passwordError").textContent = "Password must be at least 8 characters"
      document.getElementById("passwordError").classList.remove("hidden")
      isValid = false
    }

    if (!isValid) return

    // Save email if remember me is checked
    if (rememberMe.checked) {
      localStorage.setItem("rememberedEmail", emailValue)
    } else {
      localStorage.removeItem("rememberedEmail")
    }

    // Show loading
    showLoading()

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      })

      const data = await response.json()

      hideLoading()

      if (response.ok) {
        // Store auth data
        setToken(data.access_token)
        setUserRole(data.role)
        setUserId(data.user_id)
        updateNavigation()

        showToast("Login successful!", "success")

        // Redirect based on role
        let redirectUrl = "/dashboard/buyer.html"
        if (data.role === "agent") redirectUrl = "/dashboard/agent.html"
        if (data.role === "admin") redirectUrl = "/dashboard/admin.html"

        setTimeout(() => {
          window.location.href = redirectUrl
        }, 1000)
      } else {
        document.getElementById("formError").textContent = data.message || "Invalid email or password"
        document.getElementById("formError").classList.remove("hidden")
      }
    } catch (error) {
      hideLoading()
      document.getElementById("formError").textContent = error.message || "Login failed"
      document.getElementById("formError").classList.remove("hidden")
    }
  })
})
