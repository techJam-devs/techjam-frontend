/**
 * @description This build an auth guard that prevents un authorized users from accessing the dashboard
 * @access Auth users
 */

import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthstore from "../../store/authStore";
import PageLoader from "../../components/common/PageLoader";

interface AuthGuardProps {
  redirectTo?: string; // Direct redirection path
}

export const AuthGuard = ({ redirectTo = "/" }: AuthGuardProps) => {
  const { getMe, user } = useAuthstore();
  const [loading, setLoading] = useState<boolean>(true);

  // check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          await getMe();
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [user, getMe]);

  if (loading) return <PageLoader />; // show loader while checking

  if (!user) return <Navigate to={redirectTo} replace />; // redirect non-auth users

  return <Outlet />; // // allow verified user
};
