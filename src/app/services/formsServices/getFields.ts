// import { httpClient } from "../httpClient";

// interface FormsResponse { data: { items: IForm[] } }

export async function getFields(companyId: string, formId: string) {
  // const { data: response } = await httpClient.get<FormsResponse>(`/companies/${companyId}/forms`, {skipAuth: false});

  const fields = await localStorage.getItem(`${companyId}/fields/${formId}`)
  if (fields) {
    const parsedFields = JSON.parse(fields)
    return parsedFields
  }
  return [];
}
