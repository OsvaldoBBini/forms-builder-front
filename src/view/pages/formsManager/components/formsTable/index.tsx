import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns, type IForms } from "@/view/pages/formsManager/components/formsTable/formsTableColumn"

interface IFormsTable {
  forms: IForms[]
}

export function FormsTable ({ forms }: IFormsTable) {
  return (
    <DataTable 
      columns={columns} 
      data={forms}
      addData={
        <Button variant="default" onClick={() => console.log}>
          Criar formulário
        </Button>
      }
    />
  )
}
