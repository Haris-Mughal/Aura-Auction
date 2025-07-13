import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LanguageToggle from "@/components/LanguageToggle";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Search, 
  User, 
  ShoppingBag, 
  Gavel, 
  Sparkles,
  Menu,
  X,
  LogOut
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between h-14 md:h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className={`flex items-center cursor-pointer space-x-2 ${isRTL ? 'space-x-reverse' : ''}`} onClick={() => navigate('/')}>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-ai rounded-lg flex items-center justify-center">
              <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              <TranslatedText text="Aura Auction" />
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            <button 
              onClick={() => navigate('/auction')}
              className="text-foreground hover:text-primary transition-colors"
            >
              <TranslatedText text="Live Auctions" />
            </button>
            <a href="#sell" className="text-foreground hover:text-primary transition-colors">
              <TranslatedText text="Sell" />
            </a>
            <button 
              onClick={() => navigate('/buy')}
              className="text-foreground hover:text-primary transition-colors"
            >
              <TranslatedText text="Buy" />
            </button>
            <button 
              onClick={() => navigate('/negotiate')}
              className="text-foreground hover:text-primary transition-colors"
            >
              <TranslatedText text="AI Negotiate" />
            </button>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              <TranslatedText text="About" />
            </a>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className={`hidden lg:flex items-center bg-muted rounded-lg px-3 py-2 w-64 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Search className={`w-4 h-4 text-muted-foreground ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <input
              type="text"
              placeholder=""
              className="bg-transparent outline-none text-sm flex-1"
            />
            <TranslatedText 
              text="Search with AI..." 
              as="div" 
              className="absolute flex items-center px-5 py-2 pointer-events-none text-sm text-muted-foreground"
            />
            <Badge variant="secondary" className="text-xs px-0">
              AI
            </Badge>
          </div>

          {/* Right Actions */}
          <div className={`flex items-center space-x-2 md:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <LanguageToggle />
            
            <Button variant="ghost" size="icon" className="relative hidden md:flex">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            
            {user ? (
              <Button variant="ghost" size="icon" className="hidden md:flex" onClick={signOut}>
                <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => navigate('/auth')}>
                <User className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            )}

            <Button size="sm" onClick={() => navigate('/sell')} className={`gap-1 md:gap-2 text-xs md:text-sm ${isRTL ? 'flex-row-reverse' : ''} hidden md:flex`}>
              <Gavel className="w-3 h-3 md:w-4 md:h-4" />
              <TranslatedText text="Start Selling" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <div className={`flex items-center bg-muted rounded-lg px-3 py-2 relative ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Search className={`w-4 h-4 text-muted-foreground ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <input
                  type="text"
                  className="bg-transparent outline-none text-sm flex-1"
                />
                <TranslatedText 
                  text="Search with AI..." 
                  as="div" 
                  className="absolute flex items-center px-5 py-2 pointer-events-none text-sm text-muted-foreground"
                />
              </div>
              
              <button 
                onClick={() => navigate('/auction')}
                className="text-foreground hover:text-primary transition-colors py-2 text-left"
              >
                <TranslatedText text="Live Auctions" />
              </button>
              <a href="#sell" className="text-foreground hover:text-primary transition-colors py-2">
                <TranslatedText text="Sell" />
              </a>
              <button 
                onClick={() => navigate('/buy')}
                className="text-foreground hover:text-primary transition-colors py-2 text-left"
              >
                <TranslatedText text="Buy" />
              </button>
              <button 
                onClick={() => navigate('/negotiate')}
                className="text-foreground hover:text-primary transition-colors py-2 text-left"
              >
                <TranslatedText text="AI Negotiate" />
              </button>
              <a href="#about" className="text-foreground hover:text-primary transition-colors py-2">
                <TranslatedText text="About" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
