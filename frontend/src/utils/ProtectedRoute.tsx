import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    // Jika user tidak login, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika user login, tampilkan halaman
  return <>{children}</>;
};
export default ProtectedRoute;
