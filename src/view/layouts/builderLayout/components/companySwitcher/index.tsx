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
import { useCallback, useMemo, useState } from "react"
import type { ICompany } from "@/app/services/companyServices/getCompanies"
import { CompanyDialog } from "../companyDialog"


interface CompanySwitcher {
  companies: ICompany[] | undefined;
}

export function CompanySwitcher({ companies }: CompanySwitcher) {

  const { isMobile } = useSidebar()

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  
  // global state
  // const [defaultCompany, setDefaultCompany] = useState(() => {
  //   const isTheDefaultCompany = companies?.filter((companie) => companie.isDefault)[0];
  //   if (isTheDefaultCompany) return isTheDefaultCompany;
  // })

  // const handleDefaultCompany = (company: ICompany) => setDefaultCompany(company);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = useCallback(
    (status: boolean) => setModalOpen(status), 
  [setModalOpen])

  const defaultCompany: ICompany | undefined = useMemo(() => {
    const isTheDefaultCompany = companies?.filter((companie) => companie.isDefault)[0];
    if (isTheDefaultCompany) return isTheDefaultCompany;
  }, [companies]);

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
                  className="gap-2 p-2"
                  // onClick={() => handleDefaultCompany(company)}
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
