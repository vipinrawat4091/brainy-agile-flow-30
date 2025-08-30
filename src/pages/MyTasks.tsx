
import React, { useState, useEffect } from "react";
import { Task, Sprint, Project, TeamMember } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckSquare,
  Clock,
  Target,
  Brain,
  Zap,
  ListTodo,
  AlertTriangle,
  Play,
  Lightbulb,
  Code
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AIAssistant from "../components/team/AIAssistant";
import TaskCard from "../components/team/TaskCard";

// Mock user data
const mockUser = {
  user_email: 'dev@example.com',
  name: 'John Developer'
};

// Mock tasks data
const mockTasks = [
  {
    id: '1',
    project_id: '1',
    sprint_id: '1',
    title: 'Implement User Authentication',
    description: 'Create login and registration system with proper validation',
    status: 'in_progress',
    assignee_id: 'dev@example.com',
    story_points: 8,
    estimated_hours: 16,
    actual_hours: 12,
    created_date: '2024-01-15T10:00:00Z',
    priority: 'high'
  },
  {
    id: '2',
    project_id: '1',
    sprint_id: '2',
    title: 'Setup Project Dashboard',
    description: 'Create responsive dashboard with analytics widgets',
    status: 'todo',
    assignee_id: 'dev@example.com',
    story_points: 5,
    estimated_hours: 10,
    actual_hours: 0,
    created_date: '2024-01-16T10:00:00Z',
    priority: 'medium'
  },
  {
    id: '3',
    project_id: '1',
    sprint_id: '1',
    title: 'Database Schema Design',
    description: 'Design and implement database tables for user management',
    status: 'review',
    assignee_id: 'dev@example.com',
    story_points: 3,
    estimated_hours: 6,
    actual_hours: 5,
    created_date: '2024-01-10T10:00:00Z',
    priority: 'high'
  },
  {
    id: '4',
    project_id: '2',
    sprint_id: '3',
    title: 'API Integration',
    description: 'Integrate third-party payment API',
    status: 'done',
    assignee_id: 'dev@example.com',
    story_points: 13,
    estimated_hours: 24,
    actual_hours: 20,
    created_date: '2024-01-05T10:00:00Z',
    priority: 'critical'
  }
];

export default function MyTasks() {
  const [user, setUser] = useState(mockUser);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Simulate loading user data
    const loadMockData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const allProjects = await Project.list();
        setProjects(allProjects);
        
        if (allProjects.length > 0) {
          setSelectedProject(allProjects[0].id);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadProjectTasks();
    }
  }, [selectedProject]);
  
  const loadProjectTasks = async () => {
    if (!user || !selectedProject) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Filter mock tasks for selected project and user
      const projectTasks = mockTasks.filter(task => 
        task.project_id === selectedProject && task.assignee_id === user.user_email
      );
      
      setTasks(projectTasks);
      setSelectedTask(projectTasks[0] || null);
    } catch (error) {
      console.error("Error loading project tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      // Update task status in the local state for immediate feedback
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(prev => ({ ...prev, status: newStatus }));
      }
      
      console.log(`Updated task ${taskId} status to ${newStatus}`);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-blue-500 animate-pulse mx-auto" />
          <p className="text-xl font-black text-gray-700 mt-4 uppercase">Loading Your Tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
              MY TASKS
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              FOCUS ON YOUR OBJECTIVES
            </p>
            <p className="text-sm text-gray-500 font-bold mt-1">
              Logged in as: {user.user_email}
            </p>
          </div>
          
          {projects.length > 0 && (
            <div className="w-64">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="neo-input font-bold border-4 border-black">
                  <SelectValue placeholder="SELECT PROJECT" />
                </SelectTrigger>
                <SelectContent className="border-4 border-black bg-white">
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex-grow grid lg:grid-cols-3 gap-6 min-h-0">
          {/* Task List */}
          <div className="lg:col-span-1 flex flex-col">
            <Card className="neo-card bg-white border-4 border-black flex-grow flex flex-col">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="uppercase font-black text-xl flex items-center gap-3">
                  <ListTodo className="w-6 h-6 text-blue-600" />
                  TASK LIST ({tasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-grow overflow-y-auto">
                <div className="space-y-3">
                  {tasks.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-black text-gray-500 uppercase mb-2">NO TASKS ASSIGNED</h3>
                      <p className="text-gray-400 font-bold">You have no tasks for this project</p>
                    </div>
                  ) : (
                    tasks.map((task, index) => (
                      <motion.button
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedTask(task)}
                        className={`w-full text-left p-4 border-4 border-black font-bold transition-all duration-200 ${
                          selectedTask?.id === task.id 
                            ? 'bg-blue-500 text-white shadow-[8px_8px_0px_#000] transform translate-x-[-4px] translate-y-[-4px]' 
                            : 'bg-white hover:bg-gray-100 hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px]'
                        }`}
                      >
                        <div className="space-y-2">
                          <h4 className="font-black uppercase text-sm">{task.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs font-black border-2 border-black ${
                              task.status === 'done' ? 'bg-green-500 text-white' :
                              task.status === 'in_progress' ? 'bg-blue-500 text-white' :
                              task.status === 'review' ? 'bg-orange-500 text-white' :
                              'bg-gray-500 text-white'
                            }`}>
                              {task.status?.replace('_', ' ').toUpperCase() || 'TODO'}
                            </Badge>
                            {task.story_points && (
                              <Badge variant="outline" className="text-xs font-black border-2 border-black">
                                {task.story_points} PTS
                              </Badge>
                            )}
                            {task.priority && (
                              <Badge className={`text-xs font-black border-2 border-black ${
                                task.priority === 'critical' ? 'bg-red-500 text-white' :
                                task.priority === 'high' ? 'bg-orange-500 text-white' :
                                task.priority === 'medium' ? 'bg-blue-500 text-white' :
                                'bg-gray-500 text-white'
                              }`}>
                                {task.priority.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Task Details */}
          <div className="lg:col-span-2 flex flex-col">
            {selectedTask ? (
              <div className="h-full flex flex-col gap-6">
                <div className="flex-grow min-h-0">
                  <TaskCard task={selectedTask} onStatusChange={handleStatusUpdate} />
                </div>
                <div className="flex-shrink-0">
                  <AIAssistant task={selectedTask} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full neo-card bg-white border-4 border-black">
                <div className="text-center p-8">
                  <CheckSquare className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                  <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">
                    {projects.length > 0 ? 'SELECT A TASK' : 'NO PROJECTS'}
                  </h2>
                  <p className="text-gray-400 font-bold">
                    {projects.length > 0 
                      ? 'Choose a task from the list to view details' 
                      : 'You are not assigned to any projects yet'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
