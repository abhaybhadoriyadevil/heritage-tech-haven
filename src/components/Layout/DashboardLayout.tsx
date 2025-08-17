import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopNavigation } from './TopNavigation';
import { useApp } from '@/contexts/AppContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { state } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className={`min-h-screen w-full transition-all duration-300 ${
        state.currentTheme === 'heritage' ? 'bg-traditional' : 'bg-future'
      }`}>
        
        {/* Top Navigation */}
        <TopNavigation />
        
        {/* Main Layout Container */}
        <div className="flex w-full">
          
          {/* Sidebar */}
          <AppSidebar 
            collapsed={sidebarCollapsed} 
            onToggle={setSidebarCollapsed}
          />
          
          {/* Main Content Area */}
          <main className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          } pt-16`}>
            <div className="container-custom py-6">
              {children}
            </div>
          </main>
          
        </div>
      </div>
    </SidebarProvider>
  );
};