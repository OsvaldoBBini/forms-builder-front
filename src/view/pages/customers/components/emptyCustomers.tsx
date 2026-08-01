import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { BookUser } from "lucide-react"

interface EmptyCustomersProps {
  onOpenModal: () => void;
}

export function EmptyCustomers({ onOpenModal }: EmptyCustomersProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookUser />
        </EmptyMedia>
        <EmptyTitle>Nenhum cliente cadastrado</EmptyTitle>
        <EmptyDescription>
          Você ainda não possui nenhum cliente cadastrado. Comece cadastrando seu primeiro cliente.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={onOpenModal}>Cadastrar cliente</Button>
      </EmptyContent>
    </Empty>
  )
}
