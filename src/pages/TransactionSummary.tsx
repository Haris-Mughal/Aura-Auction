import { useState } from "react";
import { ArrowLeft, Shield, Truck, CreditCard, CheckCircle, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TransactionSummary = () => {
  const navigate = useNavigate();
  const [transaction] = useState({
    id: "TX-2024-001",
    item: {
      name: "Vintage Rolex Submariner",
      image: "/api/placeholder/200/200",
      seller: "WatchMaster_Pro",
      condition: "Excellent"
    },
    agreedPrice: 8500,
    estimatedDelivery: "March 18-20, 2024",
    auraScore: 96,
    escrowStatus: "secured",
    steps: {
      authenticity: { completed: true, progress: 100 },
      shipping: { completed: false, progress: 65 },
      funds: { completed: false, progress: 0 }
    }
  });

  const getStepIcon = (completed: boolean, progress: number) => {
    if (completed) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (progress > 0) return <Clock className="h-5 w-5 text-blue-500" />;
    return <Clock className="h-5 w-5 text-muted-foreground" />;
  };

  const getStepStatus = (completed: boolean, progress: number) => {
    if (completed) return "Verified";
    if (progress > 0) return "In Progress";
    return "Pending";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="p-4">
        <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Transaction Summary</h1>
            <p className="text-muted-foreground">Order #{transaction.id}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Item Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src={transaction.item.image}
                    alt={transaction.item.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{transaction.item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Sold by {transaction.item.seller}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline">
                        Condition: {transaction.item.condition}
                      </Badge>
                      <Badge variant="default" className="bg-green-500">
                        <Shield className="mr-1 h-3 w-3" />
                        Aura Score: {transaction.auraScore}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Authenticity Finalization */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStepIcon(transaction.steps.authenticity.completed, transaction.steps.authenticity.progress)}
                      <span className="font-medium">Authenticity Finalization</span>
                    </div>
                    <Badge 
                      variant={transaction.steps.authenticity.completed ? "default" : "secondary"}
                      className={transaction.steps.authenticity.completed ? "bg-green-500" : ""}
                    >
                      {getStepStatus(transaction.steps.authenticity.completed, transaction.steps.authenticity.progress)}
                    </Badge>
                  </div>
                  <Progress value={transaction.steps.authenticity.progress} className="h-2" />
                  {transaction.steps.authenticity.completed && (
                    <p className="text-sm text-green-600">
                      ✓ Item authenticity verified by Aura AI and expert review
                    </p>
                  )}
                </div>

                {/* Shipping Confirmation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStepIcon(transaction.steps.shipping.completed, transaction.steps.shipping.progress)}
                      <span className="font-medium">Shipping Confirmation</span>
                    </div>
                    <Badge 
                      variant={transaction.steps.shipping.completed ? "default" : "secondary"}
                      className={transaction.steps.shipping.completed ? "bg-green-500" : ""}
                    >
                      {getStepStatus(transaction.steps.shipping.completed, transaction.steps.shipping.progress)}
                    </Badge>
                  </div>
                  <Progress value={transaction.steps.shipping.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Item shipped and tracking information provided
                  </p>
                </div>

                {/* Funds Release */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStepIcon(transaction.steps.funds.completed, transaction.steps.funds.progress)}
                      <span className="font-medium">Funds Release</span>
                    </div>
                    <Badge 
                      variant={transaction.steps.funds.completed ? "default" : "secondary"}
                      className={transaction.steps.funds.completed ? "bg-green-500" : ""}
                    >
                      {getStepStatus(transaction.steps.funds.completed, transaction.steps.funds.progress)}
                    </Badge>
                  </div>
                  <Progress value={transaction.steps.funds.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Funds will be released upon delivery confirmation
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Aura Authentication */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Shield className="h-5 w-5" />
                  Aura-Authenticated Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Authenticity Score</span>
                    <span className="text-lg font-bold text-green-600">
                      {transaction.auraScore}%
                    </span>
                  </div>
                  <div className="text-sm text-green-700">
                    <p>✓ AI verification completed</p>
                    <p>✓ Expert review confirmed</p>
                    <p>✓ Blockchain certificate issued</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Price Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Item Price</span>
                  <span className="font-medium">
                    ${transaction.agreedPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Aura Protection Fee</span>
                  <span className="font-medium">$85</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">$25</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(transaction.agreedPrice + 85 + 25).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Estimated Delivery</span>
                    <p className="font-medium">{transaction.estimatedDelivery}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Shipping Method</span>
                    <p className="font-medium">Express Insured</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Escrow Status */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <CreditCard className="h-5 w-5" />
                  Payment Escrow Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="default" className="bg-blue-500">
                    Funds Secured
                  </Badge>
                  <p className="text-sm text-blue-700">
                    Your payment is safely held in escrow until delivery is confirmed.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardContent className="pt-6">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TransactionSummary;