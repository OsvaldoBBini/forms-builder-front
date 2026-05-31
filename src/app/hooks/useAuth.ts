import { create } from "zustand"
import { persist } from 'zustand/middleware';
import { jwtDecode } from "jwt-decode";

interface IAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  signIn: (accessToken: string, refreshToken: string) => void;
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    const isTokenValid = decoded.exp > currentTime 
    return isTokenValid;
  } catch {
    return false;
  }
};

export const useAuth = create<IAuthState>()(
  persist(
    (set) => ({ 

      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      signIn: (accessToken: string, refreshToken: string) => set(
        { 
          accessToken, 
          refreshToken
        }
      ) 

     }),
    {
      name: "auth-storage",
      
      partialize: (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken }),

      onRehydrateStorage: () => {
        return (state) => {
          if (!state) return;

          const authStorage = JSON.parse(localStorage.getItem("auth-storage") || "");
          if (authStorage === "") return;

          const { accessToken } = authStorage.state;
          if (accessToken && isTokenValid(accessToken)) state.isAuthenticated = true;
        };
      },
    }
  ),
)
