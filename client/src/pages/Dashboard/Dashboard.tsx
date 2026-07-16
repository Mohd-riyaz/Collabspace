import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Folder,
  CheckSquare,
  Users,
  TrendingUp,
  Activity,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2
} from "lucide-react";
import mockUserStore, { type Project, type Task, type ActivityLog, type Workspace } from "../../data/mockUser";

export default function Dashboard() {
  const location = useLocation();
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  // Reload data when component mounts or location change triggers reload
  const reloadData = () => {
    const workspaces = mockUserStore.getWorkspaces();
    const activeWId = mockUserStore.getActiveWorkspaceId();
    const activeW = workspaces.find((w) => w.id === activeWId) || workspaces[0];
    setActiveWorkspace(activeW);

    if (activeW) {
      // Filter projects and tasks related to this workspace
      const allProjects = mockUserStore.getProjects();
      const workspaceProjects = allProjects.filter((p) => p.workspaceId === activeW.id);
      setProjects(workspaceProjects);

      const allTasks = mockUserStore.getTasks();
      const projectIds = workspaceProjects.map((p) => p.id);
      const workspaceTasks = allTasks.filter((t) => projectIds.includes(t.projectId));
      setTasks(workspaceTasks);
    }
    setActivities(mockUserStore.getActivities());
  };

  useEffect(() => {
    reloadData();
  }, [location]);

  // Handle checking/unchecking tasks dynamically
  const handleToggleTask = (taskId: string, currentStatus: Task["status"]) => {
    const nextStatus = currentStatus === "done" ? "in_progress" : "done";
    mockUserStore.updateTaskStatus(taskId, nextStatus);
    reloadData(); // Reload and trigger UI re-renders
  };

  // Compute dashboard metrics
  const activeProjectsCount = projects.filter((p) => p.status === "active").length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const teamSize = activeWorkspace?.members.length || 0;

  // Filter tasks to show only "My Tasks" (Riyaz Ahmed)
  const myTasks = tasks.filter((t) => t.assignee.name === "Riyaz Ahmed");

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Header Greetings banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-md">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-extrabold m-0 leading-tight">
            Welcome back, {mockUserStore.getMockUser().name}!
          </h1>
          <p className="text-sm md:text-base text-blue-105/90">
            Here is a snapshot of activity in <span className="font-bold underline">{activeWorkspace?.name || "your workspace"}</span> today.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/tasks"
            className="bg-white/15 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 border border-white/10"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Tasks</span>
          </Link>
          <Link
            to="/projects"
            className="bg-white text-blue-650 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-550 uppercase tracking-wider block">
              Active Projects
            </span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {activeProjectsCount}
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-955/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Folder className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-555 uppercase tracking-wider block">
              Tasks Completed
            </span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {completionRate}%
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-555 uppercase tracking-wider block">
              Focus Score
            </span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              92/100
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-955/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-555 uppercase tracking-wider block">
              Workspace Team
            </span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {teamSize}
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-955/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid Layout splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Double-Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* My Tasks Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white m-0">My Tasks</h2>
                <p className="text-xs text-gray-500">Tasks assigned specifically to you in this workspace</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                {myTasks.filter((t) => t.status !== "done").length} Remaining
              </span>
            </div>

            {myTasks.length > 0 ? (
              <div className="divide-y divide-gray-100 dark:divide-gray-800/80">
                {myTasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between py-3.5 group hover:bg-gray-50/50 dark:hover:bg-gray-850/20 px-2 rounded-lg transition"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <button
                        onClick={() => handleToggleTask(t.id, t.status)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition cursor-pointer shrink-0 ${
                          t.status === "done"
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-gray-300 hover:border-blue-500 bg-white dark:bg-gray-900 dark:border-gray-700"
                        }`}
                      >
                        {t.status === "done" && <CheckCircle2 className="w-4.5 h-4.5" />}
                      </button>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold text-gray-900 dark:text-gray-100 truncate ${
                            t.status === "done" ? "line-through text-gray-400 dark:text-gray-500" : ""
                          }`}
                        >
                          {t.title}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>Due {t.dueDate}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          t.priority === "high"
                            ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                            : t.priority === "medium"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                            : "bg-gray-105 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                No tasks assigned in this workspace yet.
              </div>
            )}
          </div>

          {/* Active Projects Tracker */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white m-0">Projects Progress</h2>
                <p className="text-xs text-gray-500">Track task milestones across active projects</p>
              </div>
              <Link to="/projects" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {projects.length > 0 ? (
              <div className="space-y-6">
                {projects.map((p) => (
                  <div key={p.id} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span>{p.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{p.progress}% Completed</span>
                    </div>
                    {/* Progress Bar container */}
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                No active projects in this workspace.
              </div>
            )}
          </div>
        </div>

        {/* Right Single-Column */}
        <div className="space-y-8">
          {/* Workspace Activity Feed */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-150 dark:border-gray-800 pb-4 mb-4">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white m-0">Recent Activity</h2>
            </div>

            {activities.length > 0 ? (
              <div className="space-y-5">
                {activities.map((a) => (
                  <div key={a.id} className="flex gap-3 text-xs leading-normal">
                    <img
                      src={a.userAvatar}
                      alt={a.userName}
                      className="w-7.5 h-7.5 rounded-full object-cover border border-gray-150 shrink-0"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold text-gray-950 dark:text-white">{a.userName}</span>{" "}
                        {a.action}{" "}
                        <span className="font-medium text-blue-605 dark:text-blue-400 truncate">{a.target}</span>
                      </p>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 block">{a.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                No activities logged yet.
              </div>
            )}
          </div>

          {/* Members widget */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-4 mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white m-0">Team Members</h2>
              <span className="text-xs text-gray-400 font-medium">{teamSize} Total</span>
            </div>

            <div className="space-y-4">
              {activeWorkspace?.members.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80"}
                      alt={m.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-150"
                    />
                    <div className="leading-tight">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white block">{m.name}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 block">{m.email}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
