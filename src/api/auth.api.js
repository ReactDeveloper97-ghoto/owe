import api from "./client";

/* ================= ADMIN LOGIN ================= */
export const adminLogin = (email, password) => {
  return api.post("/auth/admin/login", { email, password });
};

/* ================= PARENT LOGIN ================= */
export const parentLogin = (email, password) => {
  return api.post("/auth/parent/login", { email, password });
};
