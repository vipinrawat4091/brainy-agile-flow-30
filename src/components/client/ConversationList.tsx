
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, CheckCircle2 } from "lucide-react";

interface Conversation {
  id: number;
  subject: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'resolved';
  unread: number;
  participants: string[];
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: number;
  onConversationSelect: (conversationId: number) => void;
}

export default function ConversationList({ 
  conversations, 
  activeConversationId, 
  onConversationSelect 
}: ConversationListProps) {
  return (
    <Card className="neo-card bg-white h-full">
      <CardHeader className="border-b-4 border-black">
        <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          CONVERSATIONS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {conversations.map((conversation) => (
            <div 
              key={conversation.id} 
              className={`p-4 border-b-2 border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors ${
                activeConversationId === conversation.id ? 'bg-blue-100 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-sm text-gray-900 uppercase line-clamp-1">
                  {conversation.subject}
                </h3>
                {conversation.unread > 0 && (
                  <Badge className="bg-red-500 text-white font-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs ml-2">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
              <p className="text-xs font-bold text-gray-600 mb-2 line-clamp-2">
                {conversation.lastMessage}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs font-bold text-gray-500">{conversation.timestamp}</span>
                </div>
                <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs ${
                  conversation.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                } text-white`}>
                  {conversation.status.toUpperCase()}
                </Badge>
              </div>
              <div className="mt-2">
                <p className="text-xs font-bold text-gray-500">
                  {conversation.participants.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
