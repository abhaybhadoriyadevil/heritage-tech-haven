import { useState } from 'react';
import { ProductCard } from '../Product/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Home, 
  Car,
  Zap,
  TrendingUp,
  Star,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';
import { mockProducts } from '@/data/mockProducts';

export const FuturisticProducts = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  // Filter futuristic products
  const futuristicProducts = mockProducts.filter(p => p.theme === 'futuristic');
  
  const categories = [
    { id: 'all', name: 'All Products', icon: Zap, count: futuristicProducts.length },
    { id: 'electronics', name: 'Electronics', icon: Smartphone, count: futuristicProducts.filter(p => p.category === 'Electronics').length },
    { id: 'wearables', name: 'Wearables', icon: Watch, count: futuristicProducts.filter(p => p.category === 'Health & Fitness').length },
    { id: 'fashion', name: 'Tech Fashion', icon: Headphones, count: futuristicProducts.filter(p => p.category === 'Fashion & Apparel').length },
    { id: 'home', name: 'Smart Home', icon: Home, count: futuristicProducts.filter(p => p.category === 'Furniture & Home Decor').length },
  ];

  const getFilteredProducts = (categoryId: string) => {
    let filtered = futuristicProducts;
    
    if (categoryId !== 'all') {
      const categoryMap: Record<string, string> = {
        'electronics': 'Electronics',
        'wearables': 'Health & Fitness',
        'fashion': 'Fashion & Apparel',
        'home': 'Furniture & Home Decor'
      };
      filtered = filtered.filter(p => p.category === categoryMap[categoryId]);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-future-bg">
      <div className="container-custom py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-future-primary/20 backdrop-blur-sm border border-future-accent/30 rounded-full px-4 py-2 text-future-accent text-sm font-future mb-4">
            <Zap className="w-4 h-4" />
            <span>Future Technology</span>
          </div>
          
          <h1 className="font-future text-4xl lg:text-6xl font-black text-future-text mb-4">
            FUTURE
            <span className="block text-transparent bg-gradient-to-r from-future-primary via-future-accent to-future-glow bg-clip-text">
              PRODUCTS
            </span>
          </h1>
          
          <p className="font-future text-lg text-future-silver max-w-3xl mx-auto">
            Discover cutting-edge technology that pushes the boundaries of innovation. 
            From AI-powered devices to revolutionary gadgets that redefine the future.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="space-y-8">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center">
            <TabsList className="glass border border-future-accent/30 bg-future-dark/50 p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center space-x-2 px-4 py-2 data-[state=active]:bg-future-accent/20 data-[state=active]:text-future-text text-future-silver"
                >
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                  <Badge variant="secondary" className="ml-1 bg-future-primary/20 text-future-accent">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Sort & Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-future-silver" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass border border-future-accent/30 text-future-text bg-future-dark/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-future-accent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`glass border border-future-accent/30 ${viewMode === 'grid' ? 'bg-future-accent/20 text-future-text' : 'text-future-silver'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={`glass border border-future-accent/30 ${viewMode === 'list' ? 'bg-future-accent/20 text-future-text' : 'text-future-silver'}`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Grids */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              
              {/* Category Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="future-card p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-future-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold font-future text-future-text">156</div>
                  <div className="text-sm text-future-silver">Best Sellers</div>
                </div>
                <div className="future-card p-4 text-center">
                  <Star className="w-6 h-6 text-future-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold font-future text-future-text">4.8</div>
                  <div className="text-sm text-future-silver">Avg Rating</div>
                </div>
                <div className="future-card p-4 text-center">
                  <Zap className="w-6 h-6 text-future-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold font-future text-future-text">23</div>
                  <div className="text-sm text-future-silver">New Arrivals</div>
                </div>
                <div className="future-card p-4 text-center">
                  <Car className="w-6 h-6 text-future-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold font-future text-future-text">24h</div>
                  <div className="text-sm text-future-silver">Fast Shipping</div>
                </div>
              </div>

              {/* Products */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {getFilteredProducts(category.id).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    variant={viewMode}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {getFilteredProducts(category.id).length > 8 && (
                <div className="text-center mt-12">
                  <Button 
                    size="lg" 
                    className="future-button font-future"
                  >
                    Load More Products
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};