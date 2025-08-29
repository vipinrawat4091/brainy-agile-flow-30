
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare, User, Bot, Clock } from "lucide-react";

interface FeatureNote {
  id: number;
  author: string;
  message: string;
  timestamp: string;
  type: 'client' | 'developer';
}

interface Feature {
  name: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  estimatedHours: number;
  actualHours: number;
}

interface FeatureDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature | null;
}

export default function FeatureDetailModal({ isOpen, onClose, feature }: FeatureDetailModalProps) {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<FeatureNote[]>([
    {
      id: 1,
      author: "Development Team",
      message: "Initial implementation completed. The authentication system is working as expected with role-based access control.",
      timestamp: "2 days ago",
      type: "developer"
    },
    {
      id: 2,
      author: "You",
      message: "Great work! Could we also add two-factor authentication as an optional security feature?",
      timestamp: "1 day ago",
      type: "client"
    },
    {
      id: 3,
      author: "Development Team",
      message: "Absolutely! We can implement 2FA using SMS or authenticator apps. This would add approximately 8 hours to the timeline.",
      timestamp: "5 hours ago",
      type: "developer"
    }
  ]);

  const handleSendNote = () => {
    if (newNote.trim()) {
      const note: FeatureNote = {
        id: notes.length + 1,
        author: "You",
        message: newNote,
        timestamp: "Just now",
        type: "client"
      };
      setNotes([...notes, note]);
      setNewNote("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-orange-500';
      case 'testing': return 'bg-blue-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (!feature) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto neo-card bg-white">
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
        
        <DialogHeader className="border-b-4 border-black pb-4">
          <DialogTitle className="text-2xl font-black uppercase text-gray-900 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            {feature.name}
          </DialogTitle>
          <div className="flex gap-3 mt-4">
            <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${getStatusColor(feature.status)} text-white`}>
              {feature.status.toUpperCase()}
            </Badge>
            <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${getPriorityColor(feature.priority)} text-white`}>
              {feature.priority.toUpperCase()}
            </Badge>
            <Badge className="font-black border-2 border-black shadow-[2px_2px_0px_#000] bg-purple-500 text-white">
              {feature.category.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Feature Description */}
          <div className="neo-card bg-gray-50 p-4">
            <h3 className="font-black text-gray-900 uppercase mb-2">DESCRIPTION</h3>
            <p className="text-gray-700 font-bold">{feature.description}</p>
            <div className="flex gap-6 mt-4 text-sm font-bold text-gray-600">
              <span>ESTIMATED: {feature.estimatedHours}h</span>
              <span>ACTUAL: {feature.actualHours}h</span>
            </div>
          </div>

          {/* Developer Notes & Client Communication */}
          <div className="neo-card bg-white p-4">
            <h3 className="font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              DEVELOPMENT NOTES & COMMUNICATION
            </h3>
            
            {/* Notes Display */}
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {notes.map((note) => (
                <div key={note.id} className={`flex ${note.type === 'client' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md neo-card p-3 ${
                    note.type === 'client' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {note.type === 'developer' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      <span className="text-xs font-black uppercase">{note.author}</span>
                    </div>
                    <p className="text-sm font-bold">{note.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-bold opacity-70 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {note.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Note */}
            <div className="border-t-4 border-black pt-4">
              <div className="flex gap-3">
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add your feedback, questions, or change requests..."
                  className="flex-1 neo-card border-3 border-black font-bold resize-none"
                  rows={3}
                />
                <Button
                  onClick={handleSendNote}
                  className="neo-button bg-blue-500 hover:bg-blue-600 text-white font-black uppercase px-6 self-end"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
