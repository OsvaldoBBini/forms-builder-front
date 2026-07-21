import { create } from "zustand"
import { persist } from 'zustand/middleware';

interface IAuthState {
  userId: string | null;
  userEmail: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  storeUserId: (userId: string) => void;
  storeUserEmail: (userEmail: string) => void;
  signIn: (accessToken: string, refreshToken: string) => void;
  updateAccessToken: (accessToken: string) => void;
  signOut: () => void;
}

export const useAuth = create<IAuthState>()(
  persist(
    (set) => ({ 

      userId: null,
      userEmail: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      storeUserId: (userId: string) => set({ userId }),
      storeUserEmail: (userEmail: string) => set({ userEmail }),

      signIn: (accessToken: string, refreshToken: string) => set(
        { 
          accessToken, 
          refreshToken,
          isAuthenticated: true
        }
      ),

      updateAccessToken: (accessToken: string) => set({ accessToken }),
      
      signOut: () => {
        set({
          userEmail: null, 
          accessToken: null, 
          refreshToken: null, 
          isAuthenticated: false,
          userId: null
        })
      }

     }),
    {
      name: "auth-storage",
      
      partialize: (state) => ({ 
        accessToken: state.accessToken, 
        refreshToken: state.refreshToken, 
        userEmail: state.userEmail,
        userId: state.userId
      }),

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
