import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Aura Auction</span>
              </div>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                The world's most intelligent auction platform, where AI meets trust to create extraordinary marketplace experiences.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Marketplace Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Marketplace</h3>
              <div className="space-y-3">
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Live Auctions
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Buy Now Items
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Categories
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Trending
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  New Arrivals
                </a>
              </div>
            </div>

            {/* Sellers & Buyers */}
            <div>
              <h3 className="text-lg font-semibold mb-6">For Users</h3>
              <div className="space-y-3">
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Seller Dashboard
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Buyer Guide
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  AI Pricing Tools
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Authentication
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Success Stories
                </a>
              </div>
            </div>

            {/* Support & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary-foreground/60" />
                  <span className="text-primary-foreground/80 text-sm">help@auraauction.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary-foreground/60" />
                  <span className="text-primary-foreground/80 text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-primary-foreground/60" />
                  <span className="text-primary-foreground/80 text-sm">San Francisco, CA</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Help Center
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Trust & Safety
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-primary-foreground/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-primary-foreground/80 text-sm">
                Get exclusive access to premium auctions and AI insights
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-lg text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-accent/20 text-accent bg-transparent">
                AI-Powered
              </Badge>
              <Badge variant="outline" className="border-success/20 text-success bg-transparent">
                99.9% Uptime
              </Badge>
              <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground bg-transparent">
                SOC 2 Certified
              </Badge>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-primary-foreground/60 text-sm">
                © {currentYear} Aura Auction. All rights reserved.
              </p>
              <p className="text-primary-foreground/40 text-xs mt-1">
                Powered by Advanced AI Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;