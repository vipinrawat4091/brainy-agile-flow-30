
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  User, 
  Target, 
  CheckCircle2, 
  Play, 
  AlertTriangle,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-500 text-white' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-500 text-white' },
  { value: 'review', label: 'Review', color: 'bg-orange-500 text-white' },
  { value: 'done', label: 'Done', color: 'bg-green-500 text-white' },
];

const PRIORITY_COLORS = {
  critical: "bg-red-500 border-red-800 text-white",
  high: "bg-orange-500 border-orange-800 text-white", 
  medium: "bg-blue-500 border-blue-800 text-white",
  low: "bg-gray-500 border-gray-800 text-white"
};

export default function TaskCard({ task, onStatusChange }) {
  const currentStatus = STATUS_OPTIONS.find(s => s.value === task.status);
  
  const getProgressPercentage = () => {
    const statusProgress = {
      'todo': 0,
      'in_progress': 50,
      'review': 80,
      'done': 100
    };
    return statusProgress[task.status] || 0;
  };

  const getAssigneeName = (assigneeId) => {
    if (!assigneeId) return 'Unassigned';
    return assigneeId.split('@')[0] || assigneeId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className="neo-card bg-white border-4 border-black h-full flex flex-col">
        <CardHeader className="border-b-4 border-black">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl font-black uppercase text-gray-900 mb-3">
                {task.title || 'Untitled Task'}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`font-black border-4 border-black ${PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium}`}>
                  {task.priority?.toUpperCase() || 'MEDIUM'} PRIORITY
                </Badge>
                {task.story_points && (
                  <Badge variant="outline" className="font-black border-4 border-black bg-white">
                    {task.story_points} STORY POINTS
                  </Badge>
                )}
                {task.estimated_hours && (
                  <Badge variant="outline" className="font-black border-4 border-black bg-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.estimated_hours}H ESTIMATED
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <Select value={task.status || 'todo'} onValueChange={(newStatus) => onStatusChange(task.id, newStatus)}>
                <SelectTrigger className="neo-input font-black border-4 border-black w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-4 border-black bg-white">
                  {STATUS_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value} className="font-bold">
                      {option.label.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 flex-grow flex flex-col">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-black text-gray-600 uppercase">Task Progress</span>
              <span className="text-lg font-black text-gray-900">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 h-4 border-4 border-gray-400">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          {/* Task Description */}
          <div className="mb-6 flex-grow">
            <h4 className="text-sm font-black text-gray-600 uppercase mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Description
            </h4>
            <div className="p-4 bg-gray-50 border-4 border-gray-300 min-h-[120px]">
              <p className="text-gray-700 font-bold leading-relaxed">
                {task.description || "No description provided for this task. Contact your project manager for more details about the requirements and acceptance criteria."}
              </p>
            </div>
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 border-4 border-blue-300">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-black text-blue-800 uppercase">Assignee</span>
              </div>
              <p className="font-black text-blue-900 text-lg">
                {getAssigneeName(task.assignee_id)}
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border-4 border-purple-300">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-black text-purple-800 uppercase">Current Status</span>
              </div>
              <Badge className={`font-black border-2 border-black ${currentStatus?.color || 'bg-gray-500 text-white'}`}>
                {currentStatus?.label.toUpperCase() || 'UNKNOWN'}
              </Badge>
            </div>
          </div>

          {/* Time Tracking */}
          {(task.estimated_hours || task.actual_hours) && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {task.estimated_hours && (
                <div className="p-3 bg-orange-50 border-4 border-orange-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-black text-orange-800 uppercase">Estimated</span>
                  </div>
                  <p className="font-black text-orange-900 text-lg">{task.estimated_hours}h</p>
                </div>
              )}
              
              {task.actual_hours && (
                <div className="p-3 bg-green-50 border-4 border-green-300">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-black text-green-800 uppercase">Actual</span>
                  </div>
                  <p className="font-black text-green-900 text-lg">{task.actual_hours}h</p>
                </div>
              )}
            </div>
          )}

          {/* Due Date */}
          {task.due_date && (
            <div className="p-4 bg-yellow-50 border-4 border-yellow-300 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-black text-yellow-800 uppercase">Due Date</span>
              </div>
              <p className="font-black text-yellow-900 text-lg">
                {new Date(task.due_date).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              {task.status === 'todo' && (
                <Button
                  onClick={() => onStatusChange(task.id, 'in_progress')}
                  className="neo-button bg-blue-500 text-white font-black uppercase flex-1 border-4 border-black"
                >
                  <Play className="w-5 h-5 mr-2" />
                  START WORKING
                </Button>
              )}
              
              {task.status === 'in_progress' && (
                <Button
                  onClick={() => onStatusChange(task.id, 'review')}
                  className="neo-button bg-orange-500 text-white font-black uppercase flex-1 border-4 border-black"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  SUBMIT FOR REVIEW
                </Button>
              )}
              
              {task.status === 'review' && (
                <Button
                  onClick={() => onStatusChange(task.id, 'done')}
                  className="neo-button bg-green-500 text-white font-black uppercase flex-1 border-4 border-black"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  MARK COMPLETE
                </Button>
              )}
              
              {task.status === 'done' && (
                <div className="flex-1 p-4 bg-green-50 border-4 border-green-300 text-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="font-black text-green-800 uppercase">TASK COMPLETED!</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
