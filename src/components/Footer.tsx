import { Clock, Github, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-gradient-surface mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl digital-text">VestSecure</h3>
            <p className="text-sm text-muted-foreground">
              Confidential token vesting platform with encrypted schedules and secure release mechanisms.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Vesting Schedules
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Analytics
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                API Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Security Audit
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Smart Contracts
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>

          {/* Encrypted Timers */}
          <div className="space-y-4">
            <h4 className="font-semibold">Network Status</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-success spin-slow" />
                <span className="text-sm text-encrypted">ETH: SYNCHRONIZED</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-primary spin-slow" />
                <span className="text-sm text-encrypted">BSC: ACTIVE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-warning spin-slow" />
                <span className="text-sm text-encrypted">MATIC: SYNCING</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 VestSecure. All rights reserved. 
              <span className="text-encrypted font-mono ml-2">[ENCRYPTED]</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;