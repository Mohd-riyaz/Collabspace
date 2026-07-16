import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar/Navbar";
import Footer from "../../components/Navigation/Footer/Footer";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
