import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Eye, Bot, Gavel, Timer, Shield, FileText, Bell, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { AuraReport } from "@/components/AuraReport";
import FloatingCTA from "@/components/FloatingCTA";
import { useNotifications } from "@/hooks/useNotifications";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroAuction from "@/assets/hero-auction.jpg";

const AuctionRoom = () => {
  const navigate = useNavigate();
  const { scheduleBidAlert } = useNotifications();
  const [showAuraReport, setShowAuraReport] = useState(false);
  const [userMode, setUserMode] = useState<"spectator" | "bidder">("spectator");
  const [autoBidEnabled, setAutoBidEnabled] = useState(false);
  const [maxBidAmount, setMaxBidAmount] = useState(5000);
  const [currentBid, setCurrentBid] = useState(3200);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
  const [lastBidder, setLastBidder] = useState("AI_Agent_007");
  const [bidHistory, setBidHistory] = useState([
    { bidder: "WatchCollector99", amount: 3000, time: "2m ago", isAI: false },
    { bidder: "AI_Agent_007", amount: 3200, time: "30s ago", isAI: true },
  ]);
  const [spectatorCount, setSpectatorCount] = useState(47);
  const [bidAnimation, setBidAnimation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const auctionItem = {
    id: "auction-001",
    name: "1969 Omega Speedmaster Professional",
    image: heroAuction,
    startingBid: 2500,
    currentBid: currentBid,
    trustScore: 94,
    seller: "VintageTimepieces_Pro",
    condition: "Excellent",
    description: "Rare 1969 Omega Speedmaster Professional 'Moonwatch' with original box and papers.",
  };

  // Simulate real-time bidding
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(prev => prev - 1);
        
        // Random bid activity
        if (Math.random() < 0.3) {
          const isAIBid = Math.random() < 0.6;
          const bidderName = isAIBid 
            ? `AI_Agent_${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`
            : `User${Math.floor(Math.random() * 99)}`;
          
          const newBid = currentBid + (Math.floor(Math.random() * 3) + 1) * 50;
          
          setCurrentBid(newBid);
          setLastBidder(bidderName);
          setBidAnimation(true);
          
          setBidHistory(prev => [
            { bidder: bidderName, amount: newBid, time: "now", isAI: isAIBid },
            ...prev.slice(0, 9)
          ]);

          // Show alert for significant bids
          if (newBid > currentBid + 100) {
            setAlertMessage(`New high bid: $${newBid.toLocaleString()}`);
            setShowAlert(true);
            
            // Send push notification
            scheduleBidAlert(
              auctionItem.name,
              newBid,
              formatTime(timeRemaining)
            ).catch(console.error);
            
            setTimeout(() => setShowAlert(false), 3000);
          }

          setTimeout(() => setBidAnimation(false), 1000);
        }

        // Auto-bid logic
        if (autoBidEnabled && userMode === "bidder" && Math.random() < 0.2) {
          if (currentBid < maxBidAmount - 100) {
            const myBid = currentBid + 50;
            setCurrentBid(myBid);
            setLastBidder("You (AI Agent)");
            setBidHistory(prev => [
              { bidder: "You (AI Agent)", amount: myBid, time: "now", isAI: true },
              ...prev.slice(0, 9)
            ]);
            setBidAnimation(true);
            setTimeout(() => setBidAnimation(false), 1000);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, currentBid, autoBidEnabled, maxBidAmount, userMode, auctionItem.name, scheduleBidAlert]);

  const placeBid = () => {
    if (userMode === "bidder") {
      const newBid = currentBid + 50;
      setCurrentBid(newBid);
      setLastBidder("You");
      setBidHistory(prev => [
        { bidder: "You", amount: newBid, time: "now", isAI: false },
        ...prev.slice(0, 9)
      ]);
      setBidAnimation(true);
      setTimeout(() => setBidAnimation(false), 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 30) return "text-red-500";
    if (timeRemaining <= 60) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pb-20 md:pb-4">
        <div className="mx-auto max-w-7xl px-2 md:px-4">
        {/* Header */}
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-1 md:gap-2 p-2 md:p-3"
            >
              <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden md:inline">Back</span>
            </Button>
            <div>
              <h1 className="text-lg md:text-2xl font-bold">Live Auction Room</h1>
              <p className="text-xs md:text-sm text-muted-foreground">Auction #{auctionItem.id}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Badge variant="outline" className="gap-1 text-xs">
              <Users className="h-2 w-2 md:h-3 md:w-3" />
              <span className="hidden md:inline">{spectatorCount} watching</span>
              <span className="md:hidden">{spectatorCount}</span>
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs">
              <Eye className="h-2 w-2 md:h-3 md:w-3" />
              Live
            </Badge>
          </div>
        </div>

        {/* Alert Banner */}
        {showAlert && (
          <div className="mb-4 animate-fade-in rounded-lg border border-green-200 bg-green-50 p-3 mx-2 md:mx-0">
            <div className="flex items-center gap-2 text-green-700">
              <Bell className="h-3 w-3 md:h-4 md:w-4" />
              <span className="font-medium text-sm md:text-base">{alertMessage}</span>
            </div>
          </div>
        )}

        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {/* Main Auction Area */}
          <div className="space-y-4 md:space-y-6 lg:col-span-2 px-2 md:px-0">
            {/* Item Display */}
            <Card className="overflow-hidden">
              <div className="aspect-video md:aspect-[4/3] relative">
                <img
                  src={auctionItem.image}
                  alt={auctionItem.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 md:top-4 left-2 md:left-4">
                  <Badge className="bg-green-500 text-xs md:text-sm">
                    <Shield className="mr-1 h-2 w-2 md:h-3 md:w-3" />
                    Trust Score: {auctionItem.trustScore}%
                  </Badge>
                </div>
                <div className="absolute top-2 md:top-4 right-2 md:right-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowAuraReport(true)}
                    className="gap-1 text-xs md:text-sm"
                  >
                    <FileText className="h-2 w-2 md:h-3 md:w-3" />
                    <span className="hidden md:inline">Aura Report</span>
                  </Button>
                </div>
              </div>
              <CardContent className="p-3 md:p-6">
                <h2 className="text-lg md:text-xl font-bold line-clamp-2">{auctionItem.name}</h2>
                <p className="text-muted-foreground text-sm md:text-base line-clamp-2 md:line-clamp-none">{auctionItem.description}</p>
                <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2 md:gap-4">
                  <Badge variant="outline" className="text-xs">Condition: {auctionItem.condition}</Badge>
                  <Badge variant="outline" className="text-xs hidden md:inline-flex">Seller: {auctionItem.seller}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Current Bid Display */}
            <Card className="border-2 border-primary">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs md:text-sm text-muted-foreground">Current Bid</p>
                    <p className={`text-2xl md:text-3xl font-bold transition-all duration-500 ${
                      bidAnimation ? 'scale-110 text-green-500' : ''
                    }`}>
                      ${currentBid.toLocaleString()}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      by {lastBidder}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-xs md:text-sm text-muted-foreground">Time Remaining</p>
                    <p className={`text-xl md:text-2xl font-bold ${getTimeColor()}`}>
                      {formatTime(timeRemaining)}
                    </p>
                    <div className="mt-1 md:mt-2">
                      {timeRemaining <= 60 && (
                        <Badge variant="destructive" className="animate-pulse text-xs">
                          <Timer className="mr-1 h-2 w-2 md:h-3 md:w-3" />
                          Final Minute!
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card className="hidden md:block">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Bid History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-48 md:max-h-64 overflow-y-auto">
                  {bidHistory.map((bid, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        {bid.isAI && <Bot className="h-4 w-4 text-blue-500" />}
                        <span className="font-medium">{bid.bidder}</span>
                        {bid.isAI && <Badge variant="outline">AI</Badge>}
                      </div>
                      <div className="text-right">
                        <span className="font-medium">${bid.amount.toLocaleString()}</span>
                        <p className="text-xs text-muted-foreground">{bid.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bidding Controls */}
          <div className="space-y-4 md:space-y-6 px-2 md:px-0">
            {/* Mode Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Participation Mode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Button
                    variant={userMode === "spectator" ? "default" : "outline"}
                    onClick={() => setUserMode("spectator")}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Spectator
                  </Button>
                  <Button
                    variant={userMode === "bidder" ? "default" : "outline"}
                    onClick={() => setUserMode("bidder")}
                    className="gap-2"
                  >
                    <Gavel className="h-4 w-4" />
                    Active Bidder
                  </Button>
                </div>
              </CardContent>
            </Card>

            {userMode === "bidder" && (
              <>
                {/* Manual Bidding */}
                <Card>
                  <CardHeader>
                    <CardTitle>Place Bid</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Next bid: ${(currentBid + 50).toLocaleString()}
                      </p>
                      <Button
                        onClick={placeBid}
                        className="w-full gap-2"
                        size="lg"
                      >
                        <Gavel className="h-4 w-4" />
                        Place Bid
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Auto-Bid */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      AI Auto-Bid Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enable Auto-Bid</span>
                      <Switch
                        checked={autoBidEnabled}
                        onCheckedChange={setAutoBidEnabled}
                      />
                    </div>
                    
                    {autoBidEnabled && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Max Bid Amount</label>
                          <div className="mt-1">
                            <input
                              type="number"
                              value={maxBidAmount}
                              onChange={(e) => setMaxBidAmount(Number(e.target.value))}
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              step={50}
                              min={currentBid + 50}
                            />
                          </div>
                        </div>
                        
                        <div className="rounded-lg bg-blue-50 p-3">
                          <div className="flex items-center gap-2 text-blue-700">
                            <Bot className="h-4 w-4" />
                            <span className="text-sm font-medium">AI Agent Active</span>
                          </div>
                          <p className="text-xs text-blue-600 mt-1">
                            Will bid automatically up to ${maxBidAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {/* Auction Info */}
            <Card>
              <CardHeader>
                <CardTitle>Auction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Starting Bid</span>
                  <span className="font-medium">${auctionItem.startingBid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bid Increment</span>
                  <span className="font-medium">$50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Bids</span>
                  <span className="font-medium">{bidHistory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">AI Agents Active</span>
                  <span className="font-medium">
                    {bidHistory.filter(b => b.isAI).length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Shield className="h-5 w-5" />
                  Trust & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Trust Score</span>
                    <span className="font-bold text-green-700">
                      {auctionItem.trustScore}%
                    </span>
                  </div>
                  <Progress value={auctionItem.trustScore} className="h-2" />
                  <div className="text-xs text-green-600 space-y-1">
                    <p>✓ Seller verified</p>
                    <p>✓ Item authenticated</p>
                    <p>✓ Secure payment escrow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Floating CTAs */}
      {userMode === "bidder" && (
        <FloatingCTA 
          onClick={placeBid}
          position="bottom-center"
          className="w-auto px-6 py-3 text-sm font-semibold"
        >
          <Gavel className="w-4 h-4 mr-2" />
          Bid ${(currentBid + 50).toLocaleString()}
        </FloatingCTA>
      )}

      {userMode === "spectator" && (
        <FloatingCTA 
          onClick={() => setUserMode("bidder")}
          position="bottom-center"
          variant="secondary"
          className="w-auto px-6 py-3 text-sm font-semibold"
        >
          <Eye className="w-4 h-4 mr-2" />
          Join Bidding
        </FloatingCTA>
      )}

      {/* Aura Report Modal */}
      {showAuraReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <AuraReport />
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowAuraReport(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default AuctionRoom;