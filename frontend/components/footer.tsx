import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">RealEstate</h3>
            <p className="text-slate-400">Discover your dream property with our premium real estate platform.</p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-semibold mb-4">Browse</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/properties" className="hover:text-white transition">
                  All Properties
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  New Listings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Featured
                </a>
              </li>
            </ul>
          </div>

          {/* For Agents */}
          <div>
            <h4 className="font-semibold mb-4">For Agents</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Become an Agent
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Agent Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Email: info@realestate.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="hover:text-white transition">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-white transition">
                    Facebook
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2025 RealEstate Platform. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
