
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, User } from "lucide-react";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    id: string;
    title: string;
    message: string;
    from: string;
    priority: string;
    createdAt: Date;
  };
  onSendReply: (reply: string) => void;
}

export default function ReplyModal({ isOpen, onClose, notification, onSendReply }: ReplyModalProps) {
  const [reply, setReply] = useState('');

  const handleSend = () => {
    if (reply.trim()) {
      onSendReply(reply);
      setReply('');
      onClose();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl neo-card bg-white">
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
            <MessageSquare className="w-6 h-6 text-blue-600" />
            REPLY TO MANAGER
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Original Message */}
          <div className="p-4 bg-gray-50 border-4 border-gray-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-black text-gray-900">{notification.from}</span>
              </div>
              <Badge className={`font-black border-2 border-black ${getPriorityColor(notification.priority)}`}>
                {notification.priority.toUpperCase()}
              </Badge>
            </div>
            <h3 className="font-black text-gray-900 mb-2">{notification.title}</h3>
            <p className="font-bold text-gray-700">{notification.message}</p>
            <p className="text-sm font-bold text-gray-500 mt-2">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Reply Input */}
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase">Your Reply</label>
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply to the manager..."
              className="neo-card bg-white border-4 border-black font-bold min-h-[120px] resize-none"
            />
            <p className="text-xs font-bold text-gray-600">
              Tip: Be specific about your progress, challenges, or any additional help you need.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t-4 border-gray-200">
            <Button
              onClick={onClose}
              variant="outline"
              className="neo-button bg-white text-gray-900 font-black uppercase hover:bg-gray-100"
            >
              CANCEL
            </Button>
            <Button
              onClick={handleSend}
              disabled={!reply.trim()}
              className="neo-button bg-blue-500 text-white font-black uppercase hover:bg-blue-600 disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              SEND REPLY
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
