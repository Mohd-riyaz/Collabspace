import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Folder,
  Plus,
  Calendar,
  Trash2,
  CheckCircle,
  Play,
  Pause,
  AlertCircle
} from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "../../components/ui/Card/Card";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import TextArea from "../../components/ui/TextArea/TextArea";
import RadioGroup, { RadioGroupItem } from "../../components/ui/RadioGroup/RadioGroup";
import mockUserStore, { type Project } from "../../data/mockUser";

export default function Projects() {
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "planning" | "active" | "completed" | "paused">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reloadData = () => {
    const activeWId = mockUserStore.getActiveWorkspaceId();
    const allProjects = mockUserStore.getProjects();
    const filtered = allProjects.filter((p) => p.workspaceId === activeWId);
    setProjects(filtered);
  };

  useEffect(() => {
    reloadData();
  }, [location]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Project name is required." }));
      return;
    }
    if (!newProject.dueDate) {
      setErrors((prev) => ({ ...prev, date: "Due date is required." }));
      return;
    }

    mockUserStore.addProject({
      name: newProject.name,
      description: newProject.description,
      workspaceId: mockUserStore.getActiveWorkspaceId(),
      status: "planning",
      priority: newProject.priority,
      dueDate: newProject.dueDate,
    });

    // Reset Form
    setNewProject({ name: "", description: "", priority: "medium", dueDate: "" });
    setErrors({});
    setShowCreateModal(false);
    reloadData();
  };

  const handleUpdateStatus = (id: string, status: Project["status"]) => {
    const allProjects = mockUserStore.getProjects();
    const p = allProjects.find((proj) => proj.id === id);
    if (p) {
      p.status = status;
      mockUserStore.saveProjects(allProjects);
      mockUserStore.addActivity(`marked project "${p.name}" as`, status);
      reloadData();
    }
  };

  const handleDeleteProject = (id: string) => {
    const allProjects = mockUserStore.getProjects();
    const p = allProjects.find((proj) => proj.id === id);
    if (p) {
      const filtered = allProjects.filter((proj) => proj.id !== id);
      mockUserStore.saveProjects(filtered);
      mockUserStore.addActivity("deleted project", p.name);
      reloadData();
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "all") return true;
    return p.status === activeTab;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header sections */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white m-0">
            Projects
          </h1>
          <p className="text-sm text-gray-500">
            Manage your project development cycles, view completion percentages, and update statuses.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 gap-6">
        {(["all", "planning", "active", "completed", "paused"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold border-b-2 transition capitalize cursor-pointer ${
              activeTab === tab
                ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-950 dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <Card key={p.id} className="flex flex-col h-full">
              <CardHeader className="pb-3 flex-row justify-between items-start gap-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base font-bold text-gray-950 dark:text-white truncate">
                      {p.name}
                    </CardTitle>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block w-max mt-1 ${
                        p.priority === "high"
                          ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                          : p.priority === "medium"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {p.priority} Priority
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {p.status !== "completed" && (
                    <button
                      onClick={() => handleUpdateStatus(p.id, "completed")}
                      title="Mark Completed"
                      className="p-1 rounded text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition cursor-pointer"
                    >
                      <CheckCircle className="w-4.5 h-4.5" />
                    </button>
                  )}
                  {p.status === "active" ? (
                    <button
                      onClick={() => handleUpdateStatus(p.id, "paused")}
                      title="Pause Project"
                      className="p-1 rounded text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition cursor-pointer"
                    >
                      <Pause className="w-4.5 h-4.5" />
                    </button>
                  ) : p.status === "paused" || p.status === "planning" ? (
                    <button
                      onClick={() => handleUpdateStatus(p.id, "active")}
                      title="Activate Project"
                      className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition cursor-pointer"
                    >
                      <Play className="w-4.5 h-4.5" />
                    </button>
                  ) : null}
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    title="Delete Project"
                    className="p-1 rounded text-gray-400 hover:text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col justify-between pt-0 pb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-normal mb-6">
                    {p.description || "No description provided. Click quick actions to update progress cycles."}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Progress slider bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-gray-450 dark:text-gray-500">
                      <span>Milestones Progress</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Due date and badges footer */}
                  <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-550 border-t border-gray-100 dark:border-gray-850 pt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due {p.dueDate}</span>
                    </div>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[10px] uppercase ${
                        p.status === "active"
                          ? "bg-blue-50 text-blue-650 dark:bg-blue-950/20 dark:text-blue-400"
                          : p.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                          : p.status === "paused"
                          ? "bg-amber-50 text-amber-600 dark:bg-amber-955/20 dark:text-amber-400"
                          : "bg-purple-50 text-purple-600 dark:bg-purple-955/20 dark:text-purple-400"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center text-gray-400 dark:text-gray-550">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-655" />
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300 m-0">No projects found</p>
          <p className="text-sm mt-1">Select a different tab or create a new project using the button above.</p>
        </div>
      )}

      {/* Modal Dialog for New Project */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-gray-150 dark:border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Create New Project</h3>
              <p className="text-xs text-gray-450 mt-0.5">Define your project goals, priorities, and deadlines.</p>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <Input
                label="Project Name"
                id="proj-name"
                placeholder="e.g. Marketing Launch, OAuth Engine"
                value={newProject.name}
                onChange={(e) => {
                  setNewProject((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                error={errors.name}
                required
              />

              <TextArea
                label="Description"
                id="proj-desc"
                placeholder="Details outlining features, scoping notes, and milestones..."
                value={newProject.description}
                onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />

              <Input
                label="Due Date"
                id="proj-date"
                type="date"
                value={newProject.dueDate}
                onChange={(e) => {
                  setNewProject((prev) => ({ ...prev, dueDate: e.target.value }));
                  if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                }}
                error={errors.date}
                required
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Priority
                </label>
                <RadioGroup
                  value={newProject.priority}
                  onChange={(val) => setNewProject((prev) => ({ ...prev, priority: val as "low" | "medium" | "high" }))}
                  name="proj-priority"
                >
                  <RadioGroupItem value="low" label="Low Priority" description="Minor task groups, long deadliness" />
                  <RadioGroupItem value="medium" label="Medium Priority" description="Standard roadmap releases" />
                  <RadioGroupItem value="high" label="High Priority" description="Critical bugs, launch requirements" />
                </RadioGroup>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-150 dark:border-gray-800">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowCreateModal(false);
                    setErrors({});
                  }}
                  className="w-auto px-4"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-auto px-4">
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
