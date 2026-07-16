import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Search, User, Settings, LogOut, ChevronDown } from "lucide-react";
import mockUserStore from "../../../data/mockUser";

export default function Topbar() {
  const location = useLocation();
  const [user, setUser] = useState(mockUserStore.getMockUser());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Sync profile details
  useEffect(() => {
    setUser(mockUserStore.getMockUser());
  }, [location]);

  // Generate breadcrumbs from pathname
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const to = `/${pathParts.slice(0, index + 1).join("/")}`;
    const name = part.charAt(0).toUpperCase() + part.slice(1).replace("-", " ");
    return { name, to };
  });

  const notifications = [
    { id: 1, text: "Sarah Jenkins completed 'Design Landing Page Hero'", time: "1 hour ago", unread: true },
    { id: 2, text: "David Vance invited you to Security Compliance", time: "3 hours ago", unread: false },
    { id: 3, text: "Acme V2 Launch was created successfully", time: "1 day ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between shrink-0 transition-colors duration-200">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-450 transition font-medium">
          CollabSpace
        </Link>
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb.to} className="flex items-center gap-1.5">
            <span>/</span>
            <span
              className={`${
                idx === breadcrumbs.length - 1
                  ? "text-gray-900 dark:text-white font-semibold"
                  : "hover:text-blue-600 dark:hover:text-blue-450 transition font-medium"
              }`}
            >
              {crumb.name}
            </span>
          </div>
        ))}
      </div>

      {/* Global Search and Tools */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, tasks, files..."
            className="w-full text-sm rounded-lg border border-gray-250 dark:border-gray-850 bg-gray-50/50 focus:bg-white dark:bg-gray-950 px-9 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:bg-gray-900"
          />
          <kbd className="absolute right-3 top-2 text-[10px] border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-850 px-1.5 py-0.5 text-gray-400 font-sans shadow-sm select-none">
            ⌘K
          </kbd>
        </div>

        {/* Notifications Icon & Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserDropdown(false);
            }}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850 transition relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white dark:ring-gray-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Notifications</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition flex gap-3 ${
                      n.unread ? "bg-blue-50/20 dark:bg-blue-950/10" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-xs text-gray-800 dark:text-gray-205 leading-normal">{n.text}</p>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">{n.time}</span>
                    </div>
                    {n.unread && <span className="w-1.5 h-1.5 bg-blue-650 rounded-full mt-1.5 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-850 transition cursor-pointer"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-800 shrink-0"
            />
            <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block shrink-0" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-150 dark:border-gray-800">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Signed in as</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setShowUserDropdown(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <User className="w-4 h-4 text-gray-450" />
                <span>My Profile</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowUserDropdown(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <Settings className="w-4 h-4 text-gray-450" />
                <span>Settings</span>
              </Link>
              <div className="border-t border-gray-150 dark:border-gray-800 my-1" />
              <button
                onClick={() => {
                  setShowUserDropdown(false);
                  localStorage.removeItem("collabspace_user");
                  window.location.href = "/login";
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
