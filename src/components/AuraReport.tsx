import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, AlertTriangle, Shield, TrendingUp, MapPin, Info } from "lucide-react";

interface AuraReportProps {
  productId?: string;
  className?: string;
}

export function AuraReport({ productId, className }: AuraReportProps) {
  // Mock data - in real app this would come from props or API
  const reportData = {
    authenticity: {
      score: 94,
      confidence: "Very High",
      verified: true,
      details: "AI analysis confirms authentic materials, craftsmanship patterns, and brand signatures match verified database."
    },
    condition: {
      rating: "Excellent",
      score: 8.5,
      prediction: "Like New",
      details: "Minor signs of wear consistent with age. No significant damage detected. All original components present."
    },
    issues: [
      { type: "minor", text: "Slight patina on metal components (expected for vintage)" },
      { type: "info", text: "Original packaging not included" }
    ],
    priceAnalysis: {
      estimated: "$450 - $650",
      confidence: 87,
      basis: "Based on 23 similar items sold in the last 90 days",
      trend: "stable"
    },
    provenance: {
      origin: "Switzerland, 1980s",
      authenticity: "Verified through brand registry",
      history: "Single owner, purchased from authorized dealer",
      certifications: ["Brand Authenticated", "Age Verified"]
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-50 border-green-200";
    if (score >= 70) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Why this is safe box */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Why this is safe</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>AI-verified authenticity with 94% confidence</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Secure escrow payment protection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Full money-back guarantee if not as described</span>
          </div>
        </CardContent>
      </Card>

      {/* Main Aura Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            Aura AI Report
          </CardTitle>
          <CardDescription>
            Comprehensive AI analysis for authenticity, condition, and value assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={["authenticity", "condition"]} className="w-full">
            
            {/* Authenticity Score */}
            <AccordionItem value="authenticity">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Authenticity Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreBg(reportData.authenticity.score)}`}>
                      {reportData.authenticity.score}%
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {reportData.authenticity.confidence}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                <div className="text-sm text-muted-foreground">
                  {reportData.authenticity.details}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Verified Authentic</span>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Condition Assessment */}
            <AccordionItem value="condition">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <Info className="h-5 w-5 text-blue-600" />
                    <span>Condition Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{reportData.condition.rating}</Badge>
                    <span className="text-sm font-semibold">{reportData.condition.score}/10</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                <div className="text-sm text-muted-foreground">
                  {reportData.condition.details}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${reportData.condition.score * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {reportData.condition.prediction}
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Flagged Issues */}
            <AccordionItem value="issues">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span>Flagged Issues</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {reportData.issues.length} items
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-2">
                {reportData.issues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                      issue.type === 'minor' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <span className="text-sm">{issue.text}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Price Analysis */}
            <AccordionItem value="price">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Price Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{reportData.priceAnalysis.estimated}</span>
                    <Badge variant="secondary">{reportData.priceAnalysis.confidence}% confident</Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-3">
                <div className="text-sm text-muted-foreground">
                  {reportData.priceAnalysis.basis}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Market trend: {reportData.priceAnalysis.trend}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Origin & Provenance */}
            <AccordionItem value="provenance">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span>Origin & Provenance</span>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    Verified
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Origin</div>
                    <div className="text-sm text-muted-foreground">{reportData.provenance.origin}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">History</div>
                    <div className="text-sm text-muted-foreground">{reportData.provenance.history}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Certifications</div>
                  <div className="flex flex-wrap gap-2">
                    {reportData.provenance.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}