import { useEffect, useState } from "react";
import { Gift } from "lucide-react";

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

interface FloatingIcon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  type: "santa" | "gift" | "tree" | "snowman";
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    // Generate stars
    const newStars: Star[] = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 1,
      });
    }
    setStars(newStars);

    // Generate floating icons
    const iconTypes: FloatingIcon["type"][] = ["santa", "gift", "tree", "snowman"];
    const newIcons: FloatingIcon[] = [];
    for (let i = 0; i < 12; i++) {
      newIcons.push({
        id: i,
        left: Math.random() * 90 + 5,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        type: iconTypes[Math.floor(Math.random() * iconTypes.length)],
      });
    }
    setIcons(newIcons);
  }, []);

  const getIcon = (type: FloatingIcon["type"]) => {
    switch (type) {
      case "santa":
        return "🎅";
      case "gift":
        return "🎁";
      case "tree":
        return "🎄";
      case "snowman":
        return "⛄";
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-night-dark via-night to-night-dark">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-snow animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Big glowing stars */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`big-star-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            fontSize: "16px",
            animationDelay: `${i * 0.5}s`,
          }}
        >
          ⭐
        </div>
      ))}

      {/* Floating festive icons */}
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute animate-float-up opacity-60"
          style={{
            left: `${icon.left}%`,
            bottom: "-50px",
            fontSize: "32px",
            animationDelay: `${icon.delay}s`,
            animationDuration: `${icon.duration}s`,
          }}
        >
          {getIcon(icon.type)}
        </div>
      ))}

      {/* Moon glow */}
      <div 
        className="absolute top-10 right-10 w-20 h-20 rounded-full bg-snow/20 blur-xl"
        style={{
          boxShadow: "0 0 60px 30px hsl(45 93% 80% / 0.2)",
        }}
      />
    </div>
  );
};

export default StarryBackground;
