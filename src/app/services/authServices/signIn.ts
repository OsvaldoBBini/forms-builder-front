import { httpClient } from "../httpClient";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse { data: { accessToken: string, refreshToken: string } }

export async function signIn(params: SigninParams) {
  const { data: response } = await httpClient.post<SigninResponse>('/auth/signin', params);
  const { data } = response;
  return { ...data }
}
