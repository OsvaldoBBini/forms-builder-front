import { httpClient } from "../httpClient";

export interface IFormUpdateNameInput {
  formId: string;
  formName: string;
}

interface UpdateFormNameResponse {
  data: { formId: string };
}

export async function updateFormName(
  companyId: string,
  formData: IFormUpdateNameInput
) {
  const { formId, formName } = formData;

  const { data: response } = await httpClient.put<UpdateFormNameResponse>(
    `/companies/${companyId}/forms/${formId}`,
    { formName: formName.trim() },
    { skipAuth: false }
  );
  return response.data.formId;
}
