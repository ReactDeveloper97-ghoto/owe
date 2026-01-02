import { create } from "zustand";
import { adminLogin, parentLogin } from "../api/auth.api";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  user: JSON.parse(localStorage.getItem("user")),

  loginAdmin: async (email, password) => {
    const { data } = await adminLogin(email, password);

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", "admin");
    localStorage.setItem("user", JSON.stringify(data.user));

    set({ token: data.token, role: "admin", user: data.user });
  },

  loginParent: async (email, password) => {
    const { data } = await parentLogin(email, password);

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", "parent");
    localStorage.setItem("user", JSON.stringify(data.user));

    set({ token: data.token, role: "parent", user: data.user });
  },

  logout: () => {
    localStorage.clear();
    set({ token: null, role: null, user: null });
  },
}));
