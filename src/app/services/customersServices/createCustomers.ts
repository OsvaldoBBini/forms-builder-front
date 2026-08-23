import { httpClient } from "../httpClient";

export interface INewCustomer {
  email: string;
  fullName: string;
  cpf: string;
  phoneNumber: string;
} 

interface CustomersResponse { data: { customer: INewCustomer[] } }

export async function createCustomers(companyId: string, customer: INewCustomer) {

  const newCustomer = { 
    fullName: customer.fullName, 
    cpf: customer.cpf, 
    phoneNumber: customer.phoneNumber,
    email: customer.email === '' ? null : customer.email  } 

  const { data: response } = await httpClient.post<CustomersResponse>(`/companies/${companyId}/customers`, newCustomer, {skipAuth: false});
  const { data } = response;
  return data.customer
}
