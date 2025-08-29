import React, { useState, useEffect } from "react";
import { Project, Sprint, Task, Feature, TeamMember } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target,
  Users,
  Brain,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from "framer-motion";
import RiskRadar from "@/components/analytics/RiskRadar";

const CHART_COLORS = ['#0066FF', '#FF6600', '#00CC44', '#FF0099', '#7700FF', '#00FFCC'];

export default function Analytics() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [sprints, setSprints] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [features, setFeatures] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadAnalyticsData();
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    const projectsData = await Project.list("-updated_date");
    setProjects(projectsData);
    if (projectsData.length > 0) {
      setSelectedProject(projectsData[0].id);
    }
  };

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const [sprintsData, tasksData, featuresData, membersData] = await Promise.all([
        Sprint.filter({ project_id: selectedProject }, "-created_date"),
        Task.filter({ project_id: selectedProject }),
        Feature.filter({ project_id: selectedProject }),
        TeamMember.filter({ project_id: selectedProject })
      ]);
      
      setSprints(sprintsData);
      setTasks(tasksData);
      setFeatures(featuresData);
      setTeamMembers(membersData);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    }
    setIsLoading(false);
  };

  // Analytics Calculations
  const getVelocityData = () => {
    return sprints.map((sprint, index) => {
      const sprintTasks = tasks.filter(t => t.sprint_id === sprint.id);
      const completedPoints = sprintTasks
        .filter(t => t.status === 'done')
        .reduce((sum, t) => sum + (t.story_points || 1), 0);
      
      return {
        name: `Sprint ${index + 1}`,
        planned: sprint.velocity || 0,
        actual: completedPoints,
        efficiency: sprint.velocity ? Math.round((completedPoints / sprint.velocity) * 100) : 0
      };
    });
  };

  const getTaskStatusData = () => {
    const statusCounts = {
      'todo': tasks.filter(t => t.status === 'todo').length,
      'in_progress': tasks.filter(t => t.status === 'in_progress').length,
      'review': tasks.filter(t => t.status === 'review').length,
      'done': tasks.filter(t => t.status === 'done').length
    };

    return Object.entries(statusCounts).map(([status, count], index) => ({
      name: status.replace('_', ' ').toUpperCase(),
      value: count,
      color: CHART_COLORS[index]
    }));
  };

  const getTeamPerformance = () => {
    return teamMembers.map(member => {
      const memberTasks = tasks.filter(t => t.assignee_id === member.user_email);
      const completedTasks = memberTasks.filter(t => t.status === 'done').length;
      const totalHours = memberTasks.reduce((sum, t) => sum + (t.actual_hours || t.estimated_hours || 0), 0);
      
      return {
        name: member.user_email.split('@')[0],
        completed: completedTasks,
        total: memberTasks.length,
        hours: totalHours,
        rate: memberTasks.length > 0 ? Math.round((completedTasks / memberTasks.length) * 100) : 0
      };
    });
  };

  const getFeaturePriorityData = () => {
    const priorityCounts = {
      'critical': features.filter(f => f.priority === 'critical').length,
      'high': features.filter(f => f.priority === 'high').length,
      'medium': features.filter(f => f.priority === 'medium').length,
      'low': features.filter(f => f.priority === 'low').length
    };

    return Object.entries(priorityCounts).map(([priority, count], index) => ({
      name: priority.toUpperCase(),
      value: count,
      color: ['#FF0000', '#FF6600', '#0066FF', '#999999'][index]
    }));
  };

  const getOverallStats = () => {
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const completedFeatures = features.filter(f => f.status === 'completed').length;
    const activeSprintsCount = sprints.filter(s => s.status === 'active').length;
    const avgVelocity = sprints.length > 0 
      ? sprints.reduce((sum, s) => sum + (s.actual_velocity || 0), 0) / sprints.length
      : 0;

    return {
      taskCompletion: tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0,
      featureCompletion: features.length > 0 ? Math.round((completedFeatures / features.length) * 100) : 0,
      activeSprints: activeSprintsCount,
      avgVelocity: Math.round(avgVelocity),
      totalTasks: tasks.length,
      totalFeatures: features.length,
      teamSize: teamMembers.length
    };
  };

  // Calculate stats first
  const velocityData = getVelocityData();
  const taskStatusData = getTaskStatusData();
  const teamPerformance = getTeamPerformance();
  const featurePriorityData = getFeaturePriorityData();
  const stats = getOverallStats();

  // Now define getRiskData function after stats is calculated
  const getRiskData = () => {
    const riskFactors = [
      {
        subject: 'Schedule Risk',
        riskLevel: sprints.filter(s => s.status === 'overdue').length > 0 ? 8 : 
                  stats.avgVelocity < 5 ? 6 : 3
      },
      {
        subject: 'Resource Risk',
        riskLevel: stats.teamSize < 3 ? 8 : 
                  teamPerformance.some(m => m.rate < 50) ? 6 : 2
      },
      {
        subject: 'Quality Risk',
        riskLevel: tasks.filter(t => t.status === 'review').length > tasks.length * 0.3 ? 7 : 3
      },
      {
        subject: 'Scope Risk',
        riskLevel: features.filter(f => f.priority === 'critical').length > 5 ? 8 : 4
      },
      {
        subject: 'Technical Risk',
        riskLevel: tasks.filter(t => t.estimated_hours && t.actual_hours && 
                  t.actual_hours > t.estimated_hours * 1.5).length > 0 ? 6 : 3
      },
      {
        subject: 'Communication Risk',
        riskLevel: stats.teamSize > 8 ? 7 : 2
      }
    ];

    return riskFactors;
  };

  const riskData = getRiskData();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded border-4 border-black"></div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded border-4 border-black"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              AI ANALYTICS
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              PERFORMANCE INTELLIGENCE DASHBOARD
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="neo-input font-bold w-64 border-4 border-black">
                <SelectValue placeholder="SELECT PROJECT" />
              </SelectTrigger>
              <SelectContent className="border-4 border-black">
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {!selectedProject ? (
          <div className="text-center py-16">
            <BarChart3 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">NO PROJECT SELECTED</h2>
            <p className="text-gray-400 font-bold">Choose a project to view analytics</p>
          </div>
        ) : (
          <>
            {/* AI Insights Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neo-card bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 border-4 border-black"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Brain className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-black uppercase">AI PERFORMANCE ANALYSIS</h3>
                    <p className="text-blue-100 font-bold">
                      Real-time insights • Predictive analytics • Performance optimization
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black">{stats.taskCompletion}%</div>
                  <div className="text-blue-100 font-bold uppercase">EFFICIENCY</div>
                </div>
              </div>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="neo-card bg-white border-4 border-black">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-black uppercase text-gray-600">TASK COMPLETION</CardTitle>
                    <Target className="w-5 h-5 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-900 mb-2">{stats.taskCompletion}%</div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-green-600">
                        {tasks.filter(t => t.status === 'done').length}/{stats.totalTasks} DONE
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="neo-card bg-white border-4 border-black">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-black uppercase text-gray-600">SPRINT VELOCITY</CardTitle>
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-900 mb-2">{stats.avgVelocity}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-blue-600">STORY POINTS/SPRINT</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="neo-card bg-white border-4 border-black">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-black uppercase text-gray-600">TEAM SIZE</CardTitle>
                    <Users className="w-5 h-5 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-900 mb-2">{stats.teamSize}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="font-bold text-purple-600">ACTIVE MEMBERS</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="neo-card bg-white border-4 border-black">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-black uppercase text-gray-600">ACTIVE SPRINTS</CardTitle>
                    <Clock className="w-5 h-5 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-900 mb-2">{stats.activeSprints}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="font-bold text-orange-600">IN PROGRESS</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Velocity Chart */}
              <Card className="neo-card bg-white border-4 border-black">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    SPRINT VELOCITY TREND
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {velocityData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={velocityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeWidth={2} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#374151" 
                          fontSize={12} 
                          fontWeight="bold"
                        />
                        <YAxis 
                          stroke="#374151" 
                          fontSize={12} 
                          fontWeight="bold"
                        />
                        <Bar dataKey="planned" fill="#94a3b8" stroke="#374151" strokeWidth={2} name="PLANNED" />
                        <Bar dataKey="actual" fill="#0066FF" stroke="#000000" strokeWidth={3} name="ACTUAL" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-bold uppercase">No velocity data yet</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Risk Radar */}
              <RiskRadar riskData={riskData} />

              {/* Task Status Distribution */}
              <Card className="neo-card bg-white border-4 border-black">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                    <Target className="w-6 h-6 text-green-600" />
                    TASK STATUS DISTRIBUTION
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {taskStatusData.length > 0 && taskStatusData.some(d => d.value > 0) ? (
                    <div className="flex items-center justify-between">
                      <ResponsiveContainer width="60%" height={250}>
                        <PieChart>
                          <Pie
                            data={taskStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            dataKey="value"
                            stroke="#000000"
                            strokeWidth={3}
                          >
                            {taskStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-3">
                        {taskStatusData.map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 border-2 border-black"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-black text-sm text-gray-900 uppercase">
                              {item.name}: {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Target className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-bold uppercase">No tasks yet</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Team Performance */}
              <Card className="neo-card bg-white border-4 border-black">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                    <Users className="w-6 h-6 text-purple-600" />
                    TEAM PERFORMANCE
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {teamPerformance.length > 0 ? (
                    <div className="space-y-4">
                      {teamPerformance.map((member, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 border-3 border-black flex items-center justify-center">
                                <span className="text-white font-black text-sm">
                                  {member.name[0].toUpperCase()}
                                </span>
                              </div>
                              <span className="font-black text-gray-900 uppercase">{member.name}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <Badge className="bg-green-500 text-white border-2 border-green-800 font-black">
                                {member.completed} DONE
                              </Badge>
                              <span className="font-black text-gray-900">{member.rate}%</span>
                            </div>
                          </div>
                          <Progress value={member.rate} className="h-2 neo-input border-2 border-black" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Users className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-bold uppercase">No team members yet</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Feature Priority Breakdown */}
              <Card className="neo-card bg-white border-4 border-black">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                    <Zap className="w-6 h-6 text-orange-600" />
                    FEATURE PRIORITIES
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {featurePriorityData.length > 0 && featurePriorityData.some(d => d.value > 0) ? (
                    <div className="space-y-4">
                      {featurePriorityData.map((priority, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-black text-gray-900 uppercase">{priority.name}</span>
                            <Badge 
                              className="font-black border-2 border-black text-white"
                              style={{ backgroundColor: priority.color }}
                            >
                              {priority.value}
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-200 h-3 border-2 border-gray-400">
                            <div 
                              className="h-full transition-all duration-500"
                              style={{ 
                                width: `${features.length > 0 ? (priority.value / features.length) * 100 : 0}%`,
                                backgroundColor: priority.color 
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Zap className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-bold uppercase">No features yet</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <Card className="neo-card bg-gradient-to-r from-orange-500 to-red-500 text-white border-4 border-black">
              <CardHeader className="border-b-4 border-white/20">
                <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  AI PERFORMANCE RECOMMENDATIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black uppercase text-sm mb-1">VELOCITY OPTIMIZATION</h4>
                      <p className="text-orange-100 text-sm font-bold">
                        Consider breaking down tasks with &gt;8 story points to improve sprint predictability
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black uppercase text-sm mb-1">TEAM EFFICIENCY</h4>
                      <p className="text-orange-100 text-sm font-bold">
                        {stats.taskCompletion > 80 ? 'Team performing above average' : 'Focus on removing blockers'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black uppercase text-sm mb-1">SPRINT PLANNING</h4>
                      <p className="text-orange-100 text-sm font-bold">
                        Current velocity suggests {Math.round(stats.avgVelocity * 1.1)} story points for next sprint
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
