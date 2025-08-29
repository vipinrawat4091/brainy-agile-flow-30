import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  Brain,
  Target,
  Calendar,
  MessageSquare,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import HelpAssignmentModal from './HelpAssignmentModal';
import NotesModal from './NotesModal';

interface TeamMemberStandup {
  id: string;
  name: string;
  email: string;
  role: string;
  accomplishments: string;
  todaysPlan: string;
  blockers: string;
  hasBlockers: boolean;
  estimatedHours: number;
  completedTasks: number;
  moodRating: number;
  lastUpdate: Date;
  status: 'completed' | 'pending' | 'overdue';
}

interface TeamBlocker {
  id: string;
  memberName: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  suggestedSolution?: string;
  escalated: boolean;
  helpAssigned?: boolean;
  assignedHelper?: string;
}

export default function ManagerStandupDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [teamStandups, setTeamStandups] = useState<TeamMemberStandup[]>([]);
  const [teamBlockers, setTeamBlockers] = useState<TeamBlocker[]>([]);
  const [selectedBlocker, setSelectedBlocker] = useState<TeamBlocker | null>(null);
  const [showNotesModal, setShowNotesModal] = useState(false);

  // Mock data for team standups
  useEffect(() => {
    const mockStandups: TeamMemberStandup[] = [
      {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@company.com',
        role: 'Senior Developer',
        accomplishments: 'Completed user authentication API endpoints and added validation',
        todaysPlan: 'Work on frontend authentication forms and testing',
        blockers: 'Waiting for design approval on login page layout',
        hasBlockers: true,
        estimatedHours: 7,
        completedTasks: 2,
        moodRating: 8,
        lastUpdate: new Date(),
        status: 'completed'
      },
      {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@company.com',
        role: 'UI/UX Designer',
        accomplishments: 'Finished wireframes for dashboard and created component library',
        todaysPlan: 'Review authentication flows and create high-fidelity mockups',
        blockers: 'None',
        hasBlockers: false,
        estimatedHours: 6,
        completedTasks: 3,
        moodRating: 9,
        lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
        status: 'completed'
      },
      {
        id: '3',
        name: 'Mike Rodriguez',
        email: 'mike@company.com',
        role: 'QA Engineer',
        accomplishments: 'Set up automated testing pipeline and wrote test cases',
        todaysPlan: 'Test new authentication features and report bugs',
        blockers: 'Testing environment is down - need DevOps support',
        hasBlockers: true,
        estimatedHours: 8,
        completedTasks: 1,
        moodRating: 6,
        lastUpdate: new Date(Date.now() - 45 * 60 * 1000),
        status: 'completed'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@company.com',
        role: 'Frontend Developer',
        accomplishments: 'Implemented responsive navigation and fixed mobile bugs',
        todaysPlan: 'Integrate with authentication API and handle error states',
        blockers: 'None',
        hasBlockers: false,
        estimatedHours: 7,
        completedTasks: 2,
        moodRating: 7,
        lastUpdate: new Date(),
        status: 'completed'
      },
      {
        id: '5',
        name: 'James Wilson',
        email: 'james@company.com',
        role: 'Backend Developer',
        accomplishments: 'No update provided',
        todaysPlan: 'No plan specified',
        blockers: 'No blockers reported',
        hasBlockers: false,
        estimatedHours: 0,
        completedTasks: 0,
        moodRating: 5,
        lastUpdate: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'overdue'
      }
    ];

    const mockBlockers: TeamBlocker[] = [
      {
        id: '1',
        memberName: 'Alex Johnson',
        description: 'Waiting for design approval on login page layout',
        priority: 'high',
        suggestedSolution: 'Schedule design review meeting or use existing design patterns',
        escalated: false,
        helpAssigned: false
      },
      {
        id: '2',
        memberName: 'Mike Rodriguez',
        description: 'Testing environment is down - need DevOps support',
        priority: 'high',
        suggestedSolution: 'Help assigned to Alex Johnson: Please assist Mike with getting the testing environment back online. Contact DevOps if needed.',
        escalated: true,
        helpAssigned: true,
        assignedHelper: 'Alex Johnson'
      }
    ];

    setTeamStandups(mockStandups);
    setTeamBlockers(mockBlockers);
  }, []);

  const completedStandups = teamStandups.filter(s => s.status === 'completed').length;
  const totalTeamMembers = teamStandups.length;
  const averageMood = teamStandups.reduce((acc, s) => acc + s.moodRating, 0) / teamStandups.length;
  const totalBlockers = teamBlockers.length;
  const highPriorityBlockers = teamBlockers.filter(b => b.priority === 'high').length;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'overdue': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getBlockerPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleResolveBlocker = (blockerId: string) => {
    setTeamBlockers(prev => prev.filter(b => b.id !== blockerId));
    console.log(`Blocker ${blockerId} resolved`);
    
    // In a real app, this would update the database and notify the team member
    alert('Blocker marked as resolved! Team member will be notified.');
  };

  const handleEscalateBlocker = (blockerId: string) => {
    setTeamBlockers(prev => 
      prev.map(blocker => 
        blocker.id === blockerId 
          ? { ...blocker, escalated: true, priority: 'high' as const }
          : blocker
      )
    );
    console.log(`Blocker ${blockerId} escalated`);
    
    // In a real app, this would notify senior management
    alert('Blocker escalated to senior management! Team member will be notified of the escalation.');
  };

  const handleAssignHelp = (blockerId: string, assignee: string, message: string) => {
    console.log('Assigning help:', { blockerId, assignee, message });
    
    // In a real app, this would create a notification for the assignee
    alert(`Help assigned to ${assignee}! They will receive a notification with your instructions.`);
    
    // Update blocker status to show help has been assigned
    setTeamBlockers(prev =>
      prev.map(blocker =>
        blocker.id === blockerId
          ? { 
              ...blocker, 
              suggestedSolution: `Help assigned to ${assignee}: ${message}`,
              helpAssigned: true,
              assignedHelper: assignee
            }
          : blocker
      )
    );
  };

  const handleSendReminder = (memberId: string, memberName: string) => {
    console.log(`Sending reminder to ${memberName}`);
    
    // In a real app, this would send a notification to the team member
    alert(`Reminder sent to ${memberName}! They will receive a notification to complete their stand-up.`);
  };

  const handleViewNotes = (blocker: TeamBlocker) => {
    setSelectedBlocker(blocker);
    setShowNotesModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="neo-card bg-white border-4 border-black">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">{completedStandups}/{totalTeamMembers}</div>
            <div className="text-sm font-bold text-gray-600 uppercase">Stand-ups Complete</div>
          </CardContent>
        </Card>

        <Card className="neo-card bg-white border-4 border-black">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">{averageMood.toFixed(1)}/10</div>
            <div className="text-sm font-bold text-gray-600 uppercase">Team Mood</div>
          </CardContent>
        </Card>

        <Card className="neo-card bg-white border-4 border-black">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">{totalBlockers}</div>
            <div className="text-sm font-bold text-gray-600 uppercase">Active Blockers</div>
          </CardContent>
        </Card>

        <Card className="neo-card bg-white border-4 border-black">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">
              {teamStandups.reduce((acc, s) => acc + s.completedTasks, 0)}
            </div>
            <div className="text-sm font-bold text-gray-600 uppercase">Tasks Done Yesterday</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Banner */}
      <Card className="neo-card bg-gradient-to-r from-purple-500 to-blue-600 text-white border-4 border-black">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Brain className="w-12 h-12" />
            <div className="flex-1">
              <h3 className="text-xl font-black uppercase mb-2">AI Team Insights</h3>
              <p className="font-bold mb-2">
                Team productivity is at 85%. Mike needs DevOps support urgently. Alex is blocked by design review.
              </p>
              <div className="flex gap-2">
                <Badge className="bg-white text-purple-700 font-black border-2 border-white">
                  2 URGENT ACTIONS
                </Badge>
                <Badge className="bg-yellow-400 text-purple-700 font-black border-2 border-yellow-400">
                  1 OVERDUE STANDUP
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Team Stand-up Status */}
        <Card className="neo-card bg-white border-4 border-black">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <span className="font-black uppercase">Team Stand-up Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {teamStandups.map((standup, index) => (
                <motion.div
                  key={standup.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-4 border-gray-300 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-black">
                        {standup.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-black text-sm">{standup.name}</p>
                        <p className="text-xs font-bold text-gray-600">{standup.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`font-black text-xs border-2 border-black ${getStatusColor(standup.status)}`}>
                        {standup.status.toUpperCase()}
                      </Badge>
                      <Badge className="bg-blue-500 text-white font-black text-xs border-2 border-black">
                        {standup.moodRating}/10
                      </Badge>
                    </div>
                  </div>

                  {standup.status === 'completed' && (
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-black text-green-700">✅ Yesterday: </span>
                        <span className="font-bold">{standup.accomplishments}</span>
                      </div>
                      <div>
                        <span className="font-black text-blue-700">🎯 Today: </span>
                        <span className="font-bold">{standup.todaysPlan}</span>
                      </div>
                      {standup.hasBlockers && (
                        <div>
                          <span className="font-black text-red-700">🚫 Blockers: </span>
                          <span className="font-bold">{standup.blockers}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {standup.status === 'overdue' && (
                    <div className="bg-red-50 p-3 border-4 border-red-300 text-center">
                      <p className="font-black text-red-700 text-sm uppercase">No stand-up update provided</p>
                      <Button 
                        onClick={() => handleSendReminder(standup.id, standup.name)}
                        className="neo-button bg-red-500 text-white font-black uppercase text-xs mt-2 border-2 border-black"
                      >
                        SEND REMINDER
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Blockers */}
        <Card className="neo-card bg-white border-4 border-black">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <span className="font-black uppercase">Active Blockers</span>
              {highPriorityBlockers > 0 && (
                <Badge className="bg-red-500 text-white font-black border-2 border-black">
                  {highPriorityBlockers} HIGH PRIORITY
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {teamBlockers.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="font-black text-green-700 uppercase">No Active Blockers!</p>
                  <p className="text-sm font-bold text-gray-600">Team is running smoothly</p>
                </div>
              ) : (
                teamBlockers.map((blocker, index) => (
                  <motion.div
                    key={blocker.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border-4 border-red-300 bg-red-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`font-black text-xs border-2 border-black ${getBlockerPriorityColor(blocker.priority)}`}>
                            {blocker.priority.toUpperCase()}
                          </Badge>
                          <span className="font-black text-sm text-gray-900">{blocker.memberName}</span>
                          {blocker.helpAssigned && (
                            <Badge className="bg-orange-500 text-white font-black text-xs border-2 border-black">
                              HELP ASSIGNED
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-700 mb-2">{blocker.description}</p>
                        {blocker.suggestedSolution && (
                          <div className="bg-blue-50 p-3 border-4 border-blue-300">
                            <p className="text-xs font-black text-blue-800 mb-1">💡 AI SUGGESTION:</p>
                            <p className="text-xs font-bold text-blue-700">{blocker.suggestedSolution}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        onClick={() => handleResolveBlocker(blocker.id)}
                        className="neo-button bg-green-500 text-white font-black uppercase text-xs border-2 border-black"
                      >
                        RESOLVE
                      </Button>
                      
                      <HelpAssignmentModal
                        blocker={{
                          id: blocker.id,
                          memberName: blocker.memberName,
                          description: blocker.description,
                          priority: blocker.priority
                        }}
                        onAssignHelp={(assignee, message) => handleAssignHelp(blocker.id, assignee, message)}
                        isReassign={blocker.helpAssigned}
                      />
                      
                      {blocker.helpAssigned && (
                        <Button 
                          onClick={() => handleViewNotes(blocker)}
                          className="neo-button bg-purple-500 text-white font-black uppercase text-xs border-2 border-black"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          NOTES
                        </Button>
                      )}
                      
                      {!blocker.escalated && (
                        <Button 
                          onClick={() => handleEscalateBlocker(blocker.id)}
                          className="neo-button bg-red-500 text-white font-black uppercase text-xs border-2 border-black"
                        >
                          ESCALATE
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Team Plan */}
      <Card className="neo-card bg-white border-4 border-black">
        <CardHeader className="border-b-4 border-black">
          <CardTitle className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-purple-600" />
            <span className="font-black uppercase">Today's Team Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamStandups.filter(s => s.status === 'completed').map(standup => (
              <div key={standup.id} className="p-4 bg-blue-50 border-4 border-blue-300">
                <h4 className="font-black text-blue-900 text-sm mb-2">{standup.name}</h4>
                <p className="text-sm font-bold text-blue-700 mb-2">{standup.todaysPlan}</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-500 text-white font-black text-xs border-2 border-black">
                    {standup.estimatedHours}H PLANNED
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-bold text-blue-600">
                      {new Date(standup.lastUpdate).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes Modal */}
      {selectedBlocker && (
        <NotesModal
          isOpen={showNotesModal}
          onClose={() => setShowNotesModal(false)}
          blocker={selectedBlocker}
        />
      )}
    </div>
  );
}
