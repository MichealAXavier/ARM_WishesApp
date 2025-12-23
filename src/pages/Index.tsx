import { useState, useEffect } from "react";
import FestiveHeader from "@/components/FestiveHeader";
import Footer from "@/components/Footer";
import Snowfall from "@/components/Snowfall";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import GiftCard from "@/components/GiftCard";
import StarryBackground from "@/components/StarryBackground";

const Index = () => {
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    // Check if user arrived via QR scan (URL has scanned=true parameter)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('scanned') === 'true') {
      setHasScanned(true);
    }
  }, []);

  const handleScan = () => {
    setHasScanned(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Starry night background */}
      <StarryBackground />
      
      {/* Snowfall animation */}
      <Snowfall />

      {/* Header */}
      <FestiveHeader />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center py-8 relative z-10">
        {!hasScanned ? (
          <QRCodeDisplay onScan={handleScan} />
        ) : (
          <GiftCard />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
