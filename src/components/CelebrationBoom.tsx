import { useEffect, useState } from "react";

interface CelebrationBoomProps {
  isActive: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  color: string;
  size: number;
  type: "circle" | "star" | "heart" | "sparkle";
}

const colors = [
  "hsl(350, 75%, 55%)", // Christmas red
  "hsl(45, 93%, 58%)",  // Gold
  "hsl(142, 70%, 50%)", // Green
  "hsl(0, 0%, 100%)",   // White
  "hsl(280, 70%, 60%)", // Purple
  "hsl(200, 80%, 60%)", // Blue
  "hsl(45, 90%, 70%)",  // Light gold
];

const CelebrationBoom = ({ isActive }: CelebrationBoomProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [rings, setRings] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      // Flash effect
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 400);

      // Create explosion rings
      setRings([1, 2, 3]);

      // Create particles
      const newParticles: Particle[] = [];
      const types: Particle["type"][] = ["circle", "star", "heart", "sparkle"];
      
      for (let i = 0; i < 150; i++) {
        newParticles.push({
          id: i,
          x: 50,
          y: 50,
          angle: (Math.random() * 360 * Math.PI) / 180,
          velocity: Math.random() * 6 + 6, // slower & smoother
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 15 + 5,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      setParticles(newParticles);

      // Clear after animation
      const timer = setTimeout(() => {
        setParticles([]);
        setRings([]);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive && particles.length === 0) return null;

  const getParticleShape = (type: Particle["type"]) => {
    switch (type) {
      case "star":
        return "⭐";
      case "heart":
        return "❤️";
      case "sparkle":
        return "✨";
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Flash effect */}
      {showFlash && (
        <div className="absolute inset-0 bg-secondary/30 animate-pulse" />
      )}

      {/* Explosion rings */}
      {rings.map((ring, i) => (
        <div
          key={ring}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 animate-explosion-ring"
          style={{
            borderColor: colors[i % colors.length],
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-explode"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            "--angle": `${particle.angle}rad`,
            "--velocity": `${particle.velocity}vw`,
            animationDuration: `${2.5 + Math.random() * 2}s`,
          } as React.CSSProperties}
        >
          {particle.type === "circle" ? (
            <div
              className="rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size}px ${particle.color}`,
              }}
            />
          ) : (
            <span style={{ fontSize: `${particle.size}px` }}>
              {getParticleShape(particle.type)}
            </span>
          )}
        </div>
      ))}

      {/* Celebration text */}
      {isActive && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 animate-celebration-text">
          <span className="text-4xl md:text-6xl font-display font-bold text-secondary drop-shadow-lg">
            🎉 Merry Christmas! & Happy New Year🎉
          </span>
        </div>
      )}
    </div>
  );
};

export default CelebrationBoom;
