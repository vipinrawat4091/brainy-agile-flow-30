
import React, { useState, useEffect } from "react";
import { Task, Sprint, Project } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  Award,
  Target,
  Clock,
  CheckCircle2,
  Zap,
  Calendar,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function MyProgress() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      setUser(userData);
      
      if (userData.user_email) {
        const [tasksData, sprintsData] = await Promise.all([
          Task.filter({ assignee_id: userData.user_email, project_id: userData.project_id }),
          Sprint.filter({ project_id: userData.project_id }, "-created_date")
        ]);
        
        setTasks(tasksData);
        setSprints(sprintsData);
      }
    } catch (error) {
      console.error("Error loading progress data:", error);
    }
  };

  const getAssigneeName = (assigneeId) => {
    if (!assigneeId) return 'Unassigned';
    return assigneeId.includes('@') ? assigneeId.split('@')[0] : assigneeId;
  };

  const getCompletionStats = () => {
    const completed = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    
    return { completed, inProgress, todo, blocked, total: tasks.length };
  };

  const getVelocityData = () => {
    // Simulate weekly data
    return [
      { week: 'Week 1', completed: 3, estimated: 2 },
      { week: 'Week 2', completed: 5, estimated: 4 },
      { week: 'Week 3', completed: 4, estimated: 5 },
      { week: 'Week 4', completed: 6, estimated: 4 }
    ];
  };

  const getSkillAnalysis = () => {
    const skillTasks = {
      'Frontend': tasks.filter(t => t.title.toLowerCase().includes('ui') || t.title.toLowerCase().includes('design')).length,
      'Backend': tasks.filter(t => t.title.toLowerCase().includes('api') || t.title.toLowerCase().includes('database')).length,
      'Testing': tasks.filter(t => t.title.toLowerCase().includes('test')).length,
      'DevOps': tasks.filter(t => t.title.toLowerCase().includes('deploy') || t.title.toLowerCase().includes('setup')).length
    };
    
    return Object.entries(skillTasks).map(([skill, count]) => ({ skill, count }));
  };

  const getBadges = () => {
    const completed = getCompletionStats().completed;
    const badges = [];
    
    if (completed >= 1) badges.push({ name: 'First Task', icon: '🎯', color: 'bg-blue-500' });
    if (completed >= 5) badges.push({ name: 'Productive', icon: '⚡', color: 'bg-yellow-500' });
    if (completed >= 10) badges.push({ name: 'Achiever', icon: '🏆', color: 'bg-purple-500' });
    if (tasks.some(t => t.priority === 'urgent' && t.status === 'done')) {
      badges.push({ name: 'Firefighter', icon: '🚒', color: 'bg-red-500' });
    }
    
    return badges;
  };

  const stats = getCompletionStats();
  const velocityData = getVelocityData();
  const skillData = getSkillAnalysis();
  const badges = getBadges();
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            MY PROGRESS
          </h1>
          <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
            TRACK YOUR PERFORMANCE & GROWTH
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="neo-card bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-black mb-2">{stats.completed}</div>
              <div className="font-bold uppercase">COMPLETED</div>
            </CardContent>
          </Card>
          
          <Card className="neo-card bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-black mb-2">{stats.inProgress}</div>
              <div className="font-bold uppercase">IN PROGRESS</div>
            </CardContent>
          </Card>
          
          <Card className="neo-card bg-gradient-to-br from-green-500 to-teal-500 text-white">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-black mb-2">{completionRate}%</div>
              <div className="font-bold uppercase">SUCCESS RATE</div>
            </CardContent>
          </Card>
          
          <Card className="neo-card bg-gradient-to-br from-pink-500 to-purple-500 text-white">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-black mb-2">{badges.length}</div>
              <div className="font-bold uppercase">BADGES EARNED</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Velocity Chart */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  WEEKLY VELOCITY
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={velocityData}>
                    <XAxis dataKey="week" stroke="#374151" fontSize={12} fontWeight="bold" />
                    <YAxis stroke="#374151" fontSize={12} fontWeight="bold" />
                    <Bar dataKey="completed" fill="#0066FF" stroke="#000000" strokeWidth={3} />
                    <Bar dataKey="estimated" fill="#FF6600" stroke="#000000" strokeWidth={3} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 border-2 border-black"></div>
                    <span className="font-bold text-gray-700">ACTUAL COMPLETED</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
                    <span className="font-bold text-gray-700">ESTIMATED</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task Breakdown */}
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-xl font-black uppercase">TASK BREAKDOWN</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 border-2 border-green-400">
                    <div className="text-2xl font-black text-green-800">{stats.completed}</div>
                    <div className="text-sm font-bold text-green-600 uppercase">DONE</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 border-2 border-blue-400">
                    <div className="text-2xl font-black text-blue-800">{stats.inProgress}</div>
                    <div className="text-sm font-bold text-blue-600 uppercase">ACTIVE</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 border-2 border-gray-400">
                    <div className="text-2xl font-black text-gray-800">{stats.todo}</div>
                    <div className="text-sm font-bold text-gray-600 uppercase">TODO</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 border-2 border-red-400">
                    <div className="text-2xl font-black text-red-800">{stats.blocked}</div>
                    <div className="text-sm font-bold text-red-600 uppercase">BLOCKED</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  ACHIEVEMENTS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 ${badge.color} text-white border-4 border-black`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <div className="font-black uppercase">{badge.name}</div>
                        <div className="text-xs font-bold opacity-80">EARNED</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Locked Badges */}
                <div className="p-3 bg-gray-300 text-gray-600 border-4 border-black opacity-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <div className="font-black uppercase">TEAM PLAYER</div>
                      <div className="text-xs font-bold">COMPLETE 5 COLLABORATIVE TASKS</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Analysis */}
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase">SKILL BREAKDOWN</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {skillData.map(({ skill, count }) => (
                  <div key={skill} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-700 uppercase text-sm">{skill}</span>
                      <span className="font-black text-gray-900">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 border-2 border-gray-400">
                      <div 
                        className="bg-blue-500 h-full transition-all duration-500"
                        style={{ width: `${Math.min((count / Math.max(...skillData.map(s => s.count))) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Personal Stats */}
            <Card className="neo-card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardHeader className="border-b-4 border-white/20">
                <CardTitle className="text-lg font-black uppercase">PERSONAL STATS</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-black mb-1">15</div>
                  <div className="text-purple-100 font-bold uppercase text-sm">DAY STREAK</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-bold">AVG COMPLETION:</span>
                    <span className="font-black">2.3 tasks/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">BEST WEEK:</span>
                    <span className="font-black">Week 4 (6 tasks)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">TOTAL POINTS:</span>
                    <span className="font-black">{tasks.reduce((sum, t) => sum + (t.story_points || 0), 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
