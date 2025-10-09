import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const SignInModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRoot = document.getElementById("signIn-modal");

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {/* Modal content */}
        signIn
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default SignInModal;
