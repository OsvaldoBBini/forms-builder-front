import { httpClient } from "../httpClient";

export interface IUpdateCustomer {
  customerId: string;
  email: string;
  fullName: string;
  cpf: string;
  phoneNumber: string;
} 

interface CustomersResponse { data: { customer: IUpdateCustomer[] } }

export async function updateCustomers(companyId: string, customer: IUpdateCustomer) {

  const changeCustomer = { 
    fullName: customer.fullName, 
    cpf: customer.cpf, 
    phoneNumber: customer.phoneNumber,
    email: customer.email === '' ? null : customer.email  } 
    
  const { data: response } = await httpClient.put<CustomersResponse>(`/companies/${companyId}/customers/${customer.customerId}`, changeCustomer, {skipAuth: false});
  const { data } = response;
  return data.customer
}
