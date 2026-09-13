import { 
  CirclePlus,  
  SquareCheck, 
  TextAlignJustify, 
  CircleCheck,
  ListIndentIncrease,
  TextAlignStart,
  Save} from "lucide-react"
import { 
  Menubar, 
  MenubarContent, 
  MenubarGroup, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarTrigger 
} from "@/components/ui/menubar";
import { FormSaveDialog } from "./saveDialog";
import { useCallback, useState } from "react";

interface IOptionsMenu {
  formId: string;
  onMenuSelection: (fieldType: string) => void;
}

export function OptionsMenu({ formId, onMenuSelection }: IOptionsMenu) {

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const handleSaveDialogOpen = useCallback(() => setSaveDialogOpen(prevState => !prevState), []);

  return (
    <>
      <Menubar className="py-5">
        <MenubarMenu>
          <MenubarTrigger className="flex gap-2" onClick={handleSaveDialogOpen}>
            <Save />
            Salvar
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

      <FormSaveDialog 
        formId={formId} 
        open={saveDialogOpen} 
        onDialogStatus={handleSaveDialogOpen}
      />
    </>
  )
}
