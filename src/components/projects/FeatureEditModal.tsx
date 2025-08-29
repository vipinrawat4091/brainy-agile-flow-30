
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Plus, 
  Edit,
  Trash2,
  Brain,
  Save,
  X
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  howToDo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planning' | 'in_progress' | 'completed';
}

interface FeatureEditModalProps {
  project: any;
  onClose: () => void;
  onSave: (updates: any) => void;
}

export default function FeatureEditModal({ project, onClose, onSave }: FeatureEditModalProps) {
  const [features, setFeatures] = useState<Feature[]>(
    project.features.map((feature: string, index: number) => ({
      id: `feature-${index}`,
      title: feature,
      description: `Description for ${feature}`,
      howToDo: `Implementation guide for ${feature}`,
      priority: 'medium',
      status: 'planning'
    }))
  );
  const [techStack, setTechStack] = useState<string[]>([...project.tech_stack]);
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState({ title: '', description: '' });
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [showFeatureDetail, setShowFeatureDetail] = useState<Feature | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTech = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const addFeature = async () => {
    if (!newFeature.title.trim()) return;
    
    setIsEnhancing(true);
    // Simulate AI enhancement
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const enhancedFeature: Feature = {
      id: `feature-${Date.now()}`,
      title: newFeature.title,
      description: newFeature.description || `AI-enhanced description for ${newFeature.title}. This feature will provide comprehensive functionality...`,
      howToDo: `Step-by-step implementation guide for ${newFeature.title}:\n1. Design the user interface\n2. Implement core functionality\n3. Add validation and error handling\n4. Write tests\n5. Deploy and monitor`,
      priority: 'medium',
      status: 'planning'
    };
    
    setFeatures([...features, enhancedFeature]);
    setNewFeature({ title: '', description: '' });
    setIsEnhancing(false);
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const saveChanges = () => {
    const updates = {
      features: features.map(f => f.title),
      tech_stack: techStack,
      enhanced_features: features
    };
    onSave(updates);
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
        className="bg-white neo-card max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b-4 border-gray-900 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase text-gray-900">
            EDIT PROJECT FEATURES & TECH STACK
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={saveChanges}
              className="neo-button bg-green-500 text-white font-black uppercase"
            >
              <Save className="w-4 h-4 mr-2" />
              SAVE CHANGES
            </Button>
            <Button
              onClick={onClose}
              className="neo-button bg-red-500 text-white font-black uppercase"
            >
              <X className="w-4 h-4 mr-2" />
              CLOSE
            </Button>
          </div>
        </div>
        
        <div className="p-6 grid lg:grid-cols-2 gap-8">
          {/* Features Section */}
          <div>
            <h3 className="text-xl font-black uppercase text-gray-900 mb-4">PROJECT FEATURES</h3>
            
            {/* Add New Feature */}
            <Card className="neo-card bg-blue-50 mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  ADD NEW FEATURE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">FEATURE TITLE</Label>
                  <Input
                    className="neo-input mt-2 font-bold"
                    placeholder="Enter feature title..."
                    value={newFeature.title}
                    onChange={(e) => setNewFeature({...newFeature, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">SHORT DESCRIPTION (OPTIONAL)</Label>
                  <Textarea
                    className="neo-input mt-2 font-bold"
                    placeholder="Brief description..."
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                    rows={2}
                  />
                </div>
                <Button
                  onClick={addFeature}
                  disabled={!newFeature.title.trim() || isEnhancing}
                  className="neo-button bg-blue-500 text-white font-black uppercase w-full"
                >
                  <Brain className={`w-4 h-4 mr-2 ${isEnhancing ? 'animate-spin' : ''}`} />
                  {isEnhancing ? 'AI ENHANCING...' : 'ADD FEATURE (AI ENHANCED)'}
                </Button>
              </CardContent>
            </Card>

            {/* Features List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {features.map((feature) => (
                <div key={feature.id} className="neo-card bg-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 
                      className="font-black text-gray-900 cursor-pointer hover:text-blue-600"
                      onDoubleClick={() => setShowFeatureDetail(feature)}
                    >
                      {feature.title}
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setEditingFeature(feature)}
                        className="neo-button bg-blue-500 text-white font-bold text-xs"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => removeFeature(feature.id)}
                        className="neo-button bg-red-500 text-white font-bold text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-bold mb-2">
                    {feature.description.substring(0, 100)}...
                  </p>
                  <div className="flex gap-2">
                    <Badge className={`font-bold ${
                      feature.priority === 'critical' ? 'bg-red-500' :
                      feature.priority === 'high' ? 'bg-orange-500' :
                      feature.priority === 'medium' ? 'bg-blue-500' : 'bg-gray-500'
                    } text-white`}>
                      {feature.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="font-bold">
                      {feature.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-bold">
                    Double-click title to view full details
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div>
            <h3 className="text-xl font-black uppercase text-gray-900 mb-4">TECHNOLOGY STACK</h3>
            
            <Card className="neo-card bg-green-50 mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-600" />
                  ADD TECHNOLOGY
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Input
                  className="neo-input font-bold flex-1"
                  placeholder="Enter technology..."
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTech()}
                />
                <Button
                  onClick={addTech}
                  className="neo-button bg-green-500 text-white font-black uppercase"
                >
                  ADD
                </Button>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-2 bg-purple-100 border-2 border-purple-300 px-3 py-2">
                  <span className="font-bold text-purple-800">{tech}</span>
                  <Button
                    size="sm"
                    onClick={() => removeTech(index)}
                    className="neo-button bg-red-500 text-white font-bold text-xs p-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Detail Modal */}
        {showFeatureDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-60">
            <div className="bg-white neo-card max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black uppercase text-gray-900">
                  {showFeatureDetail.title}
                </h3>
                <Button
                  onClick={() => setShowFeatureDetail(null)}
                  className="neo-button bg-gray-500 text-white font-bold"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-black text-gray-900 uppercase mb-2">DESCRIPTION</h4>
                  <p className="text-gray-700 font-bold bg-gray-50 p-3 border-2 border-gray-300">
                    {showFeatureDetail.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-black text-gray-900 uppercase mb-2">HOW TO IMPLEMENT</h4>
                  <div className="text-gray-700 font-bold bg-blue-50 p-3 border-2 border-blue-300 whitespace-pre-line">
                    {showFeatureDetail.howToDo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
