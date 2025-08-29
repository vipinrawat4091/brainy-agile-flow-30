import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  Users, 
  Calendar, 
  Target,
  Brain,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  ChevronLeft,
  ChevronRight,
  Timer,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AIInsightsPanel from "@/components/sprint/AIInsightsPanel";
import SprintGenerationModal from "@/components/sprint/SprintGenerationModal";
import TaskCreationModal from "@/components/sprint/TaskCreationModal";
import ProgressChart from "@/components/sprint/ProgressChart";

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  story_points: number;
  estimated_hours: number;
  description?: string;
}

interface Sprint {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  goal: string;
  velocity: number;
  status: 'planning' | 'active' | 'completed';
}

interface Feature {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  complexity: 'simple' | 'moderate' | 'complex';
  status: 'approved' | 'backlog' | 'in_progress' | 'completed';
}

interface TeamMember {
  id: string;
  full_name: string;
  user_email: string;
  role: 'developer' | 'designer' | 'tester' | 'lead';
}

const mockFeatures: Feature[] = [
  { id: '1', title: 'User Authentication', priority: 'high', complexity: 'moderate', status: 'approved' },
  { id: '2', title: 'Dashboard Analytics', priority: 'medium', complexity: 'complex', status: 'in_progress' },
  { id: '3', title: 'Mobile Responsiveness', priority: 'low', complexity: 'simple', status: 'backlog' },
  { id: '4', title: 'API Integration', priority: 'critical', complexity: 'complex', status: 'approved' }
];

const mockTeamMembers: TeamMember[] = [
  { id: '1', full_name: 'John Doe', user_email: 'john.doe@example.com', role: 'developer' },
  { id: '2', full_name: 'Jane Smith', user_email: 'jane.smith@example.com', role: 'designer' },
  { id: '3', full_name: 'Mike Johnson', user_email: 'mike.johnson@example.com', role: 'tester' },
  { id: '4', full_name: 'Emily White', user_email: 'emily.white@example.com', role: 'lead' }
];

const mockSprints: Sprint[] = [
  {
    id: '1',
    name: 'Sprint 1: Foundation',
    start_date: '2024-01-01',
    end_date: '2024-01-14',
    goal: 'Setup project foundation and authentication',
    velocity: 20,
    status: 'completed'
  },
  {
    id: '2', 
    name: 'Sprint 2: Core Features',
    start_date: '2024-01-15',
    end_date: '2024-01-28',
    goal: 'Implement core dashboard features',
    velocity: 25,
    status: 'active'
  },
  {
    id: '3',
    name: 'Sprint 3: Enhancement',
    start_date: '2024-01-29',
    end_date: '2024-02-11',
    goal: 'Add mobile support and optimizations',
    velocity: 22,
    status: 'planning'
  }
];

const mockTasks: Task[] = [
  { id: '1', title: 'Design Login Page', status: 'todo', assignee: 'jane.smith@example.com', priority: 'high', story_points: 3, estimated_hours: 8 },
  { id: '2', title: 'Implement User Model', status: 'in_progress', assignee: 'john.doe@example.com', priority: 'high', story_points: 5, estimated_hours: 16 },
  { id: '3', title: 'Write API Tests', status: 'review', assignee: 'mike.johnson@example.com', priority: 'medium', story_points: 2, estimated_hours: 4 },
  { id: '4', title: 'Setup Database', status: 'done', assignee: 'john.doe@example.com', priority: 'high', story_points: 3, estimated_hours: 8 },
  { id: '5', title: 'Design Dashboard UI', status: 'todo', assignee: 'jane.smith@example.com', priority: 'medium', story_points: 5, estimated_hours: 16 },
  { id: '6', title: 'Implement Charting Library', status: 'in_progress', assignee: 'john.doe@example.com', priority: 'medium', story_points: 8, estimated_hours: 24 },
  { id: '7', title: 'Test Data Visualization', status: 'review', assignee: 'mike.johnson@example.com', priority: 'low', story_points: 3, estimated_hours: 8 },
  { id: '8', title: 'Configure Analytics Server', status: 'done', assignee: 'john.doe@example.com', priority: 'medium', story_points: 5, estimated_hours: 16 }
];

