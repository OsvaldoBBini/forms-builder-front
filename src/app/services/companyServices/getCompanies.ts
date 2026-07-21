import { httpClient } from "../httpClient";

export interface ICompany {
  userId: string;
  companyId: string;
  companyName: string;
  role: string;
  isDefault: boolean
} 

interface CompaniesResponse { data: { items: ICompany[] } }

export async function getCompanies() {
  const { data: response } = await httpClient.get<CompaniesResponse>('/companies');
  const { data } = response;
  return data.items
}
