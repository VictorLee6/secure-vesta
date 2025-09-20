import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/WalletButton";
import { Shield, Clock, Users, Lock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-glow-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-glow-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Private Vesting for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Teams and Investors
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Confidential token vesting with encrypted schedules. 
            Release details revealed only to beneficiaries at the right time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <WalletButton />
            <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10">
              View Demo
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 text-center">
              <Lock className="w-8 h-8 text-primary mx-auto mb-4 pulse-glow" />
              <h3 className="font-semibold mb-2">Encrypted Schedules</h3>
              <p className="text-sm text-muted-foreground">
                Vesting details remain confidential until release conditions are met
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-4 pulse-glow" />
              <h3 className="font-semibold mb-2">Multi-Party Support</h3>
              <p className="text-sm text-muted-foreground">
                Perfect for team members, advisors, and investor allocations
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-4 pulse-glow" />
              <h3 className="font-semibold mb-2">Time-Lock Security</h3>
              <p className="text-sm text-muted-foreground">
                Automated release based on blockchain timestamps and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;