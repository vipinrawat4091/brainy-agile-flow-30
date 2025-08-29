
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomePanel({ user, tasks }) {
  const completedToday = tasks.filter(t => 
    t.status === 'done' && 
    new Date(t.updated_at || t.created_at).toDateString() === new Date().toDateString()
  ).length;

  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="neo-card bg-gradient-to-r from-blue-500 to-purple-600 text-white border-4 border-black shadow-[8px_8px_0px_#000]"
    >
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-2xl font-black uppercase mb-2">
              Good Morning, {user?.full_name?.split(' ')[0] || 'Developer'}!
            </h2>
            <p className="text-blue-100 font-bold mb-4">
              Ready to tackle today's challenges? You've got this! 💪
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Brain className="w-4 h-4" />
              <span className="font-bold">AI Assistant is ready to help</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-black mb-2">{completedToday}</div>
            <div className="text-blue-100 font-bold uppercase mb-2">COMPLETED TODAY</div>
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold text-yellow-100">On Fire!</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-black mb-2">{inProgressTasks}</div>
            <div className="text-blue-100 font-bold uppercase mb-2">IN PROGRESS</div>
            <div className="text-sm font-bold text-blue-100">
              Keep the momentum going!
            </div>
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
}
