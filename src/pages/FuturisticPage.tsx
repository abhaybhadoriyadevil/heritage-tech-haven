import { FuturisticHero } from '@/components/Futuristic/FuturisticHero';
import { FuturisticProducts } from '@/components/Futuristic/FuturisticProducts';
import { TechShowcase } from '@/components/Futuristic/TechShowcase';

export const FuturisticPage = () => {
  return (
    <div className="min-h-screen bg-gradient-future-bg">
      <FuturisticHero />
      <TechShowcase />
      <FuturisticProducts />
    </div>
  );
};