
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, AlertTriangle, Zap, User, Clock, CheckCircle2 } from "lucide-react";

export default function AIInsightsPanel({ sprint, tasks, teamMembers }) {
  const getRiskTasks = () => {
    if (!sprint || !tasks) return [];
    
    const sprintEndDate = new Date(sprint.end_date);
    const today = new Date();
    
    return tasks.filter(task => {
      if (task.status === 'done') return false;
      const dueDate = new Date(task.due_date);
      // At risk if due in the next 3 days or overdue
      return dueDate < today || (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24) < 3;
    });
  };

  const getTeamLoad = (memberEmail) => {
    const memberTasks = tasks.filter(t => t.assignee_id === memberEmail && t.status !== 'done');
    const totalPoints = memberTasks.reduce((sum, t) => sum + (Number(t.story_points) || 3), 0);
    return totalPoints;
  };

  const riskTasks = getRiskTasks();
  
  return (
    <Card className="neo-card bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <CardHeader className="border-b-4 border-white/20">
        <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
          <Brain className="w-6 h-6" />
          AI INSIGHTS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h4 className="text-sm font-black uppercase text-purple-200 mb-3">
            <Zap className="w-4 h-4 mr-1 inline-block" />
            PERFORMANCE PREDICTION
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold">SPRINT ON TRACK</span>
              <span className="font-black text-lg">
                {sprint?.actual_velocity > sprint?.velocity * 0.8 ? "YES" : "NO"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold">AI CONFIDENCE</span>
              <span className="font-black text-lg">
                {riskTasks.length < 3 ? '92%' : '75%'}
              </span>
            </div>
          </div>
        </div>
        
        {riskTasks.length > 0 && (
          <div>
            <h4 className="text-sm font-black uppercase text-red-300 mb-3">
              <AlertTriangle className="w-4 h-4 mr-1 inline-block" />
              RISK ASSESSMENT
            </h4>
            <div className="space-y-2">
              {riskTasks.slice(0, 3).map(task => (
                <div key={task.id} className="p-2 bg-white/10 border-2 border-white/20">
                  <p className="text-xs font-bold truncate">{task.title}</p>
                </div>
              ))}
              {riskTasks.length > 3 && (
                <p className="text-xs font-bold text-center">+ {riskTasks.length - 3} more risks</p>
              )}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-black uppercase text-blue-200 mb-3">
            <User className="w-4 h-4 mr-1 inline-block" />
            TEAM WORKLOAD
          </h4>
          <div className="space-y-3">
            {teamMembers.slice(0, 4).map(member => {
              const load = getTeamLoad(member.user_email);
              const loadPercentage = (load / 21) * 100; // Assuming 21 points is max
              return (
                <div key={member.id} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold">{member.full_name}</span>
                    <span className="font-black">{load} PTS</span>
                  </div>
                  <Progress value={loadPercentage} className="h-2 bg-white/20" />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
