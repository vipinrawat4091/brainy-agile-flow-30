
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
import { Calendar, Clock, Users, Save, X } from "lucide-react";
import { mockTeamMembers } from "@/utils/mockMeetings";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
  onSchedule: (meetingData: any) => void;
}

export default function ScheduleMeetingModal({ isOpen, onClose, client, onSchedule }: ScheduleMeetingModalProps) {
  const [meetingData, setMeetingData] = useState({
    title: "",
    date: "",
    time: "",
    duration: 60,
    attendees: [client?.email || ""]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeetingData(prev => ({ 
      ...prev, 
      [name]: name === 'duration' ? parseInt(value) || 0 : value 
    }));
  };

  const handleAttendeeToggle = (email: string, checked: boolean) => {
    setMeetingData(prev => ({
      ...prev,
      attendees: checked
        ? [...prev.attendees, email]
        : prev.attendees.filter(a => a !== email)
    }));
  };

  const handleSchedule = () => {
    if (!meetingData.title || !meetingData.date || !meetingData.time) {
      return;
    }

    const newMeeting = {
      id: `meeting_${Date.now()}`,
      ...meetingData,
      client_id: client.id,
      client_name: client.full_name,
      scheduled_by: "Manager",
      status: "scheduled" as const,
      created_date: new Date().toISOString().split('T')[0]
    };

    onSchedule(newMeeting);
    setMeetingData({
      title: "",
      date: "",
      time: "",
      duration: 60,
      attendees: [client?.email || ""]
    });
    onClose();
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neo-card max-w-2xl">
        <DialogHeader className="border-b-4 border-black pb-4">
          <DialogTitle className="text-xl font-black uppercase flex items-center gap-3">
            <Calendar className="w-6 h-6 text-purple-600" />
            SCHEDULE MEETING
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-black text-blue-900 uppercase">CLIENT</span>
            </div>
            <p className="font-bold text-blue-800">{client.full_name} ({client.email})</p>
            <p className="text-sm font-bold text-blue-600">{client.company}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label className="text-sm font-black text-gray-900 uppercase">MEETING TITLE</Label>
              <Input
                name="title"
                value={meetingData.title}
                onChange={handleInputChange}
                className="neo-input mt-1 font-bold"
                placeholder="Sprint Review Meeting"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">DATE</Label>
              <Input
                name="date"
                type="date"
                value={meetingData.date}
                onChange={handleInputChange}
                className="neo-input mt-1 font-bold"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">TIME</Label>
              <Input
                name="time"
                type="time"
                value={meetingData.time}
                onChange={handleInputChange}
                className="neo-input mt-1 font-bold"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-black text-gray-900 uppercase">DURATION (MINUTES)</Label>
              <Input
                name="duration"
                type="number"
                value={meetingData.duration}
                onChange={handleInputChange}
                className="neo-input mt-1 font-bold"
                min="15"
                step="15"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-black text-gray-900 uppercase mb-4 block">
              TEAM ATTENDEES
            </Label>
            <div className="grid md:grid-cols-2 gap-3">
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`attendee-${member.id}`}
                    checked={meetingData.attendees.includes(member.email)}
                    onCheckedChange={(checked) => handleAttendeeToggle(member.email, !!checked)}
                  />
                  <label
                    htmlFor={`attendee-${member.id}`}
                    className="text-sm font-bold text-gray-700 cursor-pointer"
                  >
                    {member.name}
                    <span className="block text-xs text-gray-500">{member.role}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSchedule}
              className="neo-button bg-purple-500 text-white font-black uppercase"
            >
              <Calendar className="w-5 h-5 mr-2" />
              SCHEDULE MEETING
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
