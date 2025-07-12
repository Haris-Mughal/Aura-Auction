import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedAuctions from "@/components/FeaturedAuctions";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedAuctions />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
