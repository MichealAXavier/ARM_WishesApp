import { TreePine, Gift, Star } from "lucide-react";

const FestiveDecorations = () => {
  return (
    <>
      {/* Left side decorations */}
      <div className="fixed left-4 top-1/4 opacity-30 pointer-events-none hidden md:block">
        <TreePine className="w-16 h-16 text-accent animate-float" />
      </div>
      <div className="fixed left-8 bottom-1/4 opacity-20 pointer-events-none hidden md:block">
        <Gift className="w-12 h-12 text-primary animate-float" style={{ animationDelay: "1s" }} />
      </div>

      {/* Right side decorations */}
      <div className="fixed right-4 top-1/3 opacity-30 pointer-events-none hidden md:block">
        <Gift className="w-14 h-14 text-secondary animate-float" style={{ animationDelay: "0.5s" }} />
      </div>
      <div className="fixed right-8 bottom-1/3 opacity-20 pointer-events-none hidden md:block">
        <TreePine className="w-12 h-12 text-accent animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Stars scattered */}
      <div className="fixed top-20 left-[20%] opacity-40 pointer-events-none">
        <Star className="w-6 h-6 text-secondary sparkle" />
      </div>
      <div className="fixed top-32 right-[25%] opacity-30 pointer-events-none">
        <Star className="w-4 h-4 text-secondary sparkle" style={{ animationDelay: "0.3s" }} />
      </div>
      <div className="fixed top-[60%] left-[10%] opacity-25 pointer-events-none">
        <Star className="w-5 h-5 text-secondary sparkle" style={{ animationDelay: "0.6s" }} />
      </div>
      <div className="fixed top-[70%] right-[15%] opacity-35 pointer-events-none">
        <Star className="w-4 h-4 text-secondary sparkle" style={{ animationDelay: "0.9s" }} />
      </div>
    </>
  );
};

export default FestiveDecorations;
