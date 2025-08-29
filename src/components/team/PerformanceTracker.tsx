
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Zap, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function PerformanceTracker({ tasks }) {
  const completedCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const performanceData = [
    { name: 'Week 1', completed: 5 },
    { name: 'Week 2', completed: 8 },
    { name: 'Week 3', completed: 7 },
    { name: 'Week 4', completed: completedCount },
  ];

  return (
    <Card className="neo-card bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
      <CardHeader className="border-b-4 border-black">
        <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-green-600" />
          MY PERFORMANCE
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-black text-gray-900 uppercase">SPRINT COMPLETION</h4>
            <span className="font-black text-lg text-green-600">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-3 neo-input border-2 border-black" />
          <p className="text-xs font-bold text-gray-500 text-right mt-1">
            {completedCount} / {totalCount} TASKS COMPLETED
          </p>
        </div>

        <div>
          <h4 className="text-sm font-black text-gray-900 uppercase mb-3">WEEKLY VELOCITY</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={performanceData}>
              <XAxis dataKey="name" stroke="#374151" fontSize={12} fontWeight="bold" />
              <YAxis stroke="#374151" fontSize={12} fontWeight="bold" />
              <Bar dataKey="completed" fill="#00CC44" stroke="#000000" strokeWidth={3} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-sm font-black text-gray-900 uppercase mb-3">BADGES & AWARDS</h4>
          <div className="flex flex-wrap gap-3">
            <Badge className="font-black border-2 text-xs bg-red-500 text-white border-black p-2 shadow-[2px_2px_0px_#000]">
              <Award className="w-4 h-4 mr-1"/> SPRINT HERO
            </Badge>
            <Badge className="font-black border-2 text-xs bg-blue-500 text-white border-black p-2 shadow-[2px_2px_0px_#000]">
              <Zap className="w-4 h-4 mr-1"/> FAST LEARNER
            </Badge>
            <Badge className="font-black border-2 text-xs bg-purple-500 text-white border-black p-2 shadow-[2px_2px_0px_#000]">
              <CheckCircle2 className="w-4 h-4 mr-1"/> QUALITY CODER
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
