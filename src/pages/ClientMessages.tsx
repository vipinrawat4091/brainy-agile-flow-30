
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, MessageSquare } from "lucide-react";
import ConversationList from "@/components/client/ConversationList";
import ChatInterface from "@/components/client/ChatInterface";

export default function ClientMessages() {
  const [activeConversationId, setActiveConversationId] = useState(1);

  const conversations = [
    {
      id: 1,
      subject: "UI Design Feedback",
      lastMessage: "The new dashboard design looks great! Just a few minor adjustments needed.",
      timestamp: "2 hours ago",
      status: "active" as const,
      unread: 2,
      participants: ["Project Manager", "Alex Developer", "Sam Backend", "Jordan Designer", "You"]
    },
    {
      id: 2,
      subject: "Feature Request Discussion",
      lastMessage: "We can definitely add that feature in the next sprint.",
      timestamp: "1 day ago",
      status: "active" as const,
      unread: 0,
      participants: ["Project Manager", "Alex Developer", "Sam Backend", "You"]
    },
    {
      id: 3,
      subject: "Project Timeline Update",
      lastMessage: "Timeline has been updated according to your requirements.",
      timestamp: "3 days ago",
      status: "resolved" as const,
      unread: 0,
      participants: ["Project Manager", "You"]
    }
  ];

  const messagesByConversation = {
    1: [
      {
        id: 1,
        sender: "Project Manager",
        message: "Hi! I wanted to update you on the progress of your project. We've completed the authentication system and are now working on the dashboard.",
        timestamp: "10:30 AM",
        type: "received" as const
      },
      {
        id: 2,
        sender: "You",
        message: "That's great to hear! Can you show me a preview of the dashboard?",
        timestamp: "10:45 AM",
        type: "sent" as const
      },
      {
        id: 3,
        sender: "Alex Developer",
        message: "I've finished implementing the user authentication. The dashboard structure is coming along nicely!",
        timestamp: "10:50 AM",
        type: "received" as const
      },
      {
        id: 4,
        sender: "Project Manager",
        message: "Absolutely! I'll prepare a demo link for you by tomorrow. Also, do you have any specific requirements for the reporting section?",
        timestamp: "11:00 AM",
        type: "received" as const
      },
      {
        id: 5,
        sender: "You",
        message: "Yes, I'd like to have export functionality for the reports in PDF and Excel formats. Also, can we add some charts for better visualization?",
        timestamp: "11:15 AM",
        type: "sent" as const
      },
      {
        id: 6,
        sender: "Sam Backend",
        message: "I can implement the export functionality. PDF and Excel export should be ready by end of week.",
        timestamp: "1:20 PM",
        type: "received" as const
      },
      {
        id: 7,
        sender: "Jordan Designer",
        message: "For the charts, I'll create some beautiful visualizations that match your brand. Any preference on chart types?",
        timestamp: "2:15 PM",
        type: "received" as const
      },
      {
        id: 8,
        sender: "You",
        message: "Bar charts and pie charts would be perfect! Also, can we make them interactive?",
        timestamp: "2:20 PM",
        type: "sent" as const
      },
      {
        id: 9,
        sender: "Alex Developer",
        message: "Absolutely! Interactive charts with hover effects and drill-down capabilities are definitely doable.",
        timestamp: "2:30 PM",
        type: "received" as const
      }
    ],
    2: [
      {
        id: 1,
        sender: "Project Manager",
        message: "We've reviewed your feature request for the advanced filtering system.",
        timestamp: "9:00 AM",
        type: "received" as const
      },
      {
        id: 2,
        sender: "You",
        message: "Great! When can we expect this to be implemented?",
        timestamp: "9:15 AM",
        type: "sent" as const
      },
      {
        id: 3,
        sender: "Alex Developer",
        message: "I estimate about 2 weeks for the complete filtering system with all the features you requested.",
        timestamp: "9:30 AM",
        type: "received" as const
      },
      {
        id: 4,
        sender: "Sam Backend",
        message: "The backend API for advanced filtering is already 60% complete. Should be ready for testing soon.",
        timestamp: "10:00 AM",
        type: "received" as const
      }
    ],
    3: [
      {
        id: 1,
        sender: "Project Manager",
        message: "The timeline has been updated based on your feedback.",
        timestamp: "2:00 PM",
        type: "received" as const
      }
    ]
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeMessages = messagesByConversation[activeConversationId as keyof typeof messagesByConversation] || [];

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // Here you would typically update your state or make an API call
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <style>{`
        .neo-button {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 10px 10px 0px #000000 !important;
        }
        
        .neo-card {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="neo-card bg-white p-6">
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">
            MESSAGES & COMMUNICATION
          </h1>
          <p className="text-gray-600 font-bold">Stay connected with your project team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onConversationSelect={setActiveConversationId}
            />
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {activeConversation && (
              <ChatInterface
                conversationTitle={activeConversation.subject}
                participants={activeConversation.participants}
                messages={activeMessages}
                onSendMessage={handleSendMessage}
              />
            )}

            {/* Quick Actions */}
            <Card className="neo-card bg-white mt-6">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="neo-button bg-green-500 hover:bg-green-600 text-white font-black uppercase text-xs">
                    <Clock className="w-4 h-4 mr-1" />
                    SCHEDULE MEETING
                  </Button>
                  <Button className="neo-button bg-purple-500 hover:bg-purple-600 text-white font-black uppercase text-xs">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    NEW CONVERSATION
                  </Button>
                  <Button className="neo-button bg-orange-500 hover:bg-orange-600 text-white font-black uppercase text-xs">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    MARK ALL READ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
