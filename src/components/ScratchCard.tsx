import { useRef, useState, useEffect, TouchEvent, MouseEvent } from "react";
import { Gift, Sparkles, Star } from "lucide-react";

interface ScratchCardProps {
  onReveal: () => void;
  children: React.ReactNode;
}

const ScratchCard = ({ onReveal, children }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 320, height: 320 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create gift wrap pattern
    ctx.fillStyle = "hsl(350, 75%, 45%)";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Add golden ribbon vertical
    ctx.fillStyle = "hsl(45, 93%, 58%)";
    ctx.fillRect(dimensions.width / 2 - 20, 0, 40, dimensions.height);

    // Add golden ribbon horizontal
    ctx.fillRect(0, dimensions.height / 2 - 20, dimensions.width, 40);

    // Add bow in center
    ctx.beginPath();
    ctx.arc(dimensions.width / 2, dimensions.height / 2, 35, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(45, 93%, 65%)";
    ctx.fill();

    // Add pattern dots
    ctx.fillStyle = "hsl(350, 80%, 50%)";
    for (let i = 0; i < dimensions.width; i += 30) {
      for (let j = 0; j < dimensions.height; j += 30) {
        if (Math.abs(i - dimensions.width / 2) > 25 && Math.abs(j - dimensions.height / 2) > 25) {
          ctx.beginPath();
          ctx.arc(i, j, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Add text
    ctx.font = "bold 24px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Scratch to", dimensions.width / 2, dimensions.height / 2 - 60);
    ctx.fillText("Reveal! 🎁", dimensions.width / 2, dimensions.height / 2 + 80);
  }, [dimensions]);

  const getPos = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const pos = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percentage = (transparent / (dimensions.width * dimensions.height)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 40 && !isRevealed) {
      setIsRevealed(true);
      onReveal();
    }
  };

  const handleStart = () => setIsDrawing(true);
  const handleEnd = () => setIsDrawing(false);

  if (isRevealed) {
    return <>{children}</>;
  }

  return (
    <div>
    <div className="mb-6 animate-float flex flex-col items-center text-center leading-none">
    <div className="text-7xl mb-1 leading-none">🎅</div>
    <h2 className="font-display text-2xl md:text-3xl font-bold text-primary leading-tight">
    உங்கள் பரிசைப் பெற ஸ்க்ராட்ச் செய்யுங்கள்
    </h2>
    </div>


    <div className="relative w-full max-w-[320px] mx-auto">
      
      
      
      {/* Hidden content underneath */}
      <div className="absolute inset-0 flex items-center justify-center rounded-3xl overflow-hidden">
        {children}
      </div>
      
      {/* Scratch canvas overlay */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="relative z-10 rounded-3xl cursor-pointer touch-none shadow-2xl"
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onMouseMove={scratch}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onTouchMove={scratch}
        style={{
          boxShadow: "0 20px 60px -15px rgba(0,0,0,0.5), 0 0 30px hsl(45 93% 58% / 0.3)",
        }}
      />

      {/* Instructions */}
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <p className="text-snow/80 text-sm animate-pulse">
          ☝️ Scratch the gift to reveal your blessing!
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default ScratchCard;
