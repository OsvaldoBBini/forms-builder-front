import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from './components/teamSwitcher';

const data = {
  teams: [
      {
        companyId: "id",
        userId: "userx",
        companyName: "Renovo",
        role: "owner",
        isDefault: true
      },
    ],
}

export function BuilderLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
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
  );
}
