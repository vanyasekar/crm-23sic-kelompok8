// src/components/RequireAuth.js
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, allowedRoles }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("role");

    if (!isAuthenticated) {
        return <Navigate to="/unauthorized" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default RequireAuth;
