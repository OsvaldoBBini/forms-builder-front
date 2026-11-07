import type { IField } from "@/view/pages/builder/hooks/useFormBuilder";
import { httpClient } from "../httpClient";

export interface IForm {
  formName: string;
  fields: IField[];
}

interface IFormResponse {
  companyId: string;
  formId: string;
  formName: string;
}

interface FormsResponse { data: { form: IFormResponse } }

export async function createForms(companyId: string, formData: IForm) {
  const newForm = { 
    formName: formData.formName, 
    fields: formData.fields
  }
  const { data: response } = await httpClient.post<FormsResponse>(`/companies/${companyId}/forms`, newForm, {skipAuth: false});
  const { data } = response;
  return data.form
}
