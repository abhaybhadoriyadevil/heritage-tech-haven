import { Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

export const ThemeToggle = () => {
  const { state, dispatch } = useApp();

  const toggleTheme = () => {
    const newTheme = state.currentTheme === 'heritage' ? 'futuristic' : 'heritage';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className={`relative overflow-hidden transition-all duration-500 ${
        state.currentTheme === 'heritage'
          ? 'bg-gradient-to-r from-traditional-primary to-traditional-gold text-traditional-secondary border-traditional-border hover:shadow-traditional'
          : 'bg-gradient-to-r from-future-primary to-future-accent text-future-text border-future-border hover:shadow-glow'
      }`}
    >
      <div className="flex items-center space-x-2">
        {state.currentTheme === 'heritage' ? (
          <>
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Heritage</span>
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Futuristic</span>
          </>
        )}
      </div>
      
      {/* Animated background effect */}
      <div className={`absolute inset-0 opacity-20 transition-transform duration-500 ${
        state.currentTheme === 'heritage' 
          ? 'bg-traditional-gold translate-x-full' 
          : 'bg-future-glow -translate-x-full'
      }`} />
    </Button>
  );
};