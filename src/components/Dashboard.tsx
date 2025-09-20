import VestingCard from "./VestingCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Clock, DollarSign, Plus, Eye, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const vestingData = [
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
      title: "Seed Round",
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
    }
  ];

  const stats = [
    {
      title: "Total Locked Value",
      value: "$2.4M",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Active Schedules",
      value: "24",
      change: "+3",
      icon: Shield,
      trend: "up"
    },
    {
      title: "Next Release",
      value: "182d",
      change: "-1d",
      icon: Clock,
      trend: "down"
    },
    {
      title: "Performance",
      value: "98.2%",
      change: "+0.8%",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2 digital-text">Investor Dashboard</h2>
              <p className="text-muted-foreground">Monitor your encrypted vesting schedules and token allocations</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/vesting">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </Link>
              <Link to="/create-schedule">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold digital-text">{stat.value}</p>
                  <p className={`text-sm font-mono ${
                    stat.trend === 'up' ? 'text-success' : 'text-warning'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Vesting Cards */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Active Vesting Schedules</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vestingData.map((vesting, index) => (
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
    </section>
  );
};

export default Dashboard;