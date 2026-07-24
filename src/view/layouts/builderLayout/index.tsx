import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
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

export function BuilderLayout() {

  const { getCompanies } = companyServices;
  const { getUserInfo } = profileServices;
  
  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['getCompanies'],
    queryFn: getCompanies,
  });

 const [modalShouldOpen, setModalShouldOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModalShouldOpen(!isLoadingCompanies && companies?.length === 0);
  }, [companies, isLoadingCompanies]);

  const handleModalShouldOpen = useCallback(
    (state: boolean) => setModalShouldOpen(state), 
  [setModalShouldOpen])

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
  });

  console.log({data, isLoading: isLoadingCompanies && isLoadingUserInfo})

  return (
    <div className="overflow-x-hidden">

      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            {companies &&  <CompanySwitcher companies={companies}/>}
          </SidebarHeader>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className='p-1'>
            <SidebarTrigger/>
          </div>  
          <div className="flex justify-center w-lvw h-lvh">
            <Outlet/>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <CompanyDialog 
        open={modalShouldOpen}
        onDialogStatus={handleModalShouldOpen}
        title='Cadastre sua empresa' 
        description='Para avançar é necessário cadastrar a sua primeira empresa.'
      />
      
    </div>
  );
}
