import type React from "react";
import { useState } from "react";
import Input from "../common/Input";
import FormWrapper from "../common/FormWrapper";
import Button from "../common/Button";
import { LockIcon } from "lucide-react";

interface ForgetPasswordProps {
  onSwitch?: (portal: "signUp" | "signIn" | "forgetPassword") => void;
}

const ForgetPasswordModal: React.FC<ForgetPasswordProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex gap-6 w-full max-w-4xl">
      {/** form side  */}
      <div className="relative flex-1 py-10">
        {/** form  */}
        <FormWrapper
          title="Account Recovery"
          subtitle="Enter your valid email address to recover your account"
        >
          <form onSubmit={handleSubmit} className="space-y-7 mt-8">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            {/** button */}
            <div className="w-full">
              <Button
                type="submit"
                text="Account Recovery"
                className="w-full"
              />
            </div>
          </form>
        </FormWrapper>

        {/* Switch to Sign Up */}
        <div className="text-center text-gray-600 mt-20 text-base md:text-md">
          <p>
            Remember Password?{" "}
            <span
              className="text-blue cursor-pointer hover:underline"
              onClick={() => onSwitch?.("signIn")}
            >
              Sign In
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

        <div className="flex flex-col items-center justify-center text-center space-y-4 p-6  w-full">
          <div className="text-blue text-4xl">
            {" "}
            <LockIcon className="w-20 h-20 text-gray-100" />{" "}
          </div>
          <h2 className="font-bold text-lg md:text-2xl text-gray-100">
            Account Recovery
          </h2>
          <p className="text-sm text-gray-100 max-w-sm">
            Enter your email address to help us recover your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
