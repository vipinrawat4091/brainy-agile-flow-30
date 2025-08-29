
import React, { useState, useEffect } from "react";
import { Task, Sprint, Project } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Brain,
  Zap,
  Lightbulb,
  Code,
  FileText,
  MessageSquare,
  Clock,
  Target,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

// Mock AI function until proper integration is available
const mockInvokeLLM = async ({ prompt, response_json_schema }: { prompt: string; response_json_schema?: any }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (response_json_schema) {
    return {
      potential_blockers: [
        "Missing requirements clarification",
        "Dependency on external API",
        "Technical complexity higher than expected"
      ],
      solutions: [
        "Schedule meeting with stakeholders for requirements",
        "Create mock API endpoints for development",
        "Break down task into smaller subtasks"
      ],
      next_steps: "Start with requirement gathering and create a detailed technical plan"
    };
  }
  
  return "This is a mock AI response. The task appears to be well-defined and achievable within the estimated timeframe. Consider breaking it down into smaller, manageable subtasks for better tracking.";
};

interface AIResponse {
  potential_blockers?: string[];
  solutions?: string[];
  next_steps?: string;
}

export default function AITaskHelper() {
  const [user, setUser] = useState(null);
  const [myTasks, setMyTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [aiResponses, setAiResponses] = useState<Record<string, Record<string, any>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      setUser(userData);
      
      if (userData.user_email) {
        const tasksData = await Task.filter({ 
          assignee_id: userData.user_email,
          project_id: userData.project_id 
        });
        setMyTasks(tasksData);
        if (tasksData.length > 0) {
          setSelectedTask(tasksData[0]);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const getAIHelp = async (type: string) => {
    if (!selectedTask) return;
    
    setIsLoading(true);
    try {
      let prompt = '';
      
      switch(type) {
        case 'explain':
          prompt = `Explain this task in simple terms: "${selectedTask.title}". Description: "${selectedTask.description}". What exactly needs to be done and why is it important?`;
          break;
        case 'approach':
          prompt = `Suggest a step-by-step approach for this task: "${selectedTask.title}". Description: "${selectedTask.description}". Priority: ${selectedTask.priority}. Break it down into actionable steps.`;
          break;
        case 'code':
          prompt = `Generate code snippets or examples for this development task: "${selectedTask.title}". Description: "${selectedTask.description}". Provide practical code examples.`;
          break;
        case 'test':
          prompt = `Generate test cases for this task: "${selectedTask.title}". Description: "${selectedTask.description}". What should be tested and how?`;
          break;
        case 'estimate':
          prompt = `Analyze the time estimation for this task: "${selectedTask.title}". Description: "${selectedTask.description}". Currently estimated: ${selectedTask.estimated_hours} hours. Is this realistic? What factors should be considered?`;
          break;
        case 'custom':
          prompt = `Task: "${selectedTask.title}". Description: "${selectedTask.description}". Question: ${question}`;
          break;
      }
      
      const result = await mockInvokeLLM({ prompt });
      
      setAiResponses(prev => ({
        ...prev,
        [selectedTask.id]: {
          ...prev[selectedTask.id],
          [type]: result
        }
      }));
    } catch (error) {
      console.error("Error getting AI help:", error);
    }
    setIsLoading(false);
  };

  const getBlockerHelp = async () => {
    if (!selectedTask) return;
    
    setIsLoading(true);
    try {
      const result = await mockInvokeLLM({
        prompt: `I'm stuck on this task: "${selectedTask.title}". Description: "${selectedTask.description}". 
        Help me identify potential blockers and suggest solutions. What could be preventing progress and how can I overcome these obstacles?`,
        response_json_schema: {
          type: "object",
          properties: {
            potential_blockers: { type: "array", items: { type: "string" } },
            solutions: { type: "array", items: { type: "string" } },
            next_steps: { type: "string" }
          }
        }
      });
      
      setAiResponses(prev => ({
        ...prev,
        [selectedTask.id]: {
          ...prev[selectedTask.id],
          blocker: result
        }
      }));
    } catch (error) {
      console.error("Error getting blocker help:", error);
    }
    setIsLoading(false);
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
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            AI TASK HELPER
          </h1>
          <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
            INTELLIGENT ASSISTANCE FOR YOUR TASKS
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Task Selection */}
          <div className="space-y-4">
            <Card className="neo-card bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase">MY ACTIVE TASKS</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {myTasks.filter(t => t.status !== 'done').map(task => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`p-3 border-4 cursor-pointer transition-all ${
                      selectedTask?.id === task.id
                        ? 'border-blue-500 bg-blue-50 shadow-[8px_8px_0px_#0066FF]'
                        : 'border-black hover:shadow-[8px_8px_0px_#000] hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px]'
                    }`}
                  >
                    <h4 className="font-black text-gray-900 uppercase text-sm">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] ${
                        task.priority === 'urgent' ? 'bg-red-500 text-white' :
                        task.priority === 'high' ? 'bg-orange-500 text-white' :
                        task.priority === 'medium' ? 'bg-blue-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {task.priority?.toUpperCase()}
                      </Badge>
                      <Badge className={`font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] ${
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'blocked' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick AI Actions */}
            <Card className="neo-card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  QUICK AI HELP
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button 
                  onClick={() => getAIHelp('explain')}
                  disabled={!selectedTask || isLoading}
                  className="neo-button w-full bg-white text-purple-600 font-black uppercase text-sm"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  EXPLAIN TASK
                </Button>
                
                <Button 
                  onClick={() => getAIHelp('approach')}
                  disabled={!selectedTask || isLoading}
                  className="neo-button w-full bg-white text-purple-600 font-black uppercase text-sm"
                >
                  <Target className="w-4 h-4 mr-2" />
                  SUGGEST APPROACH
                </Button>
                
                <Button 
                  onClick={() => getAIHelp('code')}
                  disabled={!selectedTask || isLoading}
                  className="neo-button w-full bg-white text-purple-600 font-black uppercase text-sm"
                >
                  <Code className="w-4 h-4 mr-2" />
                  CODE EXAMPLES
                </Button>
                
                <Button 
                  onClick={getBlockerHelp}
                  disabled={!selectedTask || isLoading}
                  className="neo-button w-full bg-red-500 text-white font-black uppercase text-sm"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  I'M STUCK!
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Response Area */}
          <div className="lg:col-span-2 space-y-6">
            {selectedTask ? (
              <>
                {/* Task Details */}
                <Card className="neo-card bg-white">
                  <CardHeader className="border-b-4 border-black">
                    <CardTitle className="text-xl font-black uppercase">{selectedTask.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 font-bold mb-4">{selectedTask.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-black text-gray-600 uppercase">Priority:</span>
                        <div className="font-bold text-gray-900">{selectedTask.priority}</div>
                      </div>
                      <div>
                        <span className="font-black text-gray-600 uppercase">Status:</span>
                        <div className="font-bold text-gray-900">{selectedTask.status}</div>
                      </div>
                      <div>
                        <span className="font-black text-gray-600 uppercase">Points:</span>
                        <div className="font-bold text-gray-900">{selectedTask.story_points || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="font-black text-gray-600 uppercase">Hours:</span>
                        <div className="font-bold text-gray-900">{selectedTask.estimated_hours || 'N/A'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Question */}
                <Card className="neo-card bg-white">
                  <CardHeader className="border-b-4 border-black">
                    <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      ASK CUSTOM QUESTION
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Textarea
                        placeholder="Ask anything about this task..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="neo-input font-bold flex-1"
                        rows={2}
                      />
                      <Button
                        onClick={() => getAIHelp('custom')}
                        disabled={!question.trim() || !selectedTask || isLoading}
                        className="neo-button bg-green-500 text-white font-black uppercase"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        ASK AI
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Responses */}
                {aiResponses[selectedTask.id] && (
                  <div className="space-y-4">
                    {Object.entries(aiResponses[selectedTask.id]).map(([type, response]) => (
                      <Card key={type} className="neo-card bg-white">
                        <CardHeader className="border-b-4 border-black">
                          <CardTitle className="text-lg font-black uppercase text-blue-600">
                            {type === 'explain' && '🔍 TASK EXPLANATION'}
                            {type === 'approach' && '🎯 SUGGESTED APPROACH'}
                            {type === 'code' && '💻 CODE EXAMPLES'}
                            {type === 'test' && '🧪 TEST CASES'}
                            {type === 'estimate' && '⏱️ TIME ANALYSIS'}
                            {type === 'custom' && '💬 AI ANSWER'}
                            {type === 'blocker' && '🚨 BLOCKER SOLUTIONS'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          {type === 'blocker' && typeof response === 'object' && response !== null ? (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-black text-red-600 uppercase mb-2">Potential Blockers:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                  {(response as AIResponse).potential_blockers?.map((blocker, index) => (
                                    <li key={index} className="font-bold text-gray-700">{blocker}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-black text-green-600 uppercase mb-2">Solutions:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                  {(response as AIResponse).solutions?.map((solution, index) => (
                                    <li key={index} className="font-bold text-gray-700">{solution}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-black text-blue-600 uppercase mb-2">Next Steps:</h4>
                                <p className="font-bold text-gray-700">{(response as AIResponse).next_steps}</p>
                              </div>
                            </div>
                          ) : (
                            <pre className="whitespace-pre-wrap font-bold text-gray-700 leading-relaxed">
                              {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
                            </pre>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {isLoading && (
                  <Card className="neo-card bg-blue-50">
                    <CardContent className="p-8 text-center">
                      <Brain className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                      <p className="text-lg font-black text-blue-900 uppercase">AI IS THINKING...</p>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="neo-card bg-white">
                <CardContent className="p-16 text-center">
                  <Brain className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-gray-500 uppercase mb-4">SELECT A TASK</h3>
                  <p className="text-gray-400 font-bold">Choose a task from the left to get AI assistance</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
