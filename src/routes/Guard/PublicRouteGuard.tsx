import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthstore from "../../store/authStore";

const PublicRouteGuard: React.FC = () => {
  const { user } = useAuthstore();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRouteGuard;
