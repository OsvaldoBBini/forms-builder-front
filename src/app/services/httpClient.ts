import axios from 'axios'
import { useAuth } from "../hooks/useAuth";
import { authService } from "./authServices";

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


let isRefreshing = false;
let failedRequestsQueue: ((token: string) => void)[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logOut = (error: any) => {
  const { signOut } = useAuth.getState();
  signOut();
  return Promise.reject(error)
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    
    const originalRequest = error.config;
    const responseStatus = error.response?.status;
    const { refreshToken, updateAccessToken } = useAuth.getState();

    if (originalRequest.url?.includes("/refresh")) logOut(error);

    if (responseStatus === 401 && originalRequest) {

      if (!refreshToken) logOut(error);

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequestsQueue.push(
            (newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(httpClient(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { accessToken } = await authService.refreshToken({ refreshToken: refreshToken! });
        updateAccessToken(accessToken);

        failedRequestsQueue.forEach((retryRequest) => retryRequest(accessToken));
        failedRequestsQueue = [];

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return httpClient(originalRequest);

      } catch (refreshError) {
        failedRequestsQueue.forEach((retryRequest) => retryRequest(''));
        failedRequestsQueue = [];
        logOut(refreshError);
      
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
