
import React, { useState, useEffect } from "react";
import { Task, Project } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  Users, 
  Send, 
  FileText, 
  Calendar,
  Clock,
  CheckCircle2,
  Target,
  Zap,
  Brain
} from "lucide-react";

// Helper function to get initials safely
const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '?';
  return name.charAt(0).toUpperCase();
};

export default function TeamCollaboration() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('general');
  
  // Modal states
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isShareFileModalOpen, setIsShareFileModalOpen] = useState(false);
  const [isAIHelpModalOpen, setIsAIHelpModalOpen] = useState(false);
  
  // Form states
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');

  useEffect(() => {
    loadCollaborationData();
  }, []);

  const loadCollaborationData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      setUser(userData);
      
      if (userData.project_id) {
        const tasksData = await Task.filter({ project_id: userData.project_id });
        setTasks(tasksData || []);
      }
      
      // Mock team members and messages for now
      setTeamMembers([
        { id: 1, full_name: 'Sarah Chen', role: 'Frontend Developer', status: 'online', avatar: null },
        { id: 2, full_name: 'Mike Johnson', role: 'Backend Developer', status: 'away', avatar: null },
        { id: 3, full_name: 'Lisa Wang', role: 'UI/UX Designer', status: 'online', avatar: null },
        { id: 4, full_name: 'Alex Rodriguez', role: 'DevOps Engineer', status: 'offline', avatar: null }
      ]);
      
      setMessages([
        { id: 1, sender: 'Sarah Chen', message: 'Just finished the login component. Ready for review!', timestamp: '2 min ago', channel: 'general' },
        { id: 2, sender: 'Mike Johnson', message: 'API endpoints are deployed to staging', timestamp: '5 min ago', channel: 'general' },
        { id: 3, sender: 'You', message: 'Thanks everyone! Great progress today.', timestamp: '10 min ago', channel: 'general' },
        { id: 4, sender: 'Lisa Wang', message: 'Updated designs are in Figma', timestamp: '15 min ago', channel: 'design' }
      ]);
    } catch (error) {
      console.error("Error loading collaboration data:", error);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        message: newMessage,
        timestamp: 'just now',
        channel: selectedChannel
      };
      setMessages(prev => [message, ...prev]);
      setNewMessage('');
    }
  };

  // Quick action handlers
  const handleScheduleMeeting = () => {
    if (meetingTitle && meetingDate && meetingTime) {
      // Add meeting to messages as announcement
      const meetingMessage = {
        id: Date.now(),
        sender: 'You',
        message: `📅 Meeting scheduled: "${meetingTitle}" on ${meetingDate} at ${meetingTime}`,
        timestamp: 'just now',
        channel: 'announcements'
      };
      setMessages(prev => [meetingMessage, ...prev]);
      
      // Reset form and close modal
      setMeetingTitle('');
      setMeetingDate('');
      setMeetingTime('');
      setIsScheduleModalOpen(false);
      
      // Show notification in general channel
      const notificationMessage = {
        id: Date.now() + 1,
        sender: 'System',
        message: `New meeting scheduled by ${user?.full_name || 'You'}: "${meetingTitle}"`,
        timestamp: 'just now',
        channel: 'general'
      };
      setMessages(prev => [notificationMessage, ...prev]);
    }
  };

  const handleShareFile = () => {
    if (selectedFile) {
      const fileMessage = {
        id: Date.now(),
        sender: 'You',
        message: `📎 Shared file: ${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`,
        timestamp: 'just now',
        channel: selectedChannel
      };
      setMessages(prev => [fileMessage, ...prev]);
      
      // Reset and close modal
      setSelectedFile(null);
      setIsShareFileModalOpen(false);
    }
  };

  const handleAIHelp = () => {
    if (aiQuestion.trim()) {
      // Add user question to messages
      const questionMessage = {
        id: Date.now(),
        sender: 'You',
        message: `🤖 AI Question: ${aiQuestion}`,
        timestamp: 'just now',
        channel: selectedChannel
      };
      setMessages(prev => [questionMessage, ...prev]);
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          sender: 'AI Assistant',
          message: `Based on your question about "${aiQuestion}", here are some suggestions: Consider breaking down the task into smaller components, reviewing the documentation, and collaborating with your team members for the best approach.`,
          timestamp: 'just now',
          channel: selectedChannel
        };
        setMessages(prev => [aiResponse, ...prev]);
      }, 1500);
      
      // Reset form and close modal
      setAiQuestion('');
      setIsAIHelpModalOpen(false);
    }
  };

  const channels = [
    { id: 'general', name: 'General', icon: MessageSquare, count: 12 },
    { id: 'development', name: 'Development', icon: FileText, count: 8 },
    { id: 'design', name: 'Design', icon: Target, count: 5 },
    { id: 'announcements', name: 'Announcements', icon: Zap, count: 3 }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

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
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            TEAM COLLABORATION
          </h1>
          <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
            CONNECT & COORDINATE WITH YOUR TEAM
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Channels & Team */}
          <div className="space-y-6">
            {/* Channels */}
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  CHANNELS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {channels.map(channel => (
                  <div
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`p-3 border-3 cursor-pointer transition-all font-bold uppercase text-sm ${
                      selectedChannel === channel.id
                        ? 'border-blue-500 bg-blue-50 shadow-[4px_4px_0px_#0066FF] transform translate-x-[-2px] translate-y-[-2px]'
                        : 'border-gray-300 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <channel.icon className="w-4 h-4" />
                        <span>{channel.name}</span>
                      </div>
                      <Badge className="border-2 border-black shadow-[2px_2px_0px_#000] font-black">
                        {channel.count}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  TEAM MEMBERS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-2 border-2 border-gray-200 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <div className="relative">
                      <Avatar className="w-10 h-10 border-2 border-black">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="font-black bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {getInitials(member.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-gray-900 text-sm truncate uppercase">{member.full_name}</p>
                      <p className="text-xs font-bold text-gray-600 uppercase">{member.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="neo-card bg-white h-[600px] flex flex-col">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-xl font-black uppercase">
                  #{selectedChannel}
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.filter(msg => msg.channel === selectedChannel).map(message => (
                    <div key={message.id} className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 border-2 border-black">
                        <AvatarFallback className="font-black bg-gradient-to-br from-green-500 to-blue-600 text-white">
                          {getInitials(message.sender)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 p-3 border-3 border-gray-300 shadow-[4px_4px_0px_#000]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-gray-900 text-sm uppercase">{message.sender}</span>
                          <span className="text-xs font-bold text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-gray-700 font-bold">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              {/* Message Input */}
              <div className="p-4 border-t-4 border-black">
                <div className="flex gap-3">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message #${selectedChannel}...`}
                    className="neo-input font-bold flex-1"
                    rows={2}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="neo-button bg-blue-500 text-white font-black uppercase"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Active Tasks */}
          <div className="space-y-6">
            {/* Active Tasks */}
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ACTIVE TASKS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {tasks.slice(0, 5).map(task => (
                  <div key={task.id} className="p-3 border-3 border-gray-300 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <h4 className="font-black text-gray-900 text-sm uppercase mb-2">{task.title || 'Untitled Task'}</h4>
                    <div className="flex items-center justify-between">
                      <Badge className={`font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] ${
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'done' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status?.replace('_', ' ').toUpperCase() || 'TODO'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs font-bold text-gray-500">{task.estimated_hours || 0}h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="neo-card bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  QUICK ACTIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="neo-button w-full bg-white text-orange-600 font-black uppercase text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      SCHEDULE MEETING
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Dialog open={isShareFileModalOpen} onOpenChange={setIsShareFileModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="neo-button w-full bg-white text-orange-600 font-black uppercase text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      SHARE FILE
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Dialog open={isAIHelpModalOpen} onOpenChange={setIsAIHelpModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="neo-button w-full bg-white text-orange-600 font-black uppercase text-sm">
                      <Brain className="w-4 h-4 mr-2" />
                      ASK AI HELP
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Schedule Meeting Modal */}
        <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
          <DialogContent className="neo-card bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
            <DialogHeader className="border-b-4 border-black pb-4">
              <DialogTitle className="text-xl font-black uppercase text-gray-900">
                📅 SCHEDULE MEETING
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div>
                <Label className="font-black uppercase text-sm text-gray-700">MEETING TITLE</Label>
                <Input
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="Enter meeting title"
                  className="neo-input font-bold mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-black uppercase text-sm text-gray-700">DATE</Label>
                  <Input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="neo-input font-bold mt-2"
                  />
                </div>
                <div>
                  <Label className="font-black uppercase text-sm text-gray-700">TIME</Label>
                  <Input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="neo-input font-bold mt-2"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleScheduleMeeting}
                  disabled={!meetingTitle || !meetingDate || !meetingTime}
                  className="neo-button flex-1 bg-green-500 text-white font-black uppercase"
                >
                  CREATE MEETING
                </Button>
                <Button
                  onClick={() => setIsScheduleModalOpen(false)}
                  variant="outline"
                  className="neo-button bg-white text-gray-600 font-black uppercase"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share File Modal */}
        <Dialog open={isShareFileModalOpen} onOpenChange={setIsShareFileModalOpen}>
          <DialogContent className="neo-card bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
            <DialogHeader className="border-b-4 border-black pb-4">
              <DialogTitle className="text-xl font-black uppercase text-gray-900">
                📎 SHARE FILE
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div>
                <Label className="font-black uppercase text-sm text-gray-700">SELECT FILE</Label>
                <Input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="neo-input font-bold mt-2"
                  accept="*/*"
                />
                {selectedFile && (
                  <div className="mt-2 p-2 border-2 border-gray-300 bg-gray-50">
                    <p className="font-bold text-sm text-gray-700">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleShareFile}
                  disabled={!selectedFile}
                  className="neo-button flex-1 bg-blue-500 text-white font-black uppercase"
                >
                  SHARE FILE
                </Button>
                <Button
                  onClick={() => setIsShareFileModalOpen(false)}
                  variant="outline"
                  className="neo-button bg-white text-gray-600 font-black uppercase"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* AI Help Modal */}
        <Dialog open={isAIHelpModalOpen} onOpenChange={setIsAIHelpModalOpen}>
          <DialogContent className="neo-card bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
            <DialogHeader className="border-b-4 border-black pb-4">
              <DialogTitle className="text-xl font-black uppercase text-gray-900">
                🤖 ASK AI HELP
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div>
                <Label className="font-black uppercase text-sm text-gray-700">YOUR QUESTION</Label>
                <Textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="What do you need help with? Ask about tasks, code, best practices, etc..."
                  className="neo-input font-bold mt-2"
                  rows={4}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAIHelp}
                  disabled={!aiQuestion.trim()}
                  className="neo-button flex-1 bg-purple-500 text-white font-black uppercase"
                >
                  ASK AI
                </Button>
                <Button
                  onClick={() => setIsAIHelpModalOpen(false)}
                  variant="outline"
                  className="neo-button bg-white text-gray-600 font-black uppercase"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
