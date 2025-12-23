import { useState, useEffect } from "react";
import { Smartphone, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeDisplayProps {
  onScan: () => void;
}

const QRCodeDisplay = ({ onScan }: QRCodeDisplayProps) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Get the current page URL for QR code
    setCurrentUrl(window.location.href);
    
    // Listen for QR scan simulation (URL hash change or query param)
    const checkForScan = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('scanned') === 'true') {
        onScan();
      }
    };
    
    checkForScan();
    window.addEventListener('hashchange', checkForScan);
    return () => window.removeEventListener('hashchange', checkForScan);
  }, [onScan]);

  // Generate QR code URL with scan parameter
  const qrUrl = currentUrl ? `${currentUrl.split('?')[0]}?scanned=true` : "";

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Santa Claus Icon */}
      <div className="mb-6 animate-float">
        <div className="text-7xl">🎅</div>
      </div>

      {/* CTA Text */}
      <div className="bounce-gentle mb-8 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
          Scan to Get Your Gift
        </h2>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <Smartphone className="w-5 h-5" />
          Scan QR code with your phone camera
        </p>
      </div>

      {/* QR Code Container */}
      <div className="relative">
        {/* Decorative frame */}
        <div className="absolute -inset-4 bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl opacity-75 blur-lg" />
        
        <div className="relative bg-card p-6 rounded-2xl shadow-2xl border-4 border-secondary/30">
          {/* Corner sparkles */}
          <div className="absolute -top-3 -left-3">
            <Sparkles className="w-8 h-8 text-secondary sparkle" />
          </div>
          <div className="absolute -top-3 -right-3">
            <Sparkles className="w-8 h-8 text-secondary sparkle" style={{ animationDelay: "0.5s" }} />
          </div>
          <div className="absolute -bottom-3 -left-3">
            <Sparkles className="w-8 h-8 text-secondary sparkle" style={{ animationDelay: "0.3s" }} />
          </div>
          <div className="absolute -bottom-3 -right-3">
            <Sparkles className="w-8 h-8 text-secondary sparkle" style={{ animationDelay: "0.7s" }} />
          </div>

          {/* QR Code */}
          <div className="bg-card p-4 rounded-xl">
            {qrUrl ? (
              <QRCodeSVG
                value={qrUrl}
                size={200}
                level="H"
                includeMargin={false}
                fgColor="hsl(350, 75%, 45%)"
                bgColor="transparent"
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-muted animate-pulse rounded-lg" />
            )}
          </div>

          {/* Scan instruction */}
          <p className="text-center mt-4 text-sm text-muted-foreground font-medium">
            Point camera here
          </p>
        </div>
      </div>

      {/* Christmas Tree decoration */}
      <div className="mt-8 text-5xl animate-wiggle">
        🎄
      </div>
    </div>
  );
};

export default QRCodeDisplay;
