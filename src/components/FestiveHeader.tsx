import { Sparkles } from "lucide-react";

const FestiveHeader = () => {
  return (
    <header className="festive-header relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-shimmer" />
      <div className="relative z-10 flex items-center justify-center gap-3">
        <Sparkles className="w-6 h-6 sparkle" />
        <h1 className="festive-text">
          Happy Christmas & Happy New Year 2026
        </h1>
        <Sparkles className="w-6 h-6 sparkle" />
      </div>
    </header>
  );
};

export default FestiveHeader;
