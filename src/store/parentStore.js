// src/store/parentStore.js (Simple Version)
import { create } from 'zustand';

export const useParentStore = create((set, get) => ({
  selectedStudentId: null,
  students: [],
  
  setStudents: (students) => set({ 
    students,
    selectedStudentId: students.length > 0 ? students[0].id : null
  }),
  
  setSelectedStudent: (studentId) => set({ selectedStudentId: studentId }),
  
  getSelectedStudent: () => {
    const { selectedStudentId, students } = get();
    return students.find(s => s.id === selectedStudentId) || students[0];
  },
  
  clearParentData: () => set({ selectedStudentId: null, students: [] }),
}));