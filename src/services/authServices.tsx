/**
 * @Description This is the Services for all auth operations
 *              - login, verification, registration, forget password and reset password
 */

import authAxios from "../utils/authAxios";
import handleAxiosError from "../utils/handleAxiosError";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResendOtpResponse,
} from "../types/auth.types.ts";

// login
export const LoginService = async (
  formData: LoginRequest
): Promise<LoginResponse> => {
   console.log("Calling:", authAxios.defaults.baseURL + "/login");
  try {
    const response = await authAxios.post<LoginResponse>("/login", formData);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// register
export const RegisterService = async (
  formData: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await authAxios.post("/register", formData);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// resend OTP
export const ResendOtpService = async (
  email: string
): Promise<ResendOtpResponse> => {
  try {
    const response = await authAxios.post("/resend-otp", { email });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};