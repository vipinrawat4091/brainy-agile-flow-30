
import React, { useState, useEffect } from "react";
import { Project, Feature } from "@/entities/all";

// Mock InvokeLLM function for demo
const InvokeLLM = async ({ prompt, response_json_schema }) => {
  // Mock implementation - replace with actual integration
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  
  return {
    unit_tests: [
      {
        description: "Test component renders correctly",
        code: `test('renders feature component', () => {\n  render(<FeatureComponent />);\n  expect(screen.getByText('Feature Title')).toBeInTheDocument();\n});`
      },
      {
        description: "Test user interaction",
        code: `test('handles user click', () => {\n  const mockHandler = jest.fn();\n  render(<FeatureComponent onClick={mockHandler} />);\n  fireEvent.click(screen.getByRole('button'));\n  expect(mockHandler).toHaveBeenCalled();\n});`
      }
    ],
    integration_tests: [
      {
        scenario: "Feature integration with API",
        steps: "1. User clicks feature button\n2. API call is made\n3. UI updates with response\n4. Success message is displayed"
      },
      {
        scenario: "Error handling integration",
        steps: "1. User submits invalid data\n2. API returns error\n3. Error message is displayed\n4. Form remains editable"
      }
    ],
    e2e_tests: [
      {
        scenario: "Complete feature workflow",
        script: "Given the user is on the feature page\nWhen they interact with the feature\nThen the expected outcome occurs\nAnd the data is persisted"
      },
      {
        scenario: "Multi-user feature interaction",
        script: "Given multiple users are using the feature\nWhen one user makes changes\nThen other users see the updates in real-time"
      }
    ]
  };
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FlaskConical, ChevronRight, FileText, Beaker, TestTubeDiagonal, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TestCaseDisplay = ({ type, tests }) => {
  const typeInfo = {
    unit: { icon: FileText, color: "text-blue-600", title: "Unit Test" },
    integration: { icon: Beaker, color: "text-purple-600", title: "Integration Test" },
    e2e: { icon: TestTubeDiagonal, color: "text-green-600", title: "End-to-End Test" },
  };

  const { icon: Icon, color, title } = typeInfo[type];

  if (!tests || tests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 font-bold">
        No {type} tests generated for this feature.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tests.map((test, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border-4 border-black p-4 neo-card hover:shadow-[10px_10px_0px_#000] transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <Icon className={`w-6 h-6 ${color}`} />
            <h4 className="font-black text-gray-900 uppercase">{title}: {test.scenario || test.description}</h4>
          </div>
          
          {test.steps && (
            <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:font-bold">
              <p className="font-bold whitespace-pre-wrap">{test.steps}</p>
            </div>
          )}
          
          {test.code && (
            <div className="bg-gray-900 text-white font-mono text-sm p-4 mt-2 border-2 border-black overflow-x-auto">
              <div className="flex items-center gap-2 text-gray-400 border-b border-gray-700 pb-2 mb-2">
                <Code className="w-4 h-4" />
                <span>Test Snippet</span>
              </div>
              <code>
                <pre className="whitespace-pre-wrap">{test.code}</pre>
              </code>
            </div>
          )}

          {test.script && (
            <div className="bg-gray-800 text-white font-mono text-sm p-4 mt-2 border-2 border-black overflow-x-auto">
              <div className="flex items-center gap-2 text-gray-400 border-b border-gray-700 pb-2 mb-2">
                <TestTubeDiagonal className="w-4 h-4" />
                <span>Gherkin Script</span>
              </div>
              <code>
                <pre className="whitespace-pre-wrap">{test.script}</pre>
              </code>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function TestCenter() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [testCases, setTestCases] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await Project.list();
        setProjects(projectsData);
        if (projectsData.length > 0) {
          setSelectedProjectId(projectsData[0].id);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      const fetchFeatures = async () => {
        try {
          const featuresData = await Feature.filter({ project_id: selectedProjectId });
          console.log("Fetched features for project:", selectedProjectId, featuresData);
          setFeatures(featuresData);
          setSelectedFeature(null);
          setTestCases(null);
        } catch (error) {
          console.error("Error fetching features:", error);
          setFeatures([]);
        }
      };
      fetchFeatures();
    }
  }, [selectedProjectId]);

  const generateTests = async (feature) => {
    setSelectedFeature(feature);
    setTestCases(null);
    setIsLoading(true);
    
    const project = projects.find(p => p.id === selectedProjectId);
    
    try {
      const result = await InvokeLLM({
        prompt: `You are an expert QA engineer. For the following software feature, generate a comprehensive set of test cases.
        Feature Name: '${feature.name}'
        Feature Description: '${feature.description}'
        Project: '${project?.name}'
        Feature Priority: '${feature.priority}'
        Feature Status: '${feature.status}'

        Please provide the following:
        1. Unit Tests: Focus on testing individual functions or components in isolation. Provide code snippets in Jest/React Testing Library format.
        2. Integration Tests: Focus on testing the interaction between multiple components or services. Provide descriptive steps.
        3. End-to-End (E2E) Tests: Describe user scenarios from start to finish. Provide test scripts in a Gherkin-like (Given/When/Then) format.

        Please format your response as a JSON object.`,
        response_json_schema: {
          type: "object",
          properties: {
            unit_tests: {
              type: "array",
              items: {
                type: "object",
                properties: { description: { type: "string" }, code: { type: "string" } }
              }
            },
            integration_tests: {
              type: "array",
              items: {
                type: "object",
                properties: { scenario: { type: "string" }, steps: { type: "string" } }
              }
            },
            e2e_tests: {
              type: "array",
              items: {
                type: "object",
                properties: { scenario: { type: "string" }, script: { type: "string" } }
              }
            }
          }
        }
      });
      setTestCases(result);
    } catch (error) {
      console.error("Failed to generate test cases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2 flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-red-600" />
            AI TEST CENTER
          </h1>
          <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
            AUTOMATED TEST CASE GENERATION
          </p>
        </div>

        <Card className="neo-card bg-white border-4 border-black">
          <CardHeader className="border-b-4 border-black">
            <div className="flex items-center gap-4">
              <p className="font-black uppercase text-gray-900">Select Project:</p>
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger className="neo-input font-bold w-96 bg-white border-2 border-black">
                  <SelectValue placeholder="Choose a project" />
                </SelectTrigger>
                <SelectContent className="bg-white border-4 border-black z-50">
                  {projects.map(p => (
                    <SelectItem key={p.id} value={p.id} className="font-bold">
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-3">
              {/* Features List */}
              <div className="md:col-span-1 border-r-4 border-black h-full">
                <div className="p-4 border-b-2 border-gray-300 bg-gray-50">
                  <h3 className="font-black uppercase text-gray-900">
                    Features ({features.length})
                  </h3>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                  {features.length === 0 ? (
                    <div className="p-8 text-center">
                      <FlaskConical className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-bold">No features found for this project</p>
                    </div>
                  ) : (
                    features.map(feature => (
                      <button
                        key={feature.id}
                        onClick={() => generateTests(feature)}
                        className={`w-full text-left p-4 border-b-2 border-gray-200 hover:bg-blue-50 transition-all flex justify-between items-center ${
                          selectedFeature?.id === feature.id ? 'bg-blue-100' : ''
                        }`}
                      >
                        <div>
                          <p className="font-black text-gray-900">{feature.name}</p>
                          <p className="text-xs text-gray-500 font-bold mb-1">
                            {feature.priority?.toUpperCase() || 'MEDIUM'} PRIORITY
                          </p>
                          <p className="text-xs text-blue-600 font-bold">
                            {feature.status?.replace('_', ' ').toUpperCase() || 'PLANNING'}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400"/>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Test Cases Display */}
              <div className="md:col-span-2 p-6">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-center justify-center h-full text-center">
                      <Brain className="w-16 h-16 text-purple-500 animate-spin mb-4" />
                      <h3 className="text-xl font-black text-purple-800 uppercase">AI is writing tests...</h3>
                      <p className="text-gray-500 font-bold">This may take a moment.</p>
                    </motion.div>
                  ) : selectedFeature && testCases ? (
                    <motion.div key="tests" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                      <CardTitle className="mb-4 uppercase font-black">Tests for: {selectedFeature.name}</CardTitle>
                      <Tabs defaultValue="unit">
                        <TabsList className="grid w-full grid-cols-3 neo-input p-1 h-auto bg-gray-100 border-2 border-black">
                          <TabsTrigger value="unit" className="font-bold flex items-center gap-2">
                            <FileText className="w-4 h-4"/>Unit Tests ({testCases.unit_tests?.length || 0})
                          </TabsTrigger>
                          <TabsTrigger value="integration" className="font-bold flex items-center gap-2">
                            <Beaker className="w-4 h-4"/>Integration ({testCases.integration_tests?.length || 0})
                          </TabsTrigger>
                          <TabsTrigger value="e2e" className="font-bold flex items-center gap-2">
                            <TestTubeDiagonal className="w-4 h-4"/>E2E ({testCases.e2e_tests?.length || 0})
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="unit" className="mt-4">
                          <TestCaseDisplay type="unit" tests={testCases.unit_tests} />
                        </TabsContent>
                        <TabsContent value="integration" className="mt-4">
                          <TestCaseDisplay type="integration" tests={testCases.integration_tests} />
                        </TabsContent>
                        <TabsContent value="e2e" className="mt-4">
                           <TestCaseDisplay type="e2e" tests={testCases.e2e_tests} />
                        </TabsContent>
                      </Tabs>
                    </motion.div>
                  ) : (
                    <motion.div key="placeholder" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-center justify-center h-full text-center">
                      <FlaskConical className="w-24 h-24 text-gray-300 mb-6"/>
                      <h3 className="text-2xl font-black text-gray-500 uppercase">
                        {features.length > 0 ? 'Select a feature' : 'No features available'}
                      </h3>
                      <p className="text-gray-400 font-bold">
                        {features.length > 0 
                          ? 'Choose a feature from the left to generate test cases.' 
                          : 'Select a project with features to get started.'
                        }
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
