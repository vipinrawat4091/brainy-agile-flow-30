import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Clock, AlertTriangle, Star, Zap } from "lucide-react";
import FeatureDetailModal from "@/components/client/FeatureDetailModal";

export default function ClientFeatures() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      name: "User Authentication System",
      description: "Secure login and registration with role-based access control",
      status: "completed",
      priority: "high",
      category: "Core Features",
      estimatedHours: 40,
      actualHours: 38
    },
    {
      name: "Dashboard Analytics",
      description: "Real-time data visualization and reporting dashboard",
      status: "in-progress",
      priority: "high",
      category: "Core Features",
      estimatedHours: 60,
      actualHours: 35
    },
    {
      name: "Project Management Interface",
      description: "Complete project tracking and management system",
      status: "in-progress",
      priority: "high",
      category: "Core Features",
      estimatedHours: 80,
      actualHours: 45
    },
    {
      name: "Team Collaboration Tools",
      description: "Chat, file sharing, and team communication features",
      status: "pending",
      priority: "medium",
      category: "Collaboration",
      estimatedHours: 50,
      actualHours: 0
    },
    {
      name: "Mobile Responsive Design",
      description: "Optimized mobile experience across all devices",
      status: "testing",
      priority: "high",
      category: "UI/UX",
      estimatedHours: 30,
      actualHours: 28
    },
    {
      name: "API Integration",
      description: "Third-party service integrations and API endpoints",
      status: "pending",
      priority: "medium",
      category: "Backend",
      estimatedHours: 45,
      actualHours: 0
    },
    {
      name: "Advanced Search & Filters",
      description: "Powerful search functionality with multiple filter options",
      status: "pending",
      priority: "low",
      category: "Enhancement",
      estimatedHours: 25,
      actualHours: 0
    },
    {
      name: "Notification System",
      description: "Real-time notifications and email alerts",
      status: "completed",
      priority: "medium",
      category: "Core Features",
      estimatedHours: 35,
      actualHours: 32
    }
  ];

  const handleFeatureDoubleClick = (feature: any) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-orange-500';
      case 'testing': return 'bg-blue-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Core Features': return <Star className="w-5 h-5 text-yellow-600" />;
      case 'Collaboration': return <CheckSquare className="w-5 h-5 text-purple-600" />;
      case 'UI/UX': return <Zap className="w-5 h-5 text-pink-600" />;
      case 'Backend': return <AlertTriangle className="w-5 h-5 text-blue-600" />;
      case 'Enhancement': return <Clock className="w-5 h-5 text-cyan-600" />;
      default: return <CheckSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  const categories = [...new Set(features.map(f => f.category))];

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
        
        .feature-item {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .feature-item:hover {
          transform: translate(-2px, -2px);
          box-shadow: 10px 10px 0px #000000;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="neo-card bg-white p-6">
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">
            PROJECT FEATURES
          </h1>
          <p className="text-gray-600 font-bold">Complete overview of all project features and their development status</p>
          <p className="text-sm text-blue-600 font-bold mt-2">💡 Double-click on any feature to view details and communicate with developers</p>
        </div>

        {/* Feature Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="neo-card bg-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-green-600 mb-2">
                {features.filter(f => f.status === 'completed').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">COMPLETED</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-orange-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-orange-600 mb-2">
                {features.filter(f => f.status === 'in-progress').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">IN PROGRESS</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">
                {features.filter(f => f.status === 'testing').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">TESTING</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-gray-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-gray-600 mb-2">
                {features.filter(f => f.status === 'pending').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">PENDING</div>
            </CardContent>
          </Card>
        </div>

        {/* Features by Category */}
        {categories.map(category => (
          <Card key={category} className="neo-card bg-white">
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                {getCategoryIcon(category)}
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {features.filter(f => f.category === category).map((feature, index) => (
                  <div 
                    key={index} 
                    className="neo-card bg-gray-50 p-4 feature-item"
                    onDoubleClick={() => handleFeatureDoubleClick(feature)}
                    title="Double-click to view details and communicate with developers"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-black text-gray-900 uppercase">{feature.name}</h3>
                      <div className="flex gap-2">
                        <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${getStatusColor(feature.status)} text-white`}>
                          {feature.status.toUpperCase()}
                        </Badge>
                        <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${getPriorityColor(feature.priority)} text-white`}>
                          {feature.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-700 mb-4">{feature.description}</p>
                    <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                      <div className="flex items-center gap-4">
                        <span>EST: {feature.estimatedHours}h</span>
                        <span>ACTUAL: {feature.actualHours}h</span>
                      </div>
                      {feature.status === 'completed' && (
                        <CheckSquare className="w-5 h-5 text-green-500" />
                      )}
                      {feature.status === 'in-progress' && (
                        <Clock className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FeatureDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feature={selectedFeature}
      />
    </div>
  );
}
