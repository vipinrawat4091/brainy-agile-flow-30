
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Eye,
  Clock,
  CheckCircle,
  Circle,
  MessageSquare,
  Calendar,
  User,
  BarChart3
} from "lucide-react";

export default function ClientDashboard() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user_data');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Mock project data
  const projectProgress = {
    overall: 65,
    features: [
      {
        id: 1,
        name: "User Authentication",
        status: "completed",
        description: "Login and registration system with security features",
        completedDate: "2024-01-15"
      },
      {
        id: 2,
        name: "Dashboard Analytics",
        status: "in_progress",
        description: "Real-time analytics and reporting dashboard",
        progress: 80
      },
      {
        id: 3,
        name: "Team Collaboration",
        status: "in_progress",
        description: "Chat, file sharing, and collaboration tools",
        progress: 45
      },
      {
        id: 4,
        name: "Mobile App",
        status: "todo",
        description: "Native mobile application for iOS and Android"
      },
      {
        id: 5,
        name: "API Integration",
        status: "todo",
        description: "Third-party service integrations and API development"
      }
    ]
  };

  const recentUpdates = [
    {
      id: 1,
      message: "Dashboard Analytics feature is 80% complete",
      date: "2024-01-16",
      type: "progress"
    },
    {
      id: 2,
      message: "User Authentication system has been deployed",
      date: "2024-01-15",
      type: "completed"
    },
    {
      id: 3,
      message: "Team started working on collaboration features",
      date: "2024-01-14",
      type: "started"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-2 border-black font-bold';
      case 'in_progress':
        return 'bg-blue-500 text-white border-2 border-black font-bold';
      case 'todo':
        return 'bg-gray-300 text-gray-900 border-2 border-black font-bold';
      default:
        return 'bg-gray-300 text-gray-900 border-2 border-black font-bold';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'todo':
        return <Circle className="w-4 h-4 text-gray-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Eye className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-black text-gray-700 uppercase tracking-wide">Loading Client Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
        
        .feature-card {
          border: 3px solid #000000 !important;
          box-shadow: 6px 6px 0px #000000 !important;
        }
        
        .client-primary {
          background: linear-gradient(135deg, #00CC44 0%, #0066FF 100%) !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              CLIENT PORTAL
            </h1>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-gray-700 uppercase tracking-wide">Welcome,</span>
              <span className="text-lg font-black text-green-600 uppercase">{userData.full_name}</span>
            </div>
            <p className="text-base font-bold text-gray-600 uppercase tracking-wide">
              Project: {userData.project_name}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="neo-button bg-green-500 text-white font-black uppercase text-sm px-4 py-2">
              <Eye className="w-4 h-4 mr-2" />
              CLIENT VIEW
            </Badge>
            <Button className="neo-button bg-blue-600 text-white font-black uppercase hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              CONTACT MANAGER
            </Button>
          </div>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="neo-card bg-white">
            <CardHeader className="pb-3 border-b-4 border-black">
              <CardTitle className="text-lg font-black uppercase text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                OVERALL PROGRESS
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <Progress 
                  value={projectProgress.overall} 
                  className="h-4 border-2 border-black"
                />
                <p className="text-3xl font-black text-blue-600">
                  {projectProgress.overall}%
                </p>
                <p className="text-sm font-bold text-gray-900 uppercase">PROJECT COMPLETION</p>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="pb-3 border-b-4 border-black">
              <CardTitle className="text-lg font-black uppercase text-gray-900 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                COMPLETED
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <p className="text-3xl font-black text-green-600">
                  {projectProgress.features.filter(f => f.status === 'completed').length}
                </p>
                <p className="text-sm font-bold text-gray-900 uppercase">FEATURES DELIVERED</p>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="pb-3 border-b-4 border-black">
              <CardTitle className="text-lg font-black uppercase text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                IN PROGRESS
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <p className="text-3xl font-black text-blue-600">
                  {projectProgress.features.filter(f => f.status === 'in_progress').length}
                </p>
                <p className="text-sm font-bold text-gray-900 uppercase">ACTIVE FEATURES</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Status */}
        <Card className="neo-card bg-white">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="text-xl font-black uppercase text-gray-900">
              FEATURE DEVELOPMENT STATUS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {projectProgress.features.map((feature) => (
                <div key={feature.id} className="feature-card bg-gray-50 rounded-none p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {getStatusIcon(feature.status)}
                        <h3 className="font-black text-gray-900 uppercase text-lg">
                          {feature.name}
                        </h3>
                        <Badge className={getStatusColor(feature.status)}>
                          {feature.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm font-bold mb-3 uppercase">
                        {feature.description}
                      </p>
                      {feature.status === 'in_progress' && feature.progress && (
                        <div className="space-y-2">
                          <Progress 
                            value={feature.progress} 
                            className="h-3 border-2 border-black"
                          />
                          <p className="text-sm font-black text-blue-600 uppercase">
                            {feature.progress}% COMPLETE
                          </p>
                        </div>
                      )}
                      {feature.status === 'completed' && feature.completedDate && (
                        <p className="text-sm font-black text-green-600 uppercase">
                          COMPLETED ON {feature.completedDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card className="neo-card client-primary text-white">
          <CardHeader className="border-b-4 border-white">
            <CardTitle className="text-xl font-black uppercase text-white">
              RECENT UPDATES
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="flex items-start space-x-3 pb-3 border-b-2 border-white/30 last:border-b-0">
                  <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-white font-bold uppercase text-sm">{update.message}</p>
                    <p className="text-green-100 font-bold flex items-center mt-2 text-xs uppercase">
                      <Calendar className="w-4 h-4 mr-1" />
                      {update.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
