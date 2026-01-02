import { create } from 'zustand';
import { getParentDashboard } from '../api/parent.api';

export const useSessionStore = create((set) => ({
  profile: null,
  loading: false,

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const res = await getParentDashboard();
      set({ profile: res.data });
    } catch (error) {
      console.error('Failed to fetch parent profile', error);
      set({ profile: null });
    } finally {
      set({ loading: false });
    }
  },

  clearSession: () => set({ profile: null }),
}));
