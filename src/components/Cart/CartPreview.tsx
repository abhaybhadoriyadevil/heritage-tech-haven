import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useApp, useCart } from '@/contexts/AppContext';
import { Link } from 'react-router-dom';

interface CartPreviewProps {
  onClose: () => void;
}

export const CartPreview = ({ onClose }: CartPreviewProps) => {
  const { state } = useApp();
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-medium mb-2">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add some products to get started
        </p>
        <Button 
          onClick={onClose}
          className={state.currentTheme === 'heritage' ? 'traditional-button' : 'future-button'}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className={`w-full ${
      state.currentTheme === 'heritage' 
        ? 'bg-traditional-bg' 
        : 'bg-future-dark glass'
    }`}>
      
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Shopping Cart</h3>
          <Badge variant="secondary">{cartCount} items</Badge>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="p-4 border-b">
            <div className="flex space-x-3">
              
              {/* Product Image */}
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              
              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {item.brand}
                </p>
                
                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="text-sm font-medium px-2">
                      {item.quantity}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 space-y-4">
        <Separator />
        
        {/* Subtotal */}
        <div className="flex items-center justify-between font-semibold">
          <span>Subtotal:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link to="/cart" onClick={onClose} className="w-full">
            <Button variant="outline" className="w-full">
              View Cart
            </Button>
          </Link>
          <Link to="/checkout" onClick={onClose} className="w-full">
            <Button 
              className={`w-full ${
                state.currentTheme === 'heritage' ? 'traditional-button' : 'future-button'
              }`}
            >
              Checkout
            </Button>
          </Link>
        </div>

        {/* Free Shipping Notice */}
        {cartTotal < 50 && (
          <div className={`text-xs text-center p-2 rounded-md ${
            state.currentTheme === 'heritage'
              ? 'bg-traditional-secondary text-traditional-text'
              : 'bg-future-dark text-future-text'
          }`}>
            Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
          </div>
        )}
      </div>
    </div>
  );
};