const Footer = () => {
  return (
    <footer className="w-full bg-card py-6 px-4 border-t border-border">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-christmas-red-dark flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-xl font-display">V</span>
          </div>
          <div className="text-center">
            <h3 className="font-display font-bold text-xl text-foreground tracking-wide">Lourdes</h3>
           
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          © 2026 Lourdes Season's Greetings! 🎄
        </p>
      </div>
    </footer>
  );
};

export default Footer;
