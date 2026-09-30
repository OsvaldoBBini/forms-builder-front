import { 
  CirclePlus,  
  SquareCheck, 
  TextAlignJustify, 
  CircleCheck,
  ListIndentIncrease,
  TextAlignStart,
  Save,
  Trash} from "lucide-react"
import { 
  Menubar, 
  MenubarContent, 
  MenubarGroup, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarTrigger 
} from "@/components/ui/menubar";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

interface IOptionsMenu {
  onMenuSelection: (fieldType: string) => void;
  handleSaveDialogOpen: () => void;
  handleUpdateFields: () => void;
  isUpdatingFields: boolean
}

export function OptionsMenu({ 
  onMenuSelection,
  handleSaveDialogOpen,
  handleUpdateFields,
  isUpdatingFields
}: IOptionsMenu) {

  const navigate = useNavigate();
  const url = window.location.href;

  const handleCancelFromCreation = () => {
    navigate('/forms-manager')
  }
  const saveMode = url.includes("new")

  const handleSaveForm = () => saveMode ? handleSaveDialogOpen() : handleUpdateFields();
  const isPending = saveMode ? false : isUpdatingFields;

  return (
    <div className="flex gap-4">
      <Menubar className="py-5">
        <MenubarMenu>
          <MenubarTrigger className="flex gap-2" onClick={handleSaveForm}>
            <Save />
            Salvar
            {isPending && <Spinner data-icon="inline-start"/>}
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex gap-2">
            <CirclePlus/>
            Adicionar Campo
          </MenubarTrigger>
          <MenubarContent align="center" className="w-full">
            <MenubarGroup>
              <MenubarItem onClick={() => onMenuSelection("shortAnswer")}>
                <TextAlignStart/>
                Resposta Curta
              </MenubarItem>
              <MenubarItem onClick={() => onMenuSelection("longAnswer")}>
                <TextAlignJustify/>
                Resposta Longa
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem onClick={() => onMenuSelection("radioSelection")}>
                <CircleCheck/>
                Seleção Única
              </MenubarItem>
              <MenubarItem onClick={() => onMenuSelection("checkbox")}>
                <SquareCheck/>
                Multipla Escolha
              </MenubarItem>
              <MenubarItem onClick={() => onMenuSelection("selectField")}>
                <ListIndentIncrease/>
                Lista Suspensa
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Menubar className="py-5">
        <MenubarMenu>
          <MenubarTrigger className="flex gap-2" onClick={handleCancelFromCreation}>
            <Trash />
            Cancelar
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
