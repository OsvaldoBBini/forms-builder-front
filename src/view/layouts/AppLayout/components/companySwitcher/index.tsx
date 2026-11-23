import { ChevronsUpDown, Pencil, Plus } from "lucide-react"
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
import { useCallback, useEffect, useState } from "react"
import type { ICompany } from "@/app/services/companyServices/getCompanies"
import { CompanyDialog } from "../companyDialog"
import { useCompany } from "@/app/hooks/useCompany"
import { Button } from "@/components/ui/button"


interface CompanySwitcher {
  companies: ICompany[] | undefined;
}

export function CompanySwitcher({ companies }: CompanySwitcher) {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { isMobile } = useSidebar()

  const companyId = useCompany((state) => state.companyId);
  const setCompanyId = useCompany((state) => state.setCompanyId);
  const selectedCompany = companies?.find((company) => company.companyId === companyId);

  const [companyToUpdate, setCompanyToUpdate] = useState<ICompany | null>(null);

  useEffect(() => {
    if (!companies?.length) return;
    if (companies.some((company) => company.companyId === companyId)) return;

    const initialCompany =
      companies.find((company) => company.isDefault) ?? companies[0];
    setCompanyId(initialCompany.companyId);
  }, [companies, companyId, setCompanyId]);

  const handleChangeCompany = (company: ICompany) => {
    setCompanyId(company.companyId);
  }

  const handleUpdateCompany = (company: ICompany) => {
    setCompanyToUpdate(company);
    handleModalOpen();
  }

  const handleModalOpen = () => setModalOpen(true);
  const handleAddCompany = () => {
    setCompanyToUpdate(null);
    handleModalOpen();
  }
  const handleCompanyChange = (company: ICompany) => {
    if (company.isDefault || company.companyId === companyId || !companyId) {
      setCompanyId(company.companyId);
    }
  }
  const handleModalClose = useCallback(
    (status: boolean) => {
      setModalOpen(status)
      if (companyToUpdate) setCompanyToUpdate(null);
    }, 
  [companyToUpdate])

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
                  selectedCompany &&
                  <>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Building2 className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{selectedCompany.companyName}</span>
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
                <div className="flex gap-1 items-center" key={company.companyId}>
                  <DropdownMenuItem
                    onClick={() => handleChangeCompany(company)}
                    className="gap-2 p-2 flex-1"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <Building2 className="size-3.5 shrink-0" />
                    </div>
                    {company.companyName}
                    <DropdownMenuShortcut>
                      {company.isDefault && <Tag className="  size-3.5"/>}
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <Button size="icon" variant="ghost" onClick={() => handleUpdateCompany(company)}>
                    <Pencil />
                  </Button>
                </div>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2 p-2" onClick={handleAddCompany}>
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
        title={companyToUpdate ? "Editar empresa" : "Nova empresa"}
        description={
          companyToUpdate
            ? "Atualize os dados da empresa."
            : "Insira o nome da empresa para cadastrá-la no sistema."
        }
        canSetDefault
        canClose
        companyToUpdate={companyToUpdate}
        open={isModalOpen}
        onDialogStatus={handleModalClose}
        onCompanyChange={handleCompanyChange}
      />
      </>
  )
}
