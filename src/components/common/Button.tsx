/**
 * @returns A reuseable button
 */

import type React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost" | "secondary";
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const sizes = {
  sm: "px-6 py-2 text-sm",
  md: "px-8 py-3 text-base",
  lg: "px-10 py-4 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  className,
  variant = "primary",
  icon,
  size = "md",
  disabled = false,
}) => {
  const variants = {
    primary: "bg-blue ring-1 ring-blue text-white hover:bg-blue-700",
    ghost: "ring-1 ring-blue text-blue hover:bg-blue hover:text-white",
    secondary: "text-blue ring- ring-blue/50 hover:bg-blue hover:text-white transition-colors duration-200",
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium shadow-md transition-all duration-300";

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? disabledStyles : ""} ${className || ""}`}
    >
      {icon && <span className="text-sm">{icon}</span>} {text}
    </button>
  );
};

export default Button;
