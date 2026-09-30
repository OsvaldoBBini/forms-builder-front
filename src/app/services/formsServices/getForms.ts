// import { httpClient } from "../httpClient";

export interface IForm {
  formId: string;
  formName: string;
  fieldsAddress: string;
  createdAt: string;
} 

// interface FormsResponse { data: { items: IForm[] } }

export async function getForms(companyId: string) {
  console.log('getForms', companyId)
  // const { data: response } = await httpClient.get<FormsResponse>(`/companies/${companyId}/forms`, {skipAuth: false});

  const forms = await localStorage.getItem(`forms-${companyId}`)
  if (forms) {
    const parsedForms = JSON.parse(forms)
    return parsedForms.map((item: IForm) => ({...item, fieldsAddress: `${companyId}/fields/${item.formId}`}))
  }
  return [];
}
