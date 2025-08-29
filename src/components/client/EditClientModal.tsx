
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Save, X } from "lucide-react";

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
  projects: any[];
  onSave: (updatedClient: any) => void;
}

export default function EditClientModal({ isOpen, onClose, client, projects, onSave }: EditClientModalProps) {
  const [formData, setFormData] = useState({
    full_name: client?.full_name || "",
    email: client?.email || "",
    username: client?.username || "",
    company: client?.company || "",
    assigned_projects: client?.assigned_projects || []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectAssignment = (projectId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      assigned_projects: checked
        ? [...prev.assigned_projects, projectId]
        : prev.assigned_projects.filter(id => id !== projectId)
    }));
  };

  const handleSave = () => {
    const updatedClient = { ...client, ...formData };
    onSave(updatedClient);
    onClose();
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neo-card max-w-2xl">
        <DialogHeader className="border-b-4 border-black pb-4">
          <DialogTitle className="text-xl font-black uppercase flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-blue-600" />
            EDIT CLIENT
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">FULL NAME</Label>
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="neo-input mt-1 font-bold"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">COMPANY</Label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="neo-input mt-1 font-bold"
              />
            </div>
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">EMAIL</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="neo-input mt-1 font-bold"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">USERNAME</Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="neo-input mt-1 font-bold"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-black text-gray-900 uppercase mb-4 block">
              ASSIGNED PROJECTS
            </Label>
            <div className="grid md:grid-cols-2 gap-3">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-project-${project.id}`}
                    checked={formData.assigned_projects.includes(project.id)}
                    onCheckedChange={(checked) => handleProjectAssignment(project.id, !!checked)}
                  />
                  <label
                    htmlFor={`edit-project-${project.id}`}
                    className="text-sm font-bold text-gray-700 cursor-pointer"
                  >
                    {project.name}
                    <Badge 
                      className={`ml-2 text-xs ${
                        project.status === 'active' ? 'bg-green-500' : 
                        project.status === 'completed' ? 'bg-blue-500' : 'bg-orange-500'
                      } text-white border-2 border-black`}
                    >
                      {project.status.toUpperCase()}
                    </Badge>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSave}
              className="neo-button bg-green-500 text-white font-black uppercase"
            >
              <Save className="w-5 h-5 mr-2" />
              SAVE CHANGES
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="neo-button bg-white text-gray-900 font-black uppercase"
            >
              <X className="w-5 h-5 mr-2" />
              CANCEL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
