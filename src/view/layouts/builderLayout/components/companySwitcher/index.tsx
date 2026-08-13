import { ChevronsUpDown, Plus } from "lucide-react"
import { Building2, Tag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useCallback, useState } from "react"
import type { ICompany } from "@/app/services/companyServices/getCompanies"
import { CompanyDialog } from "../companyDialog"
import { useCompany } from "@/app/hooks/useCompany"
import { useShallow } from 'zustand/react/shallow'


interface CompanySwitcher {
  companies: ICompany[] | undefined;
}

export function CompanySwitcher({ companies }: CompanySwitcher) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { isMobile } = useSidebar()

  const { setCompanyId } = useCompany(
    useShallow((state) => ({
      setCompanyId: state.setCompanyId,
    })
  ));

  const [defaultCompany, setDefaultCompany] = useState<ICompany | undefined>(() => {
    const isTheDefaultCompany = companies?.filter((companie) => companie.isDefault)[0];
    if (isTheDefaultCompany) {
      setCompanyId(isTheDefaultCompany.companyId);
      return isTheDefaultCompany;
    }
  });

  const handleChangeCompany = (company: ICompany) => {
    setCompanyId(company.companyId);
    setDefaultCompany(company);
  }

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = useCallback(
    (status: boolean) => setModalOpen(status), 
  [setModalOpen])

  return (
      <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                { 
                  defaultCompany &&  
                  <>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Building2 className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{defaultCompany.companyName}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </>
                }
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Empresas
              </DropdownMenuLabel>

              { companies && companies.map((company: ICompany) => (
                <DropdownMenuItem
                  key={company.companyName}
                  onClick={() => handleChangeCompany(company)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Building2 className="size-3.5 shrink-0" />
                  </div>
                  {company.companyName}
                  <DropdownMenuShortcut>
                    {company.isDefault && <Tag className="  size-3.5"/>}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2 p-2" onClick={handleModalOpen}>
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Adicionar empresa</div>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <CompanyDialog
        title="Nova empresa"
        description="Insira o nome da empresa para cadastrá-la no sistema."
        canSetDefault
        canClose
        open={isModalOpen}
        onDialogStatus={handleModalClose}
      />
      </>
  )
}
