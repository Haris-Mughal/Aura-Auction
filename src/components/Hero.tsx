import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Users
} from "lucide-react";
import heroImage from "@/assets/hero-auction.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI Auction Platform" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Trust Badge */}
          <Badge className="mb-6 bg-success/10 text-success border-success/20 animate-fade-in">
            <Shield className="w-3 h-3 mr-1" />
            AI-Verified Trusted Platform
          </Badge>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8 animate-fade-in">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Aura
            </span>
            <br />
            <span className="text-foreground">Auction</span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-muted-foreground mb-12 max-w-3xl leading-relaxed animate-fade-in font-light">
            AI-native marketplace revolutionizing online auctions with intelligent authenticity, dynamic pricing, and personalized negotiation agents.
          </p>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            <div className="group p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">AI Authenticity Verification</h3>
              <p className="text-muted-foreground text-sm">Advanced AI algorithms verify product authenticity with 99.7% accuracy</p>
            </div>
            <div className="group p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-accent/30 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Dynamic Pricing</h3>
              <p className="text-muted-foreground text-sm">Real-time market analysis provides optimal pricing recommendations</p>
            </div>
            <div className="group p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-success/30 transition-all duration-300">
              <Users className="w-8 h-8 text-success mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Personalized AI Agents</h3>
              <p className="text-muted-foreground text-sm">Your dedicated AI negotiation agent handles bidding strategies</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in">
            <Button variant="premium" size="lg" className="group text-lg px-12 py-6 h-auto">
              <Sparkles className="w-6 h-6 mr-3" />
              Explore Aura Auctions
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-accent rounded-full opacity-30 animate-bounce hidden lg:block"></div>
      <div className="absolute bottom-40 right-40 w-8 h-8 bg-gradient-ai rounded-full opacity-40 animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-primary rounded-full opacity-20 animate-bounce delay-1000 hidden lg:block"></div>
    </section>
  );
};

export default Hero;