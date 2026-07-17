import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout/PrivateLayout";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Workspaces from "./pages/Workspaces/Workspaces";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import WorkspaceOnboarding from "./pages/WorkspaceOnboarding/WorkspaceOnboarding";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/projects" element={<Projects />} />

        <Route path="/tasks" element={<Tasks />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/onboarding/workspace"
          element={<WorkspaceOnboarding />}
        />
      </Route>

      <Route
        path="/projects/:projectId"
        element={<ProjectDetails />}
      />
    </Routes>
  );
}

export default App;