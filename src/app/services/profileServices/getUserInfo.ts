import { httpClient } from "../httpClient";

interface UserInfoResponse { data: { email: string, fullName: string, userId: string } }

export async function getUserInfo() {
  const { data: response } = await httpClient.get<UserInfoResponse>('/profile/me');
  const { data } = response;
  return { ...data }
}
