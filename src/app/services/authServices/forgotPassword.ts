import { httpClient } from "../httpClient";

export interface ForgotPasswordParams {
  email: string;
}

interface ForgotPasswordsResponse { data: { user: { email: string } } }

export async function forgotPassword(params: ForgotPasswordParams) {
  const { data: response } = await httpClient.post<ForgotPasswordsResponse>(
    '/auth/password/forgot', 
    params, 
    { skipAuth: true }
  );
  const { data } = response;
  return { ...data }
}
