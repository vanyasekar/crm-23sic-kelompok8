import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, role }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/403" replace />;

  return children;
}
