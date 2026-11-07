import { httpClient } from "../httpClient";

export interface IForm {
  companyId: string;
  formId: string;
  formName: string;
  createdAt: string;
} 

interface FormsResponse { data: { items: IForm[] } }

export async function getForms(companyId: string) {
  const { data: response } = await httpClient.get<FormsResponse>(`/companies/${companyId}/forms`, {skipAuth: false});
  const { data } = response;
  return data.items;
}
