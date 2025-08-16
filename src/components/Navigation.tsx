import { useState } from "react"
import { Button } from "@/components/ui/button-variants"
import { ShoppingCart, User, Menu, X, Search } from "lucide-react"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState<'traditional' | 'future' | 'both'>('both')

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              <span className="font-traditional text-traditional-primary">Heritage</span>
              <span className="font-future text-future-accent mx-1">×</span>
              <span className="font-future text-future-primary">TECH</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:flex items-center bg-black/20 rounded-full p-1">
            <Button
              variant={activeTheme === 'traditional' ? 'traditional' : 'ghost'}
              size="sm"
              onClick={() => setActiveTheme('traditional')}
              className="rounded-full"
            >
              Heritage
            </Button>
            <Button
              variant={activeTheme === 'both' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTheme('both')}
              className="rounded-full mx-1"
            >
              Both
            </Button>
            <Button
              variant={activeTheme === 'future' ? 'future' : 'ghost'}
              size="sm"
              onClick={() => setActiveTheme('future')}
              className="rounded-full"
            >
              FUTURE
            </Button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Products
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white">
              About
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Contact
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white relative">
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-future-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center mb-4">
                <div className="flex items-center bg-black/20 rounded-full p-1">
                  <Button
                    variant={activeTheme === 'traditional' ? 'traditional' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTheme('traditional')}
                    className="rounded-full text-xs"
                  >
                    Heritage
                  </Button>
                  <Button
                    variant={activeTheme === 'future' ? 'future' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTheme('future')}
                    className="rounded-full text-xs ml-1"
                  >
                    FUTURE
                  </Button>
                </div>
              </div>
              <Button variant="ghost" className="text-white/80 hover:text-white justify-start">
                Products
              </Button>
              <Button variant="ghost" className="text-white/80 hover:text-white justify-start">
                About
              </Button>
              <Button variant="ghost" className="text-white/80 hover:text-white justify-start">
                Contact
              </Button>
              <div className="flex justify-center space-x-4 pt-4">
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                  <User className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white relative">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 bg-future-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation