import React, { useState, useEffect } from "react";
import { Task, Sprint, Project } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain,
  LogOut,
  Target,
  Zap,
  Lightbulb,
  ShieldCheck,
  Award,
  Flame,
  Moon,
  Sun,
  MessageSquare,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

// Import Dashboard Components
import WelcomePanel from "../components/team/WelcomePanel";
import MyTasksPanel from "../components/team/MyTasksPanel";
import AIAssistant from "../components/team/AIAssistant";
import PerformanceTracker from "../components/team/PerformanceTracker";
import SprintTimeline from "../components/team/SprintTimeline";
import AIStandupMeeting from "../components/team/AIStandupMeeting";
import NotificationsPage from "../components/team/NotificationsPage";

export default function TeamDashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [showStandup, setShowStandup] = useState(false);
  const [standupCompleted, setStandupCompleted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user_data');
    const userType = localStorage.getItem('user_type');
    
    if (!loggedInUser || userType !== 'team_member') {
      navigate(createPageUrl('TeamLogin'));
    } else {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      loadDashboardData(parsedUser.user_email, parsedUser.project_id);
      
      // Check if standup was completed today
      const lastStandup = localStorage.getItem('last_standup_date');
      const today = new Date().toDateString();
      if (lastStandup !== today) {
        setShowStandup(true);
      } else {
        setStandupCompleted(true);
      }
    }
  }, [navigate]);

  const loadDashboardData = async (userEmail, projectId) => {
    setIsLoading(true);
    try {
      const [tasksData, sprintsData, projectsData] = await Promise.all([
        Task.filter({ assignee_id: userEmail, project_id: projectId }),
        Sprint.filter({ project_id: projectId }, "-created_date"),
        Project.list("-created_date")
      ]);
      
      setTasks(tasksData);
      setSprints(sprintsData);
      setProjects(projectsData.filter(p => p.id === projectId));
      
      if (tasksData.length > 0 && !selectedTask) {
        setSelectedTask(tasksData[0]);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setTasks([]);
      setSprints([]);
      setProjects([]);
    }
    setIsLoading(false);
  };
  
  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      // Find the task and update it locally first
      const taskToUpdate = tasks.find(t => t.id === taskId);
      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, status: newStatus };
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId ? updatedTask : task
          )
        );
        
        // Here you would typically make an API call to update the task
        // For now, we'll just update the local state
        console.log(`Task ${taskId} status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_type');
    navigate(createPageUrl('TeamLogin'));
  };

  const handleStandupComplete = (responses, summary) => {
    console.log('Standup completed:', { responses, summary });
    
    // Store completion date
    localStorage.setItem('last_standup_date', new Date().toDateString());
    
    // Store responses for manager dashboard (in real app, this would be sent to backend)
    localStorage.setItem('latest_standup_responses', JSON.stringify({
      user: user,
      responses: responses,
      summary: summary,
      timestamp: new Date().toISOString()
    }));
    
    setShowStandup(false);
    setStandupCompleted(true);
  };
  
  const currentSprint = sprints.find(s => s.status === 'active') || sprints[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Brain className="w-16 h-16 text-blue-500 animate-pulse mx-auto" />
          <p className="text-xl font-black text-gray-700 mt-4 uppercase">Loading Your Dashboard...</p>
        </div>
      </div>
    );
  }

  // Show AI Standup Meeting if not completed today
  if (showStandup) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <AIStandupMeeting 
            user={user} 
            onStandupComplete={handleStandupComplete}
          />
        </div>
      </div>
    );
  }

  // Mock notification count
  const notificationCount = 3;

  // Show notifications page
  if (showNotifications) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => setShowNotifications(false)}
              variant="outline"
              className="neo-button font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] bg-white text-gray-900 hover:bg-gray-100"
            >
              ← BACK TO DASHBOARD
            </Button>
          </div>
          <NotificationsPage user={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-6 space-y-6">
      <style>{`
        .neo-card {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }
        
        .neo-button {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 10px 10px 0px #000000 !important;
        }
      `}</style>
      
      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          >
            {/* Exit Focus Mode Button */}
            <div className="absolute top-6 right-6 z-50">
              <Button
                onClick={() => setFocusMode(false)}
                className="neo-button bg-red-500 text-white font-black uppercase border-4 border-black shadow-[8px_8px_0px_#000]"
              >
                <Sun className="w-5 h-5 mr-2" />
                EXIT FOCUS MODE
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 neo-card flex items-center justify-center border-4 border-black">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              TEAM DASHBOARD
            </h1>
            <p className="text-sm font-bold text-gray-600 uppercase">
              {projects[0]?.name || "Your Project"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications Button */}
          <Button 
            onClick={() => setShowNotifications(true)} 
            variant="outline"
            className="neo-button font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] bg-white text-gray-900 hover:bg-gray-100 relative"
          >
            <Bell className="w-5 h-5 mr-2" />
            NOTIFICATIONS
            {notificationCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white font-black text-xs border-2 border-white">
                {notificationCount}
              </Badge>
            )}
          </Button>

          <Button 
            onClick={() => setShowStandup(true)} 
            variant="outline"
            className="neo-button font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] bg-green-50 text-green-700 hover:bg-green-100"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            {standupCompleted ? 'RETAKE STANDUP' : 'START STANDUP'}
          </Button>
          <Button 
            onClick={() => setFocusMode(!focusMode)} 
            variant="outline"
            className="neo-button font-black uppercase hidden md:flex border-4 border-black shadow-[4px_4px_0px_#000] bg-white text-gray-900 hover:bg-gray-100"
          >
            {focusMode ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
            {focusMode ? 'EXIT FOCUS' : 'FOCUS MODE'}
          </Button>
          <Button onClick={handleLogout} className="neo-button bg-red-500 text-white font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000]">
            <LogOut className="w-5 h-5 mr-2" />
            LOGOUT
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Tasks Panel */}
        <div className={`transition-all duration-500 ${focusMode ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-6 ${focusMode ? 'relative z-50' : ''}`}>
          <WelcomePanel user={user} tasks={tasks} />
          <MyTasksPanel 
            tasks={tasks} 
            onTaskSelect={setSelectedTask} 
            onStatusUpdate={handleStatusUpdate}
            selectedTaskId={selectedTask?.id}
            isFocusMode={focusMode}
          />
        </div>

        {/* Right Column - Only show when not in focus mode */}
        {!focusMode && (
          <div className="lg:col-span-4 space-y-6">
            <AIAssistant task={selectedTask} />
            <PerformanceTracker tasks={tasks} />
          </div>
        )}
      </div>
      
      {/* Sprint Timeline - Hide in focus mode */}
      {!focusMode && (
        <SprintTimeline sprint={currentSprint} tasks={tasks} />
      )}

    </div>
  );
}
