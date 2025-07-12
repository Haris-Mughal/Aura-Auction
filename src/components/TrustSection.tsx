import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Brain, 
  Eye, 
  Lock,
  CheckCircle,
  Sparkles,
  Award,
  Users,
  TrendingUp
} from "lucide-react";

const TrustSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Authentication",
      description: "Advanced neural networks verify item authenticity with 99.7% accuracy",
      badge: "AI-Powered",
      color: "ai-primary"
    },
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "Multi-layer verification process ensures only trusted sellers participate",
      badge: "Verified",
      color: "success"
    },
    {
      icon: Eye,
      title: "Transparent Bidding",
      description: "Real-time bid tracking with complete transaction transparency",
      badge: "Live",
      color: "live-pulse"
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "Bank-grade encryption and escrow services protect every transaction",
      badge: "Secure",
      color: "primary"
    }
  ];

  const stats = [
    {
      icon: CheckCircle,
      value: "99.9%",
      label: "Authentication Accuracy",
      color: "success"
    },
    {
      icon: Users,
      value: "500K+",
      label: "Verified Users",
      color: "primary"
    },
    {
      icon: Award,
      value: "$2.3B",
      label: "Total Sales Volume",
      color: "accent"
    },
    {
      icon: TrendingUp,
      value: "24/7",
      label: "AI Monitoring",
      color: "ai-primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Shield className="w-3 h-3 mr-1" />
            Trust & Security
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Built on</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Trust
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of secure auctions with AI-driven verification and unparalleled transparency
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                
                <Badge variant="outline" className={`mb-3 border-${feature.color}/20 text-${feature.color}`}>
                  <Sparkles className="w-3 h-3 mr-1" />
                  {feature.badge}
                </Badge>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Certification */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 p-6 bg-muted/50 rounded-2xl border border-border/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">SOC 2 Certified</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">SSL Encrypted</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">A+ Rated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;