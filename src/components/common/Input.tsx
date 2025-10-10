/**
 * @description Reusable Input Component with password visibility toggle
 */

import { useState } from "react";
import type React from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  type?: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  label?: string;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text",
  value,
  onChange,
  className = "",
  name,
  label,
  autoComplete = "off",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="w-full bg-gray-100 p-3 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
        />

        {/* Eye Icon (visible only for password type) */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
