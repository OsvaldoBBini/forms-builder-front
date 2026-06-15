import { httpClient } from "../httpClient";

export interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
}

interface SignUpResponse { data: { user: { id: string } } }

export async function signUp(params: SignUpParams) {
  const { data: response } = await httpClient.post<SignUpResponse>('/auth/signup', params, { skipAuth: true });
  const { data } = response;
  const { user } = data;
  return { userId: user.id };
}
