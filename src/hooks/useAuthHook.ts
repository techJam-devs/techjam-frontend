/**
 * @description This is the hook for all auth operations
 */

import { LoginService, RegisterService } from "../services/authServices";
import { LoginSchema, RegisterSchema } from "../validation/authValidation.ts";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.types.ts";

const authHook = () => {
  /** ==== login ===== */
  const LoginHook = async (formData: LoginRequest): Promise<LoginResponse> => {
    // validate form data
    const { error: validationError } = LoginSchema.validate(formData);
    if (validationError) {
      const errorMessage = validationError.details[0].message;
      throw new Error(errorMessage);
    }
    const res = await LoginService(formData);
    return res;
  };

  /** ========== register ============ */
  const RegisterHook = async (
    formData: RegisterRequest,
  ): Promise<RegisterResponse> => {
    // validate input
    const { error: validationError } = RegisterSchema.validate(formData);
    if (validationError) {
      throw new Error(validationError.details[0].message);
    }

    const res = await RegisterService(formData);
    return res;
  };
  return { LoginHook, RegisterHook };
};

export default authHook;
