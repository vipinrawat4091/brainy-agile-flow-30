import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { getProjects, updateProject, deleteProject, Project } from "@/utils/projectStorage";
import { 
  Plus, 
  Calendar, 
  Users, 
  Target,
  Eye,
  Edit,
  Trash2,
  Brain,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import FeatureEditModal from "@/components/projects/FeatureEditModal";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const userType = localStorage.getItem('user_type');
    if (userType !== 'manager') {
      navigate(createPageUrl('TeamLogin'));
    } else {
      loadProjects();
    }
  }, [navigate]);

  const loadProjects = () => {
    const loadedProjects = getProjects();
    setProjects(loadedProjects);
  };

  const handleSaveProject = (projectUpdates: any) => {
    if (editingProject) {
      const updatedProject = updateProject(editingProject.id, projectUpdates);
      if (updatedProject) {
        setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
        setEditingProject(null);
        if (selectedProject?.id === editingProject.id) {
          setSelectedProject(updatedProject);
        }
      }
    }
  };

  const handleAddFeature = (projectId: string, newFeature: string) => {
    if (!newFeature.trim()) return;
    
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const updatedFeatures = [...project.features, newFeature.trim()];
      const updatedProject = updateProject(projectId, { features: updatedFeatures });
      
      if (updatedProject) {
        setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
        if (selectedProject?.id === projectId) {
          setSelectedProject(updatedProject);
        }
      }
    }
  };

  const handleRemoveFeature = (projectId: string, featureIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const updatedFeatures = project.features.filter((_, index) => index !== featureIndex);
      const updatedProject = updateProject(projectId, { features: updatedFeatures });
      
      if (updatedProject) {
        setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
        if (selectedProject?.id === projectId) {
          setSelectedProject(updatedProject);
        }
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 text-white';
      case 'planning':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-purple-500 text-white';
      case 'on-hold':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <style>{`
        .neo-button {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 10px 10px 0px #000000 !important;
        }
        
        .neo-card {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }

        .neo-input {
          border: 3px solid #000000 !important;
          box-shadow: 4px 4px 0px #000000 !important;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            PROJECT PORTFOLIO
          </h1>
          <p className="text-lg font-bold text-gray-700 uppercase tracking-wide">
            MANAGE ALL YOUR PROJECTS ({projects.length} TOTAL)
          </p>
        </div>
        <Button 
          onClick={() => navigate(createPageUrl('CreateProject'))}
          className="neo-button bg-blue-600 text-white font-black uppercase text-lg px-8 py-3 hover:bg-blue-700"
        >
          <Plus className="w-6 h-6 mr-3" />
          NEW PROJECT
        </Button>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-16">
          <div className="neo-card bg-white p-12 max-w-2xl mx-auto">
            <Brain className="w-16 h-16 mx-auto mb-6 text-gray-400" />
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-4">NO PROJECTS YET</h2>
            <p className="text-gray-600 font-bold mb-8">
              Create your first AI-powered project to get started with intelligent project management.
            </p>
            <Button 
              onClick={() => navigate(createPageUrl('CreateProject'))}
              className="neo-button bg-blue-600 text-white font-black uppercase px-8 py-3"
            >
              <Zap className="w-5 h-5 mr-2" />
              CREATE FIRST PROJECT
            </Button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="neo-card bg-white h-full">
                <CardHeader className="border-b-4 border-gray-900">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-black uppercase text-gray-900 mb-2">
                        {project.name}
                      </CardTitle>
                      <p className="text-sm font-bold text-gray-600 mb-3">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getStatusColor(project.status)} border-2 border-black font-bold uppercase`}>
                          {project.status}
                        </Badge>
                        <div className={`flex items-center gap-1 ${getPriorityColor(project.priority)}`}>
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase">{project.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-gray-900">PROGRESS</span>
                      <span className="text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-black h-3">
                      <div 
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Team & Timeline */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-gray-900">{project.team_size} Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-bold text-gray-900">{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-black uppercase text-gray-900 mb-2">KEY FEATURES</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 4).map((feature, idx) => (
                        <Badge key={idx} className="bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold">
                          {feature}
                        </Badge>
                      ))}
                      {project.features.length > 4 && (
                        <Badge className="bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold">
                          +{project.features.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-black uppercase text-gray-900 mb-2">TECH STACK</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack.map((tech, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-800 border border-blue-300 text-xs font-bold">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t-2 border-gray-200">
                    <Button 
                      size="sm" 
                      className="neo-button bg-blue-600 text-white font-bold uppercase flex-1 hover:bg-blue-700"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      VIEW
                    </Button>
                    <Button 
                      size="sm" 
                      className="neo-button bg-green-600 text-white font-bold uppercase flex-1 hover:bg-green-700"
                      onClick={() => setEditingProject(project)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      EDIT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Feature Edit Modal */}
      {editingProject && (
        <FeatureEditModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSaveProject}
        />
      )}
    </div>
  );
}

// Project Details Modal Component
function ProjectDetailsModal({ 
  project, 
  onClose, 
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white neo-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b-4 border-gray-900 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase text-gray-900">
            {project.name}
          </h2>
          <Button
            onClick={onClose}
            className="neo-button bg-red-500 text-white font-bold uppercase hover:bg-red-600"
          >
            CLOSE
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="neo-card bg-gray-50 p-4">
              <h3 className="text-lg font-black uppercase text-gray-900 mb-3">PROJECT VISION</h3>
              <p className="text-gray-700 font-bold">{project.vision}</p>
            </div>
            
            <div className="neo-card bg-blue-50 p-4">
              <h3 className="text-lg font-black uppercase text-gray-900 mb-3">DESCRIPTION</h3>
              <p className="text-gray-700 font-bold">{project.description}</p>
            </div>
          </div>
          
          <div className="neo-card bg-green-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black uppercase text-gray-900">FEATURES MANAGEMENT</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white border-2 border-black">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-bold text-gray-900">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="neo-card bg-purple-50 p-4">
            <h3 className="text-lg font-black uppercase text-gray-900 mb-3">TECHNOLOGY STACK</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech, idx) => (
                <Badge key={idx} className="bg-purple-100 text-purple-800 border-2 border-purple-800 font-bold text-sm px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
