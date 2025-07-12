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

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI analysis result
    const mockResult: AnalysisResult = {
      title: "Vintage Rolex Submariner Watch - Authentic 1980s",
      description: "A stunning vintage Rolex Submariner from the 1980s featuring the classic black dial and bezel. This timepiece shows excellent condition with minimal wear on the bracelet and crystal. The automatic movement keeps accurate time, and all original components are intact including the crown and case back.",
      condition: "Excellent",
      priceRange: "$8,500 - $12,000",
      shippingLabel: "High-Value Insured Shipping",
      authenticityScore: 94,
      confidence: 89,
      redFlags: ["Minor bracelet wear", "Age-related patina on dial"]
    };
    
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="listing" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Create Listing
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
                    <Button 
                      onClick={simulateAIAnalysis} 
                      className="w-full"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "Analyzing with Aura AI..." : "Analyze with Aura AI"}
                    </Button>
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