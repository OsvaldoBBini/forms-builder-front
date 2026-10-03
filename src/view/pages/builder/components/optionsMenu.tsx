import { 
  CirclePlus,  
  SquareCheck, 
  TextAlignJustify, 
  CircleCheck,
  ListIndentIncrease,
  TextAlignStart,
  Save,
  Trash,
  CircleArrowLeft} from "lucide-react"
import { 
  Menubar, 
  MenubarContent, 
  MenubarGroup, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarTrigger 
} from "@/components/ui/menubar";
import { Spinner } from "@/components/ui/spinner";
import { useNavigateTo } from "@/hooks/useNavigateTo";

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

  const { handleNavigateTo } = useNavigateTo();
  const url = window.location.href;

  const handleCancelFromCreation = () => {
    handleNavigateTo('/forms-manager')
  }
  const newMode = url.includes("new")

  const handleSaveForm = () => newMode ? handleSaveDialogOpen() : handleUpdateFields();
  const isPending = newMode ? false : isUpdatingFields;

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
            {newMode ? 
            <>
              <Trash />
              Cancelar 
            </> : 
            <>
              <CircleArrowLeft />
              Voltar
            </>}
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
