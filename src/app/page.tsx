import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CategoryHighlights from "@/components/CategoryHighlights";
import ProductGrid from "@/components/ProductGrid";

import Craftsmanship from "@/components/Craftsmanship";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="absolute top-0 left-0 right-0 z-[60]">
        <AnnouncementBar />
      </div>
      <Navbar />
      <Hero />
      <TrustBar />
      <CategoryHighlights />
      <ProductGrid
        title="NEW ARRIVALS"
        subtitle="Discover the latest pieces for the season."
      />
      <Craftsmanship />
      <Footer />
    </div>
  );
};

export default Index;
