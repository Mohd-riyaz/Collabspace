import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Compass,
  Search,
  Check,
  Zap,
  ArrowRight,
  Users
} from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "../../components/ui/Card/Card";
import mockUserStore, { type Integration, type Template } from "../../data/mockUser";

export default function Explore() {
  const location = useLocation();
  const [activeMode, setActiveMode] = useState<"apps" | "templates">("apps");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const reloadData = () => {
    setIntegrations(mockUserStore.getIntegrations());
    setTemplates(mockUserStore.getTemplates());
  };

  useEffect(() => {
    reloadData();
  }, [location]);

  const handleToggleConnection = (id: string) => {
    setLoadingId(id);
    // Simulate API connection lag
    setTimeout(() => {
      mockUserStore.toggleIntegration(id);
      reloadData();
      setLoadingId(null);
    }, 600);
  };

  // Compute filtered items
  const filteredIntegrations = integrations.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const filteredTemplates = templates.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories = ["All", "Productivity", "Developer Tools", "Communication", "Analytics"];

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-250 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white m-0 flex items-center gap-2">
            <Compass className="w-6 h-6 text-blue-600" />
            <span>Explore CollabSpace</span>
          </h1>
          <p className="text-sm text-gray-500">
            Extend your team workspace capabilities with ecosystem integrations or select structured workflow templates.
          </p>
        </div>
        
        {/* Apps/Templates Selector */}
        <div className="inline-flex p-1 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 shrink-0">
          <button
            onClick={() => {
              setActiveMode("apps");
              setSelectedCategory("All");
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
              activeMode === "apps"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-450"
                : "text-gray-550 hover:text-gray-900"
            }`}
          >
            App Integrations
          </button>
          <button
            onClick={() => {
              setActiveMode("templates");
              setSelectedCategory("All");
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
              activeMode === "templates"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-450"
                : "text-gray-555 hover:text-gray-900"
            }`}
          >
            Workspace Templates
          </button>
        </div>
      </div>

      {/* Main double column split layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters column */}
        <aside className="w-full md:w-56 shrink-0 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-900 px-9 py-2 outline-none focus:border-blue-550 focus:ring-1 focus:ring-blue-550"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Categories
            </label>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Content list Grid */}
        <div className="flex-1">
          {activeMode === "apps" ? (
            filteredIntegrations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredIntegrations.map((item) => (
                  <Card key={item.id} className="flex flex-col justify-between">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 flex items-center justify-center font-bold">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-base font-bold text-gray-950 dark:text-white leading-tight">
                              {item.name}
                            </CardTitle>
                            <span className="text-[10px] text-gray-400 font-mono mt-0.5">{item.category}</span>
                          </div>
                        </div>

                        {item.connected && (
                          <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Connected</span>
                          </span>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-2 pb-4 flex flex-col justify-between h-full">
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-850 pt-3">
                        <span className="text-[10px] text-gray-450 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          <span>Installs instantly</span>
                        </span>
                        
                        <button
                          onClick={() => handleToggleConnection(item.id)}
                          disabled={loadingId === item.id}
                          className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition border cursor-pointer ${
                            item.connected
                              ? "border-red-200 text-red-655 hover:bg-red-50 dark:border-red-950/20 dark:hover:bg-red-950/10"
                              : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm"
                          } ${loadingId === item.id ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {loadingId === item.id ? "Syncing..." : item.connected ? "Disconnect" : "Install"}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center text-gray-400">
                No app integrations found matching your filters.
              </div>
            )
          ) : (
            filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredTemplates.map((item) => (
                  <Card key={item.id} className="flex flex-col justify-between">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 flex items-center justify-center font-bold">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-base font-bold text-gray-950 dark:text-white leading-tight">
                            {item.name}
                          </CardTitle>
                          <span className="text-[10px] text-gray-400 font-mono mt-0.5">{item.category}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-2 pb-4 flex flex-col justify-between h-full">
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-850 pt-3 text-xs text-gray-400 dark:text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{item.uses} Teams Using</span>
                        </div>
                        
                        <button
                          onClick={() => {
                            // Quick simulation
                            alert(`Applied template: ${item.name}. Enjoy your structured workspace layout!`);
                          }}
                          className="border border-blue-600 text-blue-650 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950/20 px-3.5 py-1.5 rounded-lg font-semibold transition text-xs cursor-pointer flex items-center gap-1"
                        >
                          <span>Use Template</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center text-gray-400">
                No templates found matching your filters.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
