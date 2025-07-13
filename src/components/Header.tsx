import { useState, useEffect } from "react";
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
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search with AI...');
  const navigate = useNavigate();
  const { isRTL, translate, currentLanguage } = useLanguage();
  const { user, logout } = useAuth();

  useEffect(() => {
    const getPlaceholder = async () => {
      const translated = await translate('Search with AI...');
      setSearchPlaceholder(translated);
    };
    getPlaceholder();
  }, [currentLanguage, translate]);

  const handleMobileLinkClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between h-14 md:h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <button onClick={() => navigate('/')} className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-ai rounded-lg flex items-center justify-center">
              <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              <TranslatedText text="Aura Auction" />
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            {user && (
              <button onClick={() => navigate('/auction')} className="text-foreground hover:text-primary transition-colors"><TranslatedText text="Live Auctions" /></button>
            )}
            {user?.role === 'buyer' && (
              <button onClick={() => navigate('/buy')} className="text-foreground hover:text-primary transition-colors"><TranslatedText text="My Dashboard" /></button>
            )}
            {user?.role === 'seller' && (
              <button onClick={() => navigate('/sell')} className="text-foreground hover:text-primary transition-colors"><TranslatedText text="My Dashboard" /></button>
            )}
            {!user && (
              <>
                <button onClick={() => navigate('/auction')} className="text-foreground hover:text-primary transition-colors"><TranslatedText text="Live Auctions" /></button>
                <button onClick={() => navigate('/#about')} className="text-foreground hover:text-primary transition-colors"><TranslatedText text="About" /></button>
              </>
            )}
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className={`hidden lg:flex relative items-center bg-muted rounded-lg w-64 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={`bg-transparent outline-none text-sm flex-1 h-full py-2 ${isRTL ? 'pr-10 pl-8' : 'pl-10 pr-8'}`}
            />
            <Badge variant="secondary" className={`absolute top-1/2 -translate-y-1/2 text-xs ${isRTL ? 'left-2' : 'right-2'}`}>
              AI
            </Badge>
          </div>

          {/* Right Actions */}
          <div className={`flex items-center space-x-2 md:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <LanguageToggle />
            
            <Button variant="ghost" size="icon" className="relative hidden md:flex" onClick={() => user ? navigate('/cart') : navigate('/auth')}>
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-sm text-muted-foreground">
                  {user.email} ({user.role})
                </span>
                <Button variant="ghost" size="icon" className="hidden md:flex" onClick={logout}>
                  <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => navigate('/auth')}>
                <User className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            )}

            {user && user.role === 'seller' ? (
              <Button size="sm" onClick={() => navigate('/sell')} className={`gap-1 md:gap-2 text-xs md:text-sm ${isRTL ? 'flex-row-reverse' : ''} hidden md:flex`}>
                <Gavel className="w-3 h-3 md:w-4 md:h-4" />
                <TranslatedText text="Seller Dashboard" />
              </Button>
            ) : !user ? (
              <Button size="sm" onClick={() => navigate('/auth')} className={`gap-1 md:gap-2 text-xs md:text-sm ${isRTL ? 'flex-row-reverse' : ''} hidden md:flex`}>
                <User className="w-3 h-3 md:w-4 md:h-4" />
                <TranslatedText text="Get Started" />
              </Button>
            ) : null}

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
              <div className={`relative flex items-center bg-muted rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className={`bg-transparent outline-none text-sm w-full h-full py-2 ${isRTL ? 'pr-10' : 'pl-10'}`}
                />
              </div>
              
              {user && (
                <button onClick={() => handleMobileLinkClick('/auction')} className="text-foreground hover:text-primary transition-colors py-2 text-left"><TranslatedText text="Live Auctions" /></button>
              )}
              {user?.role === 'buyer' && (
                <button onClick={() => handleMobileLinkClick('/buy')} className="text-foreground hover:text-primary transition-colors py-2 text-left"><TranslatedText text="My Dashboard" /></button>
              )}
              {user?.role === 'seller' && (
                <button onClick={() => handleMobileLinkClick('/sell')} className="text-foreground hover:text-primary transition-colors py-2 text-left"><TranslatedText text="My Dashboard" /></button>
              )}
              {!user && (
                <>
                  <button onClick={() => handleMobileLinkClick('/auction')} className="text-foreground hover:text-primary transition-colors py-2 text-left"><TranslatedText text="Live Auctions" /></button>
                  <button onClick={() => handleMobileLinkClick('/#about')} className="text-foreground hover:text-primary transition-colors py-2 text-left"><TranslatedText text="About" /></button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;