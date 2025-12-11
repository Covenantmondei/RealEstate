import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ToastProvider } from "./context/ToastContext"
import ProtectedRoute from "./components/ProtectedRoute"

// Public pages
import HomePage from "./pages/public/HomePage"
import PropertiesPage from "./pages/public/PropertiesPage"
import PropertyDetailPage from "./pages/public/PropertyDetailPage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"

// Buyer pages
import BuyerDashboard from "./pages/buyer/BuyerDashboard"
import MyFavoritesPage from "./pages/buyer/MyFavoritesPage"
import BuyerProfilePage from "./pages/buyer/BuyerProfilePage"

// Agent pages
import AgentDashboard from "./pages/agent/AgentDashboard"
import MyPropertiesPage from "./pages/agent/MyPropertiesPage"
import CreatePropertyPage from "./pages/agent/CreatePropertyPage"
import EditPropertyPage from "./pages/agent/EditPropertyPage"

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard"
import PendingAgentsPage from "./pages/admin/PendingAgentsPage"
import PendingPropertiesPage from "./pages/admin/PendingPropertiesPage"
import UsersManagementPage from "./pages/admin/UsersManagementPage"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Buyer routes */}
            <Route
              path="/buyer/dashboard"
              element={
                <ProtectedRoute requiredRole="buyer">
                  <BuyerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buyer/favorites"
              element={
                <ProtectedRoute requiredRole="buyer">
                  <MyFavoritesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buyer/profile"
              element={
                <ProtectedRoute requiredRole="buyer">
                  <BuyerProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Agent routes */}
            <Route
              path="/agent/dashboard"
              element={
                <ProtectedRoute requiredRole="agent">
                  <AgentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent/properties"
              element={
                <ProtectedRoute requiredRole="agent">
                  <MyPropertiesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent/properties/create"
              element={
                <ProtectedRoute requiredRole="agent">
                  <CreatePropertyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent/properties/:id/edit"
              element={
                <ProtectedRoute requiredRole="agent">
                  <EditPropertyPage />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pending-agents"
              element={
                <ProtectedRoute requiredRole="admin">
                  <PendingAgentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pending-properties"
              element={
                <ProtectedRoute requiredRole="admin">
                  <PendingPropertiesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <UsersManagementPage />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
