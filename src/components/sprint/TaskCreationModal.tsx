
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  Plus, 
  Target,
  Brain,
  User,
  Zap
} from "lucide-react";

export default function TaskCreationModal({ sprint, features, teamMembers, onCreateTask, onClose }) {
  const [taskData, setTaskData] = useState({
    sprint_id: sprint.id,
    title: "",
    description: "",
    assignee_id: "",
    status: "todo",
    priority: "medium",
    story_points: 3,
    estimated_hours: 8,
    due_date: sprint.end_date,
    feature_id: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setTaskData(prev => ({ ...prev, [field]: value }));
  };

  const aiGenerateTask = async () => {
    if (!taskData.title.trim()) return;
    
    setIsGenerating(true);
    // In a real scenario, this would call InvokeLLM
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTaskData(prev => ({
      ...prev,
      description: `AI-generated description for: ${prev.title}. This task involves...`,
      story_points: 5,
      estimated_hours: 13,
      priority: 'high'
    }));
    
    setIsGenerating(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask(taskData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white neo-card p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
          <div className="flex items-center gap-3">
            <Plus className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase">
                ADD NEW TASK
              </h2>
              <p className="text-gray-600 font-bold">Manual task creation for {sprint.name}</p>
            </div>
          </div>
          <Button onClick={onClose} variant="outline" className="neo-button font-black uppercase">
            CANCEL
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-sm font-black text-gray-900 uppercase">TASK TITLE *</Label>
            <div className="flex gap-2">
              <Input
                className="neo-input mt-2 text-lg font-bold flex-1"
                placeholder="ENTER TASK TITLE"
                value={taskData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
              <Button
                type="button"
                onClick={aiGenerateTask}
                disabled={!taskData.title.trim() || isGenerating}
                className="neo-button bg-purple-500 text-white font-black uppercase"
              >
                <Brain className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                AI
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-black text-gray-900 uppercase">DESCRIPTION</Label>
            <Textarea
              className="neo-input mt-2 font-bold"
              placeholder="TASK DESCRIPTION"
              value={taskData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">ASSIGNEE</Label>
              <Select value={taskData.assignee_id} onValueChange={(value) => handleInputChange('assignee_id', value)}>
                <SelectTrigger className="neo-input mt-2 font-bold">
                  <SelectValue placeholder="SELECT TEAM MEMBER" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.user_email}>
                      {member.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">PRIORITY</Label>
              <Select value={taskData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger className="neo-input mt-2 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">LOW</SelectItem>
                  <SelectItem value="medium">MEDIUM</SelectItem>
                  <SelectItem value="high">HIGH</SelectItem>
                  <SelectItem value="urgent">URGENT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">STORY POINTS</Label>
              <Input
                type="number"
                className="neo-input mt-2 font-bold"
                value={taskData.story_points}
                onChange={(e) => handleInputChange('story_points', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">ESTIMATED HOURS</Label>
              <Input
                type="number"
                className="neo-input mt-2 font-bold"
                value={taskData.estimated_hours}
                onChange={(e) => handleInputChange('estimated_hours', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">FEATURE</Label>
              <Select value={taskData.feature_id} onValueChange={(value) => handleInputChange('feature_id', value)}>
                <SelectTrigger className="neo-input mt-2 font-bold">
                  <SelectValue placeholder="LINK TO FEATURE" />
                </SelectTrigger>
                <SelectContent>
                  {features.map((feature) => (
                    <SelectItem key={feature.id} value={feature.id}>
                      {feature.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">DUE DATE</Label>
              <Input
                type="date"
                className="neo-input mt-2 font-bold"
                value={taskData.due_date}
                onChange={(e) => handleInputChange('due_date', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              className="neo-button bg-blue-500 text-white font-black uppercase text-lg px-8 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              CREATE TASK
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
