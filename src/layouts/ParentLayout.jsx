import { Outlet } from "react-router-dom";
import Sidebar from "../components/parent/Sidebar";
import Topbar from "../components/parent/Topbar";
import { useThemeStore } from "../store/themeStore";

const ParentLayout = () => {
  const { theme } = useThemeStore();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64 mt-16"> {/* Add ml-64 for sidebar width and mt-16 for topbar */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;