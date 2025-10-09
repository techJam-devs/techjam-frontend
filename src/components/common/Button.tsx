/**
 * @returns A reuseable button
 */

import type React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost";
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
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
}) => {
  const variants = {
    primary: "bg-blue text-white hover:bg-blue-700",
    ghost: "border border-blue text-blue hover:bg-blue hover:text-white",
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium shadow-md transition-all duration-300";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}  ${className || ""}`}
    >
      {icon && <span className="text-sm">{icon}</span>} {text}
    </button>
  );
};

export default Button;
