
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  Calendar,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const productivityData = [
  { month: 'Jan', productivity: 75, velocity: 32, burndown: 85 },
  { month: 'Feb', productivity: 82, velocity: 38, burndown: 78 },
  { month: 'Mar', productivity: 78, velocity: 35, burndown: 82 },
  { month: 'Apr', productivity: 88, velocity: 42, burndown: 76 },
  { month: 'May', productivity: 92, velocity: 45, burndown: 71 },
  { month: 'Jun', productivity: 89, velocity: 41, burndown: 74 },
];

const teamPerformance = [
  { name: 'Frontend', completed: 24, pending: 6, efficiency: 89 },
  { name: 'Backend', completed: 18, pending: 4, efficiency: 92 },
  { name: 'Design', completed: 15, pending: 3, efficiency: 85 },
  { name: 'QA', completed: 21, pending: 5, efficiency: 87 },
];

const riskData = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 10, color: '#ef4444' },
];

export default function Analytics() {
  const stats = [
    {
      title: "Team Velocity",
      value: "42",
      change: "+12%",
      icon: Zap,
      trend: "up"
    },
    {
      title: "Sprint Completion",
      value: "89%",
      change: "+5%",
      icon: Target,
      trend: "up"
    },
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      icon: Activity,
      trend: "up"
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3",
      icon: Users,
      trend: "up"
    }
  ];

  const insights = [
    {
      type: "success",
      title: "Sprint Performance Improved",
      description: "Team velocity increased by 12% this month",
      icon: CheckCircle2,
      time: "2 hours ago"
    },
    {
      type: "warning",
      title: "Resource Bottleneck Detected",
      description: "Frontend team showing signs of overallocation",
      icon: AlertTriangle,
      time: "4 hours ago"
    },
    {
      type: "info",
      title: "New Milestone Approaching",
      description: "Q2 deadline in 2 weeks - 85% complete",
      icon: Calendar,
      time: "6 hours ago"
    }
  ];

  return (
    <div className="notion-content space-y-8">
      {/* Stats Overview */}
      <div className="notion-block">
        <h1 className="notion-heading-1 mb-6">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-notion-blue/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-notion-blue" />
                </div>
                <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="notion-block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Productivity Trend */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-notion-blue" />
                Productivity Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="productivity" 
                    stroke="hsl(var(--notion-blue))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--notion-blue))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-notion-blue" />
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="completed" fill="hsl(var(--notion-blue))" radius={4} />
                  <Bar dataKey="pending" fill="#e5e7eb" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Risk Analysis & AI Insights */}
      <div className="notion-block">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk Distribution */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-notion-blue" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {riskData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="lg:col-span-2 p-6">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-notion-blue" />
                  AI Insights
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      insight.type === 'success' ? 'bg-green-100 text-green-600' :
                      insight.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <insight.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground mb-1">{insight.title}</p>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{insight.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
