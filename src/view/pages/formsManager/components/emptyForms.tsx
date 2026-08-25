import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Form } from "lucide-react"

interface EmptyFormsProps {
  onOpenModal: () => void;
}

export function EmptyForms({ onOpenModal }: EmptyFormsProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Form />
        </EmptyMedia>
        <EmptyTitle>Nenhum formulário criado</EmptyTitle>
        <EmptyDescription>
          Você ainda não possui nenhum formulário criado. Comece criando seu primeiro formulário.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={onOpenModal}>Criar formulário</Button>
      </EmptyContent>
    </Empty>
  )
}
