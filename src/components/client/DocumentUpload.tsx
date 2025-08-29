
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, FileText } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: any) => void;
}

// Document upload component
export default function DocumentUpload({ isOpen, onClose, onUpload }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !category) {
      toast.error("Please select a file and category");
      return;
    }

    // Mock upload functionality
    const newDocument = {
      id: Date.now(),
      name: selectedFile.name,
      type: selectedFile.name.split('.').pop()?.toUpperCase() || 'FILE',
      size: (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploadedBy: "Client",
      uploadDate: new Date().toISOString().split('T')[0],
      category: category,
      status: "uploaded"
    };

    onUpload(newDocument);
    toast.success("Document uploaded successfully!");
    
    // Reset form
    setSelectedFile(null);
    setCategory("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neo-card bg-white max-w-md">
        <DialogHeader className="border-b-4 border-black pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-black uppercase text-gray-900">
              Upload Document
            </DialogTitle>
            <Button
              onClick={onClose}
              size="sm"
              className="neo-button bg-gray-500 hover:bg-gray-600 text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label className="text-sm font-black uppercase text-gray-900">
              Select File
            </Label>
            <div className="neo-card bg-gray-50 p-4">
              <Input
                type="file"
                onChange={handleFileSelect}
                className="neo-input bg-white font-bold"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.png,.jpg,.jpeg"
              />
              {selectedFile && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-white neo-card">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-gray-700">{selectedFile.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-black uppercase text-gray-900">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="neo-input bg-white font-bold">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="neo-card bg-white">
                <SelectItem value="Requirements" className="font-bold">Requirements</SelectItem>
                <SelectItem value="Design" className="font-bold">Design</SelectItem>
                <SelectItem value="Technical" className="font-bold">Technical</SelectItem>
                <SelectItem value="Testing" className="font-bold">Testing</SelectItem>
                <SelectItem value="Planning" className="font-bold">Planning</SelectItem>
                <SelectItem value="Security" className="font-bold">Security</SelectItem>
                <SelectItem value="Other" className="font-bold">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-black uppercase text-gray-900">
              Description (Optional)
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the document"
              className="neo-input bg-white font-bold"
            />
          </div>

          <Button
            onClick={handleUpload}
            className="w-full neo-button bg-blue-500 hover:bg-blue-600 text-white font-black uppercase"
            disabled={!selectedFile || !category}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
