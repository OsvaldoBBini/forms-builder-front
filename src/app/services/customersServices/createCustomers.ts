import { httpClient } from "../httpClient";

export interface ICustomer {
  email?: string;
  fullName: string;
  cpf: string;
  phoneNumber: string;
} 

interface CustomersResponse { data: { customer: ICustomer[] } }

export async function createCustomers(companyId: string, customer: ICustomer) {
  const { data: response } = await httpClient.post<CustomersResponse>(`/companies/${companyId}/customers`, customer, {skipAuth: false});
  const { data } = response;
  return data.customer
}
