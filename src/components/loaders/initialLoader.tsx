import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export function InitialLoader() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Carreagando...</EmptyTitle>
        <EmptyDescription>
          Estamos carregando as suas informações.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
