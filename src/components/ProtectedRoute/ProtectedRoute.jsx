/** @format */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  return (
    <>{isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />}</>
  );
};

export default ProtectedRoute;
