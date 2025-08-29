
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Play, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MyTasksPanel({ tasks, onTaskSelect, onStatusUpdate, selectedTaskId, isFocusMode }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'done': return 'bg-green-500 text-white border-green-800';
      case 'in_progress': return 'bg-blue-500 text-white border-blue-800';
      case 'review': return 'bg-orange-500 text-white border-orange-800';
      case 'blocked': return 'bg-red-500 text-white border-red-800';
      default: return 'bg-gray-500 text-white border-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500 text-white border-red-800';
      case 'high': return 'bg-orange-500 text-white border-orange-800';
      case 'medium': return 'bg-blue-500 text-white border-blue-800';
      default: return 'bg-gray-500 text-white border-gray-800';
    }
  };

  return (
    <div className={`transition-all duration-500 ${isFocusMode ? 'lg:col-span-12' : ''}`}>
      <Card className="neo-card bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
        <CardHeader className="border-b-4 border-black">
          <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-600" />
            MY TASKS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className={`grid gap-4 ${isFocusMode ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onTaskSelect(task)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedTaskId === task.id
                    ? 'border-blue-500 bg-blue-50 shadow-[6px_6px_0px_#0066FF]'
                    : 'border-black hover:shadow-[6px_6px_0px_#000] bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-black text-gray-900 uppercase mb-2">{task.title}</h4>
                    <p className="text-gray-600 text-sm font-bold mb-3 line-clamp-2">{task.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={`font-black border-2 text-xs ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={`font-black border-2 text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority?.toUpperCase() || 'MEDIUM'}
                      </Badge>
                      {task.story_points && (
                        <Badge variant="outline" className="font-black border-2 border-black text-xs">
                          {task.story_points} PTS
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {task.status === 'todo' && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusUpdate(task.id, 'in_progress');
                      }}
                      size="sm"
                      className="neo-button bg-blue-500 text-white font-black uppercase text-xs border-2 border-black"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      START
                    </Button>
                  )}
                  
                  {task.status === 'in_progress' && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusUpdate(task.id, 'review');
                      }}
                      size="sm"
                      className="neo-button bg-orange-500 text-white font-black uppercase text-xs border-2 border-black"
                    >
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      REVIEW
                    </Button>
                  )}
                  
                  {task.status === 'review' && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusUpdate(task.id, 'done');
                      }}
                      size="sm"
                      className="neo-button bg-green-500 text-white font-black uppercase text-xs border-2 border-black"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      DONE
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            
            {tasks.length === 0 && (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-bold uppercase">No tasks assigned yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
