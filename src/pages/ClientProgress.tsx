
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle2, AlertCircle, TrendingUp, Target, Zap } from "lucide-react";

export default function ClientProgress() {
  const projectProgress = [
    {
      phase: "DISCOVERY & PLANNING",
      status: "completed",
      progress: 100,
      startDate: "Jan 15, 2024",
      endDate: "Feb 15, 2024",
      tasks: ["Requirements gathering", "UI/UX Design", "Architecture planning"],
      color: "green"
    },
    {
      phase: "DEVELOPMENT PHASE 1",
      status: "in-progress",
      progress: 75,
      startDate: "Feb 16, 2024",
      endDate: "Apr 15, 2024",
      tasks: ["User authentication", "Dashboard setup", "Basic features"],
      color: "blue"
    },
    {
      phase: "DEVELOPMENT PHASE 2",
      status: "pending",
      progress: 0,
      startDate: "Apr 16, 2024",
      endDate: "Jun 15, 2024",
      tasks: ["Advanced features", "API integration", "Testing"],
      color: "purple"
    }
  ];

  const milestones = [
    { name: "PROJECT KICKOFF", date: "Jan 15, 2024", status: "completed", color: "green" },
    { name: "DESIGN APPROVAL", date: "Feb 10, 2024", status: "completed", color: "green" },
    { name: "MVP DELIVERY", date: "Mar 30, 2024", status: "in-progress", color: "orange" },
    { name: "BETA TESTING", date: "May 15, 2024", status: "pending", color: "blue" },
    { name: "FINAL DELIVERY", date: "Jun 30, 2024", status: "pending", color: "purple" }
  ];

  const getPhaseGradient = (color: string) => {
    switch (color) {
      case 'green': return 'bg-gradient-to-r from-green-400 to-emerald-500';
      case 'blue': return 'bg-gradient-to-r from-blue-400 to-cyan-500';
      case 'purple': return 'bg-gradient-to-r from-purple-400 to-pink-500';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  const getMilestoneColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500 shadow-green-200';
      case 'orange': return 'bg-orange-500 shadow-orange-200';
      case 'blue': return 'bg-blue-500 shadow-blue-200';
      case 'purple': return 'bg-purple-500 shadow-purple-200';
      default: return 'bg-gray-500 shadow-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <style>{`
        .neo-button {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 10px 10px 0px #000000 !important;
        }
        
        .neo-card {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }
        
        .progress-card {
          border: 3px solid #000000 !important;
          box-shadow: 6px 6px 0px #000000 !important;
        }
        
        .timeline-dot {
          border: 3px solid #000000 !important;
          box-shadow: 4px 4px 0px #000000 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="neo-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
            PROJECT PROGRESS
          </h1>
          <p className="text-indigo-100 font-bold text-lg">Track your project development in real-time</p>
        </div>

        {/* Overall Progress */}
        <Card className="neo-card bg-white">
          <CardHeader className="border-b-4 border-black bg-gradient-to-r from-cyan-100 to-blue-100">
            <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              OVERALL PROGRESS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-gray-900 uppercase">PROJECT COMPLETION</span>
                <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">58%</span>
              </div>
              <div className="relative">
                <Progress value={58} className="h-6 neo-card border-3 border-black bg-gray-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 h-6 rounded-none" 
                     style={{ width: '58%', clipPath: 'inset(0 42% 0 0)' }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="progress-card bg-gradient-to-br from-green-100 to-emerald-100 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                    <div className="text-3xl font-black text-green-600">12</div>
                  </div>
                  <div className="text-sm font-bold text-gray-700 uppercase">COMPLETED TASKS</div>
                </div>
                <div className="progress-card bg-gradient-to-br from-orange-100 to-yellow-100 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-8 h-8 text-orange-600" />
                    <div className="text-3xl font-black text-orange-600">8</div>
                  </div>
                  <div className="text-sm font-bold text-gray-700 uppercase">IN PROGRESS</div>
                </div>
                <div className="progress-card bg-gradient-to-br from-purple-100 to-pink-100 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-8 h-8 text-purple-600" />
                    <div className="text-3xl font-black text-purple-600">15</div>
                  </div>
                  <div className="text-sm font-bold text-gray-700 uppercase">PENDING</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Phases */}
        <Card className="neo-card bg-white">
          <CardHeader className="border-b-4 border-black bg-gradient-to-r from-purple-100 to-pink-100">
            <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              PROJECT PHASES
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {projectProgress.map((phase, index) => (
                <div key={index} className="progress-card bg-white p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 uppercase mb-3">{phase.phase}</h3>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-base font-bold text-gray-600">
                          {phase.startDate} - {phase.endDate}
                        </span>
                      </div>
                    </div>
                    <Badge className={`font-black border-2 border-black shadow-[4px_4px_0px_#000] ${
                      phase.status === 'completed' ? 'bg-green-500' :
                      phase.status === 'in-progress' ? 'bg-orange-500' : 'bg-purple-500'
                    } text-white text-sm px-4 py-2`}>
                      {phase.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="relative mb-6">
                    <Progress value={phase.progress} className="h-4 neo-card border-2 border-black bg-gray-200" />
                    <div className={`absolute inset-0 h-4 ${getPhaseGradient(phase.color)} rounded-none`}
                         style={{ width: `${phase.progress}%`, clipPath: `inset(0 ${100-phase.progress}% 0 0)` }} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-3 p-3 bg-gray-50 neo-card">
                        <CheckCircle2 className={`w-5 h-5 ${
                          phase.status === 'completed' ? 'text-green-500' :
                          phase.status === 'in-progress' ? 'text-orange-500' : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-bold text-gray-700 uppercase">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Milestones with Timeline */}
        <Card className="neo-card bg-white">
          <CardHeader className="border-b-4 border-black bg-gradient-to-r from-orange-100 to-red-100">
            <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-600" />
              PROJECT MILESTONES
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-4 bottom-4 w-1 bg-gradient-to-b from-green-400 via-orange-400 to-purple-400 neo-card"></div>
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-6 relative">
                    <div className={`timeline-dot w-8 h-8 rounded-full ${getMilestoneColor(milestone.color)} flex-shrink-0 z-10`} />
                    <div className="flex-1 progress-card bg-gradient-to-r from-white to-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-black text-gray-900 uppercase text-lg">{milestone.name}</h4>
                          <p className="text-base font-bold text-gray-600 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {milestone.date}
                          </p>
                        </div>
                        <Badge className={`font-black border-2 border-black shadow-[4px_4px_0px_#000] ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in-progress' ? 'bg-orange-500' : 'bg-purple-500'
                        } text-white text-sm px-4 py-2`}>
                          {milestone.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
