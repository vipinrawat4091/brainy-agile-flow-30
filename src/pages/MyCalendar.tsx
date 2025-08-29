
import React, { useState, useEffect } from "react";
import { Task, Sprint, Project } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Target, 
  CheckCircle2,
  AlertCircle,
  Plus,
  Filter,
  Users,
  Zap,
  BookOpen,
  Coffee,
  MessageSquare,
  Video,
  Save,
  X
} from "lucide-react";
import { format, isSameDay, isToday, isTomorrow, isYesterday } from "date-fns";

export default function MyCalendar() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [showLogModal, setShowLogModal] = useState(false);
  const [newLogEntry, setNewLogEntry] = useState({ title: '', description: '', hours: '', type: 'work' });
  
  // Mock daily logs data
  const [dailyLogs, setDailyLogs] = useState([
    {
      id: "1",
      date: "2024-01-16",
      title: "Sprint Planning Meeting",
      description: "Participated in sprint planning, estimated story points for upcoming tasks",
      hours: "2",
      type: "meeting"
    },
    {
      id: "2", 
      date: "2024-01-16",
      title: "Feature Development",
      description: "Worked on user authentication module, implemented password reset functionality",
      hours: "5",
      type: "work"
    },
    {
      id: "3",
      date: "2024-01-15",
      title: "Code Review",
      description: "Reviewed pull requests from team members, provided feedback on implementation",
      hours: "1.5",
      type: "review"
    },
    {
      id: "4",
      date: "2024-01-15",
      title: "Learning Session",
      description: "Studied new React patterns and best practices for state management",
      hours: "2",
      type: "learning"
    }
  ]);

  // Mock upcoming events
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: "1",
      title: "Daily Standup",
      date: "2024-01-17",
      time: "09:00",
      type: "meeting"
    },
    {
      id: "2",
      title: "Client Demo",
      date: "2024-01-18", 
      time: "14:00",
      type: "demo"
    },
    {
      id: "3",
      title: "Sprint Review",
      date: "2024-01-19",
      time: "15:00",
      type: "meeting"
    },
    {
      id: "4",
      title: "Team Coffee Chat",
      date: "2024-01-20",
      time: "11:00",
      type: "social"
    }
  ]);

  useEffect(() => {
    loadCalendarData();
  }, []);

  const loadCalendarData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      setUser(userData);
      
      if (userData.user_email && userData.project_id) {
        const [tasksData, sprintsData] = await Promise.all([
          Task.filter({ 
            assignee_id: userData.user_email,
            project_id: userData.project_id 
          }),
          Sprint.filter({ project_id: userData.project_id })
        ]);
        
        setTasks(tasksData || []);
        setSprints(sprintsData || []);
      }
    } catch (error) {
      console.error("Error loading calendar data:", error);
    }
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.due_date) return false;
      return isSameDay(new Date(task.due_date), date);
    });
  };

  const getLogsForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return dailyLogs.filter(log => log.date === dateStr);
  };

  const getDateLabel = (date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'EEEE, MMMM d');
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500 text-white border-red-600';
      case 'high': return 'bg-orange-500 text-white border-orange-600';
      case 'medium': return 'bg-blue-500 text-white border-blue-600';
      case 'low': return 'bg-green-500 text-white border-green-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'done': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'blocked': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLogTypeIcon = (type) => {
    switch(type) {
      case 'meeting': return <Users className="w-4 h-4 text-purple-600" />;
      case 'review': return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'learning': return <BookOpen className="w-4 h-4 text-green-600" />;
      case 'work': return <Target className="w-4 h-4 text-orange-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLogTypeColor = (type) => {
    switch(type) {
      case 'meeting': return 'bg-purple-500 text-white border-purple-600';
      case 'review': return 'bg-blue-500 text-white border-blue-600';
      case 'learning': return 'bg-green-500 text-white border-green-600';
      case 'work': return 'bg-orange-500 text-white border-orange-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'meeting': return <Users className="w-4 h-4 text-purple-600" />;
      case 'demo': return <Video className="w-4 h-4 text-blue-600" />;
      case 'social': return <Coffee className="w-4 h-4 text-green-600" />;
      default: return <CalendarIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddLog = () => {
    if (!newLogEntry.title.trim()) return;
    
    const logEntry = {
      id: `log_${Date.now()}`,
      date: format(selectedDate, 'yyyy-MM-dd'),
      title: newLogEntry.title,
      description: newLogEntry.description,
      hours: newLogEntry.hours,
      type: newLogEntry.type
    };
    
    setDailyLogs(prev => [logEntry, ...prev]);
    setNewLogEntry({ title: '', description: '', hours: '', type: 'work' });
    setShowLogModal(false);
  };

  const selectedDateTasks = getTasksForDate(selectedDate);
  const selectedDateLogs = getLogsForDate(selectedDate);
  const upcomingTasks = tasks.filter(task => {
    if (!task.due_date) return false;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    return dueDate > today && dueDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
        
        .neo-input {
          border: 3px solid #000000 !important;
          box-shadow: 4px 4px 0px #000000 !important;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              MY CALENDAR
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              ORGANIZE YOUR SCHEDULE & TRACK YOUR PROGRESS
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowLogModal(true)}
              className="neo-button bg-green-500 text-white font-black uppercase"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD LOG
            </Button>
            <Button className="neo-button bg-gray-200 text-gray-900 font-black uppercase">
              <Filter className="w-4 h-4 mr-2" />
              FILTER
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                  {format(selectedDate, 'MMMM yyyy').toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-4 border-black shadow-[4px_4px_0px_#000]"
                  modifiers={{
                    hasTask: (date) => getTasksForDate(date).length > 0,
                    hasLog: (date) => getLogsForDate(date).length > 0
                  }}
                  modifiersStyles={{
                    hasTask: {
                      backgroundColor: '#3B82F6',
                      color: 'white',
                      fontWeight: 'bold'
                    },
                    hasLog: {
                      backgroundColor: '#10B981',
                      color: 'white',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Selected Date Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tasks for Selected Date */}
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase">
                  TASKS - {getDateLabel(selectedDate).toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedDateTasks.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateTasks.map(task => (
                      <div key={task.id} className="p-4 border-3 border-gray-300 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-black text-gray-900 uppercase text-sm flex-1">{task.title}</h4>
                          {getStatusIcon(task.status)}
                        </div>
                        <p className="text-gray-600 font-bold text-sm mb-3">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={`font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] ${getPriorityColor(task.priority)}`}>
                            {task.priority?.toUpperCase() || 'MEDIUM'}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs font-bold">{task.estimated_hours || 0}h</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold uppercase">No tasks for this date</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Daily Logs for Selected Date */}
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  DAILY LOGS - {getDateLabel(selectedDate).toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedDateLogs.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateLogs.map(log => (
                      <div key={log.id} className="p-4 border-3 border-green-300 bg-green-50 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-black text-green-900 uppercase text-sm flex-1">{log.title}</h4>
                          {getLogTypeIcon(log.type)}
                        </div>
                        <p className="text-green-700 font-bold text-sm mb-3">{log.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={`font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] ${getLogTypeColor(log.type)}`}>
                            {log.type.toUpperCase()}
                          </Badge>
                          {log.hours && (
                            <div className="flex items-center gap-1 text-green-600">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs font-bold">{log.hours}h</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold uppercase">No logs for this date</p>
                    <Button 
                      onClick={() => setShowLogModal(true)}
                      className="neo-button bg-green-500 text-white font-black uppercase text-sm mt-4"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      ADD LOG
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <Card className="neo-card bg-white">
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                UPCOMING TASKS THIS WEEK
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.slice(0, 5).map(task => (
                  <div key={task.id} className="p-3 border-3 border-gray-300 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-black text-gray-900 text-sm uppercase">{task.title}</h5>
                      {getStatusIcon(task.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-600">
                        {format(new Date(task.due_date), 'MMM d')}
                      </span>
                      <Badge className={`font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] ${getPriorityColor(task.priority)}`}>
                        {task.priority?.toUpperCase() || 'MEDIUM'}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-500 font-bold uppercase text-sm">All caught up!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="neo-card bg-white">
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                UPCOMING EVENTS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-3 border-3 border-blue-300 bg-blue-50 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-black text-blue-900 text-sm uppercase">{event.title}</h5>
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">
                      {format(new Date(event.date), 'MMM d')} at {event.time}
                    </span>
                    <Badge className="font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] bg-blue-500 text-white border-blue-600">
                      {event.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sprint Timeline */}
        {sprints.length > 0 && (
          <Card className="neo-card bg-white">
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-600" />
                SPRINT TIMELINE
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {sprints.slice(0, 3).map(sprint => (
                  <div key={sprint.id} className="p-4 border-3 border-purple-300 bg-purple-50 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-black text-purple-900 uppercase">{sprint.name}</h4>
                      <Badge className={`font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] ${
                        sprint.status === 'active' ? 'bg-green-500 text-white' :
                        sprint.status === 'planned' ? 'bg-blue-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {sprint.status?.toUpperCase() || 'PLANNED'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4 text-purple-600" />
                        <span className="font-bold text-purple-700">
                          {sprint.start_date ? format(new Date(sprint.start_date), 'MMM d') : 'TBD'} - 
                          {sprint.end_date ? format(new Date(sprint.end_date), 'MMM d') : 'TBD'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="font-bold text-purple-700">{sprint.goal || 'No goal set'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="neo-card bg-white max-w-lg w-full">
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="text-xl font-black uppercase flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  ADD DAILY LOG
                </span>
                <Button 
                  onClick={() => setShowLogModal(false)}
                  className="neo-button bg-red-500 text-white font-black uppercase p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase mb-2">
                  Title
                </label>
                <Input
                  value={newLogEntry.title}
                  onChange={(e) => setNewLogEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="neo-input font-bold"
                  placeholder="What did you work on?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase mb-2">
                  Description
                </label>
                <Textarea
                  value={newLogEntry.description}
                  onChange={(e) => setNewLogEntry(prev => ({ ...prev, description: e.target.value }))}
                  className="neo-input font-bold"
                  placeholder="Describe your work in detail..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase mb-2">
                    Hours Spent
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={newLogEntry.hours}
                    onChange={(e) => setNewLogEntry(prev => ({ ...prev, hours: e.target.value }))}
                    className="neo-input font-bold"
                    placeholder="2.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase mb-2">
                    Type
                  </label>
                  <select
                    value={newLogEntry.type}
                    onChange={(e) => setNewLogEntry(prev => ({ ...prev, type: e.target.value }))}
                    className="neo-input font-bold w-full px-3 py-2"
                  >
                    <option value="work">WORK</option>
                    <option value="meeting">MEETING</option>
                    <option value="review">REVIEW</option>
                    <option value="learning">LEARNING</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleAddLog}
                  className="neo-button bg-green-500 text-white font-black uppercase flex-1"
                  disabled={!newLogEntry.title.trim()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  SAVE LOG
                </Button>
                <Button 
                  onClick={() => setShowLogModal(false)}
                  className="neo-button bg-gray-500 text-white font-black uppercase flex-1"
                >
                  CANCEL
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
