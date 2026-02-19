/**
 * @description An auth wrapper to provide open auth to our app
 */

import type { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type React from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default AuthProvider;
