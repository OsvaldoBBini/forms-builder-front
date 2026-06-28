import { httpClient } from "../httpClient";

export interface ResetPasswordParams {
  email: string;
  confirmationCode: string;
  newPassword: string
}

interface ResetPasswordsResponse { data: { user: { email: string } } }

export async function resetPassword(params: ResetPasswordParams) {
  const { data: response } = await httpClient.post<ResetPasswordsResponse>(
    '/auth/password/reset', 
    params, 
    { skipAuth: true }
  );
  const { data } = response;
  return { ...data }
}
