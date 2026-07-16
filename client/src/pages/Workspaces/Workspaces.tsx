import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Users, ExternalLink, Check } from "lucide-react";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card/Card";
import mockUserStore, { type Workspace } from "../../data/mockUser";

export default function Workspaces() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState("");

  const reloadData = () => {
    setWorkspaces(mockUserStore.getWorkspaces());
    setActiveWorkspaceId(mockUserStore.getActiveWorkspaceId());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleSwitchWorkspace = (id: string) => {
    mockUserStore.setActiveWorkspaceId(id);
    setActiveWorkspaceId(id);
    // Refresh page details or redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white m-0">
            Workspaces
          </h1>
          <p className="text-sm text-gray-500">
            View, switch between, and manage your collaborative organization spaces
          </p>
        </div>
        <Link
          to="/onboarding/workspace"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Workspace</span>
        </Link>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((w) => {
          const isActive = w.id === activeWorkspaceId;
          const memberCount = w.members.length;

          return (
            <Card
              key={w.id}
              className={`flex flex-col h-full border-2 ${
                isActive
                  ? "border-blue-650 ring-2 ring-blue-500/10"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              <CardHeader className="flex-row items-start justify-between gap-4 pb-3">
                <div className="flex items-center gap-3">
                  {/* Color Emblem badge */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-white text-base"
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
                  <div>
                    <CardTitle className="text-base font-bold text-gray-950 dark:text-white leading-tight">
                      {w.name}
                    </CardTitle>
                    <CardDescription className="text-xs font-mono text-gray-400 mt-0.5">
                      collabspace.com/w/{w.slug}
                    </CardDescription>
                  </div>
                </div>

                {isActive && (
                  <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </span>
                )}
              </CardHeader>

              <CardContent className="flex-1 pb-4 flex flex-col justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-normal mb-6">
                  {w.description || "No description provided for this workspace. Describe team milestones here."}
                </p>

                <div className="space-y-4">
                  {/* Stats list */}
                  <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800/85 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{memberCount} Members</span>
                    </div>
                    <div className="flex -space-x-2">
                      {w.members.slice(0, 3).map((m, i) => (
                        <img
                          key={i}
                          src={m.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&h=60&q=80"}
                          alt={m.name}
                          className="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-gray-900"
                        />
                      ))}
                      {memberCount > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-550 dark:text-gray-400 flex items-center justify-center font-bold border-2 border-white dark:border-gray-900">
                          +{memberCount - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    {isActive ? (
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Open Dashboard</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSwitchWorkspace(w.id)}
                        className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950/20 py-2 rounded-lg text-sm font-semibold transition cursor-pointer"
                      >
                        Switch to Workspace
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
