// src/components/common/Modal.tsx
import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-2xl px-4">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
