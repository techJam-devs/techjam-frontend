/**
 * @description The verify email modal
 */

import { UserCheck } from "lucide-react";
import Button from "../common/Button";
import FormWrapper from "../common/FormWrapper";
import React, { useState, useRef } from "react";
import useToastStore from "../../store/notificationStore";
import {
  ResendOtpService,
  VerifyOtpService,
} from "../../services/verificationServices";
import useAuthStore from "../../store/authStore";

interface VerifyModalProps {
  onSwitch?: (portal: "proceed") => void;
}

const VerifyEmailModal: React.FC<VerifyModalProps> = ({ onSwitch }) => {
  const { getMe } = useAuthStore();
  const { addToast } = useToastStore();
  const email = localStorage.getItem("pendingEmail") as string; // get the user email from local storage
  const name = localStorage.getItem("name"); // Fetch the pending user name
  const [timeLeft, setTimeLeft] = useState(30); // countdown in seconds
  const [otp, setOtp] = useState<string[]>(Array(5).fill("")); // 5 boxes
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    setError(null);
    if (!/^[0-9]?$/.test(value)) return; // accept only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next box if value entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await ResendOtpService(email as string);
      if (res.success) {
        setTimeLeft(45);
        setResendSuccess(true);

        // Hide message automatically after 3 seconds
        setTimeout(() => {
          setResendSuccess(false);
        }, 3000);
      } else {
        console.error("Failed to resend OTP:", res.message);
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
    }
  };

  // count down timer
  React.useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // submit code to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is missing");
      return;
    }
    const otpValue = otp.join(""); // convert otp to string

    if (otpValue.length !== 5) {
      setError("Please enter the complete OTP");
      return;
    }
    setLoading(true);
    try {
      // backend verification
      const result = await VerifyOtpService(email, otpValue);

      if (!result.success) {
        setError(result.message);
        return;
      }

      // Refresh to update global auth store
      await getMe();
      addToast({
        message: result.message ?? "Account has been verified successfully",
        type: "success",
      });

      // if successful, remove all data from local storage and proceed to dashboard
      localStorage.removeItem("pendingVerification");
      localStorage.removeItem("pendingEmail");
      localStorage.removeItem("name");
      onSwitch?.("proceed"); // navigate to profile dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row-reverse gap-6 w-full max-w-4xl">
      {/** form side  */}
      <div className="relative flex-1 py-10">
        {/** form  */}
        <FormWrapper
          title="Enter Verification Code"
          subtitle={`Hi ${name ?? "user"}, we have sent you a verification code to ${email ?? "your email"}`}
        >
          <form onSubmit={handleSubmit} className="space-y-7 mt-16">
            {error && (
              <p className="text-xs text-red-500 bg-red-200 p-1 rounded-sm border-l-2">
                {error}
              </p>
            )}
            <div className="flex items-center justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-blue focus:outline-none"
                />
              ))}
            </div>

            {/** A proper countdown before allowing user send a resend button */}
            <p className="text-center text-sm text-gray-500 mt-3 mb-20">
              {timeLeft > 0 ? (
                <>
                  Resend code in{" "}
                  <span className="font-semibold text-red-500">
                    {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                    {String(timeLeft % 60).padStart(2, "0")}
                  </span>
                </>
              ) : (
                <>
                  Didn't get Code? {""}
                  <span
                    onClick={handleResendOtp}
                    className="text-red-400 cursor-pointer hover:underline font-medium"
                  >
                    Resend Code
                  </span>
                </>
              )}
            </p>
            {/* Inline success message */}
            {resendSuccess && (
              <p className="text-center text-green-500 text-sm mt-1">
                Verification code sent!
              </p>
            )}

            {/** submit  button */}
            <div className="w-full">
              <Button
                disabled={loading}
                type="submit"
                text={loading ? "verifying account... ⌛" : "Verify"}
                className="w-full"
              />
            </div>
          </form>
        </FormWrapper>
      </div>

      {/** Right illustration side */}
      <div className="relative hidden md:flex items-center flex-1 p-4 pt-8 bg-blue rounded-xl">
        {/** Logo */}
        <div className="absolute left-3 top-3">
          <img src="/logo-white.png" alt="logo" className="w-26 h-auto" />
        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-4 p-6  w-full">
          <div className="text-blue text-4xl mb-6">
            {" "}
            <UserCheck className="w-20 h-20 text-gray-100" />{" "}
          </div>
          <h2 className="font-bold text-lg md:text-2xl text-gray-100">
            WELCOME TO TECHJAM
          </h2>
          <p className="text-sm text-gray-100 max-w-sm">
            Input the digits sent to your email to get verified
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
