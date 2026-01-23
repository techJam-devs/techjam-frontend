/**
 * @description This is a zustand for all auth pages
 *
 */

import { create } from "zustand";
import { LoginSchema, RegisterSchema } from "../validation/authValidation.ts";
import {
  LoginService,
  RegisterService,
  GetMeService,
  LogoutService,
} from "../services/authServices";
import type {
  LoginRequest,
  RegisterRequest,
  MeResponse,
  AuthUser,
  LogoutResponse,
} from "../types/auth.types";

interface AuthState {
  user: AuthUser | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  getMe: () => Promise<void>;
  logout: () => Promise<LogoutResponse>;
  setUser: (user: AuthUser | null) => void;
  clearUser: () => void;
}

const useAuthstore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  // register
  register: async (formData) => {
    try {
      // Validate input
      const { error: validationError } = RegisterSchema.validate(formData);
      if (validationError) throw new Error(validationError.details[0].message);

      const { name, email, password } = formData;
      const payload = { name, email, password };

      // Fetch api service
      await RegisterService(payload);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new Error(message);
    }
  },

  // login
  login: async (formData) => {
    try {
      // Validate form data
      const { error: validationError } = LoginSchema.validate(formData);
      if (validationError) throw new Error(validationError.details[0].message);

      // Api service
      const res = await LoginService(formData);
      set({ user: res.data.user as AuthUser });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new Error(message);
    }
  },

  // Get Me
  getMe: async () => {
    try {
      const res: MeResponse = await GetMeService();
      set({ user: res.data.user });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch user.";
      throw new Error(message);
    }
  },

  // Log out
  logout: async (): Promise<LogoutResponse> => {
    const response = await LogoutService();
    set({ user: null });
    return response;
  },
}));

export default useAuthstore;
