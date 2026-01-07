/**
 * @description This creates a DOM PORTAL for auth models
 */

import { AnimatePresence, motion as Motion } from "framer-motion";
import ReactDOM from "react-dom";
import SignUpModal from "./signUpModal";
import SignInModal from "./signInModal";
import ForgetPasswordModal from "./forgetPasswordModal";
import VerifyEmailModal from "./verifyEmailModal";
import { useEffect } from "react";
import ProceedModal from "./proceedModal";

type AuthPortal =
  | "signIn"
  | "signUp"
  | "verifyEmail"
  | "forgetPassword"
  | "proceed";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch?: (portal: AuthPortal) => void;
  switchPortal?: AuthPortal | null;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSwitch,
  switchPortal = "signIn",
}) => {
  // first conditionally check if there is a verification process going on from local storage, displays the verify email portal first
  useEffect(() => {
    if (isOpen) {
      const pending = localStorage.getItem("pendingVerification");
      const email = localStorage.getItem("pendingEmail");

      if (pending === "true" && email && onSwitch) {
        onSwitch("verifyEmail");
      }
    }
  }, [isOpen, onSwitch]);

  // centralized overflow control

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  // ✅ Only create the portal when open
  return isOpen
    ? ReactDOM.createPortal(
        <AnimatePresence>
          <Motion.div
            className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-2xl px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Motion.div
              className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>

              {switchPortal === "signUp" && <SignUpModal onSwitch={onSwitch} />}
              {switchPortal === "signIn" && <SignInModal onSwitch={onSwitch} />}
              {switchPortal === "forgetPassword" && (
                <ForgetPasswordModal onSwitch={onSwitch} />
              )}
              {switchPortal === "verifyEmail" && (
                <VerifyEmailModal onSwitch={onSwitch} />
              )}
              {switchPortal === "proceed" && <ProceedModal />}
            </Motion.div>
          </Motion.div>
        </AnimatePresence>,
        modalRoot,
      )
    : null;
};

export default Modal;
