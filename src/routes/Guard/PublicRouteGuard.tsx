/**
 * @description  This creates a guard for reset-password page
 *               logged in user should not be able to access this page
 */

import React from "react";
import { Navigate } from "react-router-dom";
import useAuthstore from "../../store/authStore";

interface PublicRouteGuardProps {
  children: React.ReactNode;
}

const PublicRouteGuard: React.FC<PublicRouteGuardProps> = ({ children }) => {
  const { user } = useAuthstore();

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRouteGuard;
