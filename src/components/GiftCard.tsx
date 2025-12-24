import { useEffect, useRef, useState } from "react";
import { Sparkles, Star, Share2 } from "lucide-react";
import html2canvas from "html2canvas";

import { getNextQuote, Quote } from "@/data/quotes";
import CelebrationBoom from "./CelebrationBoom";
import ScratchCard from "./ScratchCard";
import { toast } from "@/hooks/use-toast";

interface GiftCardProps {
  onReveal?: () => void;
}

const CARD_WIDTH = 360;

/* ======================================================
   🎁 PURE CARD VIEW (NO SCRATCH, NO ANIMATION)
   ====================================================== */
const CardView = ({ quote }: { quote: Quote | null }) => {
  return (
    <div
      className="relative rounded-3xl overflow-hidden text-white"
      style={{ width: CARD_WIDTH }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/christmas-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 p-6 min-h-[280px] flex flex-col items-center justify-center border-2 border-secondary/30 rounded-3xl">
        <Sparkles className="w-10 h-10 text-secondary mb-4" />

        <blockquote className="text-center mb-6">
          <p className="font-display text-lg italic leading-relaxed">
            “{quote?.text}”
          </p>
        </blockquote>

        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-secondary" />
          <span className="text-sm">Praise the Lord! Ave Maria</span>
          <Star className="w-4 h-4 text-secondary" />
        </div>

        <div className="text-center">
          <p className="font-display font-bold text-secondary">Lourdes</p>
          <p className="text-xs">A R Sugir’s Greetings 🎄</p>
        </div>
      </div>
    </div>
  );
};

/* ======================================================
   🎄 MAIN COMPONENT
   ====================================================== */
const GiftCard = ({ onReveal }: GiftCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // 👉 Hidden clean card reference (FOR IMAGE CAPTURE ONLY)
  const captureRef = useRef<HTMLDivElement>(null);

  // Load quote
  useEffect(() => {
    setQuote(getNextQuote());
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    setShowCelebration(true);
    onReveal?.();
  };

  /* ======================================================
     📸 SHARE AS IMAGE (CLEAN & STABLE)
     ====================================================== */
  const shareImage = async () => {
    if (!captureRef.current) return;

    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        width: CARD_WIDTH,
        windowWidth: CARD_WIDTH,
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) return;

      const file = new File([blob], "christmas-blessing.png", {
        type: "image/png",
      });

      // 📱 Mobile native share
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Christmas Blessing",
        });
      } else {
        // 💻 Desktop download fallback
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "christmas-blessing.png";
        a.click();
        URL.revokeObjectURL(url);

        toast({
          title: "Image saved 📸",
          description: "You can now share it on social media.",
        });
      }
    } catch (error) {
      toast({
        title: "Share failed ❌",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CelebrationBoom isActive={showCelebration} />

      {/* ===================== UI CARD ===================== */}
      <div className="w-full flex justify-center px-4">
        {!isRevealed ? (
          <ScratchCard onReveal={handleReveal}>
            <CardView quote={quote} />
          </ScratchCard>
        ) : (
          <div className="space-y-4">
            <CardView quote={quote} />

            <button
              onClick={shareImage}
              className="mx-auto px-8 py-3 bg-gradient-to-r from-primary to-christmas-red-dark text-primary-foreground rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition"
            >
              <Share2 className="w-5 h-5" />
              Share Blessing
            </button>
          </div>
        )}
      </div>

      {/* ===================== HIDDEN CAPTURE CARD ===================== */}
      <div
        ref={captureRef}
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: CARD_WIDTH,
          pointerEvents: "none",
        }}
      >
        <CardView quote={quote} />
      </div>
    </>
  );
};

export default GiftCard;
