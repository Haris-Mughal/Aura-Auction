import { useState } from 'react';
import { Upload, X, Check, AlertTriangle, Shield, Eye, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SellerMarketDashboard from '@/components/SellerMarketDashboard';
import MyListings from '@/components/MyListings';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  title: string;
  description: string;
  condition: string;
  priceRange: string;
  shippingLabel: string;
  authenticityScore: number;
  confidence: number;
  redFlags: string[];
}

const Seller = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [editedFields, setEditedFields] = useState<Partial<AnalysisResult>>({});
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (uploadedImages.length + files.length > 5) {
      toast({
        title: "Upload limit exceeded",
        description: "You can upload maximum 5 images",
        variant: "destructive"
      });
      return;
    }
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAIAnalysis = async () => {
    if (uploadedImages.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload at least one image to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const imagePromises = uploadedImages.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const base64Images = await Promise.all(imagePromises);

      const systemPrompt = `You are an expert product analyst for an auction website. Based on the provided images, generate a detailed analysis of the product. Your response must be a valid JSON object only, without any markdown formatting, comments, or other text. The JSON object must have the following structure:
{
  "title": "A concise and appealing title for the product.",
  "description": "A detailed and enticing description of the product, highlighting its key features, history, and appeal.",
  "condition": "A single word describing the condition (e.g., Mint, Excellent, Good, Fair, Poor).",
  "priceRange": "An estimated price range for the auction (e.g., '$500 - $800').",
  "shippingLabel": "A suggested shipping category (e.g., 'Standard', 'Fragile', 'High-Value Insured Shipping').",
  "authenticityScore": "A score from 0 to 100 representing the confidence in the item's authenticity.",
  "confidence": "A score from 0 to 100 on how confident you are in this analysis.",
  "redFlags": ["A list of potential issues or concerns, if any."]
}`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "https://aura-auction.com",
          "X-Title": "Aura Auction",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528:free",
          "messages": [
            {
              "role": "user",
              "content": [
                { "type": "text", "text": systemPrompt },
                ...base64Images.map(url => ({ "type": "image_url", "image_url": { "url": url } }))
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`API Error (${response.status}): ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const aiContent = data.choices[0].message.content;
      
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("AI response did not contain valid JSON.");
      }
      const cleanedJson = jsonMatch[0];

      const parsedResult: AnalysisResult = JSON.parse(cleanedJson);
      
      setAnalysisResult(parsedResult);

    } catch (error) {
      console.error("Error during AI analysis:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "AI Analysis Failed",
        description: "You can now enter the details manually.",
        variant: "destructive",
      });
      setManualMode(true);
      setAnalysisResult({
        title: "",
        description: "",
        condition: "",
        priceRange: "",
        shippingLabel: "",
        authenticityScore: 0,
        confidence: 0,
        redFlags: [],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFieldEdit = (field: keyof AnalysisResult, value: string | number) => {
    setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentValue = (field: keyof AnalysisResult) => {
    return editedFields[field] !== undefined ? editedFields[field] : analysisResult?.[field];
  };

  const handlePublish = () => {
    toast({
      title: "Listing Published!",
      description: "Your item has been successfully listed on Aura Auction.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="listing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listing" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Create Listing
            </TabsTrigger>
            <TabsTrigger value="my-listings" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              My Listings
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Market Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listing">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upload Section */}
            <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Product Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">Drop images here or click to upload</p>
                    <p className="text-sm text-muted-foreground mb-4">Upload 1-5 high-quality images (PNG, JPG)</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        Choose Images
                      </label>
                    </Button>
                  </div>
                  
                  {uploadedImages.length > 0 && !analysisResult && (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleAIAnalysis}
                        className="w-full"
                        disabled={isAnalyzing || uploadedImages.length === 0}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                      </Button>
                      <Button
                        onClick={() => {
                          setManualMode(true);
                          setAnalysisResult({
                            title: "", description: "", condition: "", priceRange: "",
                            shippingLabel: "", authenticityScore: 0, confidence: 0, redFlags: []
                          });
                        }}
                        className="w-full"
                        variant="outline"
                      >
                        Enter Manually
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis Loading */}
            {isAnalyzing && (
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <Shield className="w-8 h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <h3 className="text-xl font-semibold">Aura AI is analyzing your item...</h3>
                    <p className="text-muted-foreground text-center">
                      Our AI is examining your images for authenticity, condition, and market value
                    </p>
                    <Progress value={75} className="w-full max-w-md" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    AI Analysis Complete
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                    <Input
                      value={getCurrentValue('title') as string}
                      onChange={(e) => handleFieldEdit('title', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <Textarea
                      value={getCurrentValue('description') as string}
                      onChange={(e) => handleFieldEdit('description', e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  {/* Condition & Price Range */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Condition</label>
                      <Input
                        value={getCurrentValue('condition') as string}
                        onChange={(e) => handleFieldEdit('condition', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Price Range</label>
                      <Input
                        value={getCurrentValue('priceRange') as string}
                        onChange={(e) => handleFieldEdit('priceRange', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Shipping Label */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Shipping Category</label>
                    <Input
                      value={getCurrentValue('shippingLabel') as string}
                      onChange={(e) => handleFieldEdit('shippingLabel', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Publish Button */}
                  <Button onClick={handlePublish} className="w-full h-12 text-lg font-semibold">
                    One-Click Publish to Aura Auction
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* AI Report Sidebar */}
          {analysisResult && (
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    AI Analysis Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Authenticity Score */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Authenticity Score</span>
                      <span className="text-2xl font-bold text-green-500">
                        {analysisResult.authenticityScore}%
                      </span>
                    </div>
                    <Progress value={analysisResult.authenticityScore} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">
                      High confidence in authenticity
                    </p>
                  </div>

                  <Separator />

                  {/* AI Confidence */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">AI Confidence</span>
                      <span className="text-lg font-semibold">
                        {analysisResult.confidence}%
                      </span>
                    </div>
                    <Progress value={analysisResult.confidence} className="h-2" />
                  </div>

                  <Separator />

                  {/* Red Flags */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Potential Concerns
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.redFlags.map((flag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2 text-green-700 dark:text-green-400">
                      Trust Indicators
                    </h4>
                     <ul className="text-xs space-y-1 text-green-600 dark:text-green-300">
                       <li>✓ Serial number verified</li>
                       <li>✓ Material composition matches</li>
                       <li>✓ Age-appropriate wear patterns</li>
                       <li>✓ Manufacturing details correct</li>
                     </ul>
                   </div>
                 </CardContent>
               </Card>
             </div>
           )}
         </div>
           </TabsContent>

           <TabsContent value="my-listings">
             <MyListings />
           </TabsContent>
           <TabsContent value="market">
             <SellerMarketDashboard />
           </TabsContent>
         </Tabs>
       </main>

       <Footer />
     </div>
   );
 };

 export default Seller;