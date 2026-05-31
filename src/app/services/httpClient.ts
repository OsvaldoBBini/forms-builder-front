import axios from 'axios'
import { useAuth } from "../hooks/useAuth";

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL
});

httpClient.interceptors.request.use((config) => {

  if (config.skipAuth) {
    return config;
  }

  const accessToken = useAuth.getState().accessToken;
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});
