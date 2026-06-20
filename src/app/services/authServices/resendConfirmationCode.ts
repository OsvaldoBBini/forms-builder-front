import { httpClient } from "../httpClient";

export interface ResendConfirmationCodeParams {
  email: string;
}

interface ResendConfirmationCodeResponse { data: { message: string  } }

export async function resendConfirmationCode(params: ResendConfirmationCodeParams) {
  const { data: response } = await httpClient.post<ResendConfirmationCodeResponse>('/auth/resend-confirmation-code', params, { skipAuth: true });
  const { data } = response;
  return { ...data }
}
