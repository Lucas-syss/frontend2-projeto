import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductGrid from "@/components/ProductGrid";
import Statement from "@/components/Statement";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee/>
      <ProductGrid/>
      <Marquee/>
      <Statement/>
      <Footer />
    </div>
  );
};

export default Index;
