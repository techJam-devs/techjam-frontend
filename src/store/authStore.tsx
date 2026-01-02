/**
 * @description This is a zustand for all auth pages
 *
 */

import { create } from "zustand";
import { LoginSchema, RegisterSchema } from "../validation/authValidation.ts";
import { LoginService, RegisterService } from "../services/authServices";
import type { LoginRequest, RegisterRequest } from "../types/auth.types";

interface AuthState {
  user: unknown;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  clearError: () => void;
  //   logout: () => void;
}

const useAuthstore = create<AuthState>((set) => ({
  user: null,
  error: null,

  // clear global error
  clearError: () => set({ error: null }),

  // register
  register: async (formData) => {
    try {
      // Validate input
      const { error: validationError } = RegisterSchema.validate(formData);
      if (validationError) throw new Error(validationError.details[0].message);

      const { name, email, password } = formData;
      const payload = { name, email, password };

      // Fetch api service
      const res = await RegisterService(payload);

      set({ user: res, error: null });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      set({ error: message });
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
      set({ user: res, error: null });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      set({ error: message });
      throw new Error(message);
    }
  },
}));

export default useAuthstore;
