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
    if (type.includes('image')) return <Image className="w-4 h-4 text-blue-600" />;
    if (type.includes('video')) return <Video className="w-4 h-4 text-purple-600" />;
    if (type.includes('audio')) return <Music className="w-4 h-4 text-green-600" />;
    return <FileText className="w-4 h-4 text-gray-600" />;
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

  const filteredDocuments = [
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
  ].filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doc.category.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <style>{`
        .neo-card {
          border: 2px solid #000000 !important;
          box-shadow: 3px 3px 0px #000000 !important;
        }
        
        .neo-button {
          border: 2px solid #000000 !important;
          box-shadow: 2px 2px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-1px, -1px) !important;
          box-shadow: 3px 3px 0px #000000 !important;
        }
        
        .neo-input {
          border: 1px solid #000000 !important;
          box-shadow: 2px 2px 0px #000000 !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header - Compact */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight mb-1">
              PROJECT DOCUMENTS
            </h1>
            <p className="text-sm font-semibold text-gray-600 uppercase">
              MANAGE & ACCESS FILES
            </p>
          </div>
          <Button 
            onClick={() => setShowUpload(true)}
            className="neo-button bg-blue-500 text-white font-bold text-sm px-4 py-2"
          >
            <Upload className="w-4 h-4 mr-1" />
            UPLOAD
          </Button>
        </div>

        {/* Search and Filter - Compact */}
        <Card className="neo-card bg-white">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="neo-input pl-9 font-medium text-sm"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="neo-input font-medium px-3 py-2 text-sm"
              >
                <option value="all">ALL</option>
                <option value="requirements">REQUIREMENTS</option>
                <option value="design">DESIGN</option>
                <option value="documentation">DOCS</option>
                <option value="assets">ASSETS</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid - Compact */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="neo-card bg-white hover:transform hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
              <CardHeader className="border-b border-black pb-2">
                <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                  {getFileIcon(doc.type)}
                  <span className="truncate">{doc.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={`font-bold text-xs border border-black shadow-[1px_1px_0px_#000] ${getCategoryColor(doc.category)}`}>
                    {doc.category.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-medium text-gray-500">{doc.size}</span>
                </div>
                
                <div className="text-xs font-medium text-gray-600">
                  {doc.uploadDate}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleView(doc)}
                    className="neo-button bg-green-500 text-white font-bold text-xs flex-1 py-1"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    VIEW
                  </Button>
                  <Button
                    onClick={() => handleDownload(doc)}
                    className="neo-button bg-blue-500 text-white font-bold text-xs flex-1 py-1"
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
            <CardContent className="p-8 text-center">
              <Folder className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-black text-gray-500 uppercase mb-2">
                NO DOCUMENTS FOUND
              </h3>
              <p className="text-gray-400 font-medium text-sm">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter"
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
