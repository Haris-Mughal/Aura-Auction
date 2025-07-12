import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import MobileChatBubble from "@/components/MobileChatBubble";
import FloatingCTA from "@/components/FloatingCTA";
import { useNotifications } from "@/hooks/useNotifications";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bot, User, Settings, DollarSign, Clock, Target, CheckCircle, AlertCircle, TrendingUp, Send } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
}

interface NegotiationStatus {
  isActive: boolean;
  currentOffer: number;
  targetPrice: number;
  confidence: number;
  rounds: number;
  timeElapsed: string;
}

export default function AINegotiation() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to AI Negotiation. Configure your agent settings and start negotiating for the best deal.',
      timestamp: new Date()
    }
  ]);
  
  const [priceCeiling, setPriceCeiling] = useState([800]);
  const [urgency, setUrgency] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [negotiationStatus, setNegotiationStatus] = useState<NegotiationStatus>({
    isActive: false,
    currentOffer: 950,
    targetPrice: 800,
    confidence: 78,
    rounds: 0,
    timeElapsed: "0m"
  });
  const [dealConfirmed, setDealConfirmed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartNegotiation = () => {
    if (!urgency || !style) return;
    
    setIsConfigured(true);
    setNegotiationStatus(prev => ({ ...prev, isActive: true }));
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: `🤖 AI Agent activated! I'll negotiate for the vintage watch with a maximum budget of $${priceCeiling[0]}. Using ${style} approach with ${urgency} urgency. Let me start the negotiation...`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);

    // Simulate negotiation messages
    setTimeout(() => {
      const negotiationMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "💬 Contacting seller... Initial offer: $950. This is above your ceiling. Let me counter with $750 to start strong.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, negotiationMessage]);
      setNegotiationStatus(prev => ({ ...prev, rounds: 1, timeElapsed: "30s" }));
    }, 2000);

    setTimeout(() => {
      const updateMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: "📈 Seller countered with $850. This is still above your limit, but within negotiation range. Confidence rising to 82%. Proposing $780...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, updateMessage]);
      setNegotiationStatus(prev => ({ 
        ...prev, 
        rounds: 2, 
        timeElapsed: "1m 15s", 
        confidence: 82,
        currentOffer: 850 
      }));
    }, 5000);

    setTimeout(() => {
      const finalMessage: Message = {
        id: (Date.now() + 3).toString(),
        type: 'ai',
        content: "🎉 Success! Seller accepted $795 - just under your ceiling! Deal secured with authenticity guarantee and free shipping.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, finalMessage]);
      setNegotiationStatus(prev => ({ 
        ...prev, 
        isActive: false,
        rounds: 3, 
        timeElapsed: "2m 30s", 
        confidence: 95,
        currentOffer: 795 
      }));
      setDealConfirmed(true);
    }, 8000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStyleIcon = (style: string) => {
    switch (style) {
      case 'aggressive': return '⚡';
      case 'patient': return '🧘';
      case 'smart': return '🧠';
      default: return '🤖';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-br from-background to-muted/20 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Negotiation Assistant</h1>
            <p className="text-muted-foreground">Let your AI agent negotiate the best deals while you relax</p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Agent Configuration
                </CardTitle>
                <CardDescription>
                  Set up your AI negotiation preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Price Ceiling */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <label className="text-sm font-medium">Price Ceiling</label>
                  </div>
                  <div className="px-2">
                    <Slider
                      value={priceCeiling}
                      onValueChange={setPriceCeiling}
                      max={1500}
                      min={100}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>$100</span>
                      <span className="font-medium">${priceCeiling[0]}</span>
                      <span>$1500</span>
                    </div>
                  </div>
                </div>

                {/* Urgency */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <label className="text-sm font-medium">Urgency Level</label>
                  </div>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Take time to find best deal</SelectItem>
                      <SelectItem value="medium">Medium - Balanced approach</SelectItem>
                      <SelectItem value="high">High - Close deal quickly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Negotiation Style */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <label className="text-sm font-medium">Negotiation Style</label>
                  </div>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aggressive">⚡ Aggressive - Push hard for lowest price</SelectItem>
                      <SelectItem value="patient">🧘 Patient - Wait for seller to lower price</SelectItem>
                      <SelectItem value="smart">🧠 Smart - Use market data strategically</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleStartNegotiation}
                  disabled={!urgency || !style || negotiationStatus.isActive}
                  className="w-full"
                  size="lg"
                >
                  {negotiationStatus.isActive ? "Negotiating..." : "Start AI Negotiation"}
                </Button>
              </CardContent>
            </Card>

            {/* Live Status */}
            {isConfigured && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Live Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant={negotiationStatus.isActive ? "default" : dealConfirmed ? "secondary" : "outline"}>
                      {negotiationStatus.isActive ? "Active" : dealConfirmed ? "Completed" : "Ready"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Offer:</span>
                    <span className="font-semibold">${negotiationStatus.currentOffer}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Your Limit:</span>
                    <span className="font-semibold">${negotiationStatus.targetPrice}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Confidence:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${negotiationStatus.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{negotiationStatus.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rounds:</span>
                    <span className="font-semibold">{negotiationStatus.rounds}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time:</span>
                    <span className="font-semibold">{negotiationStatus.timeElapsed}</span>
                  </div>

                  {urgency && style && (
                    <div className="pt-2 border-t space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Urgency:</span>
                        <Badge variant="outline" className={getUrgencyColor(urgency)}>
                          {urgency}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Style:</span>
                        <Badge variant="outline">
                          {getStyleIcon(style)} {style}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Negotiation Chat
                </CardTitle>
                <CardDescription>
                  Real-time updates from your AI negotiation agent
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type !== 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={
                            message.type === 'ai' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }>
                            {message.type === 'ai' ? <Bot className="h-4 w-4" /> : 'S'}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`rounded-lg p-3 max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : message.type === 'ai'
                          ? 'bg-blue-50 text-blue-900 border border-blue-200'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      
                      {message.type === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Deal Confirmation */}
                {dealConfirmed && (
                  <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        Deal Confirmed!
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-700 font-medium">Final Price:</span>
                          <div className="text-green-900 font-semibold">$795</div>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">You Saved:</span>
                          <div className="text-green-900 font-semibold">$155 (16%)</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-green-800">Deal Highlights:</h4>
                        <ul className="text-xs text-green-700 space-y-1">
                          <li>• Authenticity guarantee included</li>
                          <li>• Free shipping & insurance</li>
                          <li>• 30-day return policy</li>
                          <li>• Original box and papers included</li>
                        </ul>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        Complete Purchase
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Floating CTA for starting negotiation */}
      <FloatingCTA 
        onClick={() => handleStartNegotiation()}
        variant={negotiationStatus.isActive ? "destructive" : "default"}
        position="bottom-center"
        className="md:hidden w-auto px-6 py-3 text-sm font-semibold"
      >
        <Bot className="w-4 h-4 mr-2" />
        {negotiationStatus.isActive ? 'Negotiating...' : 'Start AI Agent'}
      </FloatingCTA>
      
      <Footer />
    </div>
  );
}