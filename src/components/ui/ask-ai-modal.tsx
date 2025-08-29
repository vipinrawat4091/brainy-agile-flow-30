import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AskAIModalProps {
  trigger: React.ReactNode;
  title: string;
  placeholder: string;
  context?: string;
}

export function AskAIModal({ trigger, title, placeholder, context }: AskAIModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const contextualResponse = generateContextualResponse(question, context);
      setResponse(contextualResponse);
      setIsLoading(false);
    }, 2000);
  };

  const generateContextualResponse = (query: string, ctx?: string) => {
    const responses = {
      knowledge: [
        `Based on your knowledge base, I recommend checking the following articles that relate to "${query}". You might also consider creating documentation about this topic if it doesn't exist yet.`,
        `For "${query}", I suggest organizing your knowledge base with proper categorization. This will help team members find relevant information quickly.`,
        `Your query about "${query}" indicates a need for better documentation. Consider creating a comprehensive guide or adding this to your existing articles.`
      ],
      workspace: [
        `For documenting "${query}", I recommend using our technical specification template. This will ensure all necessary details are captured systematically.`,
        `Based on your question about "${query}", consider creating a collaborative document where team members can contribute their insights and expertise.`,
        `To address "${query}", I suggest using our meeting notes template to capture discussions and decisions made around this topic.`
      ],
      task: [
        `To complete this task efficiently, I recommend breaking it down into smaller, manageable subtasks. Focus on the highest priority items first.`,
        `Based on the task details, consider reaching out to team members who have worked on similar features. Their insights could be valuable.`,
        `For this task, I suggest reviewing related documentation in your knowledge base and creating a step-by-step plan before implementation.`
      ]
    };

    const contextType = ctx || 'general';
    const relevantResponses = responses[contextType as keyof typeof responses] || responses.knowledge;
    const randomResponse = relevantResponses[Math.floor(Math.random() * relevantResponses.length)];
    
    return randomResponse;
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuestion('');
    setResponse('');
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl neo-card bg-white border-4 border-black">
        <DialogHeader className="border-b-4 border-black pb-4">
          <DialogTitle className="text-2xl font-black uppercase flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          {!response ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-black text-gray-900 uppercase mb-2">
                  What would you like to ask the AI?
                </label>
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-32 border-4 border-black font-mono resize-none"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="neo-button font-black uppercase border-4 border-black"
                  disabled={isLoading}
                >
                  CANCEL
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="neo-button bg-purple-500 text-white font-black uppercase border-4 border-black"
                  disabled={!question.trim() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      THINKING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      ASK AI
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-4 border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-purple-900 uppercase mb-2">AI Response</h3>
                    <p className="text-gray-700 font-medium leading-relaxed">{response}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => {
                    setResponse('');
                    setQuestion('');
                  }}
                  variant="outline"
                  className="neo-button font-black uppercase border-4 border-black"
                >
                  ASK ANOTHER
                </Button>
                <Button
                  onClick={handleClose}
                  className="neo-button bg-green-500 text-white font-black uppercase border-4 border-black"
                >
                  DONE
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}