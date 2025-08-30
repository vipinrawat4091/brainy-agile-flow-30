
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Upload,
  Folder,
  Image,
  Video,
  Music
} from "lucide-react";
import { DocumentViewer } from "@/components/client/DocumentViewer";
// Import document upload component  
import DocumentUpload from "@/components/client/DocumentUpload";

export default function ClientDocuments() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock documents data
  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Project Requirements.pdf",
      type: "application/pdf",
      size: "2.5 MB",
      uploadDate: "2024-12-15",
      category: "Requirements",
      url: "/placeholder.svg"
    },
    {
      id: "2", 
      name: "Design Mockups.zip",
      type: "application/zip",
      size: "15.2 MB",
      uploadDate: "2024-12-14",
      category: "Design",
      url: "/placeholder.svg"
    },
    {
      id: "3",
      name: "User Manual.docx",
      type: "application/msword",
      size: "1.8 MB", 
      uploadDate: "2024-12-13",
      category: "Documentation",
      url: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Logo Assets.png",
      type: "image/png",
      size: "0.5 MB",
      uploadDate: "2024-12-12",
      category: "Assets",
      url: "/placeholder.svg"
    }
  ]);

  const handleView = (doc) => {
    setSelectedDocument(doc);
  };

  const handleDownload = (doc) => {
    // Create download functionality
    const link = window.document.createElement('a');
    link.href = doc.url || '#';
    link.download = doc.name;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handleUpload = (files) => {
    // Handle file upload
    const newDocs = files.map((file, index) => ({
      id: `new_${Date.now()}_${index}`,
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      category: "Uploaded",
      url: URL.createObjectURL(file)
    }));
    
    setDocuments(prev => [...newDocs, ...prev]);
    setShowUpload(false);
  };

  const getFileIcon = (type) => {
    if (type.includes('image')) return <Image className="w-5 h-5 text-blue-600" />;
    if (type.includes('video')) return <Video className="w-5 h-5 text-purple-600" />;
    if (type.includes('audio')) return <Music className="w-5 h-5 text-green-600" />;
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Requirements": "bg-blue-500 text-white border-blue-600",
      "Design": "bg-purple-500 text-white border-purple-600", 
      "Documentation": "bg-green-500 text-white border-green-600",
      "Assets": "bg-orange-500 text-white border-orange-600",
      "Uploaded": "bg-yellow-500 text-white border-yellow-600"
    };
    return colors[category] || "bg-gray-500 text-white border-gray-600";
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doc.category.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <style>{`
        .neo-card {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }
        
        .neo-button {
          border: 4px solid #000000 !important;
          box-shadow: 6px 6px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }
        
        .neo-input {
          border: 3px solid #000000 !important;
          box-shadow: 4px 4px 0px #000000 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              PROJECT DOCUMENTS
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              MANAGE & ACCESS YOUR FILES
            </p>
          </div>
          <Button 
            onClick={() => setShowUpload(true)}
            className="neo-button bg-blue-500 text-white font-black uppercase"
          >
            <Upload className="w-4 h-4 mr-2" />
            UPLOAD DOCUMENT
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="neo-card bg-white">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="neo-input pl-10 font-bold"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="neo-input font-bold px-4 py-2"
              >
                <option value="all">ALL CATEGORIES</option>
                <option value="requirements">REQUIREMENTS</option>
                <option value="design">DESIGN</option>
                <option value="documentation">DOCUMENTATION</option>
                <option value="assets">ASSETS</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="neo-card bg-white hover:transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  {getFileIcon(doc.type)}
                  <span className="truncate">{doc.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={`font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] ${getCategoryColor(doc.category)}`}>
                    {doc.category.toUpperCase()}
                  </Badge>
                  <span className="text-sm font-bold text-gray-500">{doc.size}</span>
                </div>
                
                <div className="text-sm font-bold text-gray-600">
                  Uploaded: {doc.uploadDate}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleView(doc)}
                    className="neo-button bg-green-500 text-white font-black uppercase text-xs flex-1"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    VIEW
                  </Button>
                  <Button
                    onClick={() => handleDownload(doc)}
                    className="neo-button bg-blue-500 text-white font-black uppercase text-xs flex-1"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    DOWNLOAD
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card className="neo-card bg-white">
            <CardContent className="p-12 text-center">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-500 uppercase mb-2">
                NO DOCUMENTS FOUND
              </h3>
              <p className="text-gray-400 font-bold">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Upload your first document to get started"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer 
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}

      {/* Upload Modal */}
      <DocumentUpload 
        isOpen={showUpload}
        onUpload={handleUpload}
        onClose={() => setShowUpload(false)}
      />
    </div>
  );
}
