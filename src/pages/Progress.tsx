
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getProjects, Project } from "@/utils/projectStorage";
import { 
  BarChart3,
  CheckCircle2,
  Clock,
  MessageSquare,
  User,
  Calendar,
  Target,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  id: string;
  title: string;
  status: 'done' | 'in_progress' | 'planning';
  assignee: string;
  comments: Array<{
    id: string;
    author: string;
    message: string;
    timestamp: string;
  }>;
  progress: number;
}

const mockFeatures: Feature[] = [
  {
    id: '1',
    title: 'User Authentication System',
    status: 'done',
    assignee: 'John Doe',
    progress: 100,
    comments: [
      {
        id: '1',
        author: 'John Doe',
        message: 'Completed user login and registration. All tests passing. Ready for production.',
        timestamp: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Dashboard Analytics',
    status: 'in_progress',
    assignee: 'Jane Smith',
    progress: 75,
    comments: [
      {
        id: '2',
        author: 'Jane Smith',
        message: 'Working on real-time charts. Having some issues with data refresh rate. Should be resolved by tomorrow.',
        timestamp: '2024-01-15T14:20:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Mobile Responsive Design',
    status: 'in_progress',
    assignee: 'Mike Johnson',
    progress: 40,
    comments: [
      {
        id: '3',
        author: 'Mike Johnson',
        message: 'Started with tablet view. Desktop layout is complete. Mobile view in progress.',
        timestamp: '2024-01-15T16:45:00Z'
      }
    ]
  }
];

export default function Progress() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const loadedProjects = getProjects();
    // Add some mock projects if none exist
    if (loadedProjects.length === 0) {
      const mockProjects: Project[] = [
        {
          id: '1',
          name: 'E-Commerce Platform',
          description: 'Modern e-commerce platform with AI recommendations',
          vision: 'Revolutionary online shopping experience',
          features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Processing'],
          tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          team_size: 5,
          timeline: '6 months',
          priority: 'high',
          status: 'active',
          created_date: '2024-01-01',
          deadline: '2024-07-01',
          progress: 60
        },
        {
          id: '2', 
          name: 'Healthcare Management System',
          description: 'Patient management system with appointment scheduling',
          vision: 'Streamlined healthcare operations',
          features: ['Patient Records', 'Appointment Scheduling', 'Billing System', 'Reports'],
          tech_stack: ['React', 'Express', 'MongoDB', 'Socket.io'],
          team_size: 4,
          timeline: '8 months',
          priority: 'high',
          status: 'active',
          created_date: '2024-01-15',
          deadline: '2024-09-15',
          progress: 40
        },
        {
          id: '3',
          name: 'Learning Management System',
          description: 'Online education platform with video streaming',
          vision: 'Accessible education for everyone',
          features: ['Course Management', 'Video Streaming', 'Quiz System', 'Progress Tracking'],
          tech_stack: ['React', 'Node.js', 'MySQL', 'AWS S3'],
          team_size: 6,
          timeline: '10 months',
          priority: 'medium',
          status: 'planning',
          created_date: '2024-02-01',
          deadline: '2024-12-01',
          progress: 20
        }
      ];
      setProjects(mockProjects);
    } else {
      setProjects(loadedProjects);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-500 text-white';
      case 'in_progress':
        return 'bg-blue-500 text-white';
      case 'planning':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filterFeaturesByStatus = (status: string) => {
    return features.filter(f => f.status === status);
  };

  const getProjectProgress = (project: Project) => {
    // Use the project's own progress if available, otherwise calculate from features
    return project.progress || 0;
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
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            PROJECT PROGRESS
          </h1>
          <p className="text-lg font-bold text-gray-700 uppercase tracking-wide">
            MONITOR ALL PROJECT FEATURES AND DEVELOPER FEEDBACK
          </p>
        </div>
      </div>

      {!selectedProject ? (
        /* Projects Overview */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="neo-card bg-white cursor-pointer hover:shadow-[12px_12px_0px_#000]"
                   onClick={() => setSelectedProject(project)}>
                <CardHeader className="border-b-4 border-gray-900">
                  <CardTitle className="text-xl font-black uppercase text-gray-900">
                    {project.name}
                  </CardTitle>
                  <p className="text-sm font-bold text-gray-600">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-gray-900">OVERALL PROGRESS</span>
                      <span className="text-gray-900">{getProjectProgress(project).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-black h-3">
                      <div 
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${getProjectProgress(project)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-black text-green-600">
                        {filterFeaturesByStatus('done').length}
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">Done</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-blue-600">
                        {filterFeaturesByStatus('in_progress').length}
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">In Progress</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-orange-600">
                        {filterFeaturesByStatus('planning').length}
                      </div>
                      <div className="text-xs font-bold text-gray-600 uppercase">Planning</div>
                    </div>
                  </div>

                  <Button className="neo-button bg-blue-500 text-white font-black uppercase w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    VIEW DETAILS
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Project Details */
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-Gray-900 uppercase">
                {selectedProject.name}
              </h2>
              <p className="text-gray-600 font-bold">{selectedProject.description}</p>
            </div>
            <Button
              onClick={() => setSelectedProject(null)}
              className="neo-button bg-gray-500 text-white font-black uppercase"
            >
              BACK TO PROJECTS
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Done Features */}
            <Card className="neo-card bg-green-50">
              <CardHeader className="border-b-4 border-green-600">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  COMPLETED FEATURES ({filterFeaturesByStatus('done').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {filterFeaturesByStatus('done').map((feature) => (
                    <div
                      key={feature.id}
                      onClick={() => setSelectedFeature(feature)}
                      className="p-3 bg-white border-2 border-green-300 cursor-pointer hover:border-green-500 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm mb-1">
                        {feature.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <User className="w-3 h-3 text-gray-500" />
                        <span className="font-bold text-gray-600">{feature.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                        <span className="text-xs font-bold text-blue-600">
                          {feature.comments.length} comment(s)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* In Progress Features */}
            <Card className="neo-card bg-blue-50">
              <CardHeader className="border-b-4 border-blue-600">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  IN PROGRESS FEATURES ({filterFeaturesByStatus('in_progress').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {filterFeaturesByStatus('in_progress').map((feature) => (
                    <div
                      key={feature.id}
                      onClick={() => setSelectedFeature(feature)}
                      className="p-3 bg-white border-2 border-blue-300 cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm mb-1">
                        {feature.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs mb-2">
                        <User className="w-3 h-3 text-gray-500" />
                        <span className="font-bold text-gray-600">{feature.assignee}</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span>Progress</span>
                          <span>{feature.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2">
                          <div 
                            className="bg-blue-600 h-full"
                            style={{ width: `${feature.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                        <span className="text-xs font-bold text-blue-600">
                          {feature.comments.length} comment(s)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Planning Features */}
            <Card className="neo-card bg-orange-50">
              <CardHeader className="border-b-4 border-orange-600">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-3">
                  <Target className="w-6 h-6 text-orange-600" />
                  PLANNING FEATURES ({filterFeaturesByStatus('planning').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {filterFeaturesByStatus('planning').map((feature) => (
                    <div
                      key={feature.id}
                      onClick={() => setSelectedFeature(feature)}
                      className="p-3 bg-white border-2 border-orange-300 cursor-pointer hover:border-orange-500 transition-colors"
                    >
                      <h4 className="font-black text-gray-900 text-sm mb-1">
                        {feature.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs">
                        <User className="w-3 h-3 text-gray-500" />
                        <span className="font-bold text-gray-600">{feature.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                        <span className="text-xs font-bold text-blue-600">
                          {feature.comments.length} comment(s)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Feature Comments Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white neo-card max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-black uppercase text-gray-900">
                  {selectedFeature.title}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className={`${getStatusColor(selectedFeature.status)} font-bold`}>
                    {selectedFeature.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="font-bold">{selectedFeature.assignee}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setSelectedFeature(null)}
                className="neo-button bg-gray-500 text-white font-bold"
              >
                CLOSE
              </Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-black text-gray-900 uppercase">DEVELOPER COMMENTS</h4>
              {selectedFeature.comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-50 border-2 border-gray-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-gray-900">{comment.author}</span>
                    <span className="text-xs font-bold text-gray-500">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 font-bold">{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
