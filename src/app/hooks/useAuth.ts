import { create } from "zustand"
import { persist } from 'zustand/middleware';

interface IAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  signIn: (accessToken: string, refreshToken: string) => void;
  updateAccessToken: (accessToken: string) => void;
  signOut: () => void;
}

export const useAuth = create<IAuthState>()(
  persist(
    (set) => ({ 

      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      signIn: (accessToken: string, refreshToken: string) => set(
        { 
          accessToken, 
          refreshToken,
          isAuthenticated: true
        }
      ),

      updateAccessToken: (accessToken: string) => set({ accessToken }),
      
      signOut: () => {
        // localStorage.removeItem("auth-storage");
        set({ 
          accessToken: null, 
          refreshToken: null, 
          isAuthenticated: false 
        })
      }

     }),
    {
      name: "auth-storage",
      
      partialize: (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken }),

      onRehydrateStorage: () => {
        return (state) => {
          if (!state) return;
          
          const raw = localStorage.getItem("auth-storage");
          if (!raw) return;

          const authStorage = JSON.parse(raw);
          const { accessToken } = authStorage.state || {};

          if (accessToken) state.isAuthenticated = true;
        };
      },
    }
  ),
)
