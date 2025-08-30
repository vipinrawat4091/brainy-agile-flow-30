
import React, { useState, useEffect } from "react";
import { Task, Sprint, Project, TeamMember } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  User
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
      <div className="notion-content flex items-center justify-center min-h-96">
        <div className="text-center">
          <Brain className="w-8 h-8 text-notion-blue animate-pulse mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">Loading Your Tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notion-content">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="notion-heading-1">My Tasks</h1>
          <p className="notion-muted">Focus on your objectives</p>
          <div className="flex items-center gap-2 mt-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{user.user_email}</span>
          </div>
        </div>
        
        {projects.length > 0 && (
          <div className="w-64">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="notion-input">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border">
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ListTodo className="w-5 h-5 text-notion-blue" />
                Tasks ({tasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Tasks Assigned</h3>
                  <p className="text-muted-foreground">You have no tasks for this project</p>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <motion.button
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedTask(task)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      selectedTask?.id === task.id 
                        ? 'bg-accent border-notion-blue shadow-sm' 
                        : 'border-border hover:bg-accent/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={
                          task.status === 'done' ? 'default' :
                          task.status === 'in_progress' ? 'secondary' :
                          task.status === 'review' ? 'outline' :
                          'outline'
                        } className="text-xs">
                          {task.status?.replace('_', ' ') || 'Todo'}
                        </Badge>
                        {task.story_points && (
                          <Badge variant="outline" className="text-xs">
                            {task.story_points} pts
                          </Badge>
                        )}
                        {task.priority && (
                          <Badge variant={
                            task.priority === 'critical' ? 'destructive' :
                            task.priority === 'high' ? 'secondary' :
                            'outline'
                          } className="text-xs">
                            {task.priority}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Selected Task Details & AI Assistant */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTask ? (
            <>
              <TaskCard task={selectedTask} onStatusChange={handleStatusUpdate} />
              <AIAssistant task={selectedTask} />
            </>
          ) : (
            <Card className="p-12 text-center">
              <CheckSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium text-foreground mb-2">
                {projects.length > 0 ? 'Select a Task' : 'No Projects'}
              </h2>
              <p className="text-muted-foreground">
                {projects.length > 0 
                  ? 'Choose a task from the list to view details' 
                  : 'You are not assigned to any projects yet'
                }
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
