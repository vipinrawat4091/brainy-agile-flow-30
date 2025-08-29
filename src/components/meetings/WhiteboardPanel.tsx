import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Paintbrush, 
  Square, 
  Circle, 
  Type, 
  Eraser, 
  Trash2,
  Download,
  Undo,
  Redo,
  Move
} from 'lucide-react';

interface WhiteboardPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

type Tool = 'pen' | 'rectangle' | 'circle' | 'text' | 'eraser' | 'move';

export default function WhiteboardPanel({ isVisible, onClose }: WhiteboardPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isVisible && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Set initial styles
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
      }
    }
  }, [isVisible, strokeColor, strokeWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPoint({ x, y });
    
    const ctx = canvas.getContext('2d');
    if (ctx && currentTool === 'pen') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    
    if (currentTool === 'pen') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, strokeWidth * 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (currentTool === 'rectangle') {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
    } else if (currentTool === 'circle') {
      const radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2));
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const tools = [
    { name: 'pen', icon: Paintbrush, label: 'Pen' },
    { name: 'rectangle', icon: Square, label: 'Rectangle' },
    { name: 'circle', icon: Circle, label: 'Circle' },
    { name: 'text', icon: Type, label: 'Text' },
    { name: 'eraser', icon: Eraser, label: 'Eraser' },
    { name: 'move', icon: Move, label: 'Move' }
  ];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-4 z-50">
      <Card className="h-full flex flex-col neo-card bg-white">
        <CardHeader className="border-b-4 border-black">
          <div className="flex items-center justify-between">
            <CardTitle className="font-black text-gray-900 uppercase">
              Collaborative Whiteboard
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Tools */}
            <div className="flex items-center gap-1">
              {tools.map((tool) => (
                <Button
                  key={tool.name}
                  variant={currentTool === tool.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTool(tool.name as Tool)}
                  className="neo-button"
                >
                  <tool.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>

            {/* Colors */}
            <div className="flex items-center gap-1">
              {colors.map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  size="sm"
                  onClick={() => setStrokeColor(color)}
                  className={`w-8 h-8 p-0 border-2 ${strokeColor === color ? 'border-gray-800' : 'border-gray-300'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Stroke Width */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Size:</label>
              <input
                type="range"
                min="1"
                max="20"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm w-6">{strokeWidth}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto">
              <Button variant="outline" size="sm" className="neo-button">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="neo-button">
                <Redo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={clearCanvas} className="neo-button">
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCanvas} className="neo-button">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair bg-white"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          
          {/* Active Users Indicator */}
          <div className="absolute top-4 right-4">
            <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm">
              👥 3 users active
            </div>
          </div>
          
          {/* Current Tool Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {tools.find(t => t.name === currentTool)?.icon && (
                <div className="w-4 h-4">
                  {React.createElement(tools.find(t => t.name === currentTool)!.icon, { className: "w-4 h-4" })}
                </div>
              )}
              {tools.find(t => t.name === currentTool)?.label}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}