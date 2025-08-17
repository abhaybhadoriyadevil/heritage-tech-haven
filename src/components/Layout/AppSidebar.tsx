import { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  Zap, 
  Star, 
  Palette, 
  Laptop, 
  Shirt, 
  Book, 
  Sofa, 
  Heart, 
  Gamepad2, 
  ShoppingBasket, 
  HelpCircle, 
  Settings, 
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { useApp } from '@/contexts/AppContext';

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

const mainMenuItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Best Sellers', url: '/best-sellers', icon: TrendingUp },
  { title: "Today's Deals", url: '/deals', icon: Zap },
  { title: 'New Arrivals', url: '/new-arrivals', icon: Star },
];

const themeBasedItems = [
  { title: 'Handcrafted & Traditional', url: '/heritage', icon: Palette, theme: 'heritage' },
  { title: 'Modern & Futuristic', url: '/futuristic', icon: Zap, theme: 'futuristic' },
];

const categoryItems = [
  { title: 'Electronics', url: '/electronics', icon: Laptop },
  { title: 'Fashion & Apparel', url: '/fashion', icon: Shirt },
  { title: 'Books & Stationery', url: '/books', icon: Book },
  { title: 'Furniture & Home Decor', url: '/furniture', icon: Sofa },
  { title: 'Health & Fitness', url: '/health', icon: Heart },
  { title: 'Toys & Games', url: '/toys', icon: Gamepad2 },
  { title: 'Grocery & Essentials', url: '/grocery', icon: ShoppingBasket },
];

const utilityItems = [
  { title: 'Customer Support', url: '/support', icon: HelpCircle },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export const AppSidebar = ({ collapsed, onToggle }: AppSidebarProps) => {
  const location = useLocation();
  const { state } = useApp();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getNavClassName = (isActive: boolean, theme?: string) => {
    const baseClass = 'w-full justify-start transition-all duration-200';
    const themeClass = state.currentTheme === 'heritage' 
      ? 'text-traditional-text hover:bg-traditional-secondary hover:text-traditional-primary'
      : 'text-future-text hover:bg-future-dark hover:text-future-accent';
    
    if (isActive) {
      return `${baseClass} ${
        state.currentTheme === 'heritage'
          ? 'bg-traditional-gold text-traditional-accent font-medium'
          : 'bg-future-primary text-future-text font-medium glow-border'
      }`;
    }
    
    if (theme && theme !== state.currentTheme) {
      return `${baseClass} opacity-60 ${themeClass}`;
    }
    
    return `${baseClass} ${themeClass}`;
  };

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      
      <Sidebar className={`h-full border-r transition-all duration-300 ${
        state.currentTheme === 'heritage'
          ? 'bg-traditional-bg border-traditional-border'
          : 'bg-future-dark border-future-border glass'
      } ${collapsed ? 'w-16' : 'w-64'}`}>
        
        {/* Toggle Button */}
        <div className="flex justify-end p-2 border-b border-border">
          <Button
            onClick={() => onToggle(!collapsed)}
            variant="ghost"
            size="sm"
            className={`${
              state.currentTheme === 'heritage'
                ? 'text-traditional-text hover:bg-traditional-secondary'
                : 'text-future-text hover:bg-future-dark'
            }`}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <SidebarContent className="overflow-y-auto">
          
          {/* Main Navigation */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className={`${
                state.currentTheme === 'heritage'
                  ? 'text-traditional-accent font-traditional'
                  : 'text-future-accent font-future'
              }`}>
                Main Navigation
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {mainMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(isActive(item.url))}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Theme-based Items */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className={`${
                state.currentTheme === 'heritage'
                  ? 'text-traditional-accent font-traditional'
                  : 'text-future-accent font-future'
              }`}>
                Collections
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {themeBasedItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavClassName(isActive(item.url), item.theme)}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Categories */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className={`${
                state.currentTheme === 'heritage'
                  ? 'text-traditional-accent font-traditional'
                  : 'text-future-accent font-future'
              }`}>
                Categories
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {categoryItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(isActive(item.url))}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="ml-3 text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Utility Items */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className={`${
                state.currentTheme === 'heritage'
                  ? 'text-traditional-accent font-traditional'
                  : 'text-future-accent font-future'
              }`}>
                Support
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {utilityItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(isActive(item.url))}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>
      </Sidebar>
    </div>
  );
};