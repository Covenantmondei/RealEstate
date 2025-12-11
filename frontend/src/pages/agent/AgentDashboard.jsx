import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import StatsCard from "../../components/StatsCard"
import { Link } from "react-router-dom"

const AgentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Agent Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard label="Total Properties" value="24" icon="🏠" />
          <StatsCard label="Active Listings" value="18" icon="📍" trend={10} />
          <StatsCard label="Inquiries" value="156" icon="💬" trend={25} />
          <StatsCard label="Commission" value="$45,230" icon="💰" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/agent/properties/create" className="card hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Create New Property</h3>
            <p className="text-slate-600">List a new property</p>
          </Link>
          <Link to="/agent/properties" className="card hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold mb-2">My Properties</h3>
            <p className="text-slate-600">Manage your listings</p>
          </Link>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Buyer Inquiries</h3>
            <p className="text-slate-600">View and respond to inquiries</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Performance</h3>
            <p className="text-slate-600">View your analytics and performance</p>
          </div>
        </div>
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default AgentDashboard
