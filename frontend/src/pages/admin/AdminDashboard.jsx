import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import StatsCard from "../../components/StatsCard"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard label="Total Users" value="1,234" icon="👥" />
          <StatsCard label="Total Properties" value="456" icon="🏠" />
          <StatsCard label="Pending Approvals" value="12" icon="⏳" trend={-5} />
          <StatsCard label="Active Listings" value="389" icon="📍" />
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/pending-agents" className="card hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Pending Agents</h3>
            <p className="text-slate-600">Review and approve agent applications</p>
          </Link>
          <Link to="/admin/pending-properties" className="card hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Pending Properties</h3>
            <p className="text-slate-600">Approve or reject property listings</p>
          </Link>
          <Link to="/admin/users" className="card hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Users Management</h3>
            <p className="text-slate-600">Manage all platform users</p>
          </Link>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Activity Logs</h3>
            <p className="text-slate-600">View platform activity and logs</p>
          </div>
        </div>
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default AdminDashboard
