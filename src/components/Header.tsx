import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import hourglassLogo from "@/assets/hourglass-logo.png";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-gradient-surface">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={hourglassLogo} 
                alt="VestSecure" 
                className="w-10 h-10 pulse-glow"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold digital-text">VestSecure</h1>
              <p className="text-sm text-muted-foreground">Private Vesting for Teams and Investors</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-sm text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="/vesting" className="text-sm text-foreground hover:text-primary transition-colors">
              My Vesting
            </a>
            <a href="/analytics" className="text-sm text-foreground hover:text-primary transition-colors">
              Analytics
            </a>
          </nav>

          {/* Connect Wallet Button */}
          <Button className="bg-gradient-primary hover:opacity-90 font-mono" size="sm">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;