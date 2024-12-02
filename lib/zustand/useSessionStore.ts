import { create } from 'zustand'
import { IUseSessionStore } from './types';

export const useAuthStore = create<IUseSessionStore>((set) => ({
  athleteLoggedInfo: null,
  setAtleteLoggedInfo: (athlete) => set({ athleteLoggedInfo: athlete }),
  clearAtleteLoggedInfo: () => set({ athleteLoggedInfo: null }),
}));