const TASK_COLUMNS = [
  { id: "todo", title: "TO DO", color: "bg-gray-500", textColor: "text-white", icon: AlertTriangle },
  { id: "in_progress", title: "IN PROGRESS", color: "bg-blue-500", textColor: "text-white", icon: Clock },
  { id: "review", title: "REVIEW", color: "bg-orange-500", textColor: "text-white", icon: Users },
  { id: "done", title: "DONE", color: "bg-green-500", textColor: "text-white", icon: CheckCircle2 }
];

const PRIORITY_COLORS = {
  low: "bg-gray-500 border-gray-800 text-white",
  medium: "bg-blue-500 border-blue-800 text-white", 
  high: "bg-orange-500 border-orange-800 text-white"
};

// Mock projects data
const mockProjects = [
  {
    id: '1',
    name: 'AI Project Management System',
    description: 'Next-gen project management with AI features',
    status: 'active'
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    description: 'Modern e-commerce solution with analytics',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application',
    status: 'completed'
  }
];

// Mock sprints organized by project
const mockSprintsByProject = {
  '1': [
    {
      id: '1',
      name: 'Sprint 1: Foundation',
      start_date: '2024-01-01',
      end_date: '2024-01-14',
      goal: 'Setup project foundation and authentication',
      velocity: 20,
      status: 'completed' as const
    },
    {
      id: '2', 
      name: 'Sprint 2: Core Features',
      start_date: '2024-01-15',
      end_date: '2024-01-28',
      goal: 'Implement core dashboard features',
      velocity: 25,
      status: 'active' as const
    },
    {
      id: '3',
      name: 'Sprint 3: Enhancement',
      start_date: '2024-01-29',
      end_date: '2024-02-11',
      goal: 'Add mobile support and optimizations',
      velocity: 22,
      status: 'planning' as const
    }
  ],
  '2': [
    {
      id: '4',
      name: 'Sprint 1: E-commerce Setup',
      start_date: '2024-01-01',
      end_date: '2024-01-14',
      goal: 'E-commerce platform foundation',
      velocity: 18,
      status: 'active' as const
    }
  ],
  '3': [
    {
      id: '5',
      name: 'Sprint 1: Banking Security',
      start_date: '2023-12-01',
      end_date: '2023-12-14',
      goal: 'Banking security implementation',
      velocity: 15,
      status: 'completed' as const
    }
  ]
};

