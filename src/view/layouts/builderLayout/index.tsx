import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { CompanySwitcher } from './components/companySwitcher';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { companyServices } from '@/app/services/companyServices';
import { useQuery } from '@tanstack/react-query';
import { profileServices } from '@/app/services/profileServices';

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

  console.log({data, isLoading: isLoadingCompanies && isLoadingUserInfo});

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

      <Dialog open={true}>
        <DialogContent className="sm:max-w-sm">
          <h1>teste</h1>
        </DialogContent>
      </Dialog>
    </div>

  );
}
