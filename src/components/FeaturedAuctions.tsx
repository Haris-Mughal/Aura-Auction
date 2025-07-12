import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  TrendingUp, 
  Eye, 
  Heart,
  Shield,
  Sparkles,
  Users
} from "lucide-react";

const FeaturedAuctions = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const auctions = [
    {
      id: 1,
      title: "Vintage Rolex Submariner",
      category: "Luxury Watches",
      currentBid: "$18,500",
      timeLeft: "2h 34m",
      bidders: 23,
      image: "/api/placeholder/300/200",
      verified: true,
      aiConfidence: 98,
      trending: true
    },
    {
      id: 2,
      title: "Original Picasso Sketch",
      category: "Fine Art",
      currentBid: "$125,000",
      timeLeft: "1d 12h",
      bidders: 47,
      image: "/api/placeholder/300/200",
      verified: true,
      aiConfidence: 95,
      trending: false
    },
    {
      id: 3,
      title: "Tesla Model S Plaid",
      category: "Automobiles",
      currentBid: "$89,900",
      timeLeft: "5h 18m",
      bidders: 156,
      image: "/api/placeholder/300/200",
      verified: true,
      aiConfidence: 99,
      trending: true
    },
    {
      id: 4,
      title: "Rare Pokemon Cards Set",
      category: "Collectibles",
      currentBid: "$2,850",
      timeLeft: "3h 45m",
      bidders: 89,
      image: "/api/placeholder/300/200",
      verified: true,
      aiConfidence: 92,
      trending: false
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Featured Auctions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Live
            </span>{" "}
            <span className="text-foreground">Bidding</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover premium items with AI-verified authenticity and real-time market insights
          </p>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {auctions.map((auction) => (
            <Card 
              key={auction.id} 
              className="group hover:shadow-premium transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                {/* Placeholder Image */}
                <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">
                    {auction.category}
                  </div>
                </div>
                
                {/* Overlay Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {auction.verified && (
                    <Badge className="bg-success/90 text-success-foreground border-0">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {auction.trending && (
                    <Badge className="bg-accent/90 text-accent-foreground border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                  onClick={() => toggleFavorite(auction.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(auction.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                </Button>

                {/* AI Confidence */}
                <div className="absolute bottom-3 right-3">
                  <Badge variant="outline" className="bg-background/80 border-ai-primary/20 text-ai-primary">
                    AI {auction.aiConfidence}%
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {auction.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{auction.category}</p>
                </div>

                <div className="space-y-3">
                  {/* Current Bid */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Bid</span>
                    <span className="font-bold text-lg text-primary">{auction.currentBid}</span>
                  </div>

                  {/* Time & Bidders */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-warning">
                      <Clock className="w-3 h-3 mr-1" />
                      {auction.timeLeft}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-3 h-3 mr-1" />
                      {auction.bidders} bidders
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      Place Bid
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Auctions
            <TrendingUp className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuctions;