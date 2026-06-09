import { httpClient } from "../httpClient";

export interface RefreshTokenParams {
  refreshToken: string;
}

interface RefreshTokenResponse { data: { accessToken: string } }

export async function refreshToken(params: RefreshTokenParams) {
  const { data: response } = await httpClient.post<RefreshTokenResponse>('/auth/refresh-token', params, { skipAuth: true });
  const { data } = response;
  return { ...data }
}
