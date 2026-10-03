import { InitialLoader } from "@/components/loaders/initialLoader";
import { Separator } from "@/components/ui/separator";
import { EmptyForms } from "./components/emptyForms";
import { FormsTable } from "./components/formsTable";
import { useCallback } from "react";
import { useCompany } from "@/app/hooks/useCompany";
import { type IForm } from "@/app/services/formsServices/getForms";
import { useNavigateTo } from "@/hooks/useNavigateTo";
import { useForms } from "@/hooks/useForms";

export function FormsManager () {

  const { handleNavigateTo } = useNavigateTo();

  const companyId = useCompany((state) => state.companyId);

  const { formsData, isLoadingCustomersInfo } = useForms(companyId as string);
  
  const handleNewForm = useCallback(() => {
    const formId = crypto.randomUUID();
    handleNavigateTo(`/forms-manager/builder/new/${formId}`)
  }, [handleNavigateTo])
  
  const handleEditForm = useCallback((form: IForm) => {
    handleNavigateTo(`/forms-manager/builder/edit/${form.formId}`)
  }, [handleNavigateTo])

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
            onEditForm={handleEditForm}
          /> 
        }
      </section>
    </>
  )
}
