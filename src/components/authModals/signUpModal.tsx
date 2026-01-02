/**
 * @description This is the sign up modal
 */

import React, { useState } from "react";
import FormWrapper from "../common/FormWrapper";
import Input from "../common/Input";
import Button from "../common/Button";
import Carousel from "../common/Carousel";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Code2, Lock, Twitter } from "lucide-react";
import useAuthstore from "../../store/authStore";
interface SignUpModalProps {
  onSwitch?: (portal: "signIn" | "signUp" | "verifyEmail") => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onSwitch }) => {
  const signUpSlides = [
    {
      icon: <Code2 className="w-20 h-20 text-gray-100" />,
      title: "Get Started.",
      subtitle: "Begin your journey with us and explore exciting projects.",
    },
    {
      icon: <Lock className="w-20 h-20 text-gray-100" />,
      title: "Security",
      subtitle: "Your data is protected with top-tier security measures.",
    },
    {
      icon: <Twitter className="w-20 h-20 text-gray-100" />,
      title: "Join Our Community",
      subtitle: "Connect with like-minded developers and creators.",
    },
  ];

  const { register, error, clearError } = useAuthstore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // Handle data input
  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      // After successful registration, proceed to verification
      localStorage.setItem("pendingVerification", "true");
      localStorage.setItem("pendingEmail", formData.email);
      onSwitch?.("verifyEmail");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row-reverse gap-6 w-full max-w-4xl">
      {/*  Form Section */}
      <div className="flex-1 py-10">
        <FormWrapper
          title="Get Started"
          subtitle="Get started with your journey by creating a new account."
        >
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <p className="text-xs text-red-500 bg-red-100 p-2 border-l rounded-sm text-start">
                {error}
              </p>
            )}
            <Input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleDataInput}
              autoComplete="name"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e): void =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              autoComplete="email"
            />
            <Input
              type="password"
              name="password"
              placeholder="Create Password"
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

            {/* Agree to terms */}
            <div className="flex items-center gap-2 mb-10">
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleDataInput}
              />

              <label htmlFor="acceptTerms" className="text-xs cursor-pointer">
                I agree to the{" "}
                <span className="text-blue">Terms and Conditions</span>
              </label>
            </div>

            {/* Button */}
            <Button
              disabled={loading}
              type="submit"
              text={loading ? "Signing up... ⌛" : "Sign up"}
              className="w-full"
            />
          </form>
        </FormWrapper>

        {/* Social Auth */}
        <div className="text-center space-y-5 mt-6">
          <p className="text-sm">Or sign up with</p>
          <div className="flex justify-center items-center gap-8">
            <span className="border border-mute-gray p-3 rounded-full cursor-pointer">
              <FcGoogle size={20} />
            </span>
            <span className="border border-mute-gray p-3 rounded-full cursor-pointer">
              <FaApple size={20} />
            </span>
          </div>
        </div>

        {/* Switch to Sign In */}
        <div className="text-center text-gray-600 mt-5 text-base md:text-md">
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-blue cursor-pointer hover:underline"
              onClick={() => onSwitch?.("signIn")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* ✅ Carousel Section */}
      <div className="hidden md:flex flex-1 p-4 pt-8 bg-blue rounded-xl relative items-center">
        <div className="absolute left-3 top-3">
          <img src="/logo-white.png" alt="logo" className="w-26 h-auto" />
        </div>
        <Carousel slides={signUpSlides} />
      </div>
    </div>
  );
};

export default SignUpModal;
