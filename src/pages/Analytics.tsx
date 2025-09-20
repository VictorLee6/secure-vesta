import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { TrendingUp, BarChart3, PieChart, Activity, Calendar, Target } from "lucide-react";

const Analytics = () => {
  const analyticsData = [
    {
      title: "Vesting Performance",
      value: "98.2%",
      change: "+2.1%",
      icon: TrendingUp,
      trend: "up",
      description: "Schedule completion rate"
    },
    {
      title: "Token Velocity",
      value: "47.3K",
      change: "+12.5%",
      icon: Activity,
      trend: "up", 
      description: "Monthly vested tokens"
    },
    {
      title: "Portfolio Growth",
      value: "$2.4M",
      change: "+8.7%",
      icon: BarChart3,
      trend: "up",
      description: "Total portfolio value"
    },
    {
      title: "Compliance Score",
      value: "100%",
      change: "0%",
      icon: Target,
      trend: "stable",
      description: "Regulatory compliance"
    }
  ];

  const vestingMetrics = [
    {
      period: "Q4 2024",
      scheduled: "125,000 VEST",
      released: "125,000 VEST",
      status: "Complete"
    },
    {
      period: "Q1 2025", 
      scheduled: "150,000 VEST",
      released: "0 VEST",
      status: "Pending"
    },
    {
      period: "Q2 2025",
      scheduled: "200,000 VEST", 
      released: "0 VEST",
      status: "Scheduled"
    },
    {
      period: "Q3 2025",
      scheduled: "175,000 VEST",
      released: "0 VEST", 
      status: "Scheduled"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 digital-text">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your vesting performance and portfolio metrics
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analyticsData.map((metric, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <metric.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`text-sm font-mono ${
                    metric.trend === 'up' ? 'text-success' : 
                    metric.trend === 'down' ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold digital-text mb-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Vesting Timeline Chart */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Vesting Timeline</h2>
              </div>
              <div className="space-y-4">
                {vestingMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-surface-glass/30 rounded-lg">
                    <div>
                      <p className="font-semibold">{metric.period}</p>
                      <p className="text-sm text-muted-foreground">Scheduled: {metric.scheduled}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">{metric.released}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        metric.status === 'Complete' ? 'bg-success/20 text-success' :
                        metric.status === 'Pending' ? 'bg-warning/20 text-warning' :
                        'bg-surface-glass text-muted-foreground'
                      }`}>
                        {metric.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Portfolio Distribution */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Portfolio Distribution</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Team Allocation</span>
                    <span className="font-mono">58.8%</span>
                  </div>
                  <div className="w-full bg-surface-glass/50 rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{width: '58.8%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Investment Rounds</span>
                    <span className="font-mono">29.4%</span>
                  </div>
                  <div className="w-full bg-surface-glass/50 rounded-full h-2">
                    <div className="bg-glow-secondary h-2 rounded-full" style={{width: '29.4%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Advisory Board</span>
                    <span className="font-mono">11.8%</span>
                  </div>
                  <div className="w-full bg-surface-glass/50 rounded-full h-2">
                    <div className="bg-text-success h-2 rounded-full" style={{width: '11.8%'}}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Performance Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-surface-glass/30 rounded-lg">
                <h3 className="text-sm text-muted-foreground mb-2">Average Release Time</h3>
                <p className="text-lg font-bold digital-text">2.3 days</p>
                <p className="text-xs text-success">15% faster than industry</p>
              </div>
              <div className="p-4 bg-surface-glass/30 rounded-lg">
                <h3 className="text-sm text-muted-foreground mb-2">Security Score</h3>
                <p className="text-lg font-bold digital-text">A+</p>
                <p className="text-xs text-success">Zero security incidents</p>
              </div>
              <div className="p-4 bg-surface-glass/30 rounded-lg">
                <h3 className="text-sm text-muted-foreground mb-2">Cost Efficiency</h3>
                <p className="text-lg font-bold digital-text">94.7%</p>
                <p className="text-xs text-success">Above industry average</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;