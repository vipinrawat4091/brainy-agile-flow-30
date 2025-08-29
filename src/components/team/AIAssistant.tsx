
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, MessageSquare, Lightbulb, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAssistant({ task }) {
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const getHelp = async (helpType) => {
    if (!task) return;

    setIsLoading(true);
    setAiResponse("");

    let prompt = "";
    switch(helpType) {
      case 'explain':
        prompt = `Explain this task in simple terms, focusing on the goal and expected outcome. Task: "${task.title}". Description: "${task.description}"`;
        break;
      case 'suggest':
        prompt = `Suggest a technical approach to start this task. Consider potential libraries or frameworks. Task: "${task.title}". Description: "${task.description}"`;
        break;
      case 'code':
        prompt = `Provide a boilerplate code snippet to start implementing this task. Task: "${task.title}". Description: "${task.description}"`;
        break;
    }

    try {
      // Mock AI response for now since we don't have the InvokeLLM integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponses = {
        explain: `This task focuses on ${task.title.toLowerCase()}. The main goal is to implement the functionality described in the requirements. You should start by understanding the user needs and then break down the implementation into smaller, manageable steps.`,
        suggest: `For "${task.title}", I recommend starting with:\n\n1. Create a basic component structure\n2. Set up the necessary state management\n3. Implement the core functionality\n4. Add proper error handling\n5. Write unit tests\n\nConsider using React hooks for state management and ensure proper TypeScript typing.`,
        code: `// Boilerplate for ${task.title}\n\nimport React, { useState, useEffect } from 'react';\n\nconst ${task.title.replace(/\\s+/g, '')}Component = () => {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(false);\n\n  useEffect(() => {\n    // Initialize component\n  }, []);\n\n  return (\n    <div>\n      {/* Component implementation */}\n    </div>\n  );\n};\n\nexport default ${task.title.replace(/\\s+/g, '')}Component;`
      };
      
      setAiResponse(mockResponses[helpType] || 'AI assistance is not available right now.');
    } catch (error) {
      console.error("AI Help Error:", error);
      setAiResponse("Sorry, I encountered an error while assisting you.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log("Sending message:", chatMessage);
      setChatMessage("");
    }
  };
  
  return (
    <Card className="neo-card bg-white border-4 border-black">
      <CardHeader className="border-b-4 border-black">
        <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
          <Brain className="w-6 h-6 text-blue-600" />
          AI ASSISTANT
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {!task ? (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              <Zap className="w-12 h-12 mx-auto mb-4"/>
              <p className="font-bold uppercase">Select a task to get AI help</p>
            </motion.div>
          ) : (
            <motion.div
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-blue-50 border-4 border-blue-300">
                <h4 className="font-black text-blue-900 uppercase text-sm mb-1">SELECTED TASK</h4>
                <p className="font-bold text-blue-700">{task.title}</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-black text-gray-900 uppercase text-sm">QUICK ACTIONS</h4>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    className="neo-button bg-purple-500 text-white font-black uppercase text-xs border-4 border-black"
                    onClick={() => getHelp('explain')}
                    disabled={isLoading}
                  >
                    <Lightbulb className="w-4 h-4 mr-1"/> EXPLAIN
                  </Button>
                  <Button 
                    size="sm" 
                    className="neo-button bg-orange-500 text-white font-black uppercase text-xs border-4 border-black"
                    onClick={() => getHelp('suggest')}
                    disabled={isLoading}
                  >
                    <Zap className="w-4 h-4 mr-1"/> SUGGEST
                  </Button>
                  <Button 
                    size="sm" 
                    className="neo-button bg-green-500 text-white font-black uppercase text-xs border-4 border-black"
                    onClick={() => getHelp('code')}
                    disabled={isLoading}
                  >
                    <Code className="w-4 h-4 mr-1"/> CODE
                  </Button>
                </div>
              </div>

              {isLoading && (
                <div className="flex items-center justify-center gap-2 text-blue-600 p-4 bg-blue-50 border-4 border-blue-300">
                  <Brain className="w-5 h-5 animate-spin" />
                  <span className="font-black uppercase">AI is thinking...</span>
                </div>
              )}
              
              {aiResponse && (
                <div className="p-4 bg-gray-50 border-4 border-gray-400">
                  <h5 className="font-black text-gray-900 uppercase text-xs mb-2">AI RESPONSE</h5>
                  <p className="text-sm font-bold whitespace-pre-wrap text-gray-700">{aiResponse}</p>
                </div>
              )}
              
              <div className="space-y-3 pt-4 border-t-4 border-gray-300">
                <h4 className="font-black text-gray-900 uppercase text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  TASK CHAT
                </h4>
                <div className="h-24 p-3 bg-gray-100 border-4 border-gray-400 overflow-y-auto text-xs space-y-1">
                  <p><span className="font-black text-purple-600">@AI:</span> <span className="font-bold">Don't forget to handle edge cases for the API endpoint!</span></p>
                  <p><span className="font-black text-green-600">@Jane_Lead:</span> <span className="font-bold">Good point. Also, check the new design system components.</span></p>
                  <p><span className="font-black text-blue-600">@You:</span> <span className="font-bold">Will do! Thanks for the guidance.</span></p>
                </div>
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Chat with team or @AI..."
                    className="neo-input text-xs font-bold border-4 border-black" 
                    rows={1}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
                    onClick={handleSendMessage}
                  >
                    SEND
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
