// import { httpClient } from "../httpClient";

export interface IForm {
  formId: string;
  formName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any[];
  createdAt: string;
  lastUpdate: string;
} 

// interface FormsResponse { data: { items: IForm[] } }

export async function createForms(companyId: string, formData: IForm) {
  console.log('createForms', companyId)
  // const { data: response } = await httpClient.post<FormsResponse>(`/companies/${companyId}/forms`, {skipAuth: false});
  const existingForms = localStorage.getItem(`forms-${companyId}`) ? JSON.parse(localStorage.getItem(`forms-${companyId}`) || '[]') : [];
  localStorage.setItem(`forms-${companyId}`, JSON.stringify([...existingForms, formData]));
  return formData;
}
