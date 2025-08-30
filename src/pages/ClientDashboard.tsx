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
        return 'bg-green-500 text-white border border-black font-semibold text-xs';
      case 'in_progress':
        return 'bg-blue-500 text-white border border-black font-semibold text-xs';
      case 'todo':
        return 'bg-gray-300 text-gray-900 border border-black font-semibold text-xs';
      default:
        return 'bg-gray-300 text-gray-900 border border-black font-semibold text-xs';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-3 h-3 text-blue-600" />;
      case 'todo':
        return <Circle className="w-3 h-3 text-gray-600" />;
      default:
        return <Circle className="w-3 h-3 text-gray-600" />;
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Eye className="w-12 h-12 text-green-600 animate-spin mx-auto mb-3" />
          <p className="text-base font-bold text-gray-700 uppercase tracking-wide">Loading Client Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <style>{`
        .neo-button {
          border: 2px solid #000000 !important;
          box-shadow: 3px 3px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-1px, -1px) !important;
          box-shadow: 4px 4px 0px #000000 !important;
        }
        
        .neo-card {
          border: 2px solid #000000 !important;
          box-shadow: 4px 4px 0px #000000 !important;
        }
        
        .feature-card {
          border: 1px solid #000000 !important;
          box-shadow: 2px 2px 0px #000000 !important;
        }
        
        .client-primary {
          background: linear-gradient(135deg, #00CC44 0%, #0066FF 100%) !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header - Compact */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight mb-1">
              CLIENT PORTAL
            </h1>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-700 uppercase">Welcome,</span>
              <span className="text-sm font-black text-green-600 uppercase">{userData.full_name}</span>
            </div>
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Project: {userData.project_name}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="neo-button bg-green-500 text-white font-bold text-xs px-3 py-1">
              <Eye className="w-3 h-3 mr-1" />
              CLIENT VIEW
            </Badge>
            <Button className="neo-button bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 px-3 py-1">
              <MessageSquare className="w-3 h-3 mr-1" />
              CONTACT
            </Button>
          </div>
        </div>

        {/* Project Overview - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="neo-card bg-white">
            <CardHeader className="pb-2 border-b border-black">
              <CardTitle className="text-sm font-black uppercase text-gray-900 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                PROGRESS
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 pb-3">
              <div className="space-y-2">
                <Progress 
                  value={65} 
                  className="h-2 border border-black"
                />
                <p className="text-xl font-black text-blue-600">65%</p>
                <p className="text-xs font-semibold text-gray-900 uppercase">COMPLETION</p>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="pb-2 border-b border-black">
              <CardTitle className="text-sm font-black uppercase text-gray-900 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                COMPLETED
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 pb-3">
              <div className="space-y-2">
                <p className="text-xl font-black text-green-600">1</p>
                <p className="text-xs font-semibold text-gray-900 uppercase">FEATURES</p>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="pb-2 border-b border-black">
              <CardTitle className="text-sm font-black uppercase text-gray-900 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                ACTIVE
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 pb-3">
              <div className="space-y-2">
                <p className="text-xl font-black text-blue-600">2</p>
                <p className="text-xs font-semibold text-gray-900 uppercase">IN PROGRESS</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Status - Compact */}
        <Card className="neo-card bg-white">
          <CardHeader className="border-b border-black pb-2">
            <CardTitle className="text-lg font-black uppercase text-gray-900">
              FEATURE STATUS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  name: "User Authentication",
                  status: "completed",
                  description: "Login and registration system",
                  completedDate: "2024-01-15"
                },
                {
                  id: 2,
                  name: "Dashboard Analytics",
                  status: "in_progress", 
                  description: "Real-time analytics dashboard",
                  progress: 80
                },
                {
                  id: 3,
                  name: "Team Collaboration",
                  status: "in_progress",
                  description: "Chat and collaboration tools", 
                  progress: 45
                },
                {
                  id: 4,
                  name: "Mobile App",
                  status: "todo",
                  description: "Native mobile application"
                }
              ].map((feature) => (
                <div key={feature.id} className="feature-card bg-gray-50 rounded-none p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(feature.status)}
                        <h3 className="font-bold text-gray-900 uppercase text-sm">
                          {feature.name}
                        </h3>
                        <Badge className={getStatusColor(feature.status)}>
                          {feature.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-xs font-medium mb-2">
                        {feature.description}
                      </p>
                      {feature.status === 'in_progress' && feature.progress && (
                        <div className="space-y-1">
                          <Progress 
                            value={feature.progress} 
                            className="h-2 border border-black"
                          />
                          <p className="text-xs font-semibold text-blue-600">
                            {feature.progress}% COMPLETE
                          </p>
                        </div>
                      )}
                      {feature.status === 'completed' && feature.completedDate && (
                        <p className="text-xs font-semibold text-green-600">
                          COMPLETED {feature.completedDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates - Compact */}
        <Card className="neo-card client-primary text-white">
          <CardHeader className="border-b border-white pb-2">
            <CardTitle className="text-lg font-black uppercase text-white">
              RECENT UPDATES
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  message: "Dashboard Analytics feature is 80% complete",
                  date: "2024-01-16"
                },
                {
                  id: 2,
                  message: "User Authentication deployed",
                  date: "2024-01-15"
                },
                {
                  id: 3,
                  message: "Started collaboration features",
                  date: "2024-01-14"
                }
              ].map((update) => (
                <div key={update.id} className="flex items-start space-x-2 pb-2 border-b border-white/30 last:border-b-0">
                  <div className="w-2 h-2 bg-white rounded-full mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{update.message}</p>
                    <p className="text-green-100 font-medium flex items-center mt-1 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
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
