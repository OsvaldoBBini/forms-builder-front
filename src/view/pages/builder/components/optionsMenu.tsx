import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CirclePlus } from "lucide-react"

interface IOptionsMenu {
  onOpenModal: () => void;
}

export function OptionsMenu({ onOpenModal }: IOptionsMenu) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <CirclePlus/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start"  className="w-full">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Campos de texto</DropdownMenuLabel>
          <DropdownMenuItem onClick={onOpenModal}>Resposta Curta</DropdownMenuItem>
          <DropdownMenuItem>Resposta Longa</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Campos de seleção</DropdownMenuLabel>
          <DropdownMenuItem>Multipla Escolha</DropdownMenuItem>
          <DropdownMenuItem>Checkbox</DropdownMenuItem>
          <DropdownMenuItem>Dropdown</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
