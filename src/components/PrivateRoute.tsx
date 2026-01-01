import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
  roles?: string[]; 
}

export const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return children;
};