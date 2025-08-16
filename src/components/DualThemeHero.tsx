import { Button } from "@/components/ui/button-variants"
import { ShoppingBag, Sparkles, Leaf, Zap } from "lucide-react"
import traditionalHero from "@/assets/traditional-hero.jpg"
import futuristicHero from "@/assets/futuristic-hero.jpg"

const DualThemeHero = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Traditional Section */}
      <div className="flex-1 relative overflow-hidden bg-gradient-traditional-bg min-h-[50vh] lg:min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${traditionalHero})` }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center">
          <div className="animate-slide-up max-w-lg">
            <Leaf className="w-12 h-12 sm:w-16 sm:h-16 text-traditional-accent mb-4 sm:mb-6 animate-float mx-auto" />
            <h1 className="font-traditional text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-traditional-text mb-4">
              Heritage
              <span className="block text-traditional-primary">Crafted</span>
            </h1>
            <p className="font-traditional text-base sm:text-lg md:text-xl text-traditional-accent mb-6 sm:mb-8">
              Discover authentic handcrafted treasures that tell stories of tradition, 
              culture, and timeless artistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button variant="traditional" size="xl" className="w-full sm:w-auto">
                <ShoppingBag className="mr-2" />
                Explore Heritage
              </Button>
              <Button variant="traditional-outline" size="xl" className="w-full sm:w-auto">
                View Collection
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-traditional-gold/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-traditional-sage/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Futuristic Section */}
      <div className="flex-1 relative overflow-hidden bg-gradient-future-bg min-h-[50vh] lg:min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${futuristicHero})` }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center">
          <div className="animate-slide-up max-w-lg" style={{ animationDelay: '0.3s' }}>
            <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-future-accent mb-4 sm:mb-6 animate-glow mx-auto" />
            <h1 className="font-future text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-future-text mb-4 glow-text">
              FUTURE
              <span className="block text-future-accent">TECH</span>
            </h1>
            <p className="font-future text-base sm:text-lg md:text-xl text-future-silver mb-6 sm:mb-8">
              Experience cutting-edge technology that pushes boundaries and 
              redefines what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button variant="future" size="xl" className="w-full sm:w-auto">
                <Sparkles className="mr-2" />
                Explore Future
              </Button>
              <Button variant="future-outline" size="xl" className="w-full sm:w-auto">
                View Products
              </Button>
            </div>
          </div>
        </div>
        
        {/* Futuristic Decorative Elements */}
        <div className="absolute top-4 sm:top-10 right-4 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-future-primary/20 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-20 h-20 sm:w-28 sm:h-28 bg-future-accent/30 rounded-full blur-2xl animate-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-1 sm:w-2 h-12 sm:h-20 bg-future-glow/50 blur-sm animate-pulse hidden sm:block" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-10 sm:h-16 bg-future-accent/60 blur-sm animate-pulse hidden sm:block" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  )
}

export default DualThemeHero