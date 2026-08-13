import type { ICustomer } from "@/app/services/customersServices/getCustomers"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"

interface CustomersTableProps {
  customers: ICustomer[],
  handleSelectedCustomer: (customer: ICustomer) => void
}

export function CustomersTable({ customers, handleSelectedCustomer }: CustomersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Cpf</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, index) => 
            <TableRow key={index}>
              <TableCell className="font-medium">{customer.fullName}</TableCell>
              <TableCell>{customer.cpf}</TableCell>
              <TableCell>{customer.phoneNumber}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Abrir Menu</span></Button>
                  </DropdownMenuTrigger> 
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSelectedCustomer(customer)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>Detalhes</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

