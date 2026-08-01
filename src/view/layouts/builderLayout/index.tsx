import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { CompanySwitcher } from './components/companySwitcher';
import { companyServices } from '@/app/services/companyServices';
import { useQuery } from '@tanstack/react-query';
import { profileServices } from '@/app/services/profileServices';
import { CompanyDialog } from './components/companyDialog';
import { useCallback, useEffect, useState } from 'react';
import { UserSession } from './components/userSession';
import { InitialLoader } from '@/components/loaders/initialLoader';
import { BookUser, Form } from 'lucide-react';

export function BuilderLayout() {

  const { getCompanies } = companyServices;
  const { getUserInfo } = profileServices;
  const navigate = useNavigate();
  
  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['getCompanies'],
    queryFn: getCompanies,
  });

 const [modalShouldOpen, setModalShouldOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModalShouldOpen(!isLoadingCompanies && companies?.length === 0);
  }, [companies, isLoadingCompanies]);

  const navigateToPage = (address: string) => {
    navigate(address);
  }

  const handleModalShouldOpen = useCallback(
    (state: boolean) => setModalShouldOpen(state), 
  [setModalShouldOpen])

  const { data: userData, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
  });

  const isLoading = isLoadingCompanies && isLoadingUserInfo;

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
                          <span>Gerenciar formulários</span>
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
