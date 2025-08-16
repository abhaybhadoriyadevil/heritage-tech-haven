import { Button } from "@/components/ui/button-variants"
import { ShoppingBag, Sparkles, Leaf, Zap } from "lucide-react"
import traditionalHero from "@/assets/traditional-hero.jpg"
import futuristicHero from "@/assets/futuristic-hero.jpg"

const DualThemeHero = () => {
  return (
    <div className="split-screen">
      {/* Traditional Section */}
      <div className="split-left relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${traditionalHero})` }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="animate-slide-up">
            <Leaf className="w-16 h-16 text-traditional-accent mb-6 animate-float" />
            <h1 className="font-traditional text-5xl md:text-6xl font-bold text-traditional-text mb-4">
              Heritage
              <span className="block text-traditional-primary">Crafted</span>
            </h1>
            <p className="font-traditional text-xl text-traditional-accent mb-8 max-w-md">
              Discover authentic handcrafted treasures that tell stories of tradition, 
              culture, and timeless artistry.
            </p>
            <div className="space-y-4">
              <Button variant="traditional" size="xl" className="mr-4">
                <ShoppingBag className="mr-2" />
                Explore Heritage
              </Button>
              <Button variant="traditional-outline" size="xl">
                View Collection
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-traditional-gold/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-traditional-sage/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Futuristic Section */}
      <div className="split-right relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${futuristicHero})` }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Zap className="w-16 h-16 text-future-accent mb-6 animate-glow" />
            <h1 className="font-future text-5xl md:text-6xl font-bold text-future-text mb-4 glow-text">
              FUTURE
              <span className="block text-future-accent">TECH</span>
            </h1>
            <p className="font-future text-xl text-future-silver mb-8 max-w-md">
              Experience cutting-edge technology that pushes boundaries and 
              redefines what's possible.
            </p>
            <div className="space-y-4">
              <Button variant="future" size="xl" className="mr-4">
                <Sparkles className="mr-2" />
                Explore Future
              </Button>
              <Button variant="future-outline" size="xl">
                View Products
              </Button>
            </div>
          </div>
        </div>
        
        {/* Futuristic Decorative Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-future-primary/20 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-future-accent/30 rounded-full blur-2xl animate-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-2 h-20 bg-future-glow/50 blur-sm animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-16 bg-future-accent/60 blur-sm animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  )
}

export default DualThemeHero