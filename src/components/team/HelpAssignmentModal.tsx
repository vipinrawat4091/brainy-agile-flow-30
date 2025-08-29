import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Send, AlertTriangle, RefreshCw } from "lucide-react";

interface HelpAssignmentModalProps {
  blocker: {
    id: string;
    memberName: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  };
  onAssignHelp: (assignee: string, message: string) => void;
  isReassign?: boolean;
}

export default function HelpAssignmentModal({ blocker, onAssignHelp, isReassign = false }: HelpAssignmentModalProps) {
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Mock team members
  const teamMembers = [
    { id: 'alex@company.com', name: 'Alex Johnson', role: 'Senior Developer', expertise: 'Backend APIs' },
    { id: 'sarah@company.com', name: 'Sarah Chen', role: 'UI/UX Designer', expertise: 'Design Systems' },
    { id: 'emily@company.com', name: 'Emily Davis', role: 'Frontend Developer', expertise: 'React/UI' },
    { id: 'james@company.com', name: 'James Wilson', role: 'Backend Developer', expertise: 'Infrastructure' }
  ];

  const handleAssign = () => {
    if (selectedAssignee && message.trim()) {
      onAssignHelp(selectedAssignee, message);
      setIsOpen(false);
      setSelectedAssignee('');
      setMessage('');
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`neo-button ${isReassign ? 'bg-blue-500' : 'bg-orange-500'} text-white font-black uppercase text-xs border-2 border-black`}>
          {isReassign ? (
            <>
              <RefreshCw className="w-3 h-3 mr-1" />
              REASSIGN
            </>
          ) : (
            'ASSIGN HELP'
          )}
        </Button>
      </DialogTrigger>
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
            <Users className="w-6 h-6 text-orange-600" />
            {isReassign ? 'REASSIGN HELP' : 'ASSIGN HELP'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Blocker Summary */}
          <div className="p-4 bg-red-50 border-4 border-red-300">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-black text-red-900">BLOCKER DETAILS</h3>
              <Badge className={`font-black border-2 border-black ${getPriorityColor(blocker.priority)}`}>
                {blocker.priority.toUpperCase()}
              </Badge>
            </div>
            <p className="font-bold text-red-800 mb-2">Team Member: {blocker.memberName}</p>
            <p className="font-bold text-red-700">{blocker.description}</p>
          </div>

          {isReassign && (
            <div className="p-4 bg-blue-50 border-4 border-blue-300">
              <h4 className="font-black text-blue-900 mb-2">📝 REASSIGNMENT NOTE:</h4>
              <p className="text-sm font-bold text-blue-800">
                You are reassigning this task to a different team member. The previous assignee will be notified of the change.
              </p>
            </div>
          )}

          {/* Team Member Selection */}
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase">Select Team Member to Assign</label>
            <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
              <SelectTrigger className="neo-card bg-white border-4 border-black font-bold">
                <SelectValue placeholder="Choose a team member..." />
              </SelectTrigger>
              <SelectContent className="neo-card bg-white border-4 border-black">
                {teamMembers.map(member => (
                  <SelectItem key={member.id} value={member.id} className="font-bold hover:bg-gray-100">
                    <div>
                      <div className="font-black">{member.name}</div>
                      <div className="text-xs text-gray-600">{member.role} • {member.expertise}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message/Instructions */}
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase">Instructions & Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide specific instructions and context for the assigned team member..."
              className="neo-card bg-white border-4 border-black font-bold min-h-[120px] resize-none"
            />
          </div>

          {/* AI Suggestions */}
          <div className="p-4 bg-blue-50 border-4 border-blue-300">
            <h4 className="font-black text-blue-900 mb-2">💡 AI SUGGESTIONS:</h4>
            <ul className="space-y-1 text-sm font-bold text-blue-800">
              <li>• Provide specific deadlines and priority levels</li>
              <li>• Include relevant documentation or resources</li>
              <li>• Mention if this blocks other team members</li>
              <li>• Suggest escalation path if issue persists</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t-4 border-gray-200">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="neo-button bg-white text-gray-900 font-black uppercase hover:bg-gray-100"
            >
              CANCEL
            </Button>
            <Button
              onClick={handleAssign}
              disabled={!selectedAssignee || !message.trim()}
              className={`neo-button ${isReassign ? 'bg-blue-500' : 'bg-orange-500'} text-white font-black uppercase hover:bg-opacity-90 disabled:opacity-50`}
            >
              <Send className="w-4 h-4 mr-2" />
              {isReassign ? 'REASSIGN HELP' : 'ASSIGN HELP'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
