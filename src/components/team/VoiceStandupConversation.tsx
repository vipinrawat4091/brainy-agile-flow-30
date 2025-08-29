
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Brain, 
  MessageSquare, 
  Volume2, 
  VolumeX,
  Clock,
  Play,
  Pause
} from "lucide-react";
import { motion } from "framer-motion";
import { useDeepgramConversation } from "@/hooks/useDeepgramConversation";
import StandupTextForm from "./StandupTextForm";

interface VoiceStandupConversationProps {
  user: any;
  onConversationComplete: (responses: any, summary: any) => void;
  onBackToText: () => void;
}

type StandupStage = 'api-setup' | 'voice-conversation' | 'text-form' | 'complete';

export default function VoiceStandupConversation({ 
  user, 
  onConversationComplete, 
  onBackToText 
}: VoiceStandupConversationProps) {
  const [currentStage, setCurrentStage] = useState<StandupStage>('api-setup');
  const [apiKey, setApiKey] = useState('');
  const [conversationStarted, setConversationStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const STANDUP_DURATION = 30 * 60; // 30 minutes in seconds
  const [isMuted, setIsMuted] = useState(false);
  const [conversationSummary, setConversationSummary] = useState<any>(null);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [conversationMessages, setConversationMessages] = useState<Array<{type: string, content: string, speaker: 'user' | 'ai'}>>([]);
  const [extractedAnswers, setExtractedAnswers] = useState({
    yesterday: '',
    today: '',
    blockers: ''
  });

  const conversation = useDeepgramConversation({
    onConnect: () => {
      console.log('Connected to AI conversation');
      setConversationStarted(true);
    },
    onDisconnect: () => {
      console.log('Disconnected from AI conversation');
      setConversationStarted(false);
      // Only move to text stage if user manually ended conversation
      // Auto-disconnects shouldn't trigger stage change
    },
    onMessage: (message) => {
      console.log('AI Message:', message);
      setConversationMessages(prev => [...prev, message]);
    },
    onTranscript: (transcript, isFinal) => {
      if (!isFinal) {
        setLiveTranscript(transcript);
      } else {
        setLiveTranscript('');
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error);
    }
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (conversationStarted) {
      timer = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1;
          // Auto-end standup after 30 minutes
          if (newDuration >= STANDUP_DURATION) {
            endVoiceStandup();
            return STANDUP_DURATION;
          }
          return newDuration;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [conversationStarted, STANDUP_DURATION]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeRemaining = (seconds: number) => {
    const remaining = STANDUP_DURATION - seconds;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return (duration / STANDUP_DURATION) * 100;
  };

  const startVoiceStandup = async () => {
    try {
      // Start conversation with Deepgram
      const conversationId = await conversation.startSession({ 
        apiKey: apiKey
      });
      
      console.log('Started conversation:', conversationId);
    } catch (error) {
      console.error('Failed to start voice standup:', error);
      alert('Failed to start voice conversation. Please check your microphone permissions and API key.');
    }
  };

  const endVoiceStandup = async () => {
    await conversation.endSession();
    handleConversationEnd();
  };

  const handleConversationEnd = () => {
    console.log('Ending voice conversation, moving to text stage');
    
    // Extract answers from conversation messages
    const userMessages = conversationMessages.filter(msg => msg.speaker === 'user');
    const extractedData = extractStandupAnswers(userMessages);
    setExtractedAnswers(extractedData);
    
    // Always move to text form stage - this is mandatory
    setCurrentStage('text-form');
  };

  const extractStandupAnswers = (userMessages: Array<{content: string}>) => {
    const allText = userMessages.map(msg => msg.content).join(' ');
    
    // Simple extraction logic - can be enhanced with better NLP
    const yesterday = extractAnswer(allText, ['yesterday', 'completed', 'finished', 'accomplished']) || 
                     'Discussed progress from yesterday during voice conversation';
    const today = extractAnswer(allText, ['today', 'working', 'planning', 'will', 'going to']) || 
                 'Outlined plans for today during voice conversation';
    const blockers = extractAnswer(allText, ['blocker', 'challenge', 'issue', 'problem', 'stuck']) || 
                    'Discussed any challenges during voice conversation';
    
    return { yesterday, today, blockers };
  };

  const extractAnswer = (text: string, keywords: string[]) => {
    const sentences = text.split(/[.!?]+/);
    const relevantSentences = sentences.filter(sentence => 
      keywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    return relevantSentences.slice(0, 2).join('. ').trim();
  };

  const toggleMute = async () => {
    const newVolume = isMuted ? 0.7 : 0;
    await conversation.setVolume({ volume: newVolume });
    setIsMuted(!isMuted);
  };

  const handleTextFormSubmit = (standupData: any) => {
    setCurrentStage('complete');
    
    // Format the data to match what TeamDashboard expects
    const responses = [
      { question: "What did you accomplish yesterday?", answer: standupData.answers.yesterday, timestamp: new Date() },
      { question: "What will you work on today?", answer: standupData.answers.today, timestamp: new Date() },
      { question: "Do you have any blockers or issues?", answer: standupData.answers.blockers, timestamp: new Date() }
    ];
    
    const summary = {
      method: standupData.method,
      conversationDuration: standupData.conversationDuration,
      userId: standupData.userId,
      userName: standupData.userName
    };
    
    onConversationComplete(responses, summary);
  };

  const handleBackToVoice = () => {
    setCurrentStage('voice-conversation');
  };

  // API Key Setup Stage
  if (currentStage === 'api-setup') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="neo-card bg-white border-4 border-black">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="flex items-center gap-3">
              <Volume2 className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-black uppercase">Voice Standup Setup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="bg-blue-50 p-4 border-4 border-blue-300">
              <p className="font-bold text-blue-900 mb-3">
                🎤 Two-stage standup process:
              </p>
              <div className="space-y-2 text-sm font-bold text-blue-700">
                <p>1. 📢 Voice conversation with AI (15-30 minutes)</p>
                <p>2. ✏️ Review & edit auto-filled text form</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block font-black text-gray-900 uppercase text-sm">
                Deepgram API Key
              </label>
              <input
                type="password"
                placeholder="Enter your Deepgram API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-3 border-4 border-black font-bold"
              />
              <p className="text-xs font-bold text-gray-600">
                Get your API key from{' '}
                <a href="https://console.deepgram.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Deepgram Console
                </a>
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  if (apiKey.trim()) {
                    setCurrentStage('voice-conversation');
                  } else {
                    alert('Please enter your Deepgram API key');
                  }
                }}
                disabled={!apiKey.trim()}
                className="neo-button bg-purple-500 text-white font-black uppercase border-4 border-black"
              >
                <Mic className="w-4 h-4 mr-2" />
                START VOICE STANDUP
              </Button>
              
              <Button
                onClick={onBackToText}
                variant="outline"
                className="neo-button font-black uppercase border-4 border-black"
              >
                USE TEXT ONLY
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Text Form Stage
  if (currentStage === 'text-form') {
    return (
      <StandupTextForm
        user={user}
        preFilledAnswers={extractedAnswers}
        conversationDuration={formatTime(duration)}
        onSubmit={handleTextFormSubmit}
        onBackToVoice={handleBackToVoice}
      />
    );
  }

  // Voice Conversation Stage
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="neo-card bg-gradient-to-r from-purple-500 to-pink-600 text-white border-4 border-black">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                {conversationStarted ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Mic className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <MicOff className="w-8 h-8" />
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-black uppercase">
                  {conversationStarted ? `AI Voice Standup Active` : 'Ready to Start Voice Standup'}
                </h2>
                <div className="space-y-2">
                  <p className="text-purple-100 font-bold">
                    {conversationStarted ? (
                      <>
                        <span>Elapsed: {formatTime(duration)}</span>
                        <span className="mx-2">•</span>
                        <span>Remaining: {formatTimeRemaining(duration)}</span>
                      </>
                    ) : (
                      'Step 1: Voice conversation → Step 2: Edit text form'
                    )}
                  </p>
                  {conversationStarted && (
                    <div className="w-full bg-white/20 rounded-full h-3 border-2 border-white/30">
                      <div 
                        className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${getProgressPercentage()}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {conversationStarted && (
              <div className="bg-white/10 p-4 rounded border-2 border-white/20">
                <p className="font-bold mb-2">AI is listening and ready to discuss:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-white/20 text-white font-black border border-white/30">
                    Yesterday's Progress
                  </Badge>
                  <Badge className="bg-white/20 text-white font-black border border-white/30">
                    Today's Goals
                  </Badge>
                  <Badge className="bg-white/20 text-white font-black border border-white/30">
                    Blockers & Solutions
                  </Badge>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!conversationStarted ? (
                <Button
                  onClick={startVoiceStandup}
                  className="neo-button bg-white text-purple-600 font-black uppercase border-4 border-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  START CONVERSATION
                </Button>
              ) : (
                <>
                  <Button
                    onClick={toggleMute}
                    variant="outline"
                    className="neo-button bg-white/10 text-white font-black uppercase border-2 border-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                    {isMuted ? 'UNMUTE' : 'MUTE'}
                  </Button>
                  
                  <Button
                    onClick={endVoiceStandup}
                    className="neo-button bg-red-500 text-white font-black uppercase border-4 border-white"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    END & CONTINUE TO TEXT
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {conversation.status === 'connected' && conversation.isSpeaking && (
        <Card className="neo-card bg-blue-50 border-4 border-blue-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Brain className="w-6 h-6 text-blue-600" />
              </motion.div>
              <p className="font-black text-blue-900 uppercase">AI is speaking...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {conversation.status === 'connected' && (
        <Card className="neo-card bg-gray-50 border-4 border-gray-300">
          <CardHeader className="border-b-4 border-gray-300 pb-3">
            <CardTitle className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <span className="text-lg font-black uppercase text-gray-900">Live Transcript</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4 max-h-64 overflow-y-auto">
            {/* Show conversation history */}
            <div className="space-y-3">
              {conversationMessages.map((message, index) => (
                <div key={index} className={`p-3 rounded border-2 ${
                  message.speaker === 'user' 
                    ? 'bg-blue-50 border-blue-300 ml-4' 
                    : 'bg-green-50 border-green-300 mr-4'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs font-bold ${
                      message.speaker === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}>
                      {message.speaker === 'user' ? 'You' : 'AI'}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{message.content}</p>
                </div>
              ))}
            </div>
            
            {/* Show live transcript */}
            {liveTranscript && (
              <div className="p-3 bg-yellow-50 border-2 border-yellow-300 border-dashed ml-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-yellow-500 text-white text-xs font-bold">
                    You (speaking...)
                  </Badge>
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-2 bg-yellow-500 rounded-full"
                  />
                </div>
                <p className="text-sm font-medium text-gray-800 italic">{liveTranscript}</p>
              </div>
            )}
            
            {/* Show listening indicator when no one is speaking */}
            {!conversation.isSpeaking && !liveTranscript && (
              <div className="text-center p-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-flex items-center gap-2 text-gray-600"
                >
                  <Mic className="w-5 h-5" />
                  <span className="font-bold text-sm">Listening...</span>
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
