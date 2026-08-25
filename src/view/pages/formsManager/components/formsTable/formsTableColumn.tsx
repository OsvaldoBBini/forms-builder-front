import { createColumnHelper } from "@tanstack/react-table"
import type { DataTableFeatures } from "@/components/ui/data-table-features"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface IForms {
  formId: string;
  formsName: string;
  lastUpdate: string;
  createdAt: string;
}

const customersColumnsHelper = createColumnHelper<DataTableFeatures, IForms>()

export const columns = customersColumnsHelper.columns([
  customersColumnsHelper.accessor("formsName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do formulário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
  customersColumnsHelper.accessor("createdAt", {
    header: "Criado em",
  }),
  customersColumnsHelper.accessor("lastUpdate", {
    header: "Última atualização",
  }),
  customersColumnsHelper.display({
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => console.log} // soft delete
            >
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
])
