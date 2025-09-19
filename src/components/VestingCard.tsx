import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Lock, Clock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VestingCardProps {
  title: string;
  totalTokens: string;
  vestedTokens: string;
  progress: number;
  timeRemaining: string;
  isLocked?: boolean;
  nextRelease?: string;
}

const VestingCard = ({ 
  title, 
  totalTokens, 
  vestedTokens, 
  progress, 
  timeRemaining, 
  isLocked = false,
  nextRelease 
}: VestingCardProps) => {
  const [isRevealed, setIsRevealed] = useState(!isLocked);

  return (
    <Card className="glass-card p-6 hover-glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        {isLocked && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsRevealed(!isRevealed)}
            className="text-text-encrypted hover:text-primary"
          >
            {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {!isRevealed ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <Lock className="w-8 h-8 text-text-encrypted" />
          </div>
          <div className="text-center">
            <p className="text-text-encrypted text-sm font-mono">
              [ENCRYPTED SCHEDULE]
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Vesting details hidden until release
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Allocation</p>
              <p className="text-lg font-mono digital-text">{totalTokens}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vested Amount</p>
              <p className="text-lg font-mono text-success">{vestedTokens}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Vesting Progress</span>
              <span className="text-sm font-mono text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-text-warning spin-slow" />
              <span className="text-sm text-text-warning font-mono">{timeRemaining}</span>
            </div>
            {nextRelease && (
              <span className="text-xs text-muted-foreground">
                Next: {nextRelease}
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default VestingCard;