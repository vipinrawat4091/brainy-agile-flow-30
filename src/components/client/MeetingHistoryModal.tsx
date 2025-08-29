
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  Users, 
  Eye, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  XCircle
} from "lucide-react";
import { mockMeetings, Meeting } from "@/utils/mockMeetings";

interface MeetingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

export default function MeetingHistoryModal({ isOpen, onClose, client }: MeetingHistoryModalProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const clientMeetings = mockMeetings.filter(meeting => meeting.client_id === client?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'scheduled':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'scheduled':
        return 'bg-orange-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neo-card max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b-4 border-black pb-4">
          <DialogTitle className="text-xl font-black uppercase flex items-center gap-3">
            {selectedMeeting ? (
              <>
                <Button
                  onClick={() => setSelectedMeeting(null)}
                  variant="outline"
                  size="sm"
                  className="neo-button bg-white font-black uppercase"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  BACK
                </Button>
                MEETING DETAILS
              </>
            ) : (
              <>
                <Calendar className="w-6 h-6 text-blue-600" />
                MEETING HISTORY - {client.full_name}
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {selectedMeeting ? (
          <div className="space-y-6 p-6">
            <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black text-gray-900 uppercase">
                  {selectedMeeting.title}
                </h3>
                <Badge className={`${getStatusColor(selectedMeeting.status)} text-white border-2 border-black font-black`}>
                  {selectedMeeting.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="font-bold text-gray-700">
                      {new Date(selectedMeeting.date).toLocaleDateString()} at {selectedMeeting.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="font-bold text-gray-700">
                      {selectedMeeting.duration} minutes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className="font-bold text-gray-700">
                      {selectedMeeting.attendees.length} attendees
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-black text-gray-900 uppercase mb-2">ATTENDEES</h4>
                  <div className="space-y-1">
                    {selectedMeeting.attendees.map((email, index) => (
                      <div key={index} className="text-sm font-bold text-gray-600">
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedMeeting.summary && (
              <div>
                <h4 className="font-black text-gray-900 uppercase mb-3">MEETING SUMMARY</h4>
                <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded">
                  <p className="font-bold text-gray-700 leading-relaxed">
                    {selectedMeeting.summary}
                  </p>
                </div>
              </div>
            )}

            {selectedMeeting.notes && (
              <div>
                <h4 className="font-black text-gray-900 uppercase mb-3">ADDITIONAL NOTES</h4>
                <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded">
                  <p className="font-bold text-gray-700 leading-relaxed">
                    {selectedMeeting.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 p-6">
            {clientMeetings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-500 uppercase mb-2">
                  NO MEETINGS YET
                </h3>
                <p className="text-gray-400 font-bold">
                  Schedule your first meeting with this client
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {clientMeetings.map((meeting) => (
                  <Card key={meeting.id} className="neo-card bg-white hover:shadow-[8px_8px_0px_#000] transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-black text-gray-900 uppercase">
                          {meeting.title}
                        </CardTitle>
                        <Badge className={`${getStatusColor(meeting.status)} text-white border-2 border-black font-black`}>
                          {meeting.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-gray-600">
                            {new Date(meeting.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-gray-600">
                            {meeting.time} ({meeting.duration}min)
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-gray-600">
                            {meeting.attendees.length} attendees
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          onClick={() => setSelectedMeeting(meeting)}
                          size="sm"
                          className="neo-button bg-blue-500 text-white font-black uppercase"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          VIEW DETAILS
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
