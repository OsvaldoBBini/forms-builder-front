import { createColumnHelper } from "@tanstack/react-table"
import type { DataTableFeatures } from "@/components/ui/data-table-features"
import type { ICustomer } from "@/app/services/customersServices/getCustomers"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatCpf, formatPhone } from "@/utils/formatDocuments"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const customersColumnsHelper = createColumnHelper<DataTableFeatures, ICustomer>()

export const columns = customersColumnsHelper.columns([
  customersColumnsHelper.accessor("fullName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
  customersColumnsHelper.accessor("email", {
    header: "E-mail",
  }),
  customersColumnsHelper.accessor("cpf", {
    header: "Cpf",
    cell: ({ getValue }) => formatCpf(getValue()),
  }),
  customersColumnsHelper.accessor("phoneNumber", {
    header: "Telefone",
    cell: ({ getValue }) => formatPhone(getValue()),
  }),
  customersColumnsHelper.display({
    id: "actions",
    cell: ({ row, table }) => {
      const customer = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => table.options.meta?.onEditCustomer(customer)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>Detalhes</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => table.options.meta?.onDeleteCustomer(customer)}
            >
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
])
