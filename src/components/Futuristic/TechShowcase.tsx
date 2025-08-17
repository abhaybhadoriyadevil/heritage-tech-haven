import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  Zap, 
  Shield, 
  Wifi, 
  Brain, 
  Rocket,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';

export const TechShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const technologies = [
    {
      id: 1,
      name: 'Quantum Computing',
      description: 'Revolutionary quantum processors that solve complex problems in milliseconds',
      icon: Cpu,
      features: ['1000x Faster', 'Error Correction', 'Quantum Supremacy'],
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600',
      stats: { performance: 99, efficiency: 95, innovation: 100 }
    },
    {
      id: 2,
      name: 'Neural Interfaces',
      description: 'Direct brain-computer interfaces for seamless digital interaction',
      icon: Brain,
      features: ['Thought Control', 'Real-time Processing', 'Neural Learning'],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600',
      stats: { performance: 95, efficiency: 88, innovation: 98 }
    },
    {
      id: 3,
      name: 'Fusion Energy',
      description: 'Clean, unlimited energy source powering the future civilization',
      icon: Zap,
      features: ['Zero Emissions', 'Unlimited Power', 'Safe Operation'],
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600',
      stats: { performance: 100, efficiency: 96, innovation: 95 }
    },
    {
      id: 4,
      name: 'Space Technology',
      description: 'Advanced propulsion systems for interplanetary exploration',
      icon: Rocket,
      features: ['Warp Drive', 'Ion Propulsion', 'Deep Space'],
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600',
      stats: { performance: 92, efficiency: 90, innovation: 99 }
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % technologies.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, technologies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % technologies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + technologies.length) % technologies.length);
  };

  const currentTech = technologies[currentSlide];

  return (
    <section className="py-20 bg-gradient-future-bg relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-future-primary via-transparent to-future-accent" />
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-future-glow rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-future-primary/20 backdrop-blur-sm border border-future-accent/30 rounded-full px-6 py-3 text-future-accent font-future mb-6">
            <Cpu className="w-5 h-5" />
            <span>Technology Showcase</span>
          </div>
          
          <h2 className="font-future text-4xl lg:text-6xl font-black text-future-text mb-4">
            NEXT-GEN
            <span className="block text-transparent bg-gradient-to-r from-future-primary via-future-accent to-future-glow bg-clip-text">
              INNOVATIONS
            </span>
          </h2>
          
          <p className="font-future text-lg text-future-silver max-w-3xl mx-auto">
            Explore breakthrough technologies that are reshaping our world and 
            defining the future of human civilization.
          </p>
        </div>

        {/* Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Technology Info */}
          <div className="space-y-8">
            
            {/* Current Tech Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-future-accent/20 rounded-2xl border border-future-accent/30 backdrop-blur-sm">
                  <currentTech.icon className="w-8 h-8 text-future-accent" />
                </div>
                <div>
                  <h3 className="font-future text-3xl font-bold text-future-text">
                    {currentTech.name}
                  </h3>
                  <Badge className="bg-future-primary/20 text-future-accent border-future-accent/30">
                    #{currentSlide + 1} of {technologies.length}
                  </Badge>
                </div>
              </div>
              
              <p className="font-future text-lg text-future-silver leading-relaxed">
                {currentTech.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="font-future text-xl font-semibold text-future-text">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentTech.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="future-card p-4 text-center transform hover:scale-105 transition-all duration-300"
                  >
                    <Shield className="w-6 h-6 text-future-accent mx-auto mb-2" />
                    <span className="font-future text-sm font-medium text-future-text">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="space-y-4">
              <h4 className="font-future text-xl font-semibold text-future-text">Performance Metrics</h4>
              <div className="space-y-3">
                {Object.entries(currentTech.stats).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-future text-sm text-future-silver capitalize">
                        {key}
                      </span>
                      <span className="font-future text-sm font-bold text-future-accent">
                        {value}%
                      </span>
                    </div>
                    <div className="h-2 bg-future-dark/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-future-primary to-future-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="future-button flex-1 font-future">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="glass border-future-accent/30 text-future-text hover:bg-future-accent/10 flex-1 font-future"
              >
                <Wifi className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </div>
          </div>

          {/* Visual Display */}
          <div className="relative">
            
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img 
                src={currentTech.image}
                alt={currentTech.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-future-dark/80 via-transparent to-future-primary/20" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass p-6 rounded-2xl border border-future-accent/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-future text-xl font-bold text-future-text">
                        {currentTech.name}
                      </h4>
                      <p className="font-future text-sm text-future-silver">
                        Advanced Technology
                      </p>
                    </div>
                    <currentTech.icon className="w-8 h-8 text-future-accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-future-accent/20 rounded-2xl backdrop-blur-sm border border-future-accent/30 flex items-center justify-center animate-float">
              <Zap className="w-8 h-8 text-future-accent" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-future-primary/20 rounded-xl backdrop-blur-sm border border-future-primary/30 flex items-center justify-center animate-glow">
              <Cpu className="w-6 h-6 text-future-primary" />
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-6">
          
          {/* Previous Button */}
          <Button 
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="glass border-future-accent/30 text-future-accent hover:bg-future-accent/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Play/Pause */}
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="glass border-future-accent/30 text-future-accent hover:bg-future-accent/10"
          >
            {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {technologies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-future-accent scale-125' 
                    : 'bg-future-silver/30 hover:bg-future-silver/50'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button 
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="glass border-future-accent/30 text-future-accent hover:bg-future-accent/10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};