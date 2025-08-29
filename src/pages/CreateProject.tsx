
import React, { useState } from "react";
import { Project, Feature } from "@/entities/all";
import { saveProject } from "@/utils/projectStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Upload, 
  FileText, 
  Brain, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2,
  Rocket,
  Target,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INDUSTRIES = [
  { value: "web_app", label: "WEB APPLICATION" },
  { value: "mobile_app", label: "MOBILE APP" },
  { value: "saas", label: "SAAS PLATFORM" },
  { value: "ecommerce", label: "E-COMMERCE" },
  { value: "fintech", label: "FINTECH" },
  { value: "healthtech", label: "HEALTHTECH" },
  { value: "edtech", label: "EDTECH" },
  { value: "gaming", label: "GAMING" },
  { value: "other", label: "OTHER" }
];

const TECH_STACKS = {
  frontend: [
    { name: "React", description: "Popular JavaScript library for building UIs", category: "Frontend" },
    { name: "Vue.js", description: "Progressive framework for building user interfaces", category: "Frontend" },
    { name: "Angular", description: "Platform for building web applications", category: "Frontend" },
    { name: "Svelte", description: "Compile-time framework for building web apps", category: "Frontend" },
    { name: "Next.js", description: "React framework for production", category: "Frontend" }
  ],
  backend: [
    { name: "Node.js", description: "JavaScript runtime for server-side development", category: "Backend" },
    { name: "Python/Django", description: "High-level Python web framework", category: "Backend" },
    { name: "Python/FastAPI", description: "Modern, fast web framework for building APIs", category: "Backend" },
    { name: "Ruby on Rails", description: "Web application framework written in Ruby", category: "Backend" },
    { name: "Go", description: "Fast, statically typed compiled language", category: "Backend" },
    { name: "Java/Spring", description: "Enterprise Java framework", category: "Backend" }
  ],
  database: [
    { name: "PostgreSQL", description: "Advanced open source relational database", category: "Database" },
    { name: "MongoDB", description: "NoSQL document database", category: "Database" },
    { name: "MySQL", description: "Popular relational database", category: "Database" },
    { name: "Redis", description: "In-memory data structure store", category: "Database" },
    { name: "Supabase", description: "Open source Firebase alternative", category: "Database" }
  ],
  cloud: [
    { name: "AWS", description: "Amazon Web Services cloud platform", category: "Cloud & Hosting" },
    { name: "Vercel", description: "Platform for frontend frameworks and static sites", category: "Cloud & Hosting" },
    { name: "Netlify", description: "Platform for modern web projects", category: "Cloud & Hosting" },
    { name: "Google Cloud", description: "Google's cloud computing platform", category: "Cloud & Hosting" },
    { name: "Azure", description: "Microsoft's cloud computing platform", category: "Cloud & Hosting" }
  ]
};

