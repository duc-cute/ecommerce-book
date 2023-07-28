/** @format */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = ({ children }) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;

  return (
    <>
      {(isAdminRoute && userRole === "ADMIN") ||
      (!isAdminRoute && (userRole === "USER" || userRole === "ADMIN")) ? (
        <>{children}</>
      ) : (
        <NotPermitted />
      )}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  console.log("isAuthe", isAuthenticated);
  return (
    <>
      {isAuthenticated ? (
        <RoleBaseRoute>{children}</RoleBaseRoute>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
