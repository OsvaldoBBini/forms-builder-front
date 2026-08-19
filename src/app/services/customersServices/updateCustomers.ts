import { httpClient } from "../httpClient";

export interface IUpdateCustomer {
  customerId: string;
  email?: string;
  fullName: string;
  cpf: string;
  phoneNumber: string;
} 

interface CustomersResponse { data: { customer: IUpdateCustomer[] } }

export async function updateCustomers(companyId: string, customer: IUpdateCustomer) {
  const body = {
    emal: customer.email,
    fullName: customer.fullName,
    cpf: customer.cpf,
    phoneNumber: customer.phoneNumber
  }
  const { data: response } = await httpClient.put<CustomersResponse>(`/companies/${companyId}/customers/${customer.customerId}`, body, {skipAuth: false});
  const { data } = response;
  return data.customer
}
