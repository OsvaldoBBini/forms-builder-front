import { create } from "zustand"
import type { ICustomer } from "../services/customersServices/getCustomers";

interface ICustomerState {
  customer: ICustomer | null;
  setCustomer: (customer: ICustomer | null) => void;
}

export const useCustomer = create<ICustomerState>((set) => ({
  customer: null,
  setCustomer: (customer: ICustomer | null) => set({ customer })
}))
