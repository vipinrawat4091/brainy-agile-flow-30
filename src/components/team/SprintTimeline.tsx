
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SprintTimeline({ sprint, tasks }) {
  if (!sprint) {
    return (
      <Card className="neo-card bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
        <CardContent className="p-6 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-bold uppercase">No active sprint</p>
        </CardContent>
      </Card>
    );
  }

  const startDate = new Date(sprint.start_date);
  const endDate = new Date(sprint.end_date);
  const today = new Date();
  
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const progress = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));

  const sprintTasks = tasks.filter(task => task.sprint_id === sprint.id);
  const completedTasks = sprintTasks.filter(task => task.status === 'done').length;
  const taskProgress = sprintTasks.length > 0 ? (completedTasks / sprintTasks.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="neo-card bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
        <CardHeader className="border-b-4 border-black">
          <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-600" />
            SPRINT TIMELINE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-black text-gray-900 uppercase">{sprint.name}</h3>
              <Badge className="font-black border-2 border-black bg-blue-500 text-white shadow-[2px_2px_0px_#000]">
                ACTIVE
              </Badge>
            </div>
            <p className="text-gray-600 font-bold mb-4">{sprint.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border-4 border-black bg-gray-50 shadow-[4px_4px_0px_#000]">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">{daysRemaining}</div>
              <div className="text-sm font-bold text-gray-600 uppercase">Days Left</div>
            </div>
            
            <div className="text-center p-4 border-4 border-black bg-gray-50 shadow-[4px_4px_0px_#000]">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">{completedTasks}/{sprintTasks.length}</div>
              <div className="text-sm font-bold text-gray-600 uppercase">Tasks Done</div>
            </div>
            
            <div className="text-center p-4 border-4 border-black bg-gray-50 shadow-[4px_4px_0px_#000]">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">{Math.round(taskProgress)}%</div>
              <div className="text-sm font-bold text-gray-600 uppercase">Progress</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-black text-gray-900 uppercase">SPRINT PROGRESS</h4>
              <span className="font-black text-lg text-blue-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-4 border-2 border-black shadow-[2px_2px_0px_#000]" />
            <div className="flex justify-between text-xs font-bold text-gray-500 mt-1">
              <span>{startDate.toLocaleDateString()}</span>
              <span>{endDate.toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
