import type { IField } from "@/view/pages/builder/hooks/useFormBuilder";

// import { httpClient } from "../httpClient";

export interface IFields{
  formId: string;
  fields: IField[];
}

// interface FormsResponse { data: { items: IForm[] } }

export async function updateFields(companyId: string, formData: IFields) {
  console.log('updateForms', companyId)

  const { fields } = formData;
  localStorage.setItem(`${companyId}/fields/${formData.formId}`, JSON.stringify(fields));
}
