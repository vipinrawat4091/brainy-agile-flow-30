
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  Calendar, 
  Target, 
  Users, 
  Zap,
  CheckCircle2,
  Clock,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

export default function SprintGenerationModal({ project, features, teamMembers, onGenerate, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sprintConfig, setSprintConfig] = useState({
    sprint_length: project?.sprint_length || 2,
    start_date: new Date().toISOString().split('T')[0],
    velocity_per_sprint: 40,
    focus_priority: 'high'
  });
  const [generatedSprints, setGeneratedSprints] = useState([]);
  const [currentStep, setCurrentStep] = useState('config'); // config, generating, review

  const generateSprints = async () => {
    setIsGenerating(true);
    setCurrentStep('generating');
    setProgress(10);

    try {
      // Step 1: Analyze project scope
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: Prioritize features
      setProgress(40);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 3: Create sprint breakdown
      setProgress(60);
      const sprints = await generateSprintPlan();
      
      // Step 4: Assign tasks to team members
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 800));

      setProgress(100);
      setGeneratedSprints(sprints);
      setTimeout(() => {
        setProgress(0);
        setCurrentStep('review');
      }, 1000);

    } catch (error) {
      console.error("Error generating sprints:", error);
    }
    
    setIsGenerating(false);
  };

  const generateSprintPlan = async () => {
    const prioritizedFeatures = features
      .filter(f => f.status === 'approved')
      .sort((a, b) => {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    const sprints = [];
    let currentVelocity = 0;
    let sprintNumber = 1;
    let currentSprintFeatures = [];

    for (const feature of prioritizedFeatures) {
      const estimatedPoints = getFeaturePoints(feature);
      
      if (currentVelocity + estimatedPoints > sprintConfig.velocity_per_sprint && currentSprintFeatures.length > 0) {
        // Create current sprint
        sprints.push(createSprintData(sprintNumber, currentSprintFeatures));
        sprintNumber++;
        currentSprintFeatures = [];
        currentVelocity = 0;
      }
      
      currentSprintFeatures.push(feature);
      currentVelocity += estimatedPoints;
    }

    // Add remaining features to final sprint
    if (currentSprintFeatures.length > 0) {
      sprints.push(createSprintData(sprintNumber, currentSprintFeatures));
    }

    return sprints;
  };

  const getFeaturePoints = (feature) => {
    const complexityPoints = { simple: 5, moderate: 13, complex: 21 };
    return complexityPoints[feature.complexity] || 13;
  };

  const createSprintData = (sprintNumber, sprintFeatures) => {
    const startDate = new Date(sprintConfig.start_date);
    startDate.setDate(startDate.getDate() + (sprintNumber - 1) * sprintConfig.sprint_length * 7);
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + sprintConfig.sprint_length * 7 - 1);

    const velocity = sprintFeatures.reduce((sum, f) => sum + getFeaturePoints(f), 0);

    return {
      name: `Sprint ${sprintNumber}`,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      goal: generateSprintGoal(sprintFeatures),
      velocity: velocity,
      features: sprintFeatures,
      tasks: generateTasksForFeatures(sprintFeatures)
    };
  };

  const generateSprintGoal = (features) => {
    const primaryFeature = features[0];
    if (features.length === 1) {
      return `Complete ${primaryFeature.title}`;
    }
    return `Implement ${primaryFeature.title} and ${features.length - 1} supporting features`;
  };

  const generateTasksForFeatures = (features) => {
    const tasks = [];
    
    features.forEach(feature => {
      const featureTasks = [
        {
          title: `Design ${feature.title}`,
          description: `Create UI/UX design and technical specifications for ${feature.title}`,
          priority: 'high',
          story_points: 3,
          estimated_hours: 8,
          assignee_id: getAssigneeBySkill('designer'),
          feature_id: feature.id
        },
        {
          title: `Implement ${feature.title}`,
          description: `Develop the core functionality for ${feature.title}`,
          priority: feature.priority,
          story_points: getFeaturePoints(feature) - 5,
          estimated_hours: (getFeaturePoints(feature) - 5) * 2,
          assignee_id: getAssigneeBySkill('developer'),
          feature_id: feature.id
        },
        {
          title: `Test ${feature.title}`,
          description: `Write and execute tests for ${feature.title}`,
          priority: 'medium',
          story_points: 2,
          estimated_hours: 4,
          assignee_id: getAssigneeBySkill('tester'),
          feature_id: feature.id
        }
      ];
      
      tasks.push(...featureTasks);
    });

    return tasks;
  };

  const getAssigneeBySkill = (skillType) => {
    const roleMap = {
      designer: ['designer', 'lead'],
      developer: ['developer', 'lead'],
      tester: ['tester', 'developer']
    };
    
    const eligibleMembers = teamMembers.filter(member => 
      roleMap[skillType]?.includes(member.role)
    );
    
    if (eligibleMembers.length === 0) {
      // Fallback to any available team member
      return teamMembers.length > 0 ? teamMembers[0].user_email : null;
    }
    
    // Smart assignment: distribute tasks evenly
    const assignedTaskCounts = {};
    eligibleMembers.forEach(member => {
      assignedTaskCounts[member.user_email] = 0;
    });
    
    // Find member with least tasks assigned
    const sortedMembers = eligibleMembers.sort((a, b) => 
      (assignedTaskCounts[a.user_email] || 0) - (assignedTaskCounts[b.user_email] || 0)
    );
    
    const selectedMember = sortedMembers[0];
    assignedTaskCounts[selectedMember.user_email]++;
    
    return selectedMember.user_email;
  };

  const confirmGeneration = () => {
    onGenerate(generatedSprints);
    onClose(); // This should close the modal
  };

  const handleCancel = () => {
    onClose(); // This should close the modal
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white neo-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {currentStep === 'config' && (
          <div>
            <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    AI SPRINT GENERATOR
                  </h2>
                  <p className="text-gray-600 font-bold">Configure automatic sprint planning with smart task assignment</p>
                </div>
              </div>
              <Button onClick={handleCancel} variant="outline" className="neo-button font-black uppercase">
                CANCEL
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">SPRINT LENGTH</Label>
                  <Select 
                    value={sprintConfig.sprint_length.toString()} 
                    onValueChange={(value) => setSprintConfig({...sprintConfig, sprint_length: parseInt(value)})}
                  >
                    <SelectTrigger className="neo-input mt-2 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 WEEK</SelectItem>
                      <SelectItem value="2">2 WEEKS</SelectItem>
                      <SelectItem value="3">3 WEEKS</SelectItem>
                      <SelectItem value="4">4 WEEKS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">START DATE</Label>
                  <Input
                    type="date"
                    className="neo-input mt-2 font-bold"
                    value={sprintConfig.start_date}
                    onChange={(e) => setSprintConfig({...sprintConfig, start_date: e.target.value})}
                  />
                </div>

                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">VELOCITY PER SPRINT</Label>
                  <Input
                    type="number"
                    min="10"
                    max="100"
                    className="neo-input mt-2 font-bold"
                    value={sprintConfig.velocity_per_sprint}
                    onChange={(e) => setSprintConfig({...sprintConfig, velocity_per_sprint: parseInt(e.target.value)})}
                  />
                  <p className="text-xs text-gray-500 mt-1 font-bold">Story points the team can complete per sprint</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900 uppercase mb-4">SMART ASSIGNMENT PREVIEW</h3>
                <div className="space-y-4">
                  <Card className="neo-card bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Target className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-black text-blue-900 uppercase">{features.filter(f => f.status === 'approved').length} APPROVED FEATURES</p>
                          <p className="text-blue-700 text-sm font-bold">Ready for sprint planning</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="neo-card bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="font-black text-green-900 uppercase">{teamMembers.length} TEAM MEMBERS</p>
                          <p className="text-green-700 text-sm font-bold">AI will auto-assign based on skills</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <h4 className="font-black text-gray-700 uppercase text-xs">TEAM ROLES</h4>
                    {teamMembers.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-2 bg-gray-100 border border-gray-300">
                        <span className="font-bold text-gray-800 text-sm">{member.full_name}</span>
                        <Badge className="bg-purple-500 text-white font-black text-xs">
                          {member.role.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                onClick={generateSprints}
                disabled={features.filter(f => f.status === 'approved').length === 0}
                className="neo-button bg-blue-500 text-white font-black uppercase text-lg px-8 py-3"
              >
                <Zap className="w-5 h-5 mr-2" />
                GENERATE SPRINTS & ASSIGN TASKS
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'generating' && (
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-blue-500 border-4 border-black mx-auto mb-6 flex items-center justify-center"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-black text-gray-900 uppercase mb-4">AI GENERATING SPRINTS</h3>
            <p className="text-gray-600 font-bold mb-8">Analyzing features, team skills, and auto-assigning tasks...</p>
            
            <div className="max-w-md mx-auto">
              <Progress value={progress} className="h-4 neo-input bg-gray-200 mb-4" />
              <div className="space-y-2 text-sm font-bold text-gray-600">
                {progress >= 20 && <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>ANALYZED PROJECT SCOPE</span>
                </div>}
                {progress >= 40 && <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>PRIORITIZED FEATURES</span>
                </div>}
                {progress >= 60 && <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>CREATED SPRINT BREAKDOWN</span>
                </div>}
                {progress >= 80 && <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>SMART TASK ASSIGNMENT COMPLETE</span>
                </div>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 'review' && (
          <div>
            <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900 uppercase">
                  SPRINT PLAN REVIEW
                </h2>
                <p className="text-gray-600 font-bold">
                  AI generated {generatedSprints.length} sprints with smart task assignments
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCancel} variant="outline" className="neo-button font-black uppercase">
                  CANCEL
                </Button>
                <Button onClick={confirmGeneration} className="neo-button bg-green-500 text-white font-black uppercase">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  CONFIRM SPRINTS
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {generatedSprints.map((sprint, index) => (
                <Card key={index} className="neo-card bg-white">
                  <CardHeader className="border-b-2 border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-black text-gray-900 uppercase">
                          {sprint.name}
                        </CardTitle>
                        <p className="text-gray-600 font-bold mt-1">{sprint.goal}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className="bg-blue-500 text-white border-2 border-blue-800 font-black">
                            {sprint.velocity} POINTS
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span className="font-bold">
                              {new Date(sprint.start_date).toLocaleDateString()} - {new Date(sprint.end_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-black text-gray-900 uppercase mb-3">FEATURES ({sprint.features.length})</h4>
                        <div className="space-y-2">
                          {sprint.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-center gap-3 p-2 bg-gray-50 border-2 border-gray-300">
                              <Badge className={`font-black border-2 text-white ${
                                feature.priority === 'critical' ? 'bg-red-500 border-red-800' :
                                feature.priority === 'high' ? 'bg-orange-500 border-orange-800' :
                                feature.priority === 'medium' ? 'bg-blue-500 border-blue-800' :
                                'bg-gray-500 border-gray-800'
                              }`}>
                                {feature.priority.toUpperCase()}
                              </Badge>
                              <span className="font-bold text-gray-900 text-sm">{feature.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-black text-gray-900 uppercase mb-3">SMART ASSIGNMENTS ({sprint.tasks.length})</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {sprint.tasks.map((task, tIndex) => (
                            <div key={tIndex} className="p-2 bg-gray-50 border-2 border-gray-300">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-gray-900 text-sm">{task.title}</span>
                                <Badge variant="outline" className="font-bold text-xs">
                                  {task.story_points} PTS
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Users className="w-3 h-3" />
                                <span className="font-bold">
                                  {task.assignee_id ? 
                                    teamMembers.find(m => m.user_email === task.assignee_id)?.full_name || task.assignee_id
                                    : 'Unassigned'
                                  }
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
