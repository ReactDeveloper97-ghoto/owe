import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../auth/authStore";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

const AdminLayout = () => {
  const { user, role } = useAuthStore();

  if (!user || role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar adminName={user.admin_name} />

        <main className="flex-1 px-6 py-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
