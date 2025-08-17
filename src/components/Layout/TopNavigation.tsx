import { useState } from 'react';
import { Search, ShoppingCart, Bell, User, Globe, ChevronDown, Mic, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useApp, useCart } from '@/contexts/AppContext';
import { ThemeToggle } from './ThemeToggle';
import { CartPreview } from '../Cart/CartPreview';

export const TopNavigation = () => {
  const { state, dispatch } = useApp();
  const { cartCount } = useCart();
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const unreadNotifications = state.notifications.filter(n => !n.read).length;

  const handleSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const handleVoiceSearch = () => {
    // Voice search implementation would go here
    console.log('Voice search activated');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      state.currentTheme === 'heritage' 
        ? 'bg-traditional-bg border-traditional-border' 
        : 'bg-future-dark border-future-border glass'
    } border-b backdrop-blur-sm`}>
      
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className={`text-2xl font-bold transition-colors ${
              state.currentTheme === 'heritage' 
                ? 'text-traditional-primary font-traditional' 
                : 'text-future-accent font-future glow-text'
            }`}>
              <span className={state.currentTheme === 'heritage' ? 'text-traditional-accent' : 'text-future-primary'}>
                Heritage
              </span>
              <span className={state.currentTheme === 'heritage' ? 'text-traditional-gold' : 'text-future-glow'}>
                TECH
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className={`relative transition-all duration-300 ${
              searchFocused 
                ? state.currentTheme === 'heritage' 
                  ? 'shadow-traditional' 
                  : 'shadow-glow' 
                : ''
            }`}>
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={`rounded-r-none border-r-0 ${
                      state.currentTheme === 'heritage'
                        ? 'bg-traditional-secondary text-traditional-text border-traditional-border'
                        : 'bg-future-dark text-future-text border-future-border'
                    }`}>
                      All
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Categories</DropdownMenuItem>
                    <DropdownMenuItem>Electronics</DropdownMenuItem>
                    <DropdownMenuItem>Fashion</DropdownMenuItem>
                    <DropdownMenuItem>Home & Garden</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    value={state.searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`rounded-none border-x-0 ${
                      state.currentTheme === 'heritage'
                        ? 'bg-traditional-bg text-traditional-text border-traditional-border'
                        : 'bg-future-dark text-future-text border-future-border'
                    }`}
                  />
                  {state.searchQuery && (
                    <div className={`absolute top-full left-0 right-0 mt-1 rounded-md border shadow-lg z-10 ${
                      state.currentTheme === 'heritage'
                        ? 'bg-traditional-bg border-traditional-border'
                        : 'bg-future-dark border-future-border glass'
                    }`}>
                      {/* Search suggestions would go here */}
                      <div className="p-2 text-sm text-muted-foreground">
                        Search suggestions will appear here...
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleVoiceSearch}
                  variant="outline" 
                  className={`rounded-none border-l-0 border-r-0 ${
                    state.currentTheme === 'heritage'
                      ? 'bg-traditional-secondary text-traditional-text border-traditional-border hover:bg-traditional-gold'
                      : 'bg-future-dark text-future-text border-future-border hover:bg-future-primary'
                  }`}
                >
                  <Mic className="h-4 w-4" />
                </Button>

                <Button className={`rounded-l-none ${
                  state.currentTheme === 'heritage'
                    ? 'traditional-button'
                    : 'future-button'
                }`}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            
            {/* Language & Currency */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={
                  state.currentTheme === 'heritage'
                    ? 'text-traditional-text hover:bg-traditional-secondary'
                    : 'text-future-text hover:bg-future-dark'
                }>
                  <Globe className="h-4 w-4 mr-1" />
                  EN | USD
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English | USD</DropdownMenuItem>
                <DropdownMenuItem>Spanish | USD</DropdownMenuItem>
                <DropdownMenuItem>French | EUR</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <div className="p-2 font-semibold border-b">Notifications</div>
                {state.notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  state.notifications.slice(0, 5).map(notification => (
                    <DropdownMenuItem key={notification.id} className="p-3">
                      <div className="flex flex-col space-y-1">
                        <span className={notification.read ? 'text-muted-foreground' : 'font-medium'}>
                          {notification.message}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5 mr-1" />
                  {state.user.isLoggedIn ? state.user.name : 'Account'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {state.user.isLoggedIn ? (
                  <>
                    <DropdownMenuItem>My Profile</DropdownMenuItem>
                    <DropdownMenuItem>My Orders</DropdownMenuItem>
                    <DropdownMenuItem>Wishlist</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>Sign In</DropdownMenuItem>
                    <DropdownMenuItem>Create Account</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <DropdownMenu open={cartOpen} onOpenChange={setCartOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-0">
                <CartPreview onClose={() => setCartOpen(false)} />
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </header>
  );
};