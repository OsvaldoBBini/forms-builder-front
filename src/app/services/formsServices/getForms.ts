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

export async function getForms(companyId: string) {
  console.log('getForms', companyId)
  // const { data: response } = await httpClient.get<FormsResponse>(`/companies/${companyId}/forms`, {skipAuth: false});

  const forms = await localStorage.getItem(`forms-${companyId}`)
  if (forms) {
    return JSON.parse(forms)
  }
  return [];
}
