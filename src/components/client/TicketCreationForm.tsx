
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketCreationFormProps {
  onTicketCreated: (ticket: any) => void;
}

export default function TicketCreationForm({ onTicketCreated }: TicketCreationFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !priority || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newTicket = {
        id: `TICK-${Date.now().toString().slice(-3)}`,
        title,
        description,
        status: "open",
        priority,
        category,
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdate: new Date().toISOString().split('T')[0],
        assignedTo: "Support Team"
      };

      onTicketCreated(newTicket);
      
      // Reset form
      setTitle("");
      setDescription("");
      setPriority("");
      setCategory("");
      setIsSubmitting(false);

      toast({
        title: "Ticket Created Successfully!",
        description: `Your support ticket ${newTicket.id} has been created and assigned to our team.`,
      });
    }, 1000);
  };

  return (
    <Card className="neo-card bg-white">
      <CardHeader className="border-b-4 border-black">
        <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
          <Plus className="w-6 h-6 text-green-600" />
          CREATE SUPPORT TICKET
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-black text-gray-900 uppercase mb-2">
            TICKET TITLE *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief description of your issue"
            className="neo-card border-3 border-black font-bold"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-black text-gray-900 uppercase mb-2">
              PRIORITY *
            </label>
            <Select value={priority} onValueChange={setPriority} disabled={isSubmitting}>
              <SelectTrigger className="neo-card border-3 border-black font-bold">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">LOW - General inquiry</SelectItem>
                <SelectItem value="medium">MEDIUM - Feature request</SelectItem>
                <SelectItem value="high">HIGH - Bug or issue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-black text-gray-900 uppercase mb-2">
              CATEGORY *
            </label>
            <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
              <SelectTrigger className="neo-card border-3 border-black font-bold">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical">Technical Issue</SelectItem>
                <SelectItem value="Feature Request">Feature Request</SelectItem>
                <SelectItem value="General">General Question</SelectItem>
                <SelectItem value="Performance">Performance Issue</SelectItem>
                <SelectItem value="UI/UX">UI/UX Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-black text-gray-900 uppercase mb-2">
            DESCRIPTION *
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide detailed information about your issue or request. Include steps to reproduce if it's a bug."
            className="neo-card border-3 border-black font-bold"
            rows={5}
            disabled={isSubmitting}
          />
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full neo-button bg-green-500 hover:bg-green-600 text-white font-black uppercase"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              CREATING TICKET...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              CREATE TICKET
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
