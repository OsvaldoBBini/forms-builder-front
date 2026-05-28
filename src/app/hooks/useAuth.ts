import { create } from "zustand"
import { persist } from 'zustand/middleware';


interface IAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  signIn: (accessToken: string, refreshToken: string) => void;
}

export const useAuth = create<IAuthState>()(
  persist(
    (set) => ({ 

      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      signIn: (accessToken: string, refreshToken: string) => set({ accessToken, refreshToken, isAuthenticated: true }) 

     }),
    {
      name: "auth-storage"
    }
  ),
)
