import type { IField } from "@/view/pages/builder/hooks/useFormBuilder";
import { httpClient } from "../httpClient";

interface FormsResponse { data: { fields: IField[] } }

export async function getFields(companyId: string, formId: string) {
  const { data: response } = await httpClient.get<FormsResponse>(`/companies/${companyId}/forms/${formId}/fields`, {skipAuth: false});
  const { data } = response;
  return data.fields ?? [];  
}
