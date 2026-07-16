import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Topbar from "../../components/Navigation/Topbar/Topbar";

export default function PrivateLayout() {
  // Check localStorage for authenticated user session
  const isLoggedIn = !!localStorage.getItem("collabspace_user");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Column Layout */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Topbar Header */}
        <Topbar />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
