import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-905 dark:text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span>CollabSpace</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The modern workspace hub for teams to plan, collaborate, assign tasks, and build products. All in one place.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-450 dark:text-gray-400 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-gray-550 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-gray-550 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-gray-550 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-gray-550 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-gray-450 dark:text-gray-400 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-550 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-550 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-550 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Security Details
                </a>
              </li>
            </ul>
          </div>

          {/* Subscription / Newsletter */}
          <div>
            <h3 className="text-xs font-semibold text-gray-450 dark:text-gray-400 uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Sign up for our newsletter to get updates on releases, shortcuts, and advice.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium px-4 py-2 rounded-md transition shadow-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-805 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} CollabSpace Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-gray-650 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-650 transition">Terms of Service</a>
            <a href="#" className="hover:text-gray-650 transition">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
