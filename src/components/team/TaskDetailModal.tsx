
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, 
  User, 
  Calendar, 
  MessageSquare, 
  AlertTriangle,
  Clock,
  CheckCircle2
} from "lucide-react";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    id: string;
    title: string;
    message: string;
    from: string;
    priority: string;
    createdAt: Date;
    relatedBlockerId?: string;
  };
}

export default function TaskDetailModal({ isOpen, onClose, notification }: TaskDetailModalProps) {
  // Mock detailed task data
  const taskDetails = {
    id: notification.relatedBlockerId || '1',
    title: 'Testing Environment Setup Issue',
    description: 'The testing environment is currently down and blocking QA activities',
    assignedMember: 'Mike Rodriguez',
    reportedBy: 'Mike Rodriguez',
    priority: notification.priority,
    status: 'help_assigned',
    createdAt: notification.createdAt,
    originalBlocker: 'Testing environment is down - need DevOps support',
    managerNotes: 'High priority issue. Need immediate DevOps support. Contact John from DevOps team if needed. This is blocking entire QA process.',
    assignedHelper: 'Alex Johnson',
    helperInstructions: 'Please assist Mike with getting the testing environment back online. Contact DevOps if needed. Priority: High.',
    estimatedResolution: '2 hours',
    dependencies: ['DevOps team availability', 'Server access credentials']
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'help_assigned': return 'bg-orange-500 text-white';
      case 'in_progress': return 'bg-blue-500 text-white';
      case 'resolved': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
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
            <Target className="w-6 h-6 text-blue-600" />
            TASK DETAILS
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Task Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{taskDetails.title}</h2>
              <p className="text-gray-700 font-bold mb-4">{taskDetails.description}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={`font-black border-2 border-black ${getPriorityColor(taskDetails.priority)}`}>
                {taskDetails.priority.toUpperCase()}
              </Badge>
              <Badge className={`font-black border-2 border-black ${getStatusColor(taskDetails.status)}`}>
                HELP ASSIGNED
              </Badge>
            </div>
          </div>

          {/* Task Info Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="neo-card bg-blue-50 border-4 border-blue-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-blue-900">ASSIGNED MEMBER</h3>
                </div>
                <p className="font-bold text-blue-800">{taskDetails.assignedMember}</p>
                <p className="text-sm font-bold text-blue-600 mt-1">QA Engineer</p>
              </CardContent>
            </Card>

            <Card className="neo-card bg-green-50 border-4 border-green-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-black text-green-900">HELPER ASSIGNED</h3>
                </div>
                <p className="font-bold text-green-800">{taskDetails.assignedHelper}</p>
                <p className="text-sm font-bold text-green-600 mt-1">Senior Developer</p>
              </CardContent>
            </Card>
          </div>

          {/* Original Blocker */}
          <Card className="neo-card bg-red-50 border-4 border-red-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-black text-red-900">ORIGINAL BLOCKER</h3>
              </div>
              <p className="font-bold text-red-800">{taskDetails.originalBlocker}</p>
            </CardContent>
          </Card>

          {/* Manager's Notes */}
          <Card className="neo-card bg-purple-50 border-4 border-purple-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <h3 className="font-black text-purple-900">MANAGER'S NOTES</h3>
              </div>
              <p className="font-bold text-purple-800 mb-3">{taskDetails.managerNotes}</p>
              <div className="bg-purple-100 p-3 border-4 border-purple-400">
                <p className="text-sm font-black text-purple-900 mb-1">📋 HELPER INSTRUCTIONS:</p>
                <p className="text-sm font-bold text-purple-800">{taskDetails.helperInstructions}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="neo-card bg-yellow-50 border-4 border-yellow-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-black text-yellow-900">TIMELINE</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-black text-yellow-800">Reported: </span>
                    <span className="font-bold text-yellow-700">
                      {new Date(taskDetails.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-black text-yellow-800">Est. Resolution: </span>
                    <span className="font-bold text-yellow-700">{taskDetails.estimatedResolution}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neo-card bg-gray-50 border-4 border-gray-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-gray-600" />
                  <h3 className="font-black text-gray-900">DEPENDENCIES</h3>
                </div>
                <ul className="space-y-1">
                  {taskDetails.dependencies.map((dep, index) => (
                    <li key={index} className="text-sm font-bold text-gray-700">
                      • {dep}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

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
