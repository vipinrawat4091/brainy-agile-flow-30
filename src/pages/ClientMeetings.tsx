
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Users, 
  Eye, 
  CheckCircle2,
  AlertCircle,
  XCircle,
  Video
} from "lucide-react";
import { motion } from "framer-motion";
import { mockMeetings, Meeting } from "@/utils/mockMeetings";
import MeetingHistoryModal from "@/components/client/MeetingHistoryModal";

export default function ClientMeetings() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showMeetingDetails, setShowMeetingDetails] = useState(false);

  // Get current client from localStorage (mock data)
  const currentClient = {
    id: "1",
    full_name: "John Smith",
    email: "john@ecommerce.com",
    company: "E-Commerce Corp"
  };

  const clientMeetings = mockMeetings.filter(meeting => meeting.client_id === currentClient.id);
  const upcomingMeetings = clientMeetings.filter(meeting => meeting.status === 'scheduled');
  const pastMeetings = clientMeetings.filter(meeting => meeting.status === 'completed');

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

  const handleViewMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowMeetingDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            MY MEETINGS
          </h1>
          <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
            SCHEDULED & ATTENDED MEETINGS
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="neo-card bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
              <CardTitle className="text-sm font-black uppercase text-gray-900">UPCOMING</CardTitle>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-black text-orange-600">{upcomingMeetings.length}</div>
              <p className="text-sm font-bold text-gray-600 mt-1">SCHEDULED MEETINGS</p>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
              <CardTitle className="text-sm font-black uppercase text-gray-900">COMPLETED</CardTitle>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-black text-green-600">{pastMeetings.length}</div>
              <p className="text-sm font-bold text-gray-600 mt-1">PAST MEETINGS</p>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
              <CardTitle className="text-sm font-black uppercase text-gray-900">TOTAL TIME</CardTitle>
              <Clock className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-black text-blue-600">
                {pastMeetings.reduce((total, meeting) => total + meeting.duration, 0)}
              </div>
              <p className="text-sm font-bold text-gray-600 mt-1">MINUTES ATTENDED</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Meetings */}
        {upcomingMeetings.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-6">
              UPCOMING MEETINGS
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingMeetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="neo-card bg-white hover:shadow-[12px_12px_0px_#000] transition-all duration-200">
                    <CardHeader className="border-b-2 border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-black text-gray-900 uppercase">
                          {meeting.title}
                        </CardTitle>
                        <Badge className={`${getStatusColor(meeting.status)} text-white border-2 border-black font-black`}>
                          {meeting.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-gray-600">
                            {new Date(meeting.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-gray-600">
                            {meeting.time} ({meeting.duration} min)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-gray-600">
                            {meeting.attendees.length} attendees
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          className="flex-1 neo-button bg-green-500 text-white font-black uppercase"
                        >
                          <Video className="w-4 h-4 mr-1" />
                          JOIN
                        </Button>
                        <Button
                          onClick={() => handleViewMeeting(meeting)}
                          variant="outline"
                          className="neo-button bg-blue-50 text-blue-700 font-bold uppercase"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Past Meetings */}
        {pastMeetings.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-6">
              PAST MEETINGS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastMeetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="neo-card bg-white hover:shadow-[8px_8px_0px_#000] transition-all duration-200">
                    <CardHeader className="border-b-2 border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-black text-gray-900 uppercase">
                          {meeting.title}
                        </CardTitle>
                        <Badge className={`${getStatusColor(meeting.status)} text-white border-2 border-black font-black`}>
                          {meeting.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-gray-600">
                            {new Date(meeting.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-bold text-gray-600">
                            {meeting.time} ({meeting.duration} min)
                          </span>
                        </div>
                      </div>

                      {meeting.summary && (
                        <div className="bg-gray-50 p-3 rounded border-2 border-gray-200">
                          <p className="text-xs font-bold text-gray-600 line-clamp-2">
                            {meeting.summary}
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={() => handleViewMeeting(meeting)}
                        variant="outline"
                        className="w-full neo-button bg-blue-50 text-blue-700 font-bold uppercase"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        VIEW SUMMARY
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {clientMeetings.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">
              NO MEETINGS YET
            </h2>
            <p className="text-gray-400 font-bold">
              Your scheduled meetings will appear here
            </p>
          </div>
        )}
      </div>

      <MeetingHistoryModal
        isOpen={showMeetingDetails}
        onClose={() => {
          setShowMeetingDetails(false);
          setSelectedMeeting(null);
        }}
        client={currentClient}
      />
    </div>
  );
}
