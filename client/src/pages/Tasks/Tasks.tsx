import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Calendar
} from "lucide-react";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import TextArea from "../../components/ui/TextArea/TextArea";
import RadioGroup, { RadioGroupItem } from "../../components/ui/RadioGroup/RadioGroup";
import mockUserStore, { type Task, type Project } from "../../data/mockUser";

const COLUMNS = [
  { id: "todo", title: "Todo", color: "border-t-gray-400 bg-gray-50/50 dark:bg-gray-900/30" },
  { id: "in_progress", title: "In Progress", color: "border-t-blue-500 bg-blue-50/5 dark:bg-blue-950/5" },
  { id: "in_review", title: "In Review", color: "border-t-amber-500 bg-amber-50/5 dark:bg-amber-955/5" },
  { id: "done", title: "Done", color: "border-t-emerald-500 bg-emerald-50/5 dark:bg-emerald-955/5" }
] as const;

export default function Tasks() {
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    projectId: "",
    assigneeName: "Riyaz Ahmed",
    assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reloadData = () => {
    const activeWId = mockUserStore.getActiveWorkspaceId();
    const allProjects = mockUserStore.getProjects();
    const wsProjects = allProjects.filter((p) => p.workspaceId === activeWId);
    setProjects(wsProjects);

    const allTasks = mockUserStore.getTasks();
    const projectIds = wsProjects.map((p) => p.id);
    const wsTasks = allTasks.filter((t) => projectIds.includes(t.projectId));
    setTasks(wsTasks);

    // Default select first project in creation modal if available
    if (wsProjects.length > 0 && !newTask.projectId) {
      setNewTask((prev) => ({ ...prev, projectId: wsProjects[0].id }));
    }
  };

  useEffect(() => {
    reloadData();
  }, [location]);

  const handleMoveTask = (taskId: string, direction: "left" | "right") => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const columnOrder: Task["status"][] = ["todo", "in_progress", "in_review", "done"];
    const currentIndex = columnOrder.indexOf(task.status);
    let nextIndex = currentIndex;

    if (direction === "left" && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (direction === "right" && currentIndex < columnOrder.length - 1) {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex !== currentIndex) {
      mockUserStore.updateTaskStatus(taskId, columnOrder[nextIndex]);
      reloadData();
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Task title is required." }));
      return;
    }
    if (!newTask.projectId) {
      setErrors((prev) => ({ ...prev, project: "Please select a project." }));
      return;
    }
    if (!newTask.dueDate) {
      setErrors((prev) => ({ ...prev, date: "Due date is required." }));
      return;
    }

    mockUserStore.addTask({
      title: newTask.title,
      description: newTask.description,
      projectId: newTask.projectId,
      assignee: {
        name: newTask.assigneeName,
        avatar: newTask.assigneeAvatar,
      },
      priority: newTask.priority,
      dueDate: newTask.dueDate,
    });

    // Reset Form
    setNewTask((prev) => ({
      ...prev,
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    }));
    setErrors({});
    setShowCreateModal(false);
    reloadData();
  };

  const handleDeleteTask = (id: string) => {
    const allTasks = mockUserStore.getTasks();
    const t = allTasks.find((task) => task.id === id);
    if (t) {
      const filtered = allTasks.filter((task) => task.id !== id);
      mockUserStore.saveTasks(filtered);
      mockUserStore.addActivity("deleted task", t.title);
      reloadData();
    }
  };

  // Filter tasks based on selected project
  const filteredTasks = selectedProjectId === "all"
    ? tasks
    : tasks.filter((t) => t.projectId === selectedProjectId);

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white m-0">
            Tasks Board
          </h1>
          <p className="text-sm text-gray-500">
            Sprint Kanban board. View tasks status, shift boards using arrow toggles, and add milestones.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="text-sm rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:border-blue-500 font-semibold"
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board columns wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start h-[calc(100vh-210px)] overflow-y-auto">
        {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-xl border-t-4 border border-gray-200 dark:border-gray-800/80 p-4 h-full flex flex-col gap-4 min-h-[300px] ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-150 dark:border-gray-800/80">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{col.title}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  {colTasks.length}
                </span>
              </div>

              {/* Column Tasks body */}
              <div className="flex-1 space-y-3.5 overflow-y-auto pr-1">
                {colTasks.map((t) => {
                  const currentProject = projects.find((p) => p.id === t.projectId);

                  return (
                    <div
                      key={t.id}
                      className="bg-white dark:bg-gray-900 border border-gray-250 dark:border-gray-800/80 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col gap-3 group relative"
                    >
                      {/* Project Scope pill & Actions */}
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-450 truncate">
                          {currentProject?.name || "Project"}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(t.id)}
                          className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition p-0.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Title & Desc */}
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                          {t.title}
                        </h4>
                        {t.description && (
                          <p className="text-xs text-gray-450 dark:text-gray-400 leading-relaxed truncate">
                            {t.description}
                          </p>
                        )}
                      </div>

                      {/* Date & Priority tags */}
                      <div className="flex justify-between items-center gap-2 pt-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{t.dueDate}</span>
                        </div>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            t.priority === "high"
                              ? "bg-red-50 text-red-650 dark:bg-red-950/20 dark:text-red-400"
                              : t.priority === "medium"
                              ? "bg-blue-50 text-blue-650 dark:bg-blue-950/20 dark:text-blue-400"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {t.priority}
                        </span>
                      </div>

                      {/* Assignee & Move arrows footer */}
                      <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-850 pt-3">
                        {/* Assignee info */}
                        <div className="flex items-center gap-2">
                          <img
                            src={t.assignee.avatar}
                            alt={t.assignee.name}
                            className="w-5.5 h-5.5 rounded-full object-cover border border-gray-150 shrink-0"
                            title={`Assigned to ${t.assignee.name}`}
                          />
                          <span className="text-[10px] text-gray-500 font-medium truncate max-w-[80px]">
                            {t.assignee.name.split(" ")[0]}
                          </span>
                        </div>

                        {/* Shifter Arrows */}
                        <div className="flex items-center gap-1">
                          {t.status !== "todo" && (
                            <button
                              onClick={() => handleMoveTask(t.id, "left")}
                              title="Move Left"
                              className="p-1 rounded border border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition cursor-pointer"
                            >
                              <ArrowLeft className="w-3 h-3 text-gray-500" />
                            </button>
                          )}
                          {t.status !== "done" && (
                            <button
                              onClick={() => handleMoveTask(t.id, "right")}
                              title="Move Right"
                              className="p-1 rounded border border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition cursor-pointer"
                            >
                              <ArrowRight className="w-3 h-3 text-gray-500" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="border border-dashed border-gray-250 dark:border-gray-800 rounded-xl p-6 text-center text-xs text-gray-400 dark:text-gray-500 py-10">
                    No tasks here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog for New Task */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-gray-150 dark:border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Create New Task</h3>
              <p className="text-xs text-gray-450 mt-0.5">Assign milestones, select target projects, and choose timelines.</p>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <Input
                label="Task Title"
                id="task-title"
                placeholder="e.g. Wireframe Settings menu, Connect Stripe hooks"
                value={newTask.title}
                onChange={(e) => {
                  setNewTask((prev) => ({ ...prev, title: e.target.value }));
                  if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
                }}
                error={errors.title}
                required
              />

              <TextArea
                label="Description"
                id="task-desc"
                placeholder="Details of task deliverables, links, specs..."
                value={newTask.description}
                onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target Project
                </label>
                <select
                  value={newTask.projectId}
                  onChange={(e) => {
                    setNewTask((prev) => ({ ...prev, projectId: e.target.value }));
                    if (errors.project) setErrors((prev) => ({ ...prev, project: "" }));
                  }}
                  className="w-full text-sm rounded-lg border border-gray-350 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2.5 outline-none focus:border-blue-500 font-medium"
                >
                  <option value="" disabled>Select project...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {errors.project && <p className="text-xs text-red-500">{errors.project}</p>}
              </div>

              <Input
                label="Due Date"
                id="task-date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => {
                  setNewTask((prev) => ({ ...prev, dueDate: e.target.value }));
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
                  value={newTask.priority}
                  onChange={(val) => setNewTask((prev) => ({ ...prev, priority: val as "low" | "medium" | "high" }))}
                  name="task-priority"
                >
                  <RadioGroupItem value="low" label="Low Priority" description="Minor details, long deadlines" />
                  <RadioGroupItem value="medium" label="Medium Priority" description="Standard roadmap milestones" />
                  <RadioGroupItem value="high" label="High Priority" description="Blocking bugs, deployment milestones" />
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
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
