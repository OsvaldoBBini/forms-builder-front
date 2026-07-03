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
import { 
  CirclePlus,  
  SquareCheck, 
  TextAlignJustify, 
  CircleCheck,
  ListIndentIncrease,
  TextAlignStart} from "lucide-react"

interface IOptionsMenu {
  onMenuSelection: (fieldType: string) => void;
}


export function OptionsMenu({ onMenuSelection }: IOptionsMenu) {
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
          <DropdownMenuItem onClick={() => onMenuSelection("shortAnswer")}>
            <TextAlignStart/>
            Resposta Curta</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onMenuSelection("longAnswer")}>
            <TextAlignJustify/>
            Resposta Longa
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Campos de seleção</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onMenuSelection("multipleChoice")}>
            <CircleCheck/>
            Multipla Escolha
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onMenuSelection("checkbox")}>
            <SquareCheck/>
            Checkbox
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onMenuSelection("dropdown")}>
            <ListIndentIncrease/>
            Dropdown
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
