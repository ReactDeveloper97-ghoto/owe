import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./authStore";

const ParentProtected = ({children}) => {
  const { token, role } = useAuthStore();

  if (!token || role !== "parent") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ParentProtected;