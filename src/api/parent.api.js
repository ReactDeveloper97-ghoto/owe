import api from "./client";

export const getParentDashboard = () =>
  api.get("/parent/dashboard");

export const getParentAttendance = () =>
  api.get("/parent/attendance");

export const getParentFees = () =>
  api.get("/parent/fees");

export const getParentAssignments = () =>
  api.get("/parent/assignments");

export const getParentRemarks = () =>
  api.get("/parent/remarks");
