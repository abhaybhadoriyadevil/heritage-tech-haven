import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Cpu, Wifi, Shield, ArrowRight, PlayCircle } from 'lucide-react';
import futuristicHero from '@/assets/futuristic-hero.jpg';

export const FuturisticHero = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    { icon: Cpu, text: 'AI-Powered' },
    { icon: Wifi, text: 'Connected' },
    { icon: Shield, text: 'Secure' },
    { icon: Zap, text: 'Ultra-Fast' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative min-h-screen bg-gradient-future-bg overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${futuristicHero})` }}
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-future-primary/20 via-transparent to-future-accent/20" />
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div 
                key={i}
                className="border border-future-glow/10 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-future-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-future-accent/30 rounded-full blur-3xl animate-glow" />
        <div className="absolute top-1/2 left-1/4 w-2 h-20 bg-future-glow/50 blur-sm animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-16 bg-future-accent/60 blur-sm animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-future-primary/20 backdrop-blur-sm border border-future-accent/30 rounded-full px-4 py-2 text-future-accent text-sm font-future">
                <Zap className="w-4 h-4" />
                <span>Next-Gen Technology</span>
              </div>
              
              <h1 className="font-future text-5xl lg:text-7xl font-black text-future-text leading-tight">
                SHAPE THE
                <span className="block text-transparent bg-gradient-to-r from-future-primary via-future-accent to-future-glow bg-clip-text animate-glow">
                  FUTURE
                </span>
              </h1>
              
              <p className="font-future text-lg text-future-silver max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience tomorrow's technology today. Revolutionary products that push the boundaries 
                of innovation and redefine what's possible in the digital age.
              </p>
            </div>

            {/* Dynamic Features */}
            <div className="space-y-4">
              <div className="flex justify-center lg:justify-start space-x-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-2 p-3 rounded-xl backdrop-blur-sm transition-all duration-500 ${
                      activeFeature === index 
                        ? 'bg-future-accent/20 border border-future-accent text-future-text glow-border' 
                        : 'bg-future-dark/30 border border-future-border/30 text-future-silver'
                    }`}
                  >
                    <feature.icon className="w-5 h-5" />
                    <span className="font-future font-medium hidden sm:block">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="future-button group font-future font-bold"
              >
                Explore Future Tech
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="glass border-future-accent/30 text-future-text hover:bg-future-accent/10 font-future"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-future text-future-accent">50K+</div>
                <div className="text-sm text-future-silver font-future">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold font-future text-future-accent">1M+</div>
                <div className="text-sm text-future-silver font-future">Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold font-future text-future-accent">99.9%</div>
                <div className="text-sm text-future-silver font-future">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-96">
              
              {/* Central Orb */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-to-r from-future-primary to-future-accent rounded-full animate-glow relative">
                  <div className="absolute inset-4 bg-future-dark rounded-full flex items-center justify-center">
                    <Zap className="w-12 h-12 text-future-accent animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Orbiting Elements */}
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="absolute w-16 h-16 glass rounded-xl flex items-center justify-center animate-float border border-future-accent/30"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateX(120px) rotate(-${index * 90}deg)`,
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <feature.icon className="w-6 h-6 text-future-accent" />
                </div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full">
                {features.map((_, index) => (
                  <line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + 30 * Math.cos(index * Math.PI / 2)}%`}
                    y2={`${50 + 30 * Math.sin(index * Math.PI / 2)}%`}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                ))}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--future-primary))" stopOpacity="0" />
                    <stop offset="50%" stopColor="hsl(var(--future-accent))" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="hsl(var(--future-glow))" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-future-accent to-transparent rounded-full" />
      </div>
    </div>
  );
};