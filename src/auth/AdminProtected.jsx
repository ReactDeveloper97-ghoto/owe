

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./authStore";

const AdminProtected = () => {
  const { token, role } = useAuthStore();

  if (!token || role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default AdminProtected;
