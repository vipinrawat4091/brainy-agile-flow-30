
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Download, FileText, Image, Video, Music } from "lucide-react";

interface DocumentViewerProps {
  document: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    url?: string;
  } | null;
  onClose: () => void;
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  if (!document) return null;

  const handleDownload = () => {
    // Create a temporary link element for download
    const link = window.document.createElement('a');
    link.href = document.url || '#';
    link.download = document.name;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-6 h-6" />;
    if (type.includes('video')) return <Video className="w-6 h-6" />;
    if (type.includes('audio')) return <Music className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  const renderPreview = () => {
    if (document.type.includes('image')) {
      return (
        <img 
          src={document.url || '/placeholder.svg'} 
          alt={document.name}
          className="max-w-full max-h-96 object-contain border-4 border-black shadow-[4px_4px_0px_#000]"
        />
      );
    }
    
    if (document.type.includes('text') || document.type.includes('pdf')) {
      return (
        <div className="p-6 border-4 border-gray-300 bg-gray-50 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <p className="font-bold text-gray-700">Preview not available</p>
          <p className="text-sm text-gray-500">Click download to view the file</p>
        </div>
      );
    }

    return (
      <div className="p-6 border-4 border-gray-300 bg-gray-50 text-center">
        {getFileIcon(document.type)}
        <p className="font-bold text-gray-700 mt-4">Preview not available</p>
        <p className="text-sm text-gray-500">Click download to view the file</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="neo-card bg-white max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b-4 border-black flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
            {getFileIcon(document.type)}
            {document.name}
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={handleDownload}
              className="neo-button bg-blue-500 text-white font-black uppercase"
            >
              <Download className="w-4 h-4 mr-2" />
              DOWNLOAD
            </Button>
            <Button 
              onClick={onClose}
              className="neo-button bg-red-500 text-white font-black uppercase"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 overflow-auto max-h-[70vh]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold text-gray-700 uppercase">Type:</span>
                <span className="ml-2">{document.type}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 uppercase">Size:</span>
                <span className="ml-2">{document.size}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 uppercase">Uploaded:</span>
                <span className="ml-2">{document.uploadDate}</span>
              </div>
            </div>
            
            <div className="mt-6">
              {renderPreview()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
