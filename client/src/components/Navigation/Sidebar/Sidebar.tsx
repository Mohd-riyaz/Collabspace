import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  CheckSquare,
  Compass,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Layers
} from "lucide-react";
import mockUserStore, { type Workspace } from "../../../data/mockUser";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(mockUserStore.getMockUser());
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockUserStore.getWorkspaces());
  const [activeWorkspaceId, setActiveWorkspaceId] = useState(mockUserStore.getActiveWorkspaceId());
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);

  // Sync state on location change
  useEffect(() => {
    setUser(mockUserStore.getMockUser());
    setWorkspaces(mockUserStore.getWorkspaces());
    setActiveWorkspaceId(mockUserStore.getActiveWorkspaceId());
  }, [location]);

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  const handleWorkspaceChange = (id: string) => {
    mockUserStore.setActiveWorkspaceId(id);
    setActiveWorkspaceId(id);
    setShowWorkspaceMenu(false);
    // Broadcast workspace change or just refresh view
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("collabspace_user");
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", to: "/projects", icon: Folder },
    { name: "Tasks Board", to: "/tasks", icon: CheckSquare },
    { name: "Workspaces", to: "/workspaces", icon: Layers },
    { name: "Explore Apps", to: "/explore", icon: Compass },
    { name: "My Profile", to: "/profile", icon: User },
    { name: "Workspace Settings", to: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-screen overflow-hidden transition-colors duration-200">
      {/* Header Workspace Swapper */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 relative">
        {activeWorkspace && (
          <button
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            className="w-full flex items-center justify-between p-2 rounded-lg border border-gray-250 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-850 transition text-left cursor-pointer"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div
                className={`w-7 h-7 rounded flex items-center justify-center font-bold text-white shrink-0 text-sm`}
                style={{
                  backgroundColor:
                    activeWorkspace.color === "emerald"
                      ? "#10b981"
                      : activeWorkspace.color === "amber"
                      ? "#f59e0b"
                      : activeWorkspace.color === "rose"
                      ? "#f43f5e"
                      : activeWorkspace.color === "teal"
                      ? "#14b8a6"
                      : "#2563eb",
                }}
              >
                {activeWorkspace.name.charAt(0)}
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {activeWorkspace.name}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
          </button>
        )}

        {/* Workspace Dropdown Panel */}
        {showWorkspaceMenu && (
          <div className="absolute top-16 left-4 right-4 z-40 bg-white dark:bg-gray-850 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg py-1">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 px-3 py-1.5 uppercase tracking-wider">
              Switch Workspace
            </div>
            <div className="max-h-48 overflow-y-auto">
              {workspaces.map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleWorkspaceChange(w.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition ${
                    w.id === activeWorkspaceId
                      ? "bg-blue-50/50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center text-xs text-white font-bold"
                    style={{
                      backgroundColor:
                        w.color === "emerald"
                          ? "#10b981"
                          : w.color === "amber"
                          ? "#f59e0b"
                          : w.color === "rose"
                          ? "#f43f5e"
                          : w.color === "teal"
                          ? "#14b8a6"
                          : "#2563eb",
                    }}
                  >
                    {w.name.charAt(0)}
                  </div>
                  <span className="truncate">{w.name}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-gray-150 dark:border-gray-800 mt-1 pt-1">
              <NavLink
                to="/onboarding/workspace"
                onClick={() => setShowWorkspaceMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Create Workspace</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer select-none ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                    : "text-gray-650 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-850 dark:hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Widget at Bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-850 shrink-0"
            />
            <div className="overflow-hidden leading-tight">
              <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.title || "Developer"}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-950/20 transition cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
