import React, { useState } from "react";
import FormWrapper from "../common/FormWrapper";
import Input from "../common/Input";
import Button from "../common/Button";
import Carousel from "../common/Carousel";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Code2, Globe, Twitter } from "lucide-react";
import Modal from "../common/AuthModal";

import authAxios from "../../utils/authAxios";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void; // switch modal
}

const SignInModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignUp,
}) => {
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /** Handle submit */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await authAxios.post("/login", formData);
    console.log(res.data?.message);
    console.log(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-6 w-full max-w-4xl">
        {/** form side  */}
        <div className="relative flex-1 py-10">
          {/** form  */}
          <FormWrapper
            title="Sign in to your account"
            subtitle="Login an existing account with your correct details"
          >
            <form onSubmit={handleSubmit} className="space-y-7 mt-8">
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
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                autoComplete="current-password"
              />
              {/** Remember me + forget password */}
              <div className="flex justify-between items-center mb-10">
                <label htmlFor="remember me">
                  {" "}
                  <input type="checkbox" name="remember me" /> Remember me
                </label>
                <p className="text-md text-blue leading-light cursor-pointer hover:underline">
                  {" "}
                  Forget password?
                </p>
              </div>

              {/** button */}
              <div className="w-full">
                <Button type="submit" text="Sign In" className="w-full" />
              </div>
            </form>
          </FormWrapper>

          {/** signin with google + apple */}
          <div className="mt-6 text-center space-y-5">
            <p className="text-md"> Or sign In with </p>
            <div className="flex justify-center items-center gap-8">
              <span className="border border-mute-gray p-3 rounded-full cursor-pointer">
                {" "}
                <FcGoogle />{" "}
              </span>
              <span className="border border-mute-gray p-3 rounded-full cursor-pointer">
                <FaApple />
              </span>
            </div>
          </div>

          {/* Switch to Sign Up */}
          <div className="text-center text-gray-600 mt-5 text-base md:text-md">
            <p>
              Already have an account?{" "}
              <span
                className="text-blue cursor-pointer hover:underline"
                onClick={onSwitchToSignUp}
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
    </Modal>
  );
};

export default SignInModal;
