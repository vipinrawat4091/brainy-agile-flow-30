
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Code, 
  Palette, 
  Database,
  Brain,
  Star,
  Clock,
  User,
  Eye,
  ThumbsUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddKnowledgeModal from "@/components/knowledge/AddKnowledgeModal";
import { AskAIModal } from "@/components/ui/ask-ai-modal";

const SAMPLE_KNOWLEDGE = [
  {
    id: '1',
    title: 'React Hooks Best Practices',
    category: 'frontend',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    views: 234,
    likes: 45,
    tags: ['react', 'hooks', 'javascript'],
    content: '<h2>Essential React Hooks Guidelines</h2><p>When working with React hooks, always remember...</p>',
    snippet: 'Essential guidelines for using React hooks effectively in modern applications...'
  },
  {
    id: '2',
    title: 'API Design Patterns',
    category: 'backend',
    author: 'Mike Chen',
    date: '2024-01-12',
    views: 189,
    likes: 32,
    tags: ['api', 'backend', 'design-patterns'],
    content: '<h2>RESTful API Design</h2><p>Building scalable APIs requires...</p>',
    snippet: 'Comprehensive guide to designing maintainable and scalable REST APIs...'
  },
  {
    id: '3',
    title: 'UI/UX Design System',
    category: 'design',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    views: 156,
    likes: 28,
    tags: ['design-system', 'ui', 'ux'],
    content: '<h2>Building Consistent Design Systems</h2><p>A design system is...</p>',
    snippet: 'How to create and maintain a consistent design system across products...'
  },
  {
    id: '4',
    title: 'Database Optimization Techniques',
    category: 'backend',
    author: 'David Park',
    date: '2024-01-08',
    views: 203,
    likes: 38,
    tags: ['database', 'optimization', 'performance'],
    content: '<h2>Query Optimization</h2><p>Optimizing database queries is crucial...</p>',
    snippet: 'Advanced techniques for optimizing database performance and query efficiency...'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: BookOpen, color: 'bg-gray-500' },
  { id: 'frontend', name: 'Frontend', icon: Code, color: 'bg-blue-500' },
  { id: 'backend', name: 'Backend', icon: Database, color: 'bg-green-500' },
  { id: 'design', name: 'Design', icon: Palette, color: 'bg-purple-500' },
  { id: 'best-practices', name: 'Best Practices', icon: Star, color: 'bg-yellow-500' },
  { id: 'general', name: 'General', icon: Brain, color: 'bg-red-500' }
];

