import { Outlet } from 'react-router-dom';
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { CompanySwitcher } from './components/companySwitcher';
import { CompanyDialog } from './components/companyDialog';
import { UserSession } from './components/userSession';
import { InitialLoader } from '@/components/loaders/initialLoader';
import { BookUser, Form } from 'lucide-react';
import { useAppLayout } from './useAppLayout';

export function AppLayout() {

  const {
    modalShouldOpen,
    navigateToPage,
    handleModalShouldOpen,
    userData,
    isLoading,
    companies,
  } = useAppLayout();

  return (
    <div className="overflow-x-hidden">
      { isLoading &&
        <div className="flex justify-center w-lvw h-lvh">
          <InitialLoader/>
        </div>
      }
      {
        !isLoading &&
        <>
          <SidebarProvider>
            <Sidebar collapsible="icon">
              <SidebarHeader>
                {companies &&  <CompanySwitcher companies={companies}/>}
              </SidebarHeader>
              <SidebarRail />
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent className="flex flex-col gap-2">
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => navigateToPage('/customers')}>
                          <BookUser />
                          <span>Clientes</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => navigateToPage('/forms-manager')}>
                          <Form />
                          <span>Formulários</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                { userData && <UserSession userData={userData}/> }
              </SidebarFooter>
            </Sidebar>
              { 
                companies && companies.length > 0 && 
                <SidebarInset>
                  <div className='p-1'>
                    <SidebarTrigger/>
                  </div>  
                  <div className="w-full flex justify-center">
                    <div className='w-[90%]'>
                      <Outlet/>
                    </div>
                  </div>
                </SidebarInset>
              }
          </SidebarProvider>

          <CompanyDialog 
            open={modalShouldOpen}
            onDialogStatus={handleModalShouldOpen}
            title='Cadastre sua empresa' 
            description='Para avançar é necessário cadastrar a sua primeira empresa'
          />
        </>
      }
    </div>
  );
}
