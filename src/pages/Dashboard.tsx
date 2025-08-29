import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  Zap, 
  Target, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Brain,
  Rocket,
  CheckCircle2,
  LogOut,
  BarChart3,
  Settings,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import ManagerStandupDashboard from "../components/team/ManagerStandupDashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, standups

  useEffect(() => {
    const userType = localStorage.getItem('user_type');
    if (userType !== 'manager') {
      navigate(createPageUrl('TeamLogin'));
    } else {
      // Simulate loading
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_type');
    navigate(createPageUrl('TeamLogin'));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Brain className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold text-gray-700">Loading AI Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
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
        
        .ai-primary {
          background: linear-gradient(135deg, #0066FF 0%, #7700FF 100%) !important;
        }
        
        .quantum-boost {
          background: linear-gradient(135deg, #7700FF 0%, #FF0099 100%) !important;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            AI DASHBOARD
          </h1>
          <p className="text-lg font-bold text-gray-700 uppercase tracking-wide">
            PROJECT ORCHESTRATION COMMAND CENTER
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="neo-button bg-orange-500 text-white font-black uppercase text-lg px-8 py-3 hover:bg-orange-600">
            <Plus className="w-6 h-6 mr-3" />
            NEW PROJECT
          </Button>
          <Button
            onClick={logout}
            variant="outline"
            className="neo-button bg-white text-gray-900 font-black uppercase hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 mr-2" />
            LOGOUT
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4">
        <Button
          onClick={() => setActiveTab('overview')}
          className={`neo-button font-black uppercase border-4 border-black ${
            activeTab === 'overview' 
              ? 'bg-blue-500 text-white' 
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`}
        >
          <BarChart3 className="w-5 h-5 mr-2" />
          OVERVIEW
        </Button>
        <Button
          onClick={() => setActiveTab('standups')}
          className={`neo-button font-black uppercase border-4 border-black ${
            activeTab === 'standups' 
              ? 'bg-purple-500 text-white' 
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`}
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          TEAM STAND-UPS
        </Button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* AI Status Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card ai-primary text-white p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Brain className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-black uppercase">AI ORCHESTRATOR ACTIVE</h3>
                  <p className="text-blue-100 font-bold">Monitoring 5 projects • Analyzing performance patterns</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                <span className="font-black uppercase">ONLINE</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="neo-card bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
                  <CardTitle className="text-sm font-black uppercase text-gray-900">TOTAL PROJECTS</CardTitle>
                  <Rocket className="w-5 h-5 text-blue-600" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-black text-gray-900">5</div>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-green-500 text-white border-2 border-black font-bold">
                      3 ACTIVE
                    </Badge>
                    <Badge className="bg-blue-500 text-white border-2 border-black font-bold">
                      2 PLANNING
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="neo-card bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
                  <CardTitle className="text-sm font-black uppercase text-gray-900">TASK STATUS</CardTitle>
                  <Target className="w-5 h-5 text-orange-600" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-black text-gray-900">47</div>
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-900">PROGRESS</span>
                      <span className="text-gray-900">32/47</span>
                    </div>
                    <Progress 
                      value={68} 
                      className="h-3 border-2 border-black"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="neo-card bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
                  <CardTitle className="text-sm font-black uppercase text-gray-900">AI INSIGHTS</CardTitle>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-black text-green-600">+23%</div>
                  <p className="text-sm font-bold text-gray-900 mt-1">VELOCITY IMPROVEMENT</p>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-bold text-green-600">AI OPTIMIZED</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="neo-card bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
                  <CardTitle className="text-sm font-black uppercase text-gray-900">ACTIVE SPRINTS</CardTitle>
                  <Clock className="w-5 h-5 text-cyan-600" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-black text-gray-900">3</div>
                  <p className="text-sm font-bold text-gray-900 mt-1">RUNNING NOW</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-600">LIVE TRACKING</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-gray-900">
                <CardTitle className="text-xl font-black uppercase text-gray-900 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                  QUICK ACTIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-2 gap-4">
                <Button className="neo-button bg-blue-600 text-white font-black uppercase hover:bg-blue-700">
                  <Plus className="w-5 h-5 mr-2" />
                  CREATE PROJECT
                </Button>
                <Button className="neo-button bg-green-600 text-white font-black uppercase hover:bg-green-700">
                  <Target className="w-5 h-5 mr-2" />
                  START SPRINT
                </Button>
                <Button className="neo-button bg-purple-600 text-white font-black uppercase hover:bg-purple-700">
                  <Users className="w-5 h-5 mr-2" />
                  MANAGE TEAM
                </Button>
                <Button className="neo-button bg-pink-600 text-white font-black uppercase hover:bg-pink-700">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  VIEW ANALYTICS
                </Button>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="neo-card quantum-boost text-white">
              <CardHeader className="border-b-4 border-white">
                <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  AI RECOMMENDATIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-black uppercase text-sm">OPTIMIZE SPRINT VELOCITY</h4>
                    <p className="text-purple-100 text-sm font-bold mt-1">
                      Consider breaking down large tasks in Sprint #2
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-black uppercase text-sm">TEAM REBALANCING</h4>
                    <p className="text-purple-100 text-sm font-bold mt-1">
                      Frontend capacity is 80% utilized this sprint
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-black uppercase text-sm">PERFORMANCE BOOST</h4>
                    <p className="text-purple-100 text-sm font-bold mt-1">
                      Add unit testing to improve code quality score
                    </p>
                  </div>
                </div>
                
                <Button className="w-full neo-button bg-white text-purple-700 font-black uppercase mt-4 border-white hover:bg-gray-100">
                  VIEW ALL INSIGHTS
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'standups' && (
        <ManagerStandupDashboard />
      )}
    </div>
  );
}
