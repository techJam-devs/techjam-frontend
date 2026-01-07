/**
 * @description Fullscreen Reset Password Modal Page
 */

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import FormWrapper from "../components/common/FormWrapper";
import Button from "../components/common/Button";
import { LockIcon, XIcon } from "lucide-react";
import { ResetPasswordService } from "../services/authServices";
import useToastStore from "../store/notificationStore";

const ResetPasswordPage = () => {
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  // Extract token and email from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    const emailParam = params.get("email");

    if (!tokenParam || !emailParam) {
      addToast({ message: "Invalid password reset link.", type: "error" });
      navigate("/"); // Go home if URL is invalid
      return;
    }

    setToken(tokenParam);
    setEmail(emailParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      addToast({ message: "Passwords do not match.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await ResetPasswordService({
        email,
        token,
        newPassword: formData.password,
      });
      addToast({
        message: "Password reset successful! Please log in.",
        type: "success",
      });

      // Navigate home and auto-open login modal
      navigate("/", { state: { openLogin: true } });
    } catch (err: unknown) {
      const error = err as Error;
      addToast({
        message: error.message || "Failed to reset password.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50 backdrop-blur-3xl p-4">
      <div className="relative w-full max-w-4xl mx-auto flex gap-6 p-6 sm:p-10 bg-white rounded-2xl shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Left Form Side */}
        <div className="flex-1 py-4">
          <FormWrapper
            title="Reset Password"
            subtitle="Enter a new password to recover your account"
          >
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <Input
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleDataInput}
                autoComplete="new-password"
              />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleDataInput}
                autoComplete="new-password"
              />
              <Button
                type="submit"
                text={loading ? "Resetting..." : "Reset Password"}
                disabled={loading}
                className="w-full"
              />
            </form>
          </FormWrapper>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Remember Password?{" "}
            <span
              className="text-blue cursor-pointer hover:underline"
              onClick={() => navigate("/", { state: { openLogin: true } })}
            >
              Sign In
            </span>
          </p>
        </div>

        {/* Right Illustration */}
        <div className="hidden md:flex flex-1 items-center justify-center p-6 bg-blue rounded-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <LockIcon className="w-20 h-20 text-gray-100" />
            <h2 className="text-white font-bold text-2xl">
              Reset Your Password
            </h2>
            <p className="text-gray-100 max-w-xs text-sm">
              Enter a new password to take control of your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
