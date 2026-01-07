/**
 * @description This is the sign in modal
 */

import React, { useState } from "react";
import FormWrapper from "../common/FormWrapper";
import Input from "../common/Input";
import Button from "../common/Button";
import Carousel from "../common/Carousel";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Code2, Globe, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import useToastStore from "../../store/notificationStore";

type AuthPortal = "signIn" | "signUp" | "verifyEmail" | "forgetPassword";

interface SignInModalProps {
  onSwitch?: (portal: AuthPortal) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onSwitch }) => {
  // slides
  const loginSlides = [
    {
      icon: <Code2 className="w-20 h-20 text-gray-100" />,
      title: "Welcome Back",
      subtitle:
        "Continue your journey with us and discover more real life projects ",
    },
    {
      icon: <Globe className="w-20 h-20 text-gray-100" />,
      title: "Go Global",
      subtitle: "Reach audiences all over the world effortlessly.",
    },
    {
      icon: <Twitter className="w-20 h-20 text-gray-100" />,
      title: "Community",
      subtitle: "Join thousands of developers sharing knowledge and resources.",
    },
  ];
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const payload = { email, password };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /** Handle submit */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(payload);
      addToast({ message: "Authentication successful!", type: "success" });
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed.";

      // No login error but Detect if the error message contains verify keyword
      if (/verify/i.test(message)) {
        localStorage.setItem("pendingEmail", formData.email);
        localStorage.setItem("pendingVerification", "true");
        onSwitch?.("verifyEmail");
        addToast({
          message:
            "Your account is not verified. Please enter the OTP sent to your email",
          type: "info",
        });
        return;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6 w-full max-w-4xl">
      {/** form side  */}
      <div className="relative flex-1 py-10">
        {/** form  */}
        <FormWrapper
          title="Sign in to your account"
          subtitle="Login an existing account with your correct details"
        >
          <form onSubmit={handleSubmit} className="space-y-7 mt-8">
            {error && (
              <p className="text-xs text-red-500 bg-red-100 p-2 border-l rounded-sm text-start">
                {error}
              </p>
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInput}
              autoComplete="email"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInput}
              autoComplete="current-password"
            />
            {/** Remember me + forgot password */}
            <div className="mb-6 flex justify-end">
              <p
                onClick={() => onSwitch?.("forgetPassword")}
                className="text-xs text-blue cursor-pointer hover:underline"
              >
                Forgot password?
              </p>
            </div>

            {/** button */}
            <div className="w-full">
              <Button
                type="submit"
                text={loading ? "Authenticating...⌛" : "Sign In"}
                disabled={loading}
                className="w-full"
              />
            </div>
          </form>
        </FormWrapper>

        {/** signin with google + apple */}
        <div className="mt-6 text-center space-y-5">
          <p className="text-sm"> Or sign In with </p>
          <div className="flex justify-center items-center gap-8">
            <span className="border border-mute-gray p-3 rounded-full cursor-pointer">
              {" "}
              <FcGoogle size={20} />{" "}
            </span>
            <span className="border border-mute-gray p-3 rounded-full cursor-pointer">
              <FaApple />
            </span>
          </div>
        </div>

        {/* Switch to Sign Up */}
        <div className="text-center text-gray-600 mt-5 text-base md:text-md">
          <p>
            Don't have an account?{" "}
            <span
              className="text-blue cursor-pointer hover:underline"
              onClick={() => onSwitch?.("signUp")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/** Right illustration side */}
      <div className="relative hidden md:flex items-center flex-1 p-4 pt-8 bg-blue rounded-xl">
        {/** Logo */}
        <div className="absolute left-3 top-3">
          <img src="/logo-white.png" alt="logo" className="w-26 h-auto" />
        </div>
        {/** carousel */}
        <Carousel slides={loginSlides} />
      </div>
    </div>
  );
};

export default SignInModal;
