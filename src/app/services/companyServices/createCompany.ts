import { httpClient } from "../httpClient";

export interface CreateCompanyParams {
  companyName: string;
  cnpj: string;
  isDefault: boolean
}

export interface CreateCompanyResponse {
  companyId: string
  cnpj: string; 
  userId: string;
  companyName: string;
  role: 'owner' | 'admin' | 'user';
  isDefault: boolean
}

export async function createCompany(params: CreateCompanyParams) {
  const { data: response } = await httpClient.post<{ data: CreateCompanyResponse }>('/companies', params, 
    { skipAuth: false });
  const { data } = response;
  return data;
}
