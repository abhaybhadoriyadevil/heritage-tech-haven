import { Button } from "@/components/ui/button-variants"
import { Star, Heart, ShoppingCart } from "lucide-react"

const FeaturedProducts = () => {
  const traditionalProducts = [
    {
      id: 1,
      name: "Handwoven Silk Saree",
      price: "₹12,500",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
      category: "Textiles"
    },
    {
      id: 2,
      name: "Carved Wooden Sculpture",
      price: "₹3,200",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      category: "Art"
    },
    {
      id: 3,
      name: "Copper Water Vessel",
      price: "₹1,800",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544786877-8c7b51e2f065?w=400",
      category: "Utility"
    }
  ]

  const futureProducts = [
    {
      id: 4,
      name: "Holographic Display Hub",
      price: "$2,499",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      category: "Tech"
    },
    {
      id: 5,
      name: "Neural Interface Headset",
      price: "$4,999",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400",
      category: "AI"
    },
    {
      id: 6,
      name: "Quantum Storage Device",
      price: "$1,299",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1558618666-e5a29db01b9a?w=400",
      category: "Storage"
    }
  ]

  const ProductCard = ({ product, theme }: { product: any, theme: 'traditional' | 'future' }) => (
    <div className={`${theme === 'traditional' ? 'traditional-card' : 'future-card'} group overflow-hidden`}>
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`${theme === 'traditional' ? 'bg-traditional-secondary/80 text-traditional-accent hover:bg-traditional-secondary' : 'glass text-future-text hover:bg-white/20'} backdrop-blur-sm`}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${theme === 'traditional' ? 'bg-traditional-gold/20 text-traditional-accent' : 'glass text-future-accent'} backdrop-blur-sm`}>
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className={`text-base sm:text-lg font-semibold ${theme === 'traditional' ? 'font-traditional text-traditional-text' : 'font-future text-future-text'} leading-tight`}>
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className={`w-4 h-4 fill-current ${theme === 'traditional' ? 'text-traditional-gold' : 'text-future-accent'}`} />
            <span className={`text-sm ${theme === 'traditional' ? 'text-traditional-accent' : 'text-future-silver'}`}>
              {product.rating}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <span className={`text-lg sm:text-xl font-bold ${theme === 'traditional' ? 'font-traditional text-traditional-primary' : 'font-future text-future-accent'}`}>
            {product.price}
          </span>
          <Button 
            variant={theme === 'traditional' ? 'traditional-outline' : 'future-outline'} 
            size="sm"
            className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container-custom">
        {/* Traditional Products Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-traditional text-2xl sm:text-3xl md:text-4xl font-bold text-traditional-text mb-3 sm:mb-4">
              Heritage Collection
            </h2>
            <p className="font-traditional text-base sm:text-lg text-traditional-accent max-w-2xl mx-auto px-4">
              Timeless treasures crafted by skilled artisans, each piece telling a story of tradition and cultural heritage.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {traditionalProducts.map((product) => (
              <ProductCard key={product.id} product={product} theme="traditional" />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Button variant="traditional" size="xl" className="w-full sm:w-auto">
              View All Heritage Products
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-traditional-primary via-gray-300 to-future-primary mb-12 sm:mb-16 md:mb-20" />

        {/* Futuristic Products Section */}
        <div className="bg-future-bg/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-future text-2xl sm:text-3xl md:text-4xl font-bold text-future-text mb-3 sm:mb-4 glow-text uppercase tracking-wider">
              Future Tech
            </h2>
            <p className="font-future text-base sm:text-lg text-future-silver max-w-2xl mx-auto px-4">
              Cutting-edge technology that pushes the boundaries of innovation and redefines the future.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {futureProducts.map((product) => (
              <ProductCard key={product.id} product={product} theme="future" />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Button variant="future" size="xl" className="w-full sm:w-auto">
              Explore Future Tech
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts