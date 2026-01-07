/**
 * @description AuthGuard protects routes from unauthenticated users
 * @access Authenticated users only
 */

import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthstore from "../../store/authStore";
import PageLoader from "../../components/common/PageLoader";

interface AuthGuardProps {
  redirectTo?: string; // Path to redirect unauthenticated users
}

export const AuthGuard = ({ redirectTo = "/" }: AuthGuardProps) => {
  const { user } = useAuthstore();
  const [loading, setLoading] = useState(true);

  // Read state only
  useEffect(() => {
    // Simulate a small delay to ensure store has initialized
    const timer = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />; // Show loader while auth status is determined

  if (!user) return <Navigate to={redirectTo} replace />; // Redirect if not authenticated

  return <Outlet />; // Render protected route
};
