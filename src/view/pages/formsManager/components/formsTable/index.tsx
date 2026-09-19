import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns, type IForms } from "@/view/pages/formsManager/components/formsTable/formsTableColumn"

interface IFormsTable {
  forms: IForms[],
  onOpenModal: () => void
}

export function FormsTable ({ forms, onOpenModal }: IFormsTable) {
  return (
    <DataTable 
      columns={columns} 
      data={forms}
      addData={
        <Button variant="default" onClick={onOpenModal}>
          Criar formulário
        </Button>
      }
    />
  )
}
