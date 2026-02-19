/**
 * @description Building a reuseable google openAuth button
 *              For sign up and sign in
 */

import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useRef, useState } from "react";
import useToastStore from "../../store/notificationStore";
import { GoogleOauthService } from "../../services/OauthService";
import useAuthstore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export const GoogleButton = () => {
  const googleContainerRef = useRef<HTMLDivElement | null>(null);
  const { addToast } = useToastStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getMe } = useAuthstore();

  const handleGoogleClick = () => {
    const container = googleContainerRef.current;
    if (!container) return;

    const googleButton =
      container.querySelector<HTMLDivElement>('div[role="button"]');

    googleButton?.click();
  };

  return (
    <>
      {/* Hidden Google button */}
      <div
        ref={googleContainerRef}
        style={{ position: "absolute", left: "-9999px" }}
      >
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              setLoading(true);
              const idToken = credentialResponse.credential;
              if (!idToken)
                throw new Error("Google did not return an ID token.");
              await GoogleOauthService(idToken);
              await getMe();
              addToast({
                message: "Authentication successful",
                type: "success",
              });

              // Navigate to dashboard
              navigate("/dashboard", { replace: true });
            } catch (err) {
              console.error(err);
              addToast({
                message: "Google authentication failed",
                type: "error",
              });
            } finally {
              setLoading(false);
            }
          }}
          onError={() =>
            addToast({ message: "Google sign-in failed", type: "error" })
          }
        />
      </div>

      {/* Icon-only button */}
      <button
        type="button"
        disabled={loading}
        onClick={handleGoogleClick}
        className="border border-mute-gray p-3 rounded-full hover:bg-gray-100 cursor-pointer"
        aria-label="Sign in with Google"
      >
        {loading ? "Authenticating" : <FcGoogle size={22} />}
      </button>
    </>
  );
};
