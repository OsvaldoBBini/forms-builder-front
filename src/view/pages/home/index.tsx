import { useCompany } from "@/app/hooks/useCompany";
import { useCostumers } from "@/hooks/useCostumers";
import { useForms } from "@/hooks/useForms";
import { useNavigateTo } from "@/hooks/useNavigateTo";

export function Home() {

  const { handleNavigateTo } = useNavigateTo();

  const companyId = useCompany((state) => state.companyId);
  const { customersData } = useCostumers(companyId as string);
  const { formsData } = useForms(companyId as string);

  console.log("customersData", customersData);
  console.log("formsData", formsData);

  return (
    <div>
      <h1>Visão Geral</h1>

    </div>
  );
}
