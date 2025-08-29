import React, { useState, useEffect } from "react";
import { Task as BaseTask, Sprint, Project, TeamMember } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Clock, 
  Users, 
  CheckCircle2,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Brain,
  ChevronLeft,
  ChevronRight,
  Timer,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Extended Task interface for the component
interface ExtendedTask extends BaseTask {
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const TASK_COLUMNS = [
  { id: "todo", title: "TO DO", color: "bg-gray-500", textColor: "text-white", icon: AlertTriangle },
  { id: "in_progress", title: "IN PROGRESS", color: "bg-blue-500", textColor: "text-white", icon: Clock },
  { id: "review", title: "REVIEW", color: "bg-orange-500", textColor: "text-white", icon: Users },
  { id: "done", title: "DONE", color: "bg-green-500", textColor: "text-white", icon: CheckCircle2 }
];

const PRIORITY_COLORS = {
  low: "bg-gray-500 border-gray-800 text-white",
  medium: "bg-blue-500 border-blue-800 text-white", 
  high: "bg-orange-500 border-orange-800 text-white",
  critical: "bg-red-500 border-red-800 text-white"
};

// Mock projects data
const mockProjects = [
  {
    id: '1',
    name: 'AI Project Management System',
    description: 'Next-gen project management with AI features',
    updated_date: '2024-01-15T10:00:00Z',
    created_date: '2024-01-01T10:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    description: 'Modern e-commerce solution with analytics',
    updated_date: '2024-01-10T10:00:00Z',
    created_date: '2023-12-15T10:00:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application',
    updated_date: '2024-01-08T10:00:00Z',
    created_date: '2023-11-20T10:00:00Z',
    status: 'completed'
  }
];

// Mock sprints data organized by project
const mockSprintsByProject = {
  '1': [
    {
      id: '1',
      project_id: '1',
      name: 'Sprint 1: Foundation',
      start_date: '2024-01-01',
      end_date: '2024-01-14',
      goal: 'Setup project foundation and authentication',
      velocity: 20,
      status: 'completed'
    },
    {
      id: '2',
      project_id: '1',
      name: 'Sprint 2: Core Features',
      start_date: '2024-01-15',
      end_date: '2024-01-28',
      goal: 'Implement core dashboard features',
      velocity: 25,
      status: 'active'
    }
  ],
  '2': [
    {
      id: '3',
      project_id: '2',
      name: 'Sprint 1: Setup',
      start_date: '2024-01-01',
      end_date: '2024-01-14',
      goal: 'E-commerce platform foundation',
      velocity: 18,
      status: 'active'
    }
  ],
  '3': [
    {
      id: '4',
      project_id: '3',
      name: 'Sprint 1: Security',
      start_date: '2023-12-01',
      end_date: '2023-12-14',
      goal: 'Banking security implementation',
      velocity: 15,
      status: 'completed'
    }
  ]
};

// Mock tasks data with more variety - now properly typed
const mockTasksData: ExtendedTask[] = [
  { 
    id: '1', 
    project_id: '1',
    sprint_id: '2',
    title: 'Design Login Page', 
    status: 'todo', 
    assignee_id: 'dev@example.com', 
    priority: 'high', 
    story_points: 3, 
    estimated_hours: 8, 
    description: 'Create responsive login page with form validation',
    created_date: '2024-01-15T10:00:00Z'
  },
  { 
    id: '2', 
    project_id: '1',
    sprint_id: '2',
    title: 'Implement User Model', 
    status: 'in_progress', 
    assignee_id: 'dev@example.com', 
    priority: 'high', 
    story_points: 5, 
    estimated_hours: 16, 
    description: 'Build user authentication model with JWT tokens',
    created_date: '2024-01-15T10:00:00Z'
  },
  { 
    id: '3', 
    project_id: '1',
    sprint_id: '2',
    title: 'Write API Tests', 
    status: 'review', 
    assignee_id: 'dev@example.com', 
    priority: 'medium', 
    story_points: 2, 
    estimated_hours: 4, 
    description: 'Unit tests for authentication endpoints',
    created_date: '2024-01-15T10:00:00Z'
  },
  { 
    id: '4', 
    project_id: '1',
    sprint_id: '1',
    title: 'Setup Database', 
    status: 'done', 
    assignee_id: 'dev@example.com', 
    priority: 'high', 
    story_points: 3, 
    estimated_hours: 8, 
    description: 'Configure PostgreSQL database with migrations',
    created_date: '2024-01-01T10:00:00Z'
  },
  { 
    id: '5', 
    project_id: '1',
    sprint_id: '2',
    title: 'Design Dashboard UI', 
    status: 'todo', 
    assignee_id: 'designer@example.com', 
    priority: 'medium', 
    story_points: 5, 
    estimated_hours: 16, 
    description: 'Create dashboard mockups and component library',
    created_date: '2024-01-15T10:00:00Z'
  },
  { 
    id: '6', 
    project_id: '1',
    sprint_id: '2',
    title: 'Implement Charting Library', 
    status: 'in_progress', 
    assignee_id: 'dev@example.com', 
    priority: 'medium', 
    story_points: 8, 
    estimated_hours: 24, 
    description: 'Integrate Recharts for data visualization',
    created_date: '2024-01-15T10:00:00Z'
  },
  { 
    id: '7', 
    project_id: '1',
    sprint_id: '3',
    title: 'Test Data Visualization', 
    status: 'review', 
    assignee_id: 'dev@example.com', 
    priority: 'low', 
    story_points: 3, 
    estimated_hours: 8, 
    description: 'End-to-end testing for charts and graphs',
    created_date: '2024-01-29T10:00:00Z'
  },
  { 
    id: '8', 
    project_id: '1',
    sprint_id: '1',
    title: 'Configure Analytics Server', 
    status: 'done', 
    assignee_id: 'dev@example.com', 
    priority: 'medium', 
    story_points: 5, 
    estimated_hours: 16, 
    description: 'Setup analytics tracking with proper data collection',
    created_date: '2024-01-01T10:00:00Z'
  }
];

export default function TeamSprintBoard() {
  const [user, setUser] = useState(null);
  const [sprint, setSprint] = useState(null);
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [allProjects, setAllProjects] = useState(mockProjects);
  const [allSprints, setAllSprints] = useState(mockSprintsByProject['1']);
  const [selectedSprint, setSelectedSprint] = useState(mockSprintsByProject['1'][1]); // Active sprint
  const [tasks, setTasks] = useState<ExtendedTask[]>(mockTasksData);
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSprintData();
  }, []);

  useEffect(() => {
    // Update sprints when project changes
    if (selectedProject) {
      const projectSprints = mockSprintsByProject[selectedProject.id] || [];
      setAllSprints(projectSprints);
      setSelectedSprint(projectSprints.find(s => s.status === 'active') || projectSprints[0] || null);
    }
  }, [selectedProject]);

  const loadSprintData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      setUser(userData);

      if (userData.project_id) {
        const [sprintsData, tasksData, projectData, membersData] = await Promise.all([
          Sprint.filter({ project_id: userData.project_id, status: 'active' }),
          BaseTask.filter({ project_id: userData.project_id }),
          Project.list(),
          TeamMember.filter({ project_id: userData.project_id })
        ]);
        
        setSprint(sprintsData[0] || null);
        
        // Convert Task[] to ExtendedTask[] by adding priority
        const extendedTasks: ExtendedTask[] = tasksData.length > 0 
          ? tasksData.map(task => ({ ...task, priority: 'medium' as const }))
          : mockTasksData;
        setTasks(extendedTasks);
        
        setProject(projectData.find(p => p.id === userData.project_id));
        setTeamMembers(membersData);
      }
    } catch (error) {
      console.error("Error loading sprint data:", error);
    }
    setIsLoading(false);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTaskStatus = destination.droppableId;
    const updatedTasks = tasks.map(task => {
      if (task.id === draggableId) {
        return { ...task, status: newTaskStatus as ExtendedTask['status'] };
      }
      return task;
    });

    setTasks(updatedTasks);
    
    // In real app, this would sync to backend/manager view
    console.log(`Task ${draggableId} moved to ${newTaskStatus}`);
  };

  const getSprintProgress = () => {
    const sprintTasks = getTasksForSprint(selectedSprint?.id);
    if (!sprintTasks.length) return 0;
    const completedTasks = sprintTasks.filter(t => t.status === 'done').length;
    return Math.round((completedTasks / sprintTasks.length) * 100);
  };

  const getTasksForSprint = (sprintId) => {
    return tasks.filter(t => t.sprint_id === sprintId);
  };

  const getMyTasks = () => {
    const sprintTasks = getTasksForSprint(selectedSprint?.id);
    if (!user) return sprintTasks; // Show all sprint tasks for now
    return sprintTasks.filter(t => t.assignee_id === user?.user_email);
  };

  const getTasksByStatus = (status) => {
    const sprintTasks = getTasksForSprint(selectedSprint?.id);
    return sprintTasks.filter(t => t.status === status);
  };

  const getVelocityData = () => {
    const myTasks = getMyTasks();
    const statusData = [
      { name: 'Todo', count: myTasks.filter(t => t.status === 'todo').length },
      { name: 'Progress', count: myTasks.filter(t => t.status === 'in_progress').length },
      { name: 'Review', count: myTasks.filter(t => t.status === 'review').length },
      { name: 'Done', count: myTasks.filter(t => t.status === 'done').length }
    ];
    return statusData;
  };

  const getAssigneeName = (assigneeId) => {
    if (!assigneeId) return 'Unassigned';
    const member = teamMembers.find(m => m.user_email === assigneeId);
    if (member && member.full_name) {
      return member.full_name;
    }
    return assigneeId;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Brain className="w-16 h-16 text-blue-500 animate-pulse mx-auto" />
          <p className="text-xl font-black text-gray-700 mt-4 uppercase">Loading Sprint Board...</p>
        </div>
      </div>
    );
  }

  const myTasks = getMyTasks();
  const sprintProgress = getSprintProgress();
  const velocityData = getVelocityData();
  const currentSprintTasks = getTasksForSprint(selectedSprint?.id);

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
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Project Selection */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              TEAM SPRINT BOARD
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              TEAM COLLABORATION & TASK MANAGEMENT
            </p>
          </div>
          
          {/* Project Selection */}
          <Card className="neo-card bg-white min-w-[300px]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <label className="text-sm font-black text-gray-600 uppercase block mb-2">
                    SELECT PROJECT
                  </label>
                  <Select 
                    value={selectedProject?.id} 
                    onValueChange={(value) => {
                      const project = allProjects.find(p => p.id === value);
                      setSelectedProject(project);
                    }}
                  >
                    <SelectTrigger className="neo-button font-bold bg-white">
                      <SelectValue placeholder="Choose project..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-4 border-black z-50">
                      {allProjects.map((proj) => (
                        <SelectItem key={proj.id} value={proj.id} className="font-bold hover:bg-blue-50">
                          <div className="flex items-center gap-2">
                            <Badge className={`font-black text-xs ${
                              proj.status === 'active' ? 'bg-green-500 text-white' :
                              proj.status === 'completed' ? 'bg-gray-500 text-white' :
                              'bg-orange-500 text-white'
                            }`}>
                              {proj.status.toUpperCase()}
                            </Badge>
                            <span className="text-sm">{proj.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Project Info */}
        {selectedProject && (
          <Card className="neo-card bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase mb-2">{selectedProject.name}</h2>
                  <p className="text-purple-100 font-bold">{selectedProject.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge className="bg-white/20 text-white font-black border-2 border-white/50">
                      {selectedProject.status.toUpperCase()}
                    </Badge>
                    <span className="text-purple-100 text-sm font-bold">
                      Created: {new Date(selectedProject.created_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black uppercase text-purple-100">ACTIVE SPRINTS</div>
                  <div className="text-3xl font-black">{allSprints.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sprint Selection */}
        <Card className="neo-card bg-white">
          <CardContent className="p-6">
            {allSprints.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-500 uppercase mb-2">NO SPRINTS AVAILABLE</h3>
                <p className="text-gray-400 font-bold">No sprints found for the selected project</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-gray-900 uppercase">PROJECT SPRINTS</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        const currentIndex = allSprints.findIndex(s => s.id === selectedSprint?.id);
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : allSprints.length - 1;
                        setSelectedSprint(allSprints[prevIndex]);
                      }}
                      variant="outline"
                      size="sm"
                      className="neo-button font-bold"
                      disabled={allSprints.length <= 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        const currentIndex = allSprints.findIndex(s => s.id === selectedSprint?.id);
                        const nextIndex = currentIndex < allSprints.length - 1 ? currentIndex + 1 : 0;
                        setSelectedSprint(allSprints[nextIndex]);
                      }}
                      variant="outline"
                      size="sm"
                      className="neo-button font-bold"
                      disabled={allSprints.length <= 1}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allSprints.map((sprintItem) => (
                    <Button
                      key={sprintItem.id}
                      onClick={() => setSelectedSprint(sprintItem)}
                      variant={selectedSprint?.id === sprintItem.id ? "default" : "outline"}
                      className={`neo-button font-black uppercase whitespace-nowrap ${
                        selectedSprint?.id === sprintItem.id 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-900'
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-sm">{sprintItem.name}</div>
                        <div className="text-xs opacity-75">
                          {sprintItem.start_date} - {sprintItem.end_date}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
                
                {selectedSprint && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-4 border-black">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-black uppercase">{selectedSprint.name}</h4>
                        <p className="text-blue-100 font-bold">{selectedSprint.goal}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {selectedSprint.start_date} - {selectedSprint.end_date}
                          </span>
                          <Badge className={`font-black ${
                            selectedSprint.status === 'active' ? 'bg-green-500 text-white' :
                            selectedSprint.status === 'completed' ? 'bg-gray-500 text-white' :
                            'bg-orange-500 text-white'
                          }`}>
                            {selectedSprint.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black">{Math.round(getSprintProgress())}%</div>
                        <div className="text-blue-100 font-bold uppercase">COMPLETE</div>
                        <div className="w-32 bg-white/20 h-2 border-2 border-white/50 mt-2">
                          <div 
                            className="bg-white h-full transition-all duration-500"
                            style={{ width: `${getSprintProgress()}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Rest of the component - only show if sprint is selected */}
        {selectedSprint && (
          <>
            {/* Left sidebar with stats */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="neo-card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardHeader className="border-b-4 border-white/20">
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                    <Brain className="w-6 h-6" />
                    MY PROGRESS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-black mb-2">
                      {Math.round((myTasks.filter(t => t.status === 'done').length / Math.max(myTasks.length, 1)) * 100)}%
                    </div>
                    <div className="text-purple-100 font-bold uppercase">COMPLETION</div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-bold">TASKS REMAINING:</span>
                      <span className="font-black">{myTasks.filter(t => t.status !== 'done').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">STORY POINTS:</span>
                      <span className="font-black">
                        {myTasks.reduce((sum, t) => sum + (t.story_points || 0), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">ESTIMATED HOURS:</span>
                      <span className="font-black">
                        {myTasks.reduce((sum, t) => sum + (t.estimated_hours || 0), 0)}h
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* My Task Breakdown Chart */}
              <Card className="neo-card bg-white">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-lg font-black uppercase">MY TASK BREAKDOWN</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={velocityData}>
                      <XAxis 
                        dataKey="name" 
                        stroke="#374151" 
                        fontSize={10} 
                        fontWeight="bold"
                      />
                      <YAxis 
                        stroke="#374151" 
                        fontSize={10} 
                        fontWeight="bold"
                      />
                      <Bar 
                        dataKey="count" 
                        fill="#0066FF" 
                        stroke="#000000" 
                        strokeWidth={2}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Main Sprint Board - Draggable Columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="neo-card bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-gray-600 uppercase">TOTAL TASKS</p>
                        <p className="text-2xl font-black text-gray-900">{currentSprintTasks.length}</p>
                      </div>
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="neo-card bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-gray-600 uppercase">IN PROGRESS</p>
                        <p className="text-2xl font-black text-orange-600">{getTasksByStatus('in_progress').length}</p>
                      </div>
                      <Timer className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="neo-card bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-gray-600 uppercase">COMPLETED</p>
                        <p className="text-2xl font-black text-green-600">{getTasksByStatus('done').length}</p>
                      </div>
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="neo-card bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-gray-600 uppercase">REVIEW</p>
                        <p className="text-2xl font-black text-purple-600">{getTasksByStatus('review').length}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Draggable Task Columns */}
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid md:grid-cols-4 gap-6">
                  {TASK_COLUMNS.map((column) => (
                    <div key={column.id} className="space-y-4">
                      {/* Column Header */}
                      <div className={`${column.color} ${column.textColor} p-4 border-4 border-black`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <column.icon className="w-5 h-5" />
                            <h3 className="font-black uppercase text-lg">{column.title}</h3>
                          </div>
                          <Badge className="bg-black text-white font-black border-2 border-white">
                            {getTasksByStatus(column.id).length}
                          </Badge>
                        </div>
                      </div>

                      {/* Droppable Column */}
                      <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`min-h-[400px] p-4 border-4 border-dashed transition-colors ${
                              snapshot.isDraggingOver 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-300 bg-gray-50'
                            }`}
                          >
                            <AnimatePresence>
                              {getTasksByStatus(column.id).map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`bg-white border-4 border-black p-4 mb-4 cursor-grab transition-all hover:shadow-[8px_8px_0px_#000] ${
                                          snapshot.isDragging ? 'shadow-[12px_12px_0px_#000] rotate-2' : ''
                                        }`}
                                      >
                                        <div className="space-y-3">
                                          <h4 className="font-black text-gray-900 uppercase text-sm leading-tight">
                                            {task.title}
                                          </h4>
                                          
                                          {task.description && (
                                            <p className="text-gray-600 text-xs font-bold line-clamp-2">
                                              {task.description}
                                            </p>
                                          )}
                                          
                                          <div className="flex items-center justify-between">
                                            <Badge className={`font-black border-2 text-xs ${
                                              PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
                                            }`}>
                                              {task.priority?.toUpperCase()}
                                            </Badge>
                                            
                                            {task.story_points && (
                                              <Badge variant="outline" className="font-black text-xs">
                                                {task.story_points} PTS
                                              </Badge>
                                            )}
                                          </div>
                                          
                                          {task.assignee_id && (
                                            <div className="flex items-center gap-2">
                                              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex items-center justify-center">
                                                <span className="text-white font-black text-xs">
                                                  {getAssigneeName(task.assignee_id)[0]?.toUpperCase()}
                                                </span>
                                              </div>
                                              <span className="text-xs font-bold text-gray-600">
                                                {getAssigneeName(task.assignee_id)}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </motion.div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </AnimatePresence>
                            {provided.placeholder}
                            
                            {getTasksByStatus(column.id).length === 0 && (
                              <div className="text-center py-8 text-gray-400">
                                <p className="font-bold uppercase text-sm">NO TASKS</p>
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
