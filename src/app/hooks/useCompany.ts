import { create } from "zustand"

interface ICompanyState {
  companyId: string | null;
  setCompanyId: (companyId: string | null) => void;
}

export const useCompany = create<ICompanyState>((set) => ({
  companyId: null,
  setCompanyId: (companyId: string | null) => set({ companyId })
}))
