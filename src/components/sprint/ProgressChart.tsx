
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Target, Clock } from "lucide-react";

const mockData = [
  { day: 'Day 1', completed: 2, total: 15, velocity: 8 },
  { day: 'Day 2', completed: 5, total: 15, velocity: 12 },
  { day: 'Day 3', completed: 8, total: 15, velocity: 10 },
  { day: 'Day 4', completed: 10, total: 15, velocity: 15 },
  { day: 'Day 5', completed: 12, total: 15, velocity: 18 },
  { day: 'Day 6', completed: 14, total: 15, velocity: 20 },
  { day: 'Day 7', completed: 15, total: 15, velocity: 22 }
];

export default function ProgressChart() {
  const currentProgress = (mockData[mockData.length - 1].completed / mockData[mockData.length - 1].total) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Sprint Progress */}
      <Card className="neo-card bg-white border-4 border-black">
        <CardHeader className="border-b-4 border-black">
          <CardTitle className="text-lg font-black uppercase flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            SPRINT PROGRESS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-900">COMPLETION RATE</span>
              <span className="text-lg font-black text-blue-600">{currentProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 border-2 border-black h-4">
              <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '3px solid #000',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Team Velocity */}
      <Card className="neo-card bg-white border-4 border-black">
        <CardHeader className="border-b-4 border-black">
          <CardTitle className="text-lg font-black uppercase flex items-center gap-3">
            <Target className="w-6 h-6 text-green-600" />
            TEAM VELOCITY
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-black text-green-600">22</div>
              <div className="text-xs font-bold text-gray-600 uppercase">Current</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-600">18</div>
              <div className="text-xs font-bold text-gray-600 uppercase">Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-orange-600">25</div>
              <div className="text-xs font-bold text-gray-600 uppercase">Target</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '3px solid #000',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              />
              <Bar dataKey="velocity" fill="#10b981" stroke="#000" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
