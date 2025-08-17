import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Zap,
  Activity,
  Globe,
  Shield,
  Rocket
} from 'lucide-react';

export const FuturisticStats = () => {
  const [animatedValues, setAnimatedValues] = useState({
    sales: 0,
    users: 0,
    orders: 0,
    uptime: 0
  });

  const targetValues = {
    sales: 2847583,
    users: 156842,
    orders: 9847,
    uptime: 99.9
  };

  // Animate numbers on component mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 16; // ~60fps
    const steps = duration / interval;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      
      // Easing function for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedValues({
        sales: Math.floor(targetValues.sales * easeProgress),
        users: Math.floor(targetValues.users * easeProgress),
        orders: Math.floor(targetValues.orders * easeProgress),
        uptime: Math.min(targetValues.uptime * easeProgress, 99.9)
      });
      
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      id: 1,
      title: 'Total Revenue',
      value: `$${animatedValues.sales.toLocaleString()}`,
      change: '+12.5%',
      icon: TrendingUp,
      color: 'future-primary',
      trend: 'up'
    },
    {
      id: 2,
      title: 'Active Users',
      value: animatedValues.users.toLocaleString(),
      change: '+8.2%',
      icon: Users,
      color: 'future-accent',
      trend: 'up'
    },
    {
      id: 3,
      title: 'Orders Today',
      value: animatedValues.orders.toLocaleString(),
      change: '+15.3%',
      icon: ShoppingCart,
      color: 'future-glow',
      trend: 'up'
    },
    {
      id: 4,
      title: 'System Uptime',
      value: `${animatedValues.uptime.toFixed(1)}%`,
      change: 'Stable',
      icon: Activity,
      color: 'future-secondary',
      trend: 'stable'
    }
  ];

  const achievements = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: '50+ Countries',
      glow: 'future-primary'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'SSL Encrypted',
      glow: 'future-accent'
    },
    {
      icon: Rocket,
      title: 'Ultra Fast',
      description: '<100ms Response',
      glow: 'future-glow'
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div 
              key={i}
              className="border border-future-glow/20 animate-pulse"
              style={{ animationDelay: `${(i % 12) * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-future-primary/20 backdrop-blur-sm border border-future-accent/30 rounded-full px-6 py-3 text-future-accent font-future mb-6">
            <Activity className="w-5 h-5" />
            <span>Real-time Analytics</span>
          </div>
          
          <h2 className="font-future text-4xl lg:text-5xl font-black text-future-text mb-4">
            PERFORMANCE
            <span className="block text-transparent bg-gradient-to-r from-future-primary via-future-accent to-future-glow bg-clip-text">
              METRICS
            </span>
          </h2>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.id} className="future-card group hover:glow-border">
              <CardContent className="p-6">
                
                {/* Icon & Change Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}/20 border border-${stat.color}/30`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                  
                  <Badge 
                    className={`${
                      stat.trend === 'up' 
                        ? 'bg-green-500/20 text-green-400 border-green-400/30' 
                        : 'bg-blue-500/20 text-blue-400 border-blue-400/30'
                    } font-future font-bold`}
                  >
                    {stat.change}
                  </Badge>
                </div>

                {/* Value */}
                <div className="space-y-2">
                  <h3 className="font-future text-3xl font-black text-future-text group-hover:glow-text transition-all duration-300">
                    {stat.value}
                  </h3>
                  <p className="font-future text-sm text-future-silver uppercase tracking-wider">
                    {stat.title}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-future-dark/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-${stat.color} to-${stat.color}/60 rounded-full transition-all duration-2000 ease-out`}
                    style={{ 
                      width: stat.trend === 'up' ? '75%' : '95%',
                      transitionDelay: `${stat.id * 200}ms`
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="future-card p-8 text-center group hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-${achievement.glow}/20 rounded-2xl border border-${achievement.glow}/30 mb-6 group-hover:animate-glow`}>
                <achievement.icon className={`w-8 h-8 text-${achievement.glow}`} />
              </div>
              
              <h3 className="font-future text-xl font-bold text-future-text mb-2 group-hover:glow-text transition-all duration-300">
                {achievement.title}
              </h3>
              
              <p className="font-future text-future-silver">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        {/* Floating Action Indicators */}
        <div className="absolute top-10 right-10 space-y-4 hidden lg:block">
          <div className="w-3 h-3 bg-future-accent rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-future-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="w-4 h-4 bg-future-glow rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="absolute bottom-10 left-10 space-x-4 hidden lg:flex">
          <div className="w-1 h-16 bg-future-accent/60 rounded-full animate-pulse" />
          <div className="w-1 h-12 bg-future-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="w-1 h-20 bg-future-glow/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </section>
  );
};