export default function CreateProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Form data
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    industry: "",
    deadline: ""
  });
  
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [extractedRequirements, setExtractedRequirements] = useState("");
  const [visionStatement, setVisionStatement] = useState("");
  const [suggestedFeatures, setSuggestedFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [customFeature, setCustomFeature] = useState({ title: "", description: "" });
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [customTech, setCustomTech] = useState("");

  const handleDocumentUpload = async (file) => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(10);
    
    try {
      // Mock file upload
      setUploadedDoc({ name: file.name, url: "mock-url" });
      setProgress(30);
      
      // Mock requirements extraction
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockRequirements = "Sample extracted requirements from uploaded document. This is a mock implementation.";
      setExtractedRequirements(mockRequirements);
      
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
      
    } catch (error) {
      console.error("Error processing document:", error);
    }
    
    setIsProcessing(false);
  };

  const generateVisionAndFeatures = async () => {
    if (!projectData.name || !extractedRequirements) return;
    
    setIsProcessing(true);
    setProgress(20);
    
    try {
      // Mock vision generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVisionStatement(`To revolutionize ${projectData.industry} through innovative technology solutions that deliver exceptional user experiences.`);
      setProgress(50);
      
      // Mock feature generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockFeatures = [
        { title: "User Authentication", description: "Secure login and registration system", priority: "critical", complexity: "moderate", ai_suggested: true, category: "security" },
        { title: "Dashboard Analytics", description: "Real-time data visualization and insights", priority: "high", complexity: "complex", ai_suggested: true, category: "analytics" },
        { title: "API Integration", description: "Connect with external services and data sources", priority: "high", complexity: "moderate", ai_suggested: true, category: "integration" },
        { title: "Mobile Responsive", description: "Optimized experience across all devices", priority: "medium", complexity: "simple", ai_suggested: true, category: "ui" }
      ];
      
      setSuggestedFeatures(mockFeatures);
      setSelectedFeatures(mockFeatures.filter(f => f.priority === 'critical' || f.priority === 'high'));
      setProgress(100);
      
      setTimeout(() => {
        setProgress(0);
        setStep(3);
        // Initialize recommended tech stack
        setSelectedTechStack(getRecommendedTechStack());
      }, 1000);
      
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
    }
    
    setIsProcessing(false);
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev => {
      const exists = prev.find(f => f.title === feature.title);
      if (exists) {
        return prev.filter(f => f.title !== feature.title);
      } else {
        return [...prev, feature];
      }
    });
  };

  const addCustomFeature = () => {
    if (!customFeature.title.trim()) return;
    
    const newFeature = {
      title: customFeature.title,
      description: customFeature.description,
      priority: "medium",
      complexity: "moderate",
      ai_suggested: false,
      category: "custom"
    };
    
    setSelectedFeatures(prev => [...prev, newFeature]);
    setCustomFeature({ title: "", description: "" });
  };

  const removeFeature = (featureTitle) => {
    setSelectedFeatures(prev => prev.filter(f => f.title !== featureTitle));
  };

  const getRecommendedTechStack = () => {
    const recommendations = [];
    
    // Add frontend recommendation based on industry
    if (projectData.industry === 'web_app' || projectData.industry === 'saas') {
      recommendations.push(TECH_STACKS.frontend[0]); // React
    } else if (projectData.industry === 'ecommerce') {
      recommendations.push(TECH_STACKS.frontend[4]); // Next.js
    } else {
      recommendations.push(TECH_STACKS.frontend[0]); // React default
    }
    
    // Add backend recommendation
    recommendations.push(TECH_STACKS.backend[0]); // Node.js
    
    // Add database recommendation
    if (projectData.industry === 'ecommerce' || projectData.industry === 'fintech') {
      recommendations.push(TECH_STACKS.database[0]); // PostgreSQL
    } else {
      recommendations.push(TECH_STACKS.database[4]); // Supabase
    }
    
    // Add hosting recommendation
    recommendations.push(TECH_STACKS.cloud[1]); // Vercel
    
    return recommendations;
  };

  const toggleTech = (tech) => {
    setSelectedTechStack(prev => {
      const exists = prev.find(t => t.name === tech.name);
      if (exists) {
        return prev.filter(t => t.name !== tech.name);
      } else {
        return [...prev, tech];
      }
    });
  };

  const addCustomTech = () => {
    if (!customTech.trim()) return;
    
    const newTech = {
      name: customTech.trim(),
      description: "Custom technology",
      category: "Custom"
    };
    
    setSelectedTechStack(prev => [...prev, newTech]);
    setCustomTech("");
  };

  const removeTech = (techName) => {
    setSelectedTechStack(prev => prev.filter(t => t.name !== techName));
  };

  const createProject = async () => {
    setIsProcessing(true);
    
    try {
      // Save project using existing mock system
      const savedProject = saveProject({
        name: projectData.name,
        description: projectData.description,
        vision: visionStatement || projectData.description,
        vision_statement: visionStatement,
        features: selectedFeatures.map(f => f.title),
        tech_stack: selectedTechStack.map(t => t.name),
        team_size: 1,
        timeline: projectData.deadline || "",
        priority: "medium" as const,
        deadline: projectData.deadline,
        requirements_doc_url: uploadedDoc?.url
      });
      
      console.log('Project created:', savedProject);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      navigate(createPageUrl("Dashboard"));
      
    } catch (error) {
      console.error("Error creating project:", error);
    }
    
    setIsProcessing(false);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-500 border-red-800 text-white';
      case 'high': return 'bg-orange-500 border-orange-800 text-white';
      case 'medium': return 'bg-blue-500 border-blue-800 text-white';
      case 'low': return 'bg-gray-500 border-gray-800 text-white';
      default: return 'bg-gray-500 border-gray-800 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-3">
            AI PROJECT CREATOR
          </h1>
          <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
            LET AI ORCHESTRATE YOUR DEVELOPMENT
          </p>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full border-4 border-black flex items-center justify-center font-black ${
                  step >= num ? 'bg-blue-500 text-white' : 'bg-white text-gray-400'
                }`}>
                  {num}
                </div>
                {num < 5 && <div className={`w-12 h-1 border-2 border-black ${step > num ? 'bg-blue-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-3 text-xs font-black text-gray-600 uppercase">
            <span>SETUP</span>
            <span>ANALYZE</span>
            <span>FEATURES</span>
            <span>TECH STACK</span>
            <span>CREATE</span>
          </div>
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Progress value={progress} className="h-3 neo-input bg-gray-200" />
            <p className="text-center text-sm font-bold text-gray-600 mt-2 uppercase">
              AI PROCESSING...
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Basic Project Setup */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="neo-card bg-white">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
                    <Rocket className="w-7 h-7 text-blue-600" />
                    PROJECT SETUP
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <Label className="text-sm font-black text-gray-900 uppercase">PROJECT NAME *</Label>
                    <Input
                      className="neo-input mt-2 text-lg font-bold"
                      placeholder="ENTER PROJECT NAME"
                      value={projectData.name}
                      onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-black text-gray-900 uppercase">DESCRIPTION</Label>
                    <Textarea
                      className="neo-input mt-2 font-bold"
                      placeholder="BRIEF PROJECT DESCRIPTION"
                      value={projectData.description}
                      onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-black text-gray-900 uppercase">INDUSTRY *</Label>
                      <Select value={projectData.industry} onValueChange={(value) => setProjectData({...projectData, industry: value})}>
                        <SelectTrigger className="neo-input mt-2 font-bold">
                          <SelectValue placeholder="SELECT INDUSTRY" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem key={industry.value} value={industry.value}>
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-black text-gray-900 uppercase">DEADLINE (OPTIONAL)</Label>
                      <Input
                        className="neo-input mt-2 font-bold"
                        type="date"
                        value={projectData.deadline}
                        onChange={(e) => setProjectData({...projectData, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!projectData.name || !projectData.industry}
                      className="neo-button bg-blue-500 text-white font-black uppercase text-lg px-8 py-3"
                    >
                      NEXT: UPLOAD DOCS
                      <Target className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Document Upload & Analysis */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="neo-card bg-white">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
                    <FileText className="w-7 h-7 text-orange-600" />
                    REQUIREMENTS ANALYSIS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {!uploadedDoc ? (
                    <div className="text-center py-12">
                      <div className="border-4 border-dashed border-gray-300 rounded-none p-12 hover:border-blue-500 transition-colors">
                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-gray-900 uppercase mb-2">
                          UPLOAD REQUIREMENTS DOCUMENT
                        </h3>
                        <p className="text-gray-600 font-bold mb-6">
                          SRS, PRD, or any project documentation (PDF, DOCX, TXT)
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt,.md"
                          onChange={(e) => handleDocumentUpload(e.target.files[0])}
                          className="hidden"
                          id="doc-upload"
                        />
                        <label htmlFor="doc-upload">
                          <Button className="neo-button bg-orange-500 text-white font-black uppercase" asChild>
                            <span>SELECT DOCUMENT</span>
                          </Button>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 p-4 bg-green-50 border-4 border-green-500">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <div>
                          <h4 className="font-black text-green-900 uppercase">DOCUMENT UPLOADED</h4>
                          <p className="font-bold text-green-700">{uploadedDoc.name}</p>
                        </div>
                      </div>
                      
                      {extractedRequirements && (
                        <div>
                          <Label className="text-sm font-black text-gray-900 uppercase">EXTRACTED REQUIREMENTS</Label>
                          <Textarea
                            className="neo-input mt-2 font-bold"
                            value={extractedRequirements}
                            onChange={(e) => setExtractedRequirements(e.target.value)}
                            rows={8}
                            placeholder="AI WILL EXTRACT REQUIREMENTS FROM YOUR DOCUMENT..."
                          />
                          <p className="text-xs font-bold text-gray-500 mt-2">
                            REVIEW AND EDIT THE EXTRACTED REQUIREMENTS ABOVE
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Manual Requirements Input */}
                  <div className="mt-8 pt-8 border-t-2 border-gray-200">
                    <Label className="text-sm font-black text-gray-900 uppercase">OR MANUALLY ENTER REQUIREMENTS</Label>
                    <Textarea
                      className="neo-input mt-2 font-bold"
                      value={extractedRequirements}
                      onChange={(e) => setExtractedRequirements(e.target.value)}
                      rows={6}
                      placeholder="PASTE OR TYPE YOUR PROJECT REQUIREMENTS HERE..."
                    />
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="neo-button font-black uppercase"
                    >
                      BACK
                    </Button>
                    <Button
                      onClick={generateVisionAndFeatures}
                      disabled={!extractedRequirements.trim() || isProcessing}
                      className="neo-button bg-purple-500 text-white font-black uppercase text-lg px-8 py-3"
                    >
                      {isProcessing ? (
                        <>
                          <Brain className="w-5 h-5 mr-2 animate-spin" />
                          AI ANALYZING...
                        </>
                      ) : (
                        <>
                          AI GENERATE FEATURES
                          <Zap className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Feature Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {/* Vision Statement */}
              {visionStatement && (
                <Card className="neo-card bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                      <Brain className="w-6 h-6" />
                      AI-GENERATED VISION
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold italic">"{visionStatement}"</p>
                  </CardContent>
                </Card>
              )}

              {/* Feature Selection */}
              <Card className="neo-card bg-white">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
                    <Layers className="w-7 h-7 text-green-600" />
                    SELECT FEATURES
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid gap-4 mb-8">
                    {suggestedFeatures.map((feature, index) => {
                      const isSelected = selectedFeatures.find(f => f.title === feature.title);
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => toggleFeature(feature)}
                          className={`p-4 border-4 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-black text-gray-900 uppercase">{feature.title}</h3>
                                <Badge className={`font-black border-2 ${getPriorityColor(feature.priority)}`}>
                                  {feature.priority.toUpperCase()}
                                </Badge>
                                {feature.ai_suggested && (
                                  <Badge className="bg-purple-100 text-purple-800 border-2 border-purple-800 font-black">
                                    AI SUGGESTED
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 font-bold text-sm">{feature.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-gray-500">COMPLEXITY:</span>
                                <Badge variant="outline" className="font-bold">
                                  {feature.complexity.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            <div className={`w-6 h-6 border-3 border-black ${
                              isSelected ? 'bg-blue-500' : 'bg-white'
                            } flex items-center justify-center`}>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Custom Feature Addition */}
                  <div className="border-t-4 border-gray-200 pt-6">
                    <h3 className="text-lg font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      ADD CUSTOM FEATURE
                    </h3>
                    <div className="grid gap-4">
                      <Input
                        className="neo-input font-bold"
                        placeholder="FEATURE TITLE"
                        value={customFeature.title}
                        onChange={(e) => setCustomFeature({...customFeature, title: e.target.value})}
                      />
                      <Textarea
                        className="neo-input font-bold"
                        placeholder="FEATURE DESCRIPTION"
                        value={customFeature.description}
                        onChange={(e) => setCustomFeature({...customFeature, description: e.target.value})}
                        rows={2}
                      />
                      <Button
                        onClick={addCustomFeature}
                        disabled={!customFeature.title.trim()}
                        className="neo-button bg-green-500 text-white font-black uppercase w-fit"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        ADD FEATURE
                      </Button>
                    </div>
                  </div>

                  {/* Selected Features Summary */}
                  {selectedFeatures.length > 0 && (
                    <div className="mt-8 p-6 bg-blue-50 border-4 border-blue-500">
                      <h3 className="font-black text-blue-900 uppercase mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        SELECTED FEATURES ({selectedFeatures.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFeatures.map((feature, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-500 text-white border-2 border-blue-800 font-black cursor-pointer hover:bg-red-500"
                            onClick={() => removeFeature(feature.title)}
                          >
                            {feature.title}
                            <XCircle className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <Button
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="neo-button font-black uppercase"
                    >
                      BACK
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      disabled={selectedFeatures.length === 0}
                      className="neo-button bg-green-500 text-white font-black uppercase text-lg px-8 py-3"
                    >
                      NEXT: TECH STACK
                      <Layers className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Tech Stack Selection */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="neo-card bg-white">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
                    <Layers className="w-7 h-7 text-purple-600" />
                    SELECT TECH STACK
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Recommended Tech Stack */}
                  <div className="mb-8">
                    <h3 className="text-lg font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      AI RECOMMENDED STACK
                    </h3>
                    <div className="grid gap-3">
                      {getRecommendedTechStack().map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-blue-50 border-4 border-blue-500"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-500 border-2 border-black flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-black text-blue-900 uppercase">{tech.name}</h4>
                                <Badge className="bg-blue-500 text-white border-2 border-blue-800 font-black">
                                  {tech.category.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-blue-700 font-bold text-sm">{tech.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* All Available Technologies */}
                  <div className="space-y-6">
                    {Object.entries(TECH_STACKS).map(([category, techs]) => (
                      <div key={category}>
                        <h3 className="text-lg font-black text-gray-900 uppercase mb-4">
                          {category.replace('_', ' ')} OPTIONS
                        </h3>
                        <div className="grid gap-3">
                          {techs.map((tech, index) => {
                            const isSelected = selectedTechStack.find(t => t.name === tech.name);
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => toggleTech(tech)}
                                className={`p-4 border-4 cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'border-green-500 bg-green-50' 
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 border-3 border-black ${
                                    isSelected ? 'bg-green-500' : 'bg-white'
                                  } flex items-center justify-center`}>
                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                      <h4 className="font-black text-gray-900 uppercase">{tech.name}</h4>
                                      <Badge variant="outline" className="font-bold">
                                        {tech.category.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <p className="text-gray-600 font-bold text-sm">{tech.description}</p>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Technology Addition */}
                  <div className="mt-8 pt-6 border-t-4 border-gray-200">
                    <h3 className="text-lg font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      ADD CUSTOM TECHNOLOGY
                    </h3>
                    <div className="flex gap-4">
                      <Input
                        className="neo-input font-bold flex-1"
                        placeholder="TECHNOLOGY NAME (e.g., Docker, Redis, etc.)"
                        value={customTech}
                        onChange={(e) => setCustomTech(e.target.value)}
                      />
                      <Button
                        onClick={addCustomTech}
                        disabled={!customTech.trim()}
                        className="neo-button bg-purple-500 text-white font-black uppercase"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        ADD
                      </Button>
                    </div>
                  </div>

                  {/* Selected Tech Stack Summary */}
                  {selectedTechStack.length > 0 && (
                    <div className="mt-8 p-6 bg-purple-50 border-4 border-purple-500">
                      <h3 className="font-black text-purple-900 uppercase mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        SELECTED TECH STACK ({selectedTechStack.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTechStack.map((tech, index) => (
                          <Badge
                            key={index}
                            className="bg-purple-500 text-white border-2 border-purple-800 font-black cursor-pointer hover:bg-red-500"
                            onClick={() => removeTech(tech.name)}
                          >
                            {tech.name}
                            <XCircle className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <Button
                      onClick={() => setStep(3)}
                      variant="outline"
                      className="neo-button font-black uppercase"
                    >
                      BACK TO FEATURES
                    </Button>
                    <Button
                      onClick={() => setStep(5)}
                      disabled={selectedTechStack.length === 0}
                      className="neo-button bg-green-500 text-white font-black uppercase text-lg px-8 py-3"
                    >
                      FINALIZE PROJECT
                      <Rocket className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Final Review */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="neo-card bg-white">
                <CardHeader className="border-b-4 border-black">
                  <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                    PROJECT SUMMARY
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-black text-gray-900 uppercase mb-3">PROJECT DETAILS</h3>
                      <div className="space-y-2">
                        <p><span className="font-black">NAME:</span> {projectData.name}</p>
                        <p><span className="font-black">INDUSTRY:</span> {INDUSTRIES.find(i => i.value === projectData.industry)?.label}</p>
                        {projectData.deadline && <p><span className="font-black">DEADLINE:</span> {new Date(projectData.deadline).toLocaleDateString()}</p>}
                        <p><span className="font-black">FEATURES:</span> {selectedFeatures.length} selected</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-black text-gray-900 uppercase mb-3">AI ANALYSIS</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-blue-600" />
                          <span className="font-bold">Vision statement generated</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-orange-600" />
                          <span className="font-bold">{suggestedFeatures.filter(f => f.ai_suggested).length} AI-suggested features</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-green-600" />
                          <span className="font-bold">Ready for sprint planning</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {visionStatement && (
                    <div className="p-4 bg-purple-50 border-l-4 border-purple-500">
                      <h4 className="font-black text-purple-900 uppercase mb-2">VISION STATEMENT</h4>
                      <p className="font-bold text-purple-800 italic">"{visionStatement}"</p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button
                      onClick={() => setStep(4)}
                      variant="outline"
                      className="neo-button font-black uppercase"
                    >
                      BACK TO TECH STACK
                    </Button>
                    <Button
                      onClick={createProject}
                      disabled={isProcessing}
                      className="neo-button bg-green-500 text-white font-black uppercase text-xl px-12 py-4"
                    >
                      {isProcessing ? (
                        <>
                          <Brain className="w-6 h-6 mr-3 animate-spin" />
                          CREATING PROJECT...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-6 h-6 mr-3" />
                          CREATE PROJECT
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
