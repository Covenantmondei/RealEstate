// Register Page Script

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm")
  const roleSelect = document.getElementById("role")
  const agentLicenseGroup = document.getElementById("agentLicenseGroup")
  const agentLicense = document.getElementById("agentLicense")

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
    document.getElementById("submitText").textContent = "Creating account..."
  }

  // Function to hide loading
  function hideLoading() {
    document.getElementById("submitSpinner").classList.add("hidden")
    document.getElementById("submitText").textContent = "Create Account"
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

  roleSelect.addEventListener("change", (e) => {
    if (e.target.value === "agent") {
      agentLicenseGroup.classList.remove("hidden")
      agentLicense.required = true
    } else {
      agentLicenseGroup.classList.add("hidden")
      agentLicense.required = false
    }
  })

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const fullName = document.getElementById("fullName").value.trim()
    const email = document.getElementById("email").value.trim()
    const role = document.getElementById("role").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const agreeTerms = document.getElementById("agreeTerms").checked

    // Reset errors
    document.querySelectorAll(".form-error").forEach((el) => el.classList.add("hidden"))
    document.getElementById("formError").classList.add("hidden")

    let isValid = true

    // Validate full name
    if (fullName.length < 2) {
      document.getElementById("fullNameError").textContent = "Full name must be at least 2 characters"
      document.getElementById("fullNameError").classList.remove("hidden")
      isValid = false
    }

    // Validate email
    if (!validateEmail(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address"
      document.getElementById("emailError").classList.remove("hidden")
      isValid = false
    }

    // Validate role
    if (!role) {
      document.getElementById("roleError").textContent = "Please select your role"
      document.getElementById("roleError").classList.remove("hidden")
      isValid = false
    }

    // Validate agent license if agent
    if (role === "agent" && !agentLicense.value.trim()) {
      document.getElementById("agentLicenseError").textContent = "Agent license number is required"
      document.getElementById("agentLicenseError").classList.remove("hidden")
      isValid = false
    }

    // Validate password
    if (!validatePassword(password)) {
      document.getElementById("passwordError").textContent = "Password must be at least 8 characters"
      document.getElementById("passwordError").classList.remove("hidden")
      isValid = false
    }

    // Validate password match
    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent = "Passwords do not match"
      document.getElementById("confirmPasswordError").classList.remove("hidden")
      isValid = false
    }

    // Validate terms
    if (!agreeTerms) {
      document.getElementById("formError").textContent = "You must agree to the Terms of Service"
      document.getElementById("formError").classList.remove("hidden")
      isValid = false
    }

    if (!isValid) return

    // Show loading
    showLoading()

    try {
      const registrationData = {
        full_name: fullName,
        email,
        role,
        password,
      }

      if (role === "agent") {
        registrationData.agent_license = agentLicense.value.trim()
      }

      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      hideLoading()

      if (response.ok) {
        showToast("Account created successfully! Redirecting to login...", "success")
        setTimeout(() => {
          window.location.href = "/login.html"
        }, 1500)
      } else {
        const errorData = await response.json()
        document.getElementById("formError").textContent = errorData.message || "Registration failed"
        document.getElementById("formError").classList.remove("hidden")
      }
    } catch (error) {
      hideLoading()
      document.getElementById("formError").textContent = error.message || "Registration failed"
      document.getElementById("formError").classList.remove("hidden")
    }
  })
})
