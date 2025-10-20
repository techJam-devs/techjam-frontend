/**
 * @description This is a zustand for all auth pages
 *
 */

import { create } from "zustand";
import type { LoginRequest, RegisterRequest } from "../types/auth.types";
import authHook from "../hooks/useAuthHook";

interface AuthState {
  user: unknown;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  //   logout: () => void;
}

const useAuthstore = create<AuthState>((set) => ({
  user: null,
  error: null,

  // login
  login: async (formData) => {
    const { LoginHook } = authHook();
    try {
      const res = await LoginHook(formData);
      set({ user: res.data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
    }
  },

  // register
  register: async (formData) => {
    const { RegisterHook } = authHook();
    try {
      const res = await RegisterHook(formData);
      set({ user: res.data });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
    }
  },
}));

export default useAuthstore;
