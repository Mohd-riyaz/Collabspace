// TypeScript interfaces for CollabSpace data models
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  title: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  members: { name: string; email: string; role: string; avatar?: string }[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  status: "planning" | "active" | "completed" | "paused";
  progress: number;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignee: { name: string; avatar: string };
  status: "todo" | "in_progress" | "in_review" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export interface ActivityLog {
  id: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  connected: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  uses: number;
}

// Initial Data definitions
const initialUser: User = {
  id: "u1",
  name: "Riyaz Ahmed",
  email: "riyaz@collabspace.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  role: "Workspace Owner",
  bio: "Lead Product Engineer building modern collaboration software. Passionate about sleek web design, responsive layouts, and typed code.",
  title: "Lead Frontend Architect"
};

const initialWorkspaces: Workspace[] = [
  {
    id: "w1",
    name: "Acme Engineering",
    slug: "acme-eng",
    description: "Primary engineering workspace for Acme V2 platform development, infrastructure scaling, and code quality audits.",
    color: "blue",
    members: [
      { name: "Riyaz Ahmed", email: "riyaz@collabspace.com", role: "Admin", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Sarah Jenkins", email: "sarah@acme.com", role: "Member", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "David Vance", email: "david@acme.com", role: "Member", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" }
    ]
  },
  {
    id: "w2",
    name: "CollabSpace Marketing",
    slug: "cs-marketing",
    description: "Workspace focused on branding assets, launch campaigns, pricing experiments, SEO positioning, and newsletters.",
    color: "emerald",
    members: [
      { name: "Riyaz Ahmed", email: "riyaz@collabspace.com", role: "Admin", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Emma Watson", email: "emma@collabspace.com", role: "Member", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80" }
    ]
  },
  {
    id: "w3",
    name: "Personal Lab",
    slug: "personal-lab",
    description: "Individual experiments, side projects, scratchpad mockups, and quick playground setups.",
    color: "amber",
    members: [
      { name: "Riyaz Ahmed", email: "riyaz@collabspace.com", role: "Admin", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" }
    ]
  }
];

const initialProjects: Project[] = [
  {
    id: "p1",
    name: "Acme V2 Launch",
    description: "Rebuilding the core web engine to support real-time collaborations, offline editing syncing, and component modularity.",
    workspaceId: "w1",
    status: "active",
    progress: 70,
    priority: "high",
    dueDate: "2026-08-30"
  },
  {
    id: "p2",
    name: "Security Compliance Audit",
    description: "Reviewing workspace endpoint policies, setting up access logs, and passing SOC2 compliance certification.",
    workspaceId: "w1",
    status: "planning",
    progress: 15,
    priority: "high",
    dueDate: "2026-10-15"
  },
  {
    id: "p3",
    name: "Q3 Campaign Design",
    description: "SaaS launch banners, interactive email lists, product demo animations, and social copy distributions.",
    workspaceId: "w2",
    status: "active",
    progress: 45,
    priority: "medium",
    dueDate: "2026-09-01"
  },
  {
    id: "p4",
    name: "SaaS Pricing Tiers Redesign",
    description: "Integrating Stripe metrics, configuring checkout UI pages, and modeling annual subscriptions.",
    workspaceId: "w2",
    status: "completed",
    progress: 100,
    priority: "low",
    dueDate: "2026-07-01"
  }
];

const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Fix Tailwind compilation errors",
    description: "Ensure `@tailwindcss/vite` and index CSS imports are aligned and compiling with zero console warnings.",
    projectId: "p1",
    assignee: { name: "Riyaz Ahmed", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
    status: "in_progress",
    priority: "high",
    dueDate: "2026-07-20"
  },
  {
    id: "t2",
    title: "Implement compound RadioGroup",
    description: "Develop a typed RadioGroup component matching the CSS styling, supporting custom options and descriptions.",
    projectId: "p1",
    assignee: { name: "Riyaz Ahmed", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
    status: "todo",
    priority: "medium",
    dueDate: "2026-07-25"
  },
  {
    id: "t3",
    title: "Design Landing Page Hero layout",
    description: "Build a beautiful responsive dark-mode capable Hero element with blurred backgrounds and CTA highlights.",
    projectId: "p1",
    assignee: { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
    status: "in_review",
    priority: "high",
    dueDate: "2026-07-18"
  },
  {
    id: "t4",
    title: "Write SOC2 Security policies",
    description: "Document credential rules, workspace authorization scopes, and data retention guidelines.",
    projectId: "p2",
    assignee: { name: "David Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" },
    status: "todo",
    priority: "high",
    dueDate: "2026-09-10"
  },
  {
    id: "t5",
    title: "Deploy beta environment server",
    description: "Host testing branches on AWS, wire Cloudflare paths, and review request/response performance values.",
    projectId: "p1",
    assignee: { name: "Riyaz Ahmed", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
    status: "done",
    priority: "high",
    dueDate: "2026-07-10"
  },
  {
    id: "t6",
    title: "Draft launch email newsletter",
    description: "Write copy outlining new collaborative features, workspace folders, and discount coupon codes.",
    projectId: "p3",
    assignee: { name: "Emma Watson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80" },
    status: "in_progress",
    priority: "medium",
    dueDate: "2026-08-15"
  },
  {
    id: "t7",
    title: "Confirm Stripe pricing hooks",
    description: "Validate billing event responses, test customer metadata syncing, and implement plan limits.",
    projectId: "p4",
    assignee: { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
    status: "done",
    priority: "medium",
    dueDate: "2026-06-25"
  }
];

const initialActivities: ActivityLog[] = [
  {
    id: "a1",
    userName: "Riyaz Ahmed",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    action: "completed task",
    target: "Deploy beta environment server",
    timestamp: "10 mins ago"
  },
  {
    id: "a2",
    userName: "Sarah Jenkins",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    action: "submitted review for",
    target: "Design Landing Page Hero layout",
    timestamp: "1 hour ago"
  },
  {
    id: "a3",
    userName: "David Vance",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    action: "added task to Security Compliance Audit",
    target: "Write SOC2 Security policies",
    timestamp: "3 hours ago"
  }
];

const initialIntegrations: Integration[] = [
  { id: "i1", name: "Slack", description: "Stream activity feeds, task reports, and workspace updates to specific channels.", icon: "Slack", category: "Communication", connected: true },
  { id: "i2", name: "GitHub", description: "Link branches, associate commits with cards, and automate task completions.", icon: "Github", category: "Developer Tools", connected: false },
  { id: "i3", name: "Figma", description: "Embed live mockup preview files, design specs, and design systems inside pages.", icon: "Figma", category: "Productivity", connected: true },
  { id: "i4", name: "Notion", description: "Synchronize company documents, research notes, and template drafts.", icon: "Notion", category: "Productivity", connected: false },
  { id: "i5", name: "Zoom", description: "Generate meeting calls, coordinate sprints, and display recording links.", icon: "Video", category: "Communication", connected: false },
  { id: "i6", name: "HubSpot", description: "Track contacts, sales pipelines, and customer feedback reports.", icon: "Users", category: "Analytics", connected: false }
];

const initialTemplates: Template[] = [
  { id: "tmpl1", name: "Product Roadmap", description: "Outline features, map dependencies, prioritize milestones, and log scope variables.", category: "Productivity", uses: 324 },
  { id: "tmpl2", name: "Kanban Task Board", description: "Classic Todo -> In Progress -> Done board setup with automated task alerts.", category: "Productivity", uses: 1205 },
  { id: "tmpl3", name: "SOC2 Compliance", description: "A detailed checklist containing policies, infrastructure audits, and access templates.", category: "Developer Tools", uses: 89 },
  { id: "tmpl4", name: "Sprint Scrum Backlog", description: "Track velocity charts, manage ticket stories, and log sprint reflections.", category: "Developer Tools", uses: 512 },
  { id: "tmpl5", name: "Marketing Campaign Tracker", description: "Coordinate copy draft edits, designer reviews, scheduling, and publication deadlines.", category: "Communication", uses: 413 }
];

// Helper functions that safely load and save to localStorage
function getStore<T>(key: string, defaultValue: T): T {
  try {
    const val = localStorage.getItem(`collabspace_${key}`);
    return val ? JSON.parse(val) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStore<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`collabspace_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// Export stateful accessors
export const getMockUser = (): User => getStore("user", initialUser);
export const saveMockUser = (user: User): void => setStore("user", user);

export const getWorkspaces = (): Workspace[] => getStore("workspaces", initialWorkspaces);
export const saveWorkspaces = (list: Workspace[]): void => setStore("workspaces", list);
export const addWorkspace = (item: Omit<Workspace, "id">): Workspace => {
  const list = getWorkspaces();
  const newItem = { ...item, id: `w_${Date.now()}` };
  list.push(newItem);
  saveWorkspaces(list);
  addActivity("created workspace", newItem.name);
  return newItem;
};

export const getActiveWorkspaceId = (): string => {
  const current = localStorage.getItem("collabspace_active_w_id");
  if (current) return current;
  const list = getWorkspaces();
  if (list.length > 0) {
    localStorage.setItem("collabspace_active_w_id", list[0].id);
    return list[0].id;
  }
  return "";
};
export const setActiveWorkspaceId = (id: string): void => {
  localStorage.setItem("collabspace_active_w_id", id);
};

export const getProjects = (): Project[] => getStore("projects", initialProjects);
export const saveProjects = (list: Project[]): void => setStore("projects", list);
export const addProject = (item: Omit<Project, "id" | "progress">): Project => {
  const list = getProjects();
  const newItem: Project = { ...item, id: `p_${Date.now()}`, progress: 0 };
  list.push(newItem);
  saveProjects(list);
  addActivity("created project", newItem.name);
  return newItem;
};

export const getTasks = (): Task[] => getStore("tasks", initialTasks);
export const saveTasks = (list: Task[]): void => setStore("tasks", list);
export const addTask = (item: Omit<Task, "id" | "status">): Task => {
  const list = getTasks();
  const newItem: Task = { ...item, id: `t_${Date.now()}`, status: "todo" };
  list.push(newItem);
  saveTasks(list);
  addActivity("added task", newItem.title);
  return newItem;
};

export const updateTaskStatus = (taskId: string, status: Task["status"]): Task[] => {
  const list = getTasks();
  const item = list.find((t) => t.id === taskId);
  if (item) {
    item.status = status;
    saveTasks(list);
    addActivity(`moved task "${item.title}" to`, status.replace("_", " "));
    
    // Auto-update project progress
    const projectId = item.projectId;
    const projectTasks = list.filter((t) => t.projectId === projectId);
    const completedTasks = projectTasks.filter((t) => t.status === "done").length;
    const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0;
    
    const projectsList = getProjects();
    const p = projectsList.find((p) => p.id === projectId);
    if (p) {
      p.progress = progress;
      saveProjects(projectsList);
    }
  }
  return list;
};

export const getActivities = (): ActivityLog[] => getStore("activities", initialActivities);
export const addActivity = (action: string, target: string): void => {
  const user = getMockUser();
  const list = getActivities();
  const newLog: ActivityLog = {
    id: `a_${Date.now()}`,
    userName: user.name,
    userAvatar: user.avatar,
    action,
    target,
    timestamp: "Just now"
  };
  list.unshift(newLog);
  // Keep last 15 activities
  setStore("activities", list.slice(0, 15));
};

export const getIntegrations = (): Integration[] => getStore("integrations", initialIntegrations);
export const toggleIntegration = (id: string): Integration[] => {
  const list = getIntegrations();
  const item = list.find((i) => i.id === id);
  if (item) {
    item.connected = !item.connected;
    setStore("integrations", list);
    addActivity(item.connected ? "connected integration" : "disconnected integration", item.name);
  }
  return list;
};

export const getTemplates = (): Template[] => getStore("templates", initialTemplates);

// Default export containing the helpers
const mockUserStore = {
  getMockUser,
  saveMockUser,
  getWorkspaces,
  saveWorkspaces,
  addWorkspace,
  getActiveWorkspaceId,
  setActiveWorkspaceId,
  getProjects,
  saveProjects,
  addProject,
  getTasks,
  saveTasks,
  addTask,
  updateTaskStatus,
  getActivities,
  addActivity,
  getIntegrations,
  toggleIntegration,
  getTemplates
};

export default mockUserStore;
