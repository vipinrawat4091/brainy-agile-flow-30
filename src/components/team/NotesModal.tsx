
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocker: {
    id: string;
    memberName: string;
    description: string;
    priority: string;
  };
}

export default function NotesModal({ isOpen, onClose, blocker }: NotesModalProps) {
  // Mock replies and notes data
  const blockerNotes = {
    assignedHelper: 'Alex Johnson',
    assignedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    originalInstructions: 'Please assist Mike with getting the testing environment back online. Contact DevOps if needed. Priority: High.',
    replies: [
      {
        id: '1',
        from: 'Mike Rodriguez',
        message: 'Thanks for assigning Alex to help. We are working together to contact DevOps team. The issue seems to be related to server configuration changes from last night.',
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        type: 'team_member'
      },
      {
        id: '2',
        from: 'Alex Johnson',
        message: 'I contacted John from DevOps. He confirmed there were configuration changes that broke the testing environment. He is working on rolling back the changes. ETA: 1 hour.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        type: 'helper'
      },
      {
        id: '3',
        from: 'Mike Rodriguez',
        message: 'Great news! The testing environment is back online. I can resume QA testing now. Thanks Alex for the quick help!',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        type: 'team_member'
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch(type) {
      case 'team_member': return 'bg-blue-50 border-blue-300';
      case 'helper': return 'bg-green-50 border-green-300';
      default: return 'bg-gray-50 border-gray-300';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch(type) {
      case 'team_member': return <User className="w-4 h-4 text-blue-600" />;
      case 'helper': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl neo-card bg-white max-h-[80vh] overflow-y-auto">
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
        `}</style>
        
        <DialogHeader className="border-b-4 border-black pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl font-black uppercase">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            BLOCKER NOTES & REPLIES
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Blocker Summary */}
          <Card className="neo-card bg-red-50 border-4 border-red-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-black text-red-900">BLOCKER DETAILS</h3>
                </div>
                <Badge className={`font-black border-2 border-black ${getPriorityColor(blocker.priority)}`}>
                  {blocker.priority.toUpperCase()}
                </Badge>
              </div>
              <p className="font-bold text-red-800 mb-2">Team Member: {blocker.memberName}</p>
              <p className="font-bold text-red-700">{blocker.description}</p>
            </CardContent>
          </Card>

          {/* Assignment Info */}
          <Card className="neo-card bg-orange-50 border-4 border-orange-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-orange-600" />
                <h3 className="font-black text-orange-900">HELP ASSIGNMENT</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-orange-800 mb-1">Assigned Helper: {blockerNotes.assignedHelper}</p>
                  <p className="text-sm font-bold text-orange-600">
                    Assigned: {blockerNotes.assignedAt.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-orange-800 mb-1">Original Instructions:</p>
                  <p className="text-sm font-bold text-orange-700">{blockerNotes.originalInstructions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies Timeline */}
          <div>
            <h3 className="font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              COMMUNICATION TIMELINE
            </h3>
            <div className="space-y-4">
              {blockerNotes.replies.map((reply, index) => (
                <Card key={reply.id} className={`neo-card ${getMessageTypeColor(reply.type)} border-4`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getMessageTypeIcon(reply.type)}
                        <span className="font-black text-gray-900">{reply.from}</span>
                        <Badge className={`font-black text-xs border-2 border-black ${reply.type === 'helper' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                          {reply.type === 'helper' ? 'HELPER' : 'TEAM MEMBER'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-600">
                        <Clock className="w-4 h-4" />
                        {reply.timestamp.toLocaleString()}
                      </div>
                    </div>
                    <p className="font-bold text-gray-800">{reply.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Status Summary */}
          <Card className="neo-card bg-green-50 border-4 border-green-300">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-black text-green-900 text-lg mb-1">ISSUE RESOLVED!</h3>
              <p className="font-bold text-green-700">
                Based on the latest communication, this blocker appears to be resolved.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t-4 border-gray-200">
            <Button
              onClick={onClose}
              className="neo-button bg-gray-500 text-white font-black uppercase"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
