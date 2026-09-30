// import { httpClient } from "../httpClient";

export interface IFields{
  formId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any[]
} 

// interface FormsResponse { data: { items: IForm[] } }

export async function updateFields(companyId: string, formData: IFields) {
  console.log('updateForms', companyId)

  const { fields } = formData;
  localStorage.setItem(`${companyId}/fields/${formData.formId}`, JSON.stringify(fields));
}
