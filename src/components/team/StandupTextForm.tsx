import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  Edit3, 
  CheckCircle,
  Clock,
  Target,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

interface StandupTextFormProps {
  user: any;
  preFilledAnswers: {
    yesterday: string;
    today: string;
    blockers: string;
  };
  conversationDuration: string;
  onSubmit: (answers: any) => void;
  onBackToVoice: () => void;
}

export default function StandupTextForm({ 
  user, 
  preFilledAnswers, 
  conversationDuration,
  onSubmit,
  onBackToVoice 
}: StandupTextFormProps) {
  const [answers, setAnswers] = useState({
    yesterday: preFilledAnswers.yesterday || '',
    today: preFilledAnswers.today || '',
    blockers: preFilledAnswers.blockers || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const standupData = {
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString(),
      answers,
      conversationDuration,
      method: 'voice_then_text'
    };
    
    // Simulate submission delay
    setTimeout(() => {
      onSubmit(standupData);
      setIsSubmitting(false);
    }, 1000);
  };

  const isFormValid = answers.yesterday.trim() && answers.today.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="neo-card bg-white border-4 border-black">
        <CardHeader className="border-b-4 border-black">
          <CardTitle className="flex items-center gap-3">
            <Edit3 className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-black uppercase">Review & Edit Your Standup</span>
          </CardTitle>
          <div className="flex items-center gap-4 mt-2">
            <Badge className="bg-green-500 text-white font-black border-2 border-black">
              <Clock className="w-4 h-4 mr-1" />
              Voice Chat: {conversationDuration}
            </Badge>
            <Badge className="bg-blue-500 text-white font-black border-2 border-black">
              <MessageSquare className="w-4 h-4 mr-1" />
              Auto-filled from conversation
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-blue-50 p-4 border-4 border-blue-300">
            <p className="font-bold text-blue-900 mb-2">
              📝 Your voice conversation has been processed! Review and edit the answers below before submitting.
            </p>
            <p className="text-sm font-bold text-blue-700">
              Feel free to add more details or clarify any points.
            </p>
          </div>

          <div className="space-y-6">
            {/* Yesterday's Work */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <Label className="font-black uppercase text-sm text-gray-900">
                  What did you accomplish yesterday?
                </Label>
              </div>
              <Textarea
                value={answers.yesterday}
                onChange={(e) => setAnswers(prev => ({ ...prev, yesterday: e.target.value }))}
                placeholder="Describe what you completed yesterday..."
                className="min-h-[100px] border-4 border-gray-300 font-medium"
              />
            </div>

            {/* Today's Plan */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <Label className="font-black uppercase text-sm text-gray-900">
                  What are you working on today?
                </Label>
              </div>
              <Textarea
                value={answers.today}
                onChange={(e) => setAnswers(prev => ({ ...prev, today: e.target.value }))}
                placeholder="Outline your plan for today..."
                className="min-h-[100px] border-4 border-gray-300 font-medium"
              />
            </div>

            {/* Blockers */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <Label className="font-black uppercase text-sm text-gray-900">
                  Any blockers or challenges?
                </Label>
              </div>
              <Textarea
                value={answers.blockers}
                onChange={(e) => setAnswers(prev => ({ ...prev, blockers: e.target.value }))}
                placeholder="Describe any obstacles or challenges you're facing..."
                className="min-h-[80px] border-4 border-gray-300 font-medium"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={onBackToVoice}
              variant="outline"
              className="neo-button font-black uppercase border-4 border-black"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              BACK TO VOICE
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="neo-button bg-green-500 text-white font-black uppercase border-4 border-black px-8"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-4 h-4 mr-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.div>
                  SUBMITTING...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  SUBMIT STANDUP
                </>
              )}
            </Button>
          </div>

          {!isFormValid && (
            <div className="bg-red-50 p-3 border-4 border-red-300">
              <p className="text-sm font-bold text-red-800">
                ⚠️ Please fill in at least "Yesterday's work" and "Today's plan" before submitting.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}