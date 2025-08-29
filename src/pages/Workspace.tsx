
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Search, 
  Edit,
  Calendar,
  Users,
  Brain,
  Bookmark,
  Clock,
  MessageSquare,
  Image,
  Video
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AskAIModal } from "@/components/ui/ask-ai-modal";

const DOCUMENT_TEMPLATES = [
  {
    id: 'meeting-notes',
    title: 'Meeting Notes',
    icon: MessageSquare,
    color: 'bg-blue-500',
    description: 'Document team meetings and decisions'
  },
  {
    id: 'technical-spec',
    title: 'Technical Specification',
    icon: FileText,
    color: 'bg-purple-500',
    description: 'Detailed technical documentation'
  },
  {
    id: 'user-story',
    title: 'User Stories',
    icon: Users,
    color: 'bg-green-500',
    description: 'Feature requirements and acceptance criteria'
  },
  {
    id: 'retrospective',
    title: 'Sprint Retrospective',
    icon: Clock,
    color: 'bg-orange-500',
    description: 'Sprint review and team feedback'
  },
  {
    id: 'architecture',
    title: 'Architecture Document',
    icon: Brain,
    color: 'bg-red-500',
    description: 'System design and architecture decisions'
  },
  {
    id: 'blank',
    title: 'Blank Document',
    icon: Edit,
    color: 'bg-gray-500',
    description: 'Start with a blank document'
  }
];

const SAMPLE_DOCUMENTS = [
  {
    id: '1',
    title: 'Project Vision & Strategy',
    type: 'strategic',
    lastModified: '2024-01-15',
    author: 'Project Owner',
    tags: ['vision', 'strategy', 'roadmap'],
    content: '<h2>Project Vision Statement</h2><p>Building the next-generation AI-powered project management platform...</p>'
  },
  {
    id: '2', 
    title: 'Sprint 1 Retrospective',
    type: 'retrospective',
    lastModified: '2024-01-14',
    author: 'Scrum Master',
    tags: ['retrospective', 'sprint1', 'improvements'],
    content: '<h2>What Went Well</h2><p>Team collaboration was excellent...</p>'
  },
  {
    id: '3',
    title: 'API Architecture Decisions',
    type: 'technical',
    lastModified: '2024-01-12',
    author: 'Tech Lead',
    tags: ['architecture', 'api', 'backend'],
    content: '<h2>API Design Principles</h2><p>RESTful architecture with GraphQL integration...</p>'
  }
];

