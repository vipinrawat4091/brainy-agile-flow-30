import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Target,
  Award,
  Flame,
  Users,
  TrendingUp,
  Lightbulb,
  Mic,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VoiceStandupConversation from './VoiceStandupConversation';

interface StandupResponse {
  question: string;
  answer: string;
  timestamp: Date;
}

interface TaskAssignment {
  id: string;
  title: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  estimatedHours: number;
  dependencies?: string[];
  status: 'pending' | 'in_progress' | 'blocked' | 'completed';
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
}

export default function AIStandupMeeting({ user, onStandupComplete }) {
  const [currentStep, setCurrentStep] = useState('greeting'); // greeting, voice_standup, questions, review, dashboard
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<StandupResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [moodRating, setMoodRating] = useState(5);
  const [showNudge, setShowNudge] = useState(false);
  const [voiceCompleted, setVoiceCompleted] = useState(false);

  const standupQuestions = [
    "What did you accomplish yesterday?",
    "What will you work on today?", 
    "Do you have any blockers or issues?"
  ];

  // Mock data for tasks and dependencies
  const mockPendingTasks: TaskAssignment[] = [
    {
      id: '1',
      title: 'Complete user authentication flow',
      priority: 'urgent',
      estimatedHours: 4,
      status: 'pending'
    },
    {
      id: '2', 
      title: 'Review API documentation',
      priority: 'medium',
      estimatedHours: 2,
      dependencies: ['Design team approval'],
      status: 'blocked'
    },
    {
      id: '3',
      title: 'Update dashboard components',
      priority: 'high',
      estimatedHours: 6,
      status: 'pending'
    }
  ];

  const mockNewTasks: TaskAssignment[] = [
    {
      id: '4',
      title: 'Implement search functionality',
      priority: 'high',
      estimatedHours: 5,
      status: 'pending'
    },
    {
      id: '5',
      title: 'Add unit tests for payment module',
      priority: 'medium', 
      estimatedHours: 3,
      status: 'pending'
    }
  ];

  const mockBadges: Badge[] = [
    {
      id: '1',
      name: 'Streak Keeper',
      description: '5 days on-time stand-ups',
      icon: <Flame className="w-4 h-4" />,
      earned: true
    },
    {
      id: '2',
      name: 'Blocker Resolver',
      description: 'Resolved 3 blockers this week',
      icon: <Award className="w-4 h-4" />,
      earned: false
    },
    {
      id: '3',
      name: 'Early Bird',
      description: 'First to complete stand-up',
      icon: <Target className="w-4 h-4" />,
      earned: true
    }
  ];

  useEffect(() => {
    // Simulate checking for overdue tasks and showing nudges
    const timer = setTimeout(() => {
      if (currentStep === 'dashboard') {
        setShowNudge(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleAnswerSubmit = async () => {
    if (!currentAnswer.trim()) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newResponse: StandupResponse = {
      question: standupQuestions[currentQuestionIndex],
      answer: currentAnswer,
      timestamp: new Date()
    };
    
    setResponses(prev => [...prev, newResponse]);
    setCurrentAnswer('');
    
    if (currentQuestionIndex < standupQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('review');
    }
    
    setIsProcessing(false);
  };

  const handleVoiceStandupComplete = (responses: any, summary: any) => {
    // Set the responses from voice conversation
    setResponses(responses);
    setVoiceCompleted(true);
    // Skip individual questions since they were handled in the text form
    setCurrentStep('review');
  };

  const generateAISummary = () => {
    const accomplishments = responses[0]?.answer || "No updates provided";
    const todaysPlan = responses[1]?.answer || "No plan specified";
    const blockers = responses[2]?.answer || "No blockers reported";
    
    return {
      accomplishments,
      todaysPlan,
      blockers,
      hasBlockers: blockers.toLowerCase() !== 'no blockers reported' && blockers.toLowerCase() !== 'none',
      estimatedFocusTime: '6-8 hours',
      dependencies: mockPendingTasks.filter(t => t.dependencies).map(t => t.dependencies).flat()
    };
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (currentStep === 'greeting') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="neo-card bg-gradient-to-r from-blue-500 to-purple-600 text-white border-4 border-black">
          <CardContent className="p-8 text-center">
            <Brain className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-black uppercase mb-4">
              Good Morning, {user?.full_name?.split(' ')[0] || 'Developer'}!
            </h2>
            <p className="text-xl font-bold mb-6">
              Ready for your daily AI stand-up? We'll start with a voice conversation, then move to text questions! 🚀
            </p>
            <Button 
              onClick={() => setCurrentStep('voice_standup')}
              className="neo-button bg-white text-purple-700 font-black uppercase text-lg px-8 py-3 border-white"
            >
              START STANDUP
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }


  if (currentStep === 'voice_standup') {
    return (
      <VoiceStandupConversation
        user={user}
        onConversationComplete={handleVoiceStandupComplete}
        onBackToText={() => setCurrentStep('greeting')}
      />
    );
  }

  if (currentStep === 'questions') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="neo-card bg-white border-4 border-black">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-black uppercase">
                  {voiceCompleted ? 'Text Follow-up Questions' : 'AI Stand-up Assistant'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {voiceCompleted && (
                  <Badge className="bg-green-500 text-white font-black border-2 border-black text-xs">
                    VOICE COMPLETED
                  </Badge>
                )}
                <Badge className="bg-blue-500 text-white font-black border-2 border-black">
                  {currentQuestionIndex + 1} / {standupQuestions.length}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900 mb-4">
                    {standupQuestions[currentQuestionIndex]}
                  </p>
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Share your thoughts here..."
                    className="neo-input font-bold border-4 border-black min-h-[120px]"
                    disabled={isProcessing}
                  />
                </div>
              </div>

              {responses.map((response, index) => (
                <div key={index} className="flex items-start gap-4 opacity-60">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600">{response.question}</p>
                    <p className="text-sm text-gray-500 mt-1">{response.answer}</p>
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3">
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={!currentAnswer.trim() || isProcessing}
                  className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
                >
                  {isProcessing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-spin" />
                      AI PROCESSING...
                    </>
                  ) : (
                    <>
                      NEXT
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (currentStep === 'review') {
    const summary = generateAISummary();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="neo-card bg-white border-4 border-black">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-black uppercase">AI Summary & Task Review</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-black uppercase text-sm text-gray-900">Yesterday's Accomplishments</h3>
                <p className="text-sm font-bold text-gray-700 bg-green-50 p-4 border-4 border-green-300">
                  {summary.accomplishments}
                </p>

                <h3 className="font-black uppercase text-sm text-gray-900">Today's Plan</h3>
                <p className="text-sm font-bold text-gray-700 bg-blue-50 p-4 border-4 border-blue-300">
                  {summary.todaysPlan}
                </p>

                {summary.hasBlockers && (
                  <>
                    <h3 className="font-black uppercase text-sm text-gray-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      Blockers Detected
                    </h3>
                    <div className="bg-red-50 p-4 border-4 border-red-300">
                      <p className="text-sm font-bold text-red-700 mb-3">{summary.blockers}</p>
                      <Button className="neo-button bg-red-500 text-white font-black uppercase text-xs border-2 border-black">
                        ESCALATE TO MANAGER
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-black uppercase text-sm text-gray-900">Pending Tasks</h3>
                <div className="space-y-2">
                  {mockPendingTasks.map(task => (
                    <div key={task.id} className="p-3 bg-gray-50 border-4 border-gray-300">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`font-black text-xs border-2 border-black ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </Badge>
                        <span className="text-xs font-bold text-gray-500">{task.estimatedHours}h</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{task.title}</p>
                      {task.dependencies && (
                        <p className="text-xs font-bold text-orange-600 mt-1">
                          Waiting on: {task.dependencies.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <h3 className="font-black uppercase text-sm text-gray-900">New Tasks for Today</h3>
                <div className="space-y-2">
                  {mockNewTasks.map(task => (
                    <div key={task.id} className="p-3 bg-blue-50 border-4 border-blue-300">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`font-black text-xs border-2 border-black ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </Badge>
                        <span className="text-xs font-bold text-gray-500">{task.estimatedHours}h</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{task.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  const summary = generateAISummary();
                  onStandupComplete?.(responses, summary);
                }}
                className="neo-button bg-green-500 text-white font-black uppercase border-4 border-black"
              >
                COMPLETE STANDUP
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (currentStep === 'dashboard') {
    const summary = generateAISummary();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Daily Work Briefing */}
        <Card className="neo-card bg-gradient-to-r from-green-500 to-blue-600 text-white border-4 border-black">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Target className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-black uppercase">Daily Work Briefing</h2>
                <p className="text-green-100 font-bold">Your AI-generated focus plan</p>
              </div>
            </div>
            <p className="text-lg font-bold mb-4">
              Yesterday you made great progress! Today your focus is on completing the authentication flow and starting the search functionality implementation.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-black mb-1">{summary.estimatedFocusTime}</div>
                <div className="text-green-100 font-bold uppercase text-sm">Estimated Focus Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black mb-1">{mockPendingTasks.length + mockNewTasks.length}</div>
                <div className="text-green-100 font-bold uppercase text-sm">Tasks in Queue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black mb-1">{summary.dependencies.length}</div>
                <div className="text-green-100 font-bold uppercase text-sm">Dependencies</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mood Check & Badges */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="neo-card bg-white border-4 border-black">
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-orange-600" />
                <span className="font-black uppercase">Well-being Check</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="font-bold text-gray-900 mb-4">How are you feeling today? (1-10)</p>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodRating}
                  onChange={(e) => setMoodRating(parseInt(e.target.value))}
                  className="flex-1"
                />
                <Badge className="bg-blue-500 text-white font-black border-2 border-black">
                  {moodRating}/10
                </Badge>
              </div>
              {moodRating <= 5 && (
                <div className="bg-yellow-50 p-4 border-4 border-yellow-300">
                  <p className="text-sm font-bold text-yellow-800">
                    💡 AI Suggestion: Consider taking short breaks between tasks today. Your wellbeing matters!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="neo-card bg-white border-4 border-black">
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-600" />
                <span className="font-black uppercase">Achievement Badges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {mockBadges.map(badge => (
                  <div key={badge.id} className={`flex items-center gap-3 p-3 border-4 ${
                    badge.earned ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-50 border-gray-300'
                  }`}>
                    <div className={`p-2 rounded-full ${badge.earned ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white'}`}>
                      {badge.icon}
                    </div>
                    <div>
                      <p className="font-black text-sm">{badge.name}</p>
                      <p className="text-xs font-bold text-gray-600">{badge.description}</p>
                    </div>
                    {badge.earned && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Nudge */}
        <AnimatePresence>
          {showNudge && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Card className="neo-card bg-orange-500 text-white border-4 border-black max-w-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <p className="font-black text-sm mb-2">AI NUDGE</p>
                      <p className="text-sm font-bold mb-3">
                        Hey! You haven't updated your task progress today. Want me to mark "Complete user authentication flow" as in-progress?
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="neo-button bg-white text-orange-600 font-black uppercase text-xs border-2 border-white"
                          onClick={() => setShowNudge(false)}
                        >
                          YES
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="neo-button bg-transparent text-white font-black uppercase text-xs border-2 border-white"
                          onClick={() => setShowNudge(false)}
                        >
                          LATER
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center">
          <Button
            onClick={() => {
              onStandupComplete?.(responses, summary);
              setCurrentStep('greeting');
              setCurrentQuestionIndex(0);
              setResponses([]);
            }}
            className="neo-button bg-green-500 text-white font-black uppercase border-4 border-black px-8"
          >
            COMPLETE STAND-UP
          </Button>
        </div>
      </motion.div>
    );
  }

  return null;
}
