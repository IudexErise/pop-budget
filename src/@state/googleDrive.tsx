import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GoogleDriveState {
  connected: boolean;
  loading: boolean;

  setConnected: (connected: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const googleDriveStore = create<GoogleDriveState>()(
  persist(
    (set) => ({
      connected: false,
      loading: true,

      setConnected: (connected) => set({ connected }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "google-drive",
      partialize: (state) => ({
        connected: state.connected,
      }),
    },
  ),
);
