/**
 * @description Page to confirm subscription with token
 */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmNewsletterSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const [message, setMessage] = useState("Confirming your subscription...");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid confirmation link.");
      return;
    }

    const confirmSubscription = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/newsletter/confirm?token=${token}`,
        );
        if (!res.ok) throw new Error("Failed to confirm subscription");

        // your backend might redirect, but if it returns JSON:
        const data = await res.json();
        setStatus("success");
        setMessage(data.message || "Subscription confirmed successfully!");
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage(
          "Failed to confirm subscription. The link may have expired or is invalid.",
        );
      }
    };

    confirmSubscription();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-md text-center">
        {status === "loading" && <p>{message}</p>}
        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              ✅ Subscription Confirmed
            </h2>
            <p>{message}</p>
          </>
        )}
        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-600">❌ Error</h2>
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmNewsletterSuccess;
