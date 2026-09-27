import type { IForm } from "@/app/services/formsServices/getForms";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns, type IForms } from "@/view/pages/formsManager/components/formsTable/formsTableColumn"

interface IFormsTable {
  forms: IForms[];
  onOpenModal: () => void;
  onEditForm: (form: IForm) => void;
}

export function FormsTable ({ forms, onOpenModal, onEditForm }: IFormsTable) {
  return (
    <DataTable 
      columns={columns} 
      data={forms}
      addData={
        <Button variant="default" onClick={onOpenModal}>
          Criar formulário
        </Button>
      }
      meta={{
        onEditForm: (form: IForm) => onEditForm(form)
      }}
    />
  )
}
