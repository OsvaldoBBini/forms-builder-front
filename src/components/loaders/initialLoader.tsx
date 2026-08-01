import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

interface InitialLoaderProps {
  customText?: string;
}

export function InitialLoader({ customText }: InitialLoaderProps) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Carreagando...</EmptyTitle>
        <EmptyDescription>
          {
            customText ??
            "Estamos carregando as suas informações."
          }
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
