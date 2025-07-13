import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Filter, Star, Shield, Eye, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  trustScore: number;
  condition: string;
  aiTags: string[];
  seller: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'results';
  content: string;
  products?: Product[];
  timestamp: Date;
}

const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Rolex Submariner 1960s',
    price: 450,
    image: '/placeholder.svg',
    trustScore: 94,
    condition: 'Very Good',
    aiTags: ['Vintage', 'Luxury', 'Swiss Made', 'Collectible'],
    seller: 'WatchMaster_Pro'
  },
  {
    id: '2',
    title: 'Omega Speedmaster Professional',
    price: 380,
    image: '/placeholder.svg',
    trustScore: 89,
    condition: 'Good',
    aiTags: ['Professional', 'Moon Watch', 'Heritage'],
    seller: 'TimeCollector'
  },
  {
    id: '3',
    title: 'Seiko 5 Sports Vintage',
    price: 125,
    image: '/placeholder.svg',
    trustScore: 92,
    condition: 'Excellent',
    aiTags: ['Affordable', 'Reliable', 'Daily Wear'],
    seller: 'VintageSeiko'
  }
];

interface ChatSuggestion {
  type: string;
  label: string;
  icon: React.ElementType;
}

const chatSuggestions: ChatSuggestion[] = [
  { type: 'brand', label: 'Rolex', icon: Tag },
  { type: 'price', label: 'Under $300', icon: Filter },
  { type: 'condition', label: 'Excellent', icon: Star },
  { type: 'category', label: 'Luxury Watches', icon: Shield }
];

export default function Buyer() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your Aura AI assistant. What kind of items are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528:free",
          "messages": [
            { "role": "system", "content": "You are Aura AI, a helpful assistant for buyers on an auction site. Your goal is to help users find items they are looking for. You should be friendly and conversational. When you find items, list them clearly using markdown. If you are asked to find a variety of products under a certain price or a specific product, respond by saying you have found some items and are showing the best options." },
            { "role": "user", "content": currentInput }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API response was not ok.');
      }

      const data = await response.json();
      const aiContent = data.choices[0].message.content;

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiContent,
        timestamp: new Date()
      };
      
      // Simulate finding products if the AI mentions them
      if (aiContent.toLowerCase().includes("found") || aiContent.toLowerCase().includes("here are")) {
        const resultsMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          type: 'results',
          content: '',
          products: sampleProducts,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse, resultsMessage]);
      } else {
        setMessages(prev => [...prev, aiResponse]);
      }

    } catch (error) {
      console.error("Error fetching from AI:", error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: ChatSuggestion) => {
    setInput(suggestion.label);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="flex-shrink-0 w-80 hover-scale">
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg bg-muted"
          />
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            <Shield className="w-3 h-3 mr-1" />
            {product.trustScore}%
          </Badge>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <Badge variant="outline">{product.condition}</Badge>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.aiTags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground mb-3">
          Seller: {product.seller}
        </div>
        
        <Button variant="outline" className="w-full" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          View Aura Report
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Find your perfect items with AI assistance</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  Aura AI Assistant
                </h2>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'user' ? (
                      <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-md">
                        {message.content}
                      </div>
                    ) : message.type === 'ai' ? (
                      <div className="bg-muted rounded-lg px-4 py-2 max-w-md prose dark:prose-invert">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="flex gap-4 overflow-x-auto pb-4">
                          {message.products?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="text-sm text-muted-foreground ml-2">AI is searching...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for anything... 'vintage watches under $500'"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Chat Suggestions */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Quick Filters</h3>
                <div className="space-y-2">
                  {chatSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <suggestion.icon className="w-4 h-4 mr-2" />
                      {suggestion.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Search Tips</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div>• Be specific: "vintage Rolex under $1000"</div>
                  <div>• Use conditions: "excellent", "good", "fair"</div>
                  <div>• Try categories: "watches", "jewelry", "art"</div>
                  <div>• Ask for recommendations: "similar to..."</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}