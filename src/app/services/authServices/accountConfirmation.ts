import { httpClient } from "../httpClient";

export interface AccountConfirmationParams {
  email: string;
  confirmationCode: string;
}

interface AccountConfirmationResponse { data: { user: { email: string } } }

export async function accountConfirmation(params: AccountConfirmationParams) {
  const { data: response } = await httpClient.post<AccountConfirmationResponse>('/auth/account-confirmation', params, { skipAuth: true });
  const { data } = response;
  return { ...data }
}
