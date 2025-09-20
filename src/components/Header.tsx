import { WalletButton } from "@/components/WalletButton";
import MobileMenu from "@/components/MobileMenu";
import { Link } from "react-router-dom";
import hourglassLogo from "@/assets/hourglass-logo.png";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-gradient-surface">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
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
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-sm text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/vesting" className="text-sm text-foreground hover:text-primary transition-colors">
              My Vesting
            </Link>
            <Link to="/analytics" className="text-sm text-foreground hover:text-primary transition-colors">
              Analytics
            </Link>
          </nav>

          {/* Mobile Menu and Wallet Button */}
          <div className="flex items-center space-x-3">
            <MobileMenu />
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;