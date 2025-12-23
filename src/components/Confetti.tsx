import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const colors = [
  "hsl(350, 75%, 45%)", // Christmas red
  "hsl(45, 93%, 58%)",  // Gold
  "hsl(142, 70%, 45%)", // Green
  "hsl(0, 0%, 100%)",   // White
  "hsl(350, 80%, 60%)", // Light red
  "hsl(45, 90%, 70%)",  // Light gold
];

interface ConfettiProps {
  isActive: boolean;
}

const Confetti = ({ isActive }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 100; i++) {
        newPieces.push({
          id: i,
          left: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 12 + 6,
          duration: Math.random() * 2 + 2,
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360,
        });
      }
      setPieces(newPieces);

      // Clear confetti after animation
      const timer = setTimeout(() => {
        setPieces([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti ${piece.duration}s ease-out ${piece.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
