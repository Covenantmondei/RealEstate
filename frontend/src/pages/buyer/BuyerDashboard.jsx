import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Toast from "../../components/Toast"
import StatsCard from "../../components/StatsCard"
import { Link } from "react-router-dom"

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Buyer Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard label="Saved Properties" value="12" icon="💾" />
          <StatsCard label="Property Views" value="45" icon="👁️" trend={15} />
          <StatsCard label="Inquiries Sent" value="8" icon="📧" />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/buyer/favorites" className="card hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold mb-2">My Favorites</h3>
            <p className="text-slate-600">View all your saved properties</p>
          </Link>
          <Link to="/buyer/profile" className="card hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold mb-2">My Profile</h3>
            <p className="text-slate-600">Update your profile settings</p>
          </Link>
          <Link to="/properties" className="card hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Browse Properties</h3>
            <p className="text-slate-600">Explore new listings</p>
          </Link>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Recent Inquiries</h3>
            <p className="text-slate-600">Check your inquiry status</p>
          </div>
        </div>
      </div>

      <Footer />
      <Toast />
    </div>
  )
}

export default BuyerDashboard