export default function KnowledgeBase() {
  const [knowledge, setKnowledge] = useState(SAMPLE_KNOWLEDGE);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredKnowledge = knowledge.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddKnowledge = () => {
    // Reload knowledge items
    console.log('Knowledge item added successfully');
    setShowAddModal(false);
  };

  const getCategoryIcon = (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.icon : BookOpen;
  };

  const getCategoryColor = (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              KNOWLEDGE BASE
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              TEAM LEARNING & DOCUMENTATION HUB
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                className="neo-input pl-10 font-bold w-64 border-4 border-black"
                placeholder="SEARCH KNOWLEDGE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
            >
              <Plus className="w-5 h-5 mr-2" />
              ADD KNOWLEDGE
            </Button>
          </div>
        </div>

        {/* AI Assistant Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-card bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 border-4 border-black"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brain className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-black uppercase">AI KNOWLEDGE ASSISTANT</h3>
                <p className="text-green-100 font-bold">
                  Smart search • Auto-categorization • Content suggestions
                </p>
              </div>
            </div>
            <AskAIModal
              trigger={
                <Button className="neo-button bg-white text-green-600 font-black uppercase border-4 border-green-800">
                  ASK AI
                </Button>
              }
              title="AI KNOWLEDGE ASSISTANT"
              placeholder="Ask about documentation, article suggestions, or knowledge organization..."
              context="knowledge"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="neo-card bg-white border-4 border-black">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-xl font-black uppercase">CATEGORIES</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2 p-4">
                  {CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    const count = category.id === 'all' 
                      ? knowledge.length 
                      : knowledge.filter(item => item.category === category.id).length;
                    
                    return (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 font-black uppercase text-sm transition-all border-2 ${
                          isSelected
                            ? `${category.color} text-white border-black shadow-[4px_4px_0px_#000]`
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:shadow-[4px_4px_0px_#000]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span>{category.name}</span>
                        </div>
                        <Badge className={`font-black ${isSelected ? 'bg-black text-white' : 'bg-gray-500 text-white'}`}>
                          {count}
                        </Badge>
                      </motion.button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Knowledge Articles */}
          <div className="lg:col-span-3">
            {!selectedArticle ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    {selectedCategory === 'all' ? 'ALL ARTICLES' : CATEGORIES.find(c => c.id === selectedCategory)?.name.toUpperCase()}
                  </h2>
                  <span className="text-gray-500 font-bold">
                    {filteredKnowledge.length} articles found
                  </span>
                </div>

                {filteredKnowledge.length === 0 ? (
                  <div className="text-center py-16">
                    <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-gray-500 uppercase mb-2">
                      {searchTerm ? 'NO MATCHING ARTICLES' : 'NO ARTICLES YET'}
                    </h3>
                    <p className="text-gray-400 font-bold mb-6">
                      {searchTerm ? 'Try a different search term' : 'Start building your knowledge base'}
                    </p>
                    {!searchTerm && (
                      <Button
                        onClick={() => setShowAddModal(true)}
                        className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        ADD FIRST ARTICLE
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredKnowledge.map((article, index) => {
                      const CategoryIcon = getCategoryIcon(article.category);
                      
                      return (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="neo-card bg-white cursor-pointer hover:shadow-[12px_12px_0px_#000] transition-all duration-200 border-4 border-black">
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 
                                      className="text-xl font-black text-gray-900 uppercase hover:text-blue-600 transition-colors cursor-pointer"
                                      onClick={() => setSelectedArticle(article)}
                                    >
                                      {article.title}
                                    </h3>
                                    <p className="text-gray-600 font-bold mt-2 line-clamp-2">
                                      {article.snippet}
                                    </p>
                                  </div>
                                  
                                  <Badge className={`${getCategoryColor(article.category)} text-white border-2 border-black font-black ml-4`}>
                                    <CategoryIcon className="w-3 h-3 mr-1" />
                                    {CATEGORIES.find(c => c.id === article.category)?.name.toUpperCase()}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <User className="w-4 h-4" />
                                      <span className="font-bold">{article.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      <span className="font-bold">{new Date(article.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Eye className="w-4 h-4" />
                                      <span className="font-bold">{article.views}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <ThumbsUp className="w-4 h-4" />
                                      <span className="font-bold">{article.likes}</span>
                                    </div>
                                  </div>
                                  
                                  <Button
                                    onClick={() => setSelectedArticle(article)}
                                    className="neo-button bg-blue-500 text-white font-black uppercase text-xs border-2 border-black"
                                    size="sm"
                                  >
                                    READ MORE
                                  </Button>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {article.tags.map(tag => (
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
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              // Article Detail View
              <Card className="neo-card bg-white border-4 border-black">
                <CardHeader className="border-b-4 border-black">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-black text-gray-900 uppercase">
                        {selectedArticle.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span className="font-bold">{selectedArticle.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-bold">{new Date(selectedArticle.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => setSelectedArticle(null)}
                      className="neo-button bg-gray-500 text-white font-black uppercase border-4 border-black"
                    >
                      BACK TO LIST
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  />
                  
                  <div className="mt-8 pt-6 border-t-4 border-black">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="font-bold border-2 border-gray-400"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Button className="neo-button bg-green-500 text-white font-black uppercase border-4 border-black">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          HELPFUL ({selectedArticle.likes})
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Add Knowledge Modal */}
        <AnimatePresence>
          {showAddModal && (
            <AddKnowledgeModal
              onClose={() => setShowAddModal(false)}
              onAdd={handleAddKnowledge}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
