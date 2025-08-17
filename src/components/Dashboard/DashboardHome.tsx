import { useState } from 'react';
import { TrendingUp, Zap, Star, Gift, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '../Layout/ThemeToggle';
import { ProductCard } from '../Product/ProductCard';
import { useApp } from '@/contexts/AppContext';
import { mockProducts } from '@/data/mockProducts';

export const DashboardHome = () => {
  const { state } = useApp();
  const [activeSection, setActiveSection] = useState<'deals' | 'bestsellers' | 'new'>('deals');

  // Filter products based on current theme
  const themeProducts = mockProducts.filter(product => product.theme === state.currentTheme);
  const featuredProducts = themeProducts.slice(0, 8);
  
  // Mock deal countdown (you'd get this from your backend)
  const [timeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  const stats = [
    {
      title: 'Today\'s Deals',
      value: '47',
      icon: Zap,
      description: 'Active deals',
      theme: 'deals'
    },
    {
      title: 'Best Sellers',
      value: '156',
      icon: TrendingUp,
      description: 'Popular items',
      theme: 'bestsellers'
    },
    {
      title: 'New Arrivals',
      value: '23',
      icon: Star,
      description: 'This week',
      theme: 'new'
    },
    {
      title: 'Flash Sale',
      value: '5h 23m',
      icon: Clock,
      description: 'Time remaining',
      theme: 'flash'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Hero Section with Theme Toggle */}
      <div className={`relative rounded-3xl p-8 lg:p-12 overflow-hidden ${
        state.currentTheme === 'heritage' 
          ? 'bg-gradient-traditional text-traditional-secondary' 
          : 'bg-gradient-future text-future-text'
      }`}>
        
        {/* Background Pattern */}
        <div className={`absolute inset-0 opacity-10 ${
          state.currentTheme === 'heritage' ? 'bg-traditional-sage' : 'bg-future-glow'
        }`} style={{
          backgroundImage: state.currentTheme === 'heritage' 
            ? 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)' 
            : 'conic-gradient(from 0deg, rgba(0,200,255,0.1), rgba(100,0,255,0.1), rgba(0,200,255,0.1))'
        }} />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <h1 className={`text-4xl lg:text-6xl font-bold ${
                  state.currentTheme === 'heritage' ? 'font-traditional' : 'font-future'
                }`}>
                  {state.currentTheme === 'heritage' ? 'Heritage' : 'Future'}
                  <span className={state.currentTheme === 'heritage' ? 'text-traditional-gold' : 'text-future-glow'}>
                    {state.currentTheme === 'heritage' ? ' Crafts' : ' Tech'}
                  </span>
                </h1>
                <ThemeToggle />
              </div>
              
              <p className="text-lg opacity-90 max-w-2xl">
                {state.currentTheme === 'heritage' 
                  ? 'Discover authentic handcrafted treasures and traditional artistry from around the world.'
                  : 'Explore cutting-edge technology and futuristic innovations that shape tomorrow.'
                }
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  size="lg" 
                  className={`${
                    state.currentTheme === 'heritage' 
                      ? 'bg-traditional-gold text-traditional-accent hover:bg-traditional-accent hover:text-traditional-gold' 
                      : 'bg-future-accent text-future-dark hover:bg-future-glow hover:text-future-dark'
                  }`}
                >
                  Explore Collection
                </Button>
                <Button size="lg" variant="outline" className="backdrop-blur-sm">
                  <Gift className="mr-2 h-5 w-5" />
                  Gift Cards
                </Button>
              </div>
            </div>

            {/* Flash Sale Timer */}
            <Card className={`${
              state.currentTheme === 'heritage' ? 'traditional-card' : 'future-card'
            } backdrop-blur-sm`}>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className={`h-5 w-5 mr-2 ${
                    state.currentTheme === 'heritage' ? 'text-traditional-gold' : 'text-future-glow'
                  }`} />
                  <span className="font-semibold">Flash Sale</span>
                </div>
                <div className="text-2xl font-bold mb-2">
                  {timeLeft.hours.toString().padStart(2, '0')}:
                  {timeLeft.minutes.toString().padStart(2, '0')}:
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <p className="text-sm text-muted-foreground">
                  Up to 70% off select items
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title}
            className={`${
              state.currentTheme === 'heritage' ? 'traditional-card' : 'future-card'
            } cursor-pointer transition-all duration-200 ${
              activeSection === stat.theme ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveSection(stat.theme as any)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  state.currentTheme === 'heritage' 
                    ? 'bg-traditional-gold/20 text-traditional-accent' 
                    : 'bg-future-accent/20 text-future-accent'
                }`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Sections */}
      <div className="space-y-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-3xl font-bold ${
              state.currentTheme === 'heritage' ? 'font-traditional text-traditional-accent' : 'font-future text-future-text'
            }`}>
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-1">
              {state.currentTheme === 'heritage' 
                ? 'Handpicked traditional treasures' 
                : 'Cutting-edge innovations'
              }
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant={activeSection === 'deals' ? 'default' : 'outline'}
              onClick={() => setActiveSection('deals')}
              className={activeSection === 'deals' && state.currentTheme === 'heritage' ? 'traditional-button' : 
                        activeSection === 'deals' && state.currentTheme === 'futuristic' ? 'future-button' : ''}
            >
              <Zap className="mr-2 h-4 w-4" />
              Deals
            </Button>
            <Button 
              variant={activeSection === 'bestsellers' ? 'default' : 'outline'}
              onClick={() => setActiveSection('bestsellers')}
              className={activeSection === 'bestsellers' && state.currentTheme === 'heritage' ? 'traditional-button' : 
                        activeSection === 'bestsellers' && state.currentTheme === 'futuristic' ? 'future-button' : ''}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Best Sellers
            </Button>
            <Button 
              variant={activeSection === 'new' ? 'default' : 'outline'}
              onClick={() => setActiveSection('new')}
              className={activeSection === 'new' && state.currentTheme === 'heritage' ? 'traditional-button' : 
                        activeSection === 'new' && state.currentTheme === 'futuristic' ? 'future-button' : ''}
            >
              <Star className="mr-2 h-4 w-4" />
              New Arrivals
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="hover-scale"
          >
            <Eye className="mr-2 h-5 w-5" />
            View All {state.currentTheme === 'heritage' ? 'Heritage' : 'Future'} Products
          </Button>
        </div>
      </div>

      {/* Recently Viewed */}
      {state.recentlyViewed.length > 0 && (
        <div className="space-y-6">
          <h3 className={`text-2xl font-semibold ${
            state.currentTheme === 'heritage' ? 'font-traditional text-traditional-accent' : 'font-future text-future-text'
          }`}>
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {state.recentlyViewed.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};