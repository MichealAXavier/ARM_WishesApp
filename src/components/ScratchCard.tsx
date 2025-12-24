import { useRef, useState, useEffect, TouchEvent, MouseEvent } from "react";

interface ScratchCardProps {
  onReveal: () => void;
  children: React.ReactNode;
}

const ScratchCard = ({ onReveal, children }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [dimensions] = useState({ width: 320, height: 320 });

  /* ---------------- DRAW SCRATCH LAYER ---------------- */
  const drawScratchLayer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Background
    ctx.fillStyle = "hsl(350, 75%, 45%)";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Vertical ribbon
    ctx.fillStyle = "hsl(45, 93%, 58%)";
    ctx.fillRect(dimensions.width / 2 - 20, 0, 40, dimensions.height);

    // Horizontal ribbon
    ctx.fillRect(0, dimensions.height / 2 - 20, dimensions.width, 40);

    // Bow
    ctx.beginPath();
    ctx.arc(dimensions.width / 2, dimensions.height / 2, 35, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(45, 93%, 65%)";
    ctx.fill();

    // Dots
    ctx.fillStyle = "hsl(350, 80%, 50%)";
    for (let i = 0; i < dimensions.width; i += 30) {
      for (let j = 0; j < dimensions.height; j += 30) {
        if (
          Math.abs(i - dimensions.width / 2) > 25 &&
          Math.abs(j - dimensions.height / 2) > 25
        ) {
          ctx.beginPath();
          ctx.arc(i, j, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Text
    ctx.font = "bold 24px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Scratch to", dimensions.width / 2, dimensions.height / 2 - 60);
    ctx.fillText("Reveal! 🎁", dimensions.width / 2, dimensions.height / 2 + 80);
  };

  /* ---------------- INIT (IMPORTANT) ---------------- */
  useEffect(() => {
    // Delay fixes Safari / Samsung blank canvas
    const timer = setTimeout(drawScratchLayer, 100);
    window.addEventListener("resize", drawScratchLayer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", drawScratchLayer);
    };
  }, []);

  /* ---------------- POSITION ---------------- */
  const getPos = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  /* ---------------- SCRATCH ---------------- */
  const scratch = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isRevealed) return;

    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const pos = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;

    for (let i = 3; i < imageData.data.length; i += 16) {
      if (imageData.data[i] === 0) transparent++;
    }

    const percentage =
      (transparent / (canvas.width * canvas.height / 4)) * 100;

    setScratchPercentage(percentage);

    if (percentage > 40 && !isRevealed) {
      setIsRevealed(true);
      onReveal();
    }
  };

  if (isRevealed) return <>{children}</>;

  return (
    <div>
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="text-7xl mb-1">🎅</div>
        <h2 className="text-2xl font-bold">
          உங்கள் பரிசைப் பெற ஸ்க்ராட்ச் செய்யுங்கள்
        </h2>
      </div>

      {/* IMPORTANT: fixed height */}
      <div
        className="relative mx-auto"
        style={{ width: 320, height: 320 }}
      >
        {/* Hidden content */}
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl overflow-hidden">
          {children}
        </div>

        {/* Scratch canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 rounded-3xl shadow-2xl"
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseMove={scratch}
          onTouchStart={() => setIsDrawing(true)}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={scratch}
          style={{
            touchAction: "none",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default ScratchCard;