export default function SprintBoard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [allProjects, setAllProjects] = useState(mockProjects);
  const [sprints, setSprints] = useState<Sprint[]>(mockSprintsByProject['1']);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(mockSprintsByProject['1'][1]); // Default to active sprint
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('user_type');
    if (userType !== 'manager') {
      navigate(createPageUrl('TeamLogin'));
    }
  }, [navigate]);

  useEffect(() => {
    // Update sprints when project changes
    if (selectedProject) {
      const projectSprints = mockSprintsByProject[selectedProject.id] || [];
      setSprints(projectSprints);
      setSelectedSprint(projectSprints.find(s => s.status === 'active') || projectSprints[0] || null);
    }
  }, [selectedProject]);

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
        return { ...task, status: newTaskStatus };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleGenerateSprints = (newSprints) => {
    setSprints(newSprints);
    setIsGenerating(false);
  };

  const handleCreateTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: Date.now().toString()
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsCreatingTask(false);
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getSprintProgress = () => {
    if (!tasks.length) return 0;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    return (completedTasks / tasks.length) * 100;
  };

  const getAssigneeName = (assigneeId) => {
    const member = mockTeamMembers.find(m => m.user_email === assigneeId);
    return member ? member.full_name || member.user_email : 'Unassigned';
  };

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
      `}</style>

      {/* Header with Project Selection */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            SPRINT BOARD
          </h1>
          <p className="text-lg font-bold text-gray-700 uppercase tracking-wide">
            MANAGE ACTIVE SPRINTS AND TASK ASSIGNMENTS
          </p>
        </div>
        
        <div className="flex gap-4 items-start">
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={() => setIsGenerating(true)}
              className="neo-button bg-purple-500 text-white font-black uppercase"
              disabled={!selectedProject}
            >
              <Brain className="w-5 h-5 mr-2" />
              GENERATE SPRINTS
            </Button>
            <Button 
              onClick={() => setIsCreatingTask(true)}
              className="neo-button bg-blue-500 text-white font-black uppercase"
              disabled={!selectedSprint}
            >
              <Plus className="w-5 h-5 mr-2" />
              ADD NEW TASK
            </Button>
          </div>
        </div>
      </div>

      {/* Current Project Info */}
      {selectedProject && (
        <Card className="neo-card bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black uppercase mb-2">{selectedProject.name}</h2>
                <p className="text-blue-100 font-bold">{selectedProject.description}</p>
                <Badge className="bg-white/20 text-white font-black border-2 border-white/50 mt-3">
                  {selectedProject.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-lg font-black uppercase text-blue-100">TOTAL SPRINTS</div>
                <div className="text-3xl font-black">{sprints.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sprint Tabs Navigation */}
      <Card className="neo-card bg-white">
        <CardContent className="p-6">
          {sprints.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-500 uppercase mb-2">NO SPRINTS AVAILABLE</h3>
              <p className="text-gray-400 font-bold">Generate sprints for this project to get started</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-gray-900 uppercase">PROJECT SPRINTS</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      const currentIndex = sprints.findIndex(s => s.id === selectedSprint?.id);
                      const prevIndex = currentIndex > 0 ? currentIndex - 1 : sprints.length - 1;
                      setSelectedSprint(sprints[prevIndex]);
                    }}
                    variant="outline"
                    size="sm"
                    className="neo-button font-bold"
                    disabled={sprints.length <= 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      const currentIndex = sprints.findIndex(s => s.id === selectedSprint?.id);
                      const nextIndex = currentIndex < sprints.length - 1 ? currentIndex + 1 : 0;
                      setSelectedSprint(sprints[nextIndex]);
                    }}
                    variant="outline"
                    size="sm"
                    className="neo-button font-bold"
                    disabled={sprints.length <= 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {sprints.map((sprint) => (
                  <Button
                    key={sprint.id}
                    onClick={() => setSelectedSprint(sprint)}
                    variant={selectedSprint?.id === sprint.id ? "default" : "outline"}
                    className={`neo-button font-black uppercase whitespace-nowrap ${
                      selectedSprint?.id === sprint.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm">{sprint.name}</div>
                      <div className="text-xs opacity-75">
                        {sprint.start_date} - {sprint.end_date}
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

      {!selectedSprint ? (
        <div className="text-center py-16">
          <Clock className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">NO SPRINTS FOUND</h2>
          <p className="text-gray-400 font-bold">Let AI generate sprints automatically based on your features</p>
          <Button 
            onClick={() => setIsGenerating(true)}
            className="neo-button bg-blue-500 text-white font-black uppercase mt-6"
            disabled={!selectedProject}
          >
            <Brain className="w-5 h-5 mr-2" />
            GENERATE SPRINTS
          </Button>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 gap-8">
            {/* AI Insights Panel - Left Side */}
            <div className="lg:col-span-1">
              <AIInsightsPanel 
                sprint={selectedSprint}
                tasks={tasks}
                teamMembers={mockTeamMembers}
              />
            </div>

            {/* Main Sprint Board */}
            <div className="lg:col-span-3 space-y-6">
              {/* Progress Charts */}
              <ProgressChart />

              {/* Stats Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="neo-card bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-gray-600 uppercase">TOTAL TASKS</p>
                        <p className="text-2xl font-black text-gray-900">{tasks.length}</p>
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
                
                <Card className="neo-card bg-orange-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-orange-800 uppercase">AI ALERTS</p>
                        <p className="text-2xl font-black text-orange-900">2</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sprint Columns */}
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
                                          
                                          {task.assignee && (
                                            <div className="flex items-center gap-2">
                                              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex items-center justify-center">
                                                <span className="text-white font-black text-xs">
                                                  {getAssigneeName(task.assignee)[0]?.toUpperCase()}
                                                </span>
                                              </div>
                                              <span className="text-xs font-bold text-gray-600">
                                                {getAssigneeName(task.assignee)}
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
            </div>
          </>
        )}

        {/* Sprint Generation Modal */}
        {isGenerating && selectedProject && (
          <SprintGenerationModal 
            project={selectedProject}
            features={mockFeatures}
            teamMembers={mockTeamMembers}
            onGenerate={(newSprints) => {
              setSprints(newSprints);
              setIsGenerating(false);
            }}
            onClose={() => setIsGenerating(false)}
          />
        )}

        {/* Task Creation Modal */}
        {isCreatingTask && selectedSprint && (
          <TaskCreationModal
            sprint={selectedSprint}
            features={mockFeatures}
            teamMembers={mockTeamMembers}
            onCreateTask={handleCreateTask}
            onClose={() => setIsCreatingTask(false)}
          />
        )}
      </div>
    );
  }