import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  theme: 'heritage' | 'futuristic';
  brand: string;
  inStock: boolean;
  description: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  isLoggedIn: boolean;
  orders: Order[];
  addresses: Address[];
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  total: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface AppState {
  user: User;
  cart: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  currentTheme: 'heritage' | 'futuristic';
  notifications: Notification[];
  searchQuery: string;
  currency: string;
  language: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

// Actions
type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: Product }
  | { type: 'SET_THEME'; payload: 'heritage' | 'futuristic' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string };

// Initial state
const initialState: AppState = {
  user: {
    isLoggedIn: false,
    orders: [],
    addresses: [],
  },
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  currentTheme: 'heritage',
  notifications: [],
  searchQuery: '',
  currency: 'USD',
  language: 'en',
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };

    case 'ADD_TO_RECENTLY_VIEWED':
      const filtered = state.recentlyViewed.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        recentlyViewed: [action.payload, ...filtered].slice(0, 10),
      };

    case 'SET_THEME':
      return {
        ...state,
        currentTheme: action.payload,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'ADD_NOTIFICATION':
      const newNotification: Notification = {
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
        ...action.payload,
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload,
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

// Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Utility functions
export const useCart = () => {
  const { state, dispatch } = useApp();
  
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: { message: `${product.name} added to cart`, type: 'success', read: false }
    });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartTotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
};

export const useWishlist = () => {
  const { state, dispatch } = useApp();
  
  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: { message: `${product.name} added to wishlist`, type: 'success', read: false }
    });
  };

  const removeFromWishlist = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const isInWishlist = (id: string) => {
    return state.wishlist.some(item => item.id === id);
  };

  return {
    wishlist: state.wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};