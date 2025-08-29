
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface AddKnowledgeModalProps {
  onClose: () => void;
  onAdd: () => void;
}

export default function AddKnowledgeModal({ onClose, onAdd }: AddKnowledgeModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced Quill modules with code block support but without syntax highlighting
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'blockquote', 'code-block', 'link', 'image', 'align'
  ];

  const handleSubmit = async () => {
    if (!title || !category || !content) return;
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      const newKnowledge = {
        title,
        category,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        author_email: userData.user_email || userData.email || 'unknown@example.com',
        author_name: userData.full_name || userData.name || 'Unknown User'
      };
      
      // Mock implementation - in real app would use KnowledgeItem.create
      console.log('Creating knowledge item:', newKnowledge);
      
      onAdd();
      onClose();
    } catch (error) {
      console.error("Failed to add knowledge item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-white neo-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-4 border-4 border-black">
        <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3">
          <BookOpen /> ADD KNOWLEDGE
        </h2>
        
        <Input 
          placeholder="Knowledge Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="neo-input font-bold border-4 border-black" 
        />
        
        <Select onValueChange={setCategory}>
          <SelectTrigger className="neo-input font-bold border-4 border-black">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frontend">Frontend Development</SelectItem>
            <SelectItem value="backend">Backend Development</SelectItem>
            <SelectItem value="design">UI/UX Design</SelectItem>
            <SelectItem value="best-practices">Best Practices</SelectItem>
            <SelectItem value="general">General Knowledge</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="space-y-2">
          <p className="text-sm font-black text-gray-700 uppercase">Content (with code block support)</p>
          <div className="h-80 mb-16">
            <ReactQuill 
              theme="snow" 
              value={content} 
              onChange={setContent} 
              style={{ height: '280px' }}
              modules={modules}
              formats={formats}
              placeholder="Write your knowledge article here. Use the code block button in the toolbar to add code snippets..."
            />
          </div>
        </div>
        
        <Input 
          placeholder="Tags (comma-separated, e.g., react, javascript, api)" 
          value={tags} 
          onChange={e => setTags(e.target.value)} 
          className="neo-input font-bold border-4 border-black" 
        />
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="neo-button font-black uppercase border-4 border-black">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !title || !category || !content} 
            className="neo-button bg-blue-500 text-white font-black uppercase border-4 border-black"
          >
            <Plus className="mr-2"/>
            {isLoading ? 'ADDING...' : 'ADD KNOWLEDGE'}
          </Button>
        </div>
      </div>
    </div>
  );
}
