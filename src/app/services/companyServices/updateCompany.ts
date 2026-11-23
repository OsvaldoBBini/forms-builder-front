import { httpClient } from "../httpClient";
import type {  CreateCompanyResponse as CompanyResponse } from "./createCompany";

export interface UpdateCompanyParams {
  companyId: string;
  companyName: string;
  cnpj: string;
  isDefault: boolean
}

export async function updateCompany(params: UpdateCompanyParams) {
  const { data: response } = await httpClient.put<{ data: CompanyResponse }>(
    `/companies/${params.companyId}`, 
    params, 
    { skipAuth: false });
  const { data } = response;
  return data;
}
