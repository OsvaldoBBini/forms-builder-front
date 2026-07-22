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
import { useMemo } from 'react';

export function BuilderLayout() {

  const { getCompanies } = companyServices;
  const { getUserInfo } = profileServices;

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['getCompanies'],
    queryFn: getCompanies,
  });

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
  });

  const modalShouldOpen = useMemo(() => companies?.length === 0, [companies]);

  console.log({data, isLoading: isLoadingCompanies && isLoadingUserInfo})

  return (
    <div className="overflow-x-hidden">

      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <CompanySwitcher companies={companies}/>
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
        title='Cadastre sua empresa' 
        description='Para avançar é necessário cadastrar a sua primeira empresa.'
      />
      
    </div>
  );
}
