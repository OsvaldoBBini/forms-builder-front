import { InitialLoader } from "@/components/loaders/initialLoader";
import { Separator } from "@/components/ui/separator";
import { EmptyForms } from "./components/emptyForms";
import { FormsTable } from "./components/formsTable";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "@/app/hooks/useCompany";
import { getForms } from "@/app/services/formsServices/getForms";
import { useQuery } from "@tanstack/react-query";

export function FormsManager () {

  const navigate = useNavigate();

  const companyId = useCompany((state) => state.companyId);

  const { data: formsData, isLoading: isLoadingCustomersInfo } = useQuery({
    queryKey: ['getForms', companyId],
    queryFn: () => getForms(companyId as string),
  });
  
  const handleNewForm = useCallback(() => {
    const formId = crypto.randomUUID();
    navigate(`/forms-manager/builder/${formId}`)
  }, [navigate])

  const isLoading = isLoadingCustomersInfo;

  return (
    <>
      <header className="flex justify-between items-center pb-1">
        <h1>Formulários</h1>
      </header>
      <Separator/>
      <section className="pt-1">
        { isLoading && <InitialLoader customText="Estamos carregando seus clientes"/>}
        { formsData?.length === 0 && !isLoading && <EmptyForms onOpenModal={handleNewForm}/>}
        { 
          formsData && formsData?.length > 0 && !isLoading && 
          <FormsTable 
            forms={formsData}
            onOpenModal={handleNewForm}
          /> 
        }
      </section>
    </>
  )
}
