import { useState } from 'react';
import { Star, Heart, ShoppingCart, Eye, Badge as BadgeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useApp, useCart, useWishlist, Product } from '@/contexts/AppContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
}

export const ProductCard = ({ product, variant = 'grid' }: ProductCardProps) => {
  const { state, dispatch } = useApp();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageLoading, setImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercentage = product.originalPrice 
    ? Math.round((discountAmount / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: product });
    // Quick view modal would open here
  };

  const cardThemeClass = state.currentTheme === 'heritage' 
    ? 'traditional-card' 
    : 'future-card';

  if (variant === 'list') {
    return (
      <Link to={`/product/${product.id}`}>
        <Card className={`${cardThemeClass} hover-scale`}>
          <CardContent className="p-4">
            <div className="flex space-x-4">
              
              {/* Product Image */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoading(false)}
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}
                </div>
                
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <Badge className="absolute top-2 left-2 bg-destructive">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.brand}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleWishlistToggle}
                    className={`${isWishlisted ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleQuickView}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`${
                        state.currentTheme === 'heritage' ? 'traditional-button' : 'future-button'
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Grid variant
  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        className={`${cardThemeClass} hover-scale group relative overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 space-y-1">
              {discountPercentage > 0 && (
                <Badge className="bg-destructive">
                  -{discountPercentage}%
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="secondary">
                  Out of Stock
                </Badge>
              )}
              {product.theme === 'heritage' && (
                <Badge className="bg-traditional-gold text-traditional-accent">
                  Heritage
                </Badge>
              )}
              {product.theme === 'futuristic' && (
                <Badge className="bg-future-accent text-future-dark">
                  Future
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWishlistToggle}
              className={`absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm ${
                isWishlisted ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>

            {/* Hover Actions */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-2 transition-opacity">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleQuickView}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Quick View
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`${
                    state.currentTheme === 'heritage' ? 'traditional-button' : 'future-button'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.brand}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};