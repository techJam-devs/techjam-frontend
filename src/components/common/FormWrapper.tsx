/**
 * @description Wrapper for authentication forms (Sign In, Sign Up, etc.)
 */

import type React from "react";

interface FormProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const FormWrapper: React.FC<FormProps> = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-bold text-lg text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-mute-gray text-sm mt-1 px-4">
            {subtitle}
          </p>
        )}
      </div>

      {/* Form Content */}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default FormWrapper;
