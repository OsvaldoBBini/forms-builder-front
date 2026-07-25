import { httpClient } from "../httpClient";

export interface IUserData {
  email: string;
  fullName: string;
  userId: string;
}

interface UserInfoResponse { data: IUserData }

export async function getUserInfo() {
  const { data: response } = await httpClient.get<UserInfoResponse>('/profile/me');
  const { data } = response;
  return { ...data }
}
