import { InitialLoader } from "@/components/loaders/initialLoader";
import { Separator } from "@/components/ui/separator";
import { type IForms } from "@/view/pages/formsManager/components/formsTable/formsTableColumn"
import { EmptyForms } from "./components/emptyForms";
import { FormsTable } from "./components/formsTable";
// import { formatDate } from "@/utils/formatDate";

const formsData: IForms[]  = [];
// const formsData: IForms[]  = [{
//   formId: crypto.randomUUID(),
//   formsName: "Teste",
//   createdAt: formatDate(new Date()),
//   lastUpdate: formatDate(new Date()),
// }];

export function FormsManager () {

  const isLoading = false;

  const handleModalStatus = () => console.log

  return (
    <>
      <header className="flex justify-between items-center pb-1">
        <h1>Formulários</h1>
      </header>
      <Separator/>
      <section className="pt-1">
        { isLoading && <InitialLoader customText="Estamos carregando seus clientes"/>}
        { formsData?.length === 0 && !isLoading && <EmptyForms onOpenModal={handleModalStatus}/>}
        { 
          formsData && formsData?.length > 0 && !isLoading && 
          <FormsTable 
            forms={formsData}
          /> 
        }
      </section>
    </>
  )
}
