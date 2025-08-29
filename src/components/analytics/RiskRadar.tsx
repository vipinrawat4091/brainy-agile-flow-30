
import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from 'lucide-react';

interface RiskData {
  subject: string;
  riskLevel: number;
}

interface RiskRadarProps {
  riskData: RiskData[];
}

export default function RiskRadar({ riskData }: RiskRadarProps) {
  return (
    <Card className="neo-card bg-white border-4 border-black">
      <CardHeader className="border-b-4 border-black">
        <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-red-600" />
          AI RISK RADAR
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {riskData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskData}>
              <defs>
                <radialGradient id="riskGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 0, 0, 0.5)" />
                  <stop offset="100%" stopColor="rgba(255, 0, 0, 0)" />
                </radialGradient>
              </defs>
              <PolarGrid stroke="#e5e7eb" strokeWidth={2} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#374151', fontSize: 12, fontWeight: 'bold' }} 
              />
              <Radar 
                name="Project Risk" 
                dataKey="riskLevel" 
                stroke="#FF0000" 
                strokeWidth={3}
                fill="url(#riskGradient)" 
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <ShieldAlert className="w-12 h-12 mx-auto mb-2" />
              <p className="font-bold uppercase">No risk data to display</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
