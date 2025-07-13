import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Seller from "./pages/Seller";
import Buyer from "./pages/Buyer";
import AINegotiation from "./pages/AINegotiation";
import TransactionSummary from "./pages/TransactionSummary";
import AuctionRoom from "./pages/AuctionRoom";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/auction" element={<AuctionRoom />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
                <Route path="/sell" element={<Seller />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
                <Route path="/buy" element={<Buyer />} />
                <Route path="/negotiate" element={<AINegotiation />} />
                <Route path="/transaction/:id" element={<TransactionSummary />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