export default function Workspace() {
  const [documents, setDocuments] = useState(SAMPLE_DOCUMENTS);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const createDocument = (template) => {
    const newDoc = {
      id: Date.now().toString(),
      title: `New ${template.title}`,
      type: template.id,
      lastModified: new Date().toISOString().split('T')[0],
      author: 'Current User',
      tags: [template.id.replace('-', '')],
      content: getTemplateContent(template.id)
    };
    
    setDocuments(prev => [newDoc, ...prev]);
    setSelectedDoc(newDoc);
    setEditorContent(newDoc.content);
    setIsEditing(true);
    setShowTemplates(false);
  };

  const getTemplateContent = (templateId) => {
    const templates = {
      'meeting-notes': '<h2>Meeting Notes</h2><p><strong>Date:</strong> ' + new Date().toLocaleDateString() + '</p><p><strong>Attendees:</strong></p><ul><li></li></ul><h3>Agenda</h3><ol><li></li></ol><h3>Action Items</h3><ul><li></li></ul>',
      'technical-spec': '<h1>Technical Specification</h1><h2>Overview</h2><p></p><h2>Requirements</h2><p></p><h2>Architecture</h2><p></p><h2>Implementation Details</h2><p></p>',
      'user-story': '<h1>User Story</h1><p><strong>As a</strong> [user type]</p><p><strong>I want</strong> [functionality]</p><p><strong>So that</strong> [benefit]</p><h2>Acceptance Criteria</h2><ul><li></li></ul>',
      'retrospective': '<h1>Sprint Retrospective</h1><h2>What Went Well</h2><ul><li></li></ul><h2>What Could Be Improved</h2><ul><li></li></ul><h2>Action Items</h2><ul><li></li></ul>',
      'architecture': '<h1>Architecture Document</h1><h2>System Overview</h2><p></p><h2>Components</h2><p></p><h2>Data Flow</h2><p></p><h2>Security Considerations</h2><p></p>',
      'blank': '<h1>New Document</h1><p></p>'
    };
    return templates[templateId] || templates['blank'];
  };

  const saveDocument = () => {
    if (selectedDoc) {
      setDocuments(prev =>
        prev.map(doc =>
          doc.id === selectedDoc.id
            ? { ...doc, content: editorContent, lastModified: new Date().toISOString().split('T')[0] }
            : doc
        )
      );
      setIsEditing(false);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      strategic: 'bg-purple-500',
      retrospective: 'bg-orange-500', 
      technical: 'bg-blue-500',
      'meeting-notes': 'bg-green-500',
      'user-story': 'bg-pink-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              AI WORKSPACE
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              COLLABORATIVE DOCUMENTATION HUB
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                className="neo-input pl-10 font-bold w-64 border-4 border-black"
                placeholder="SEARCH DOCUMENTS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowTemplates(true)}
              className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
            >
              <Plus className="w-5 h-5 mr-2" />
              NEW DOCUMENT
            </Button>
          </div>
        </div>

        {/* AI Assistant Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-card bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 border-4 border-black"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brain className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-black uppercase">AI DOCUMENTATION ASSISTANT</h3>
                <p className="text-purple-100 font-bold">
                  Auto-generating meeting notes • Smart templates • Collaborative editing
                </p>
              </div>
            </div>
            <AskAIModal
              trigger={
                <Button className="neo-button bg-white text-purple-600 font-black uppercase border-4 border-purple-800">
                  ASK AI
                </Button>
              }
              title="AI DOCUMENTATION ASSISTANT"
              placeholder="Ask about document templates, collaborative editing, or content suggestions..."
              context="workspace"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Document List */}
          <div className="lg:col-span-1">
            <Card className="neo-card bg-white border-4 border-black">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  DOCUMENTS ({filteredDocuments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {filteredDocuments.length === 0 ? (
                    <div className="p-8 text-center">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-black text-gray-500 uppercase mb-2">
                        {searchTerm ? 'NO MATCHING DOCUMENTS' : 'NO DOCUMENTS YET'}
                      </h3>
                      <p className="text-gray-400 font-bold mb-4">
                        {searchTerm ? 'Try a different search term' : 'Create your first document'}
                      </p>
                      {!searchTerm && (
                        <Button
                          onClick={() => setShowTemplates(true)}
                          className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
                        >
                          CREATE DOCUMENT
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="divide-y-2 divide-gray-200">
                      {filteredDocuments.map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => {
                            setSelectedDoc(doc);
                            setEditorContent(doc.content);
                            setIsEditing(false);
                          }}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedDoc?.id === doc.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="font-black text-gray-900 uppercase text-sm leading-tight">
                                {doc.title}
                              </h3>
                              <Badge className={`${getTypeColor(doc.type)} text-white border-2 border-black font-black text-xs`}>
                                {doc.type.replace('-', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span className="font-bold">{new Date(doc.lastModified).toLocaleDateString()}</span>
                              <span className="mx-1">•</span>
                              <Users className="w-3 h-3" />
                              <span className="font-bold">{doc.author}</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {doc.tags.slice(0, 3).map(tag => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs font-bold border-2 border-gray-400"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Editor */}
          <div className="lg:col-span-2">
            {!selectedDoc ? (
              <Card className="neo-card bg-white h-96 border-4 border-black">
                <CardContent className="p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">
                      SELECT A DOCUMENT
                    </h2>
                    <p className="text-gray-400 font-bold mb-6">
                      Choose a document from the list to start editing
                    </p>
                    <Button
                      onClick={() => setShowTemplates(true)}
                      className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      CREATE NEW DOCUMENT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="neo-card bg-white border-4 border-black">
                <CardHeader className="border-b-4 border-black">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-black text-gray-900 uppercase">
                        {selectedDoc.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge className={`${getTypeColor(selectedDoc.type)} text-white border-2 border-black font-black`}>
                          {selectedDoc.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-sm font-bold text-gray-500">
                          Last modified: {new Date(selectedDoc.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                            className="neo-button font-black uppercase border-4 border-black"
                          >
                            CANCEL
                          </Button>
                          <Button
                            onClick={saveDocument}
                            className="neo-button bg-green-500 text-white font-black uppercase border-4 border-black"
                          >
                            SAVE
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          EDIT
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {isEditing ? (
                    <div className="p-6">
                      <Textarea
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        className="min-h-80 border-4 border-black font-mono"
                        placeholder="Start typing your document content..."
                      />
                    </div>
                  ) : (
                    <div 
                      className="p-6 prose prose-lg max-w-none h-96 overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: selectedDoc.content }}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Document Templates Modal */}
        <AnimatePresence>
          {showTemplates && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowTemplates(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white neo-card p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border-4 border-black"
              >
                <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    CHOOSE DOCUMENT TEMPLATE
                  </h2>
                  <Button
                    onClick={() => setShowTemplates(false)}
                    variant="outline"
                    className="neo-button font-black uppercase border-4 border-black"
                  >
                    CANCEL
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DOCUMENT_TEMPLATES.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => createDocument(template)}
                      className="neo-card bg-white cursor-pointer hover:shadow-[12px_12px_0px_#000] transition-all duration-200 border-4 border-black"
                    >
                      <div className="p-6 text-center space-y-4">
                        <div className={`w-16 h-16 ${template.color} border-4 border-black mx-auto flex items-center justify-center`}>
                          <template.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 uppercase text-lg">
                            {template.title}
                          </h3>
                          <p className="text-gray-600 font-bold text-sm mt-2">
                            {template.description}
                          </p>
                        </div>
                        <Button className="neo-button bg-gray-900 text-white font-black uppercase w-full border-4 border-black">
                          CREATE
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
