import Navigation from "@/components/Navigation"
import DualThemeHero from "@/components/DualThemeHero"
import FeaturedProducts from "@/components/FeaturedProducts"

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <DualThemeHero />
        <FeaturedProducts />
      </main>
    </div>
  )
}

export default Index