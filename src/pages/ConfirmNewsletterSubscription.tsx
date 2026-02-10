import { useEffect, useState, useRef } from "react";
import { confirmNewsletterSubscriptionService } from "../services/newsletterService";
import useToastStore from "../store/notificationStore";
import { AxiosError } from "axios";

const ConfirmNewsletterSubscription = () => {
  const { addToast } = useToastStore();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const didConfirm = useRef(false);

  // Type guard for AxiosError
  const isAxiosError = (err: unknown): err is AxiosError<{ message: string }> =>
    typeof err === "object" &&
    err !== null &&
    "isAxiosError" in err &&
    (err as AxiosError).isAxiosError;

  useEffect(() => {
    if (didConfirm.current) return;
    didConfirm.current = true;

    const confirmSubscription = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");

      if (!token) {
        setMessage("Invalid confirmation link");
        addToast({ message: "Invalid confirmation link", type: "error" });
        setLoading(false);
        return;
      }

      try {
        const res = await confirmNewsletterSubscriptionService(token);
        setMessage(res.message);
        addToast({ message: res.message, type: "success" });
      } catch (err: unknown) {
        console.error(err);

        let errorMessage = "Failed to confirm subscription";

        if (isAxiosError(err) && err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }

        setMessage(errorMessage);
        addToast({ message: errorMessage, type: "error" });
      } finally {
        setLoading(false);
      }
    };

    confirmSubscription();
  }, [addToast]);

  if (loading) return <p>Confirming subscription...</p>;

  return <div className="p-8">{message}</div>;
};

export default ConfirmNewsletterSubscription;
