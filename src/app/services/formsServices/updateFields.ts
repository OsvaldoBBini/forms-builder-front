import type { IField } from "@/view/pages/builder/hooks/useFormBuilder";
import { httpClient } from "../httpClient";

export interface IFields{
  formId: string;
  fields: IField[];
}

interface UpdateFieldsResponse { data: { formId: string } }

export async function updateFields(companyId: string, formData: IFields) {
  const { fields, formId } = formData;
  const { data: response } = await httpClient.put<UpdateFieldsResponse>(`/companies/${companyId}/forms/${formId}/fields`, { fields }, {skipAuth: false});
  const { data } = response
  return data.formId
}
