import type { ICustomer } from "@/app/services/customersServices/getCustomers"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./customersTableColumns"
import { Button } from "@/components/ui/button"

interface CustomersTableProps {
  handleModalStatus: () => void
  customers: ICustomer[],
  handleSelectedCustomer: (customer: ICustomer) => void
}

export function CustomersTable({ customers, handleSelectedCustomer, handleModalStatus }: CustomersTableProps) {
  return (
    <div>
      <DataTable columns={columns} data={customers} 
        addData={
          <Button variant="default" onClick={handleModalStatus}>
            Cadastrar cliente
          </Button>
        }
        meta={{
          onEditCustomer: (customer: ICustomer) => {handleSelectedCustomer(customer)}
        }}
      />
    </div>
  )
}

