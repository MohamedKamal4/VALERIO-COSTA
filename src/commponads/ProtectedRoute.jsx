// src/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // الشرط الأساسي للدخول
  const allowAccess = sessionStorage.getItem("allow") === "true";

  if (!allowAccess) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
