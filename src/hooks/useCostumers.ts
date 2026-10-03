import { getCustomers } from "@/app/services/customersServices/getCustomers";
import { useQuery } from "@tanstack/react-query";

export function useCostumers(companyId: string) {

  const { data: customersData, isLoading: isLoadingCustomersInfo } = useQuery({
    queryKey: ['getCustomers', companyId],
    queryFn: () => getCustomers(companyId as string),
  });

  return { customersData, isLoadingCustomersInfo };
}
