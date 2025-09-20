import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VestingCard from "@/components/VestingCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download } from "lucide-react";

const MyVesting = () => {
  const myVestingSchedules = [
    {
      title: "Team Allocation",
      totalTokens: "1,000,000 VEST",
      vestedTokens: "250,000 VEST", 
      progress: 25,
      timeRemaining: "547 days",
      isLocked: false,
      nextRelease: "Q2 2025"
    },
    {
      title: "Seed Round Investment",
      totalTokens: "500,000 VEST",
      vestedTokens: "100,000 VEST",
      progress: 20,
      timeRemaining: "182 days",
      isLocked: true,
      nextRelease: "Mar 15"
    },
    {
      title: "Advisory Board",
      totalTokens: "200,000 VEST", 
      vestedTokens: "80,000 VEST",
      progress: 40,
      timeRemaining: "365 days",
      isLocked: false,
      nextRelease: "Q1 2025"
    },
    {
      title: "Private Sale Round",
      totalTokens: "750,000 VEST",
      vestedTokens: "0 VEST",
      progress: 0,
      timeRemaining: "90 days",
      isLocked: true,
      nextRelease: "Dec 15"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-6">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 digital-text">My Vesting Schedules</h1>
            <p className="text-muted-foreground mb-6">
              Manage and track your encrypted token vesting schedules
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Create Schedule
              </Button>
              <Button variant="secondary">
                <FileText className="w-4 h-4 mr-2" />
                Import Schedule
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card p-6">
              <h3 className="text-sm text-muted-foreground mb-2">Total Vested</h3>
              <p className="text-2xl font-bold digital-text">430,000 VEST</p>
              <p className="text-sm text-success">+25,000 this month</p>
            </Card>
            <Card className="glass-card p-6">
              <h3 className="text-sm text-muted-foreground mb-2">Pending Release</h3>
              <p className="text-2xl font-bold digital-text">1,270,000 VEST</p>
              <p className="text-sm text-warning">182 days remaining</p>
            </Card>
            <Card className="glass-card p-6">
              <h3 className="text-sm text-muted-foreground mb-2">Active Schedules</h3>
              <p className="text-2xl font-bold digital-text">4</p>
              <p className="text-sm text-muted-foreground">2 locked, 2 active</p>
            </Card>
          </div>

          {/* Vesting Schedules Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Vesting Schedules</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myVestingSchedules.map((vesting, index) => (
                <VestingCard
                  key={index}
                  title={vesting.title}
                  totalTokens={vesting.totalTokens}
                  vestedTokens={vesting.vestedTokens}
                  progress={vesting.progress}
                  timeRemaining={vesting.timeRemaining}
                  isLocked={vesting.isLocked}
                  nextRelease={vesting.nextRelease}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyVesting;