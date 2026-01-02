import client from "./client";

/* STUDENTS */
export const getAllStudents = async () => {
  const res = await client.get("/admin/students");
  return res.data;
};

export const getParents = async () => {
  const res = await client.get("/admin/parents");
  return res.data;
};
 
export const getSubjects = async () => {
  const res = await client.get("/admin/subjects");
  return res.data;
};

/* ATTENDANCE */
export const submitAttendance = async (records) => {
  // Remove { records } wrapper, send array directly
  return client.post("/admin/attendance", records);
};

/* FEES */
export const submitFees = async (payload) => {
  return client.post("/admin/fees", payload);
};

/* get student with FEES summary */
export const getStudentsWithFeeSummary = async () => {
  const res = await client.get("/admin/students/fees-summary");
  return res.data;
};

/* ASSIGNMENTS */
export const sendAssignment = async (payload) => {
  return client.post("/admin/assignments", payload);
};

/* remarks */
export const submitRemark = async (payload) => {
  return client.post("/admin/remarks", payload);
};

/* subject add */
export const createSubject = async (payload) => {
  return client.post('/admin/subjects', payload);
};

// remove assigned subject
export const removeStudentSubject = async (assignmentId) => {
  const res = await client.delete(`/admin/student-subjects/${assignmentId}`);
  return res.data;
};

/* student <--> subject map */
export const assignSubjectToStudent = async (payload) => {
  return client.post('/admin/student-subjects', payload);
};

/* add new parent */
export const createParent = async (payload) => {
  return client.post('/admin/parents', payload);
};

/* add new student */
export const createStudent = async (payload) => {
  return client.post('/admin/students', payload);
};