
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Bot, Send, CheckCircle2 } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  type: 'sent' | 'received';
}

interface ChatInterfaceProps {
  conversationTitle: string;
  participants: string[];
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export default function ChatInterface({ 
  conversationTitle, 
  participants, 
  messages, 
  onSendMessage 
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <Card className="neo-card bg-white h-full flex flex-col">
      <CardHeader className="border-b-4 border-black">
        <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
          <User className="w-6 h-6 text-purple-600" />
          {conversationTitle}
        </CardTitle>
        <p className="text-sm font-bold text-gray-600">{participants.join(', ')}</p>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md neo-card p-3 ${
                message.type === 'sent' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {message.type === 'received' && <Bot className="w-4 h-4" />}
                  {message.type === 'sent' && <User className="w-4 h-4" />}
                  <span className="text-xs font-black uppercase">{message.sender}</span>
                </div>
                <p className="text-sm font-bold">{message.message}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-bold opacity-70">{message.timestamp}</span>
                  {message.type === 'sent' && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t-4 border-black">
          <div className="flex gap-3">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 neo-card border-3 border-black font-bold resize-none"
              rows={3}
            />
            <Button
              onClick={handleSendMessage}
              className="neo-button bg-blue-500 hover:bg-blue-600 text-white font-black uppercase px-6 self-end"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
