import { getForms } from "@/app/services/formsServices/getForms";
import { useQuery } from "@tanstack/react-query";

export function useForms (companyId: string) {

  const { data: formsData, isLoading: isLoadingCustomersInfo } = useQuery({
    queryKey: ['getForms', companyId],
    queryFn: () => getForms(companyId as string),
  });

  return { formsData, isLoadingCustomersInfo };

}
