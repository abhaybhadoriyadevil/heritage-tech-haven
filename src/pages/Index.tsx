import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { DashboardHome } from "@/components/Dashboard/DashboardHome";
import { FuturisticHero } from '@/components/Futuristic/FuturisticHero';
import { TechShowcase } from '@/components/Futuristic/TechShowcase';
import { FuturisticStats } from '@/components/Futuristic/FuturisticStats';

const Index = () => {
  const { state } = useApp();
  
  return (
    <DashboardLayout>
      {state.currentTheme === 'futuristic' ? (
        <>
          <FuturisticHero />
          <FuturisticStats />
          <TechShowcase />
        </>
      ) : null}
      <DashboardHome />
    </DashboardLayout>
  );
}

export default Index