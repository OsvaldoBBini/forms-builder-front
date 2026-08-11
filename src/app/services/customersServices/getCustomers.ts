import { httpClient } from "../httpClient";

export interface ICustomer {
  companyId: string;
  email?: string;
  fullName: string;
  cpf: string;
  phoneNumber: string;
} 

interface CustomersResponse { data: { items: ICustomer[] } }

export async function getCustomers(companyId: string) {
  const { data: response } = await httpClient.get<CustomersResponse>(`/companies/${companyId}/customers`, {skipAuth: false});
  const { data } = response;
  return data.items
}
