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
// import authAxios from "../../utils/authAxios";
import { Code2, Lock, Twitter } from "lucide-react";

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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  /** Handle submit */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // save current modal state to local storage
    localStorage.setItem("pendingVerification", "true");
    localStorage.setItem("pendingEmail", formData.email);
    onSwitch?.("verifyEmail");
    // try {
    //   const res = await authAxios.post("/register", formData);
    //   console.log(res.data?.message);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="flex flex-row-reverse gap-6 w-full max-w-4xl">
      {/*  Form Section */}
      <div className="flex-1 py-10">
        <FormWrapper
          title="Get Started"
          subtitle="Get started with your journey by creating a new account."
        >
          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              autoComplete="email"
            />
            <Input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              autoComplete="new-password"
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              autoComplete="new-password"
            />

            {/* Agree to terms */}
            <div className="flex justify-between items-center mb-10">
              <label htmlFor="terms" className="hover:underline text-sm">
                <input type="checkbox" id="terms" /> I agree to the{" "}
                <span className="text-blue">Terms and Conditions</span>
              </label>
            </div>

            {/* Button */}
            <Button type="submit" text="Sign up" className="w-full" />
          </form>
        </FormWrapper>

        {/* Social Auth */}
        <div className="text-center space-y-5 mt-6">
          <p className="text-md">Or sign up with</p>
          <div className="flex justify-center items-center gap-8">
            <span className="border border-mute-gray p-3 rounded-full cursor-pointer">
              <FcGoogle />
            </span>
            <span className="border border-mute-gray p-3 rounded-full cursor-pointer">
              <FaApple />
            </span>
          </div>
        </div>

        {/* Switch to Sign In */}
        <div className="text-center text-gray-600 mt-5 text-base md:text-md">
          <p>
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
