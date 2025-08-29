import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Plus,
  Eye,
  PlayCircle,
  FileText,
  Search,
  UserCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockClients } from "@/utils/mockClients";
import { mockMeetings } from "@/utils/mockMeetings";
import ScheduleMeetingModal from "@/components/client/ScheduleMeetingModal";
import MeetingHistoryModal from "@/components/client/MeetingHistoryModal";
import { useNavigate } from "react-router-dom";

interface TeamMeetingDashboardProps {
  userType?: 'manager' | 'team_member' | 'client';
}

export default function TeamMeetingDashboard({ userType = 'manager' }: TeamMeetingDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const navigate = useNavigate();

  // Get user type from localStorage if not provided
  const currentUserType = userType || localStorage.getItem('user_type') || 'manager';

  const filteredClients = mockClients.filter(client =>
    client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScheduleMeeting = (client: any) => {
    setSelectedClient(client);
    setShowScheduleModal(true);
  };

  const handleViewHistory = (client: any) => {
    setSelectedClient(client);
    setShowHistoryModal(true);
  };

  const handleJoinMeeting = (client: any) => {
    navigate(`/meeting-interface?client=${client.id}&meeting=live`);
  };

  const getClientMeetings = (clientId: string) => {
    return mockMeetings.filter(meeting => meeting.client_id === clientId);
  };

  const getNextMeeting = (clientId: string) => {
    const meetings = getClientMeetings(clientId);
    const upcomingMeetings = meetings
      .filter(meeting => meeting.status === 'scheduled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return upcomingMeetings[0];
  };

  // For team members, only show clients they are assigned to (mock logic)
  const getAccessibleClients = () => {
    if (currentUserType === 'team_member') {
      // Mock: team members can only see clients for projects they're assigned to
      return filteredClients.filter(client => 
        client.project_status === 'active' || client.id === '1' || client.id === '2'
      );
    }
    return filteredClients;
  };

  const accessibleClients = getAccessibleClients();

  const getPageTitle = () => {
    switch (currentUserType) {
      case 'team_member':
        return 'TEAM MEETINGS';
      case 'client':
        return 'MY MEETINGS';
      default:
        return 'MEETING CENTER';
    }
  };

  const getPageSubtitle = () => {
    switch (currentUserType) {
      case 'team_member':
        return 'Join Client Meetings';
      case 'client':
        return 'Schedule & Join Meetings';
      default:
        return 'Connect with Your Clients';
    }
  };

  const canScheduleMeetings = currentUserType === 'manager' || currentUserType === 'client';

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 neo-card flex items-center justify-center ${
              currentUserType === 'client' 
                ? 'bg-gradient-to-br from-green-500 to-blue-600'
                : currentUserType === 'team_member'
                ? 'bg-gradient-to-br from-orange-500 to-red-600'
                : 'bg-gradient-to-br from-purple-500 to-blue-600'
            }`}>
              {currentUserType === 'team_member' ? (
                <UserCheck className="w-8 h-8 text-white" />
              ) : (
                <Video className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 uppercase">
                {getPageTitle()}
              </h1>
              <p className="text-lg font-bold text-gray-600 uppercase">
                {getPageSubtitle()}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder={currentUserType === 'client' ? "Search meetings..." : "Search clients..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neo-input pl-10 font-bold"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="neo-card bg-gradient-to-br from-green-100 to-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-gray-600 uppercase">
                    {currentUserType === 'client' ? 'My Projects' : 'Accessible Clients'}
                  </p>
                  <p className="text-3xl font-black text-green-700">{accessibleClients.length}</p>
                </div>
                <Users className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card bg-gradient-to-br from-blue-100 to-cyan-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-gray-600 uppercase">Scheduled Meetings</p>
                  <p className="text-3xl font-black text-blue-700">
                    {mockMeetings.filter(m => m.status === 'scheduled').length}
                  </p>
                </div>
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card bg-gradient-to-br from-purple-100 to-pink-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-gray-600 uppercase">
                    {currentUserType === 'team_member' ? 'Attended Meetings' : 'Completed Meetings'}
                  </p>
                  <p className="text-3xl font-black text-purple-700">
                    {mockMeetings.filter(m => m.status === 'completed').length}
                  </p>
                </div>
                <FileText className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Type Notice for Team Members */}
        {currentUserType === 'team_member' && (
          <div className="mb-6 p-4 bg-orange-50 border-2 border-orange-200 rounded neo-card">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-orange-600" />
              <p className="font-bold text-orange-800">
                Team Member Access: You can join meetings and view history, but only managers and clients can schedule new meetings.
              </p>
            </div>
          </div>
        )}

        {/* Client List */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {accessibleClients.map((client) => {
            const nextMeeting = getNextMeeting(client.id);
            const totalMeetings = getClientMeetings(client.id).length;
            
            return (
              <Card key={client.id} className="neo-card bg-white hover:shadow-[12px_12px_0px_#000] transition-all">
                <CardHeader className="border-b-4 border-black">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-black text-gray-900 uppercase">
                      {currentUserType === 'client' ? client.project_name : client.full_name}
                    </CardTitle>
                    <Badge className="bg-blue-500 text-white border-2 border-black font-black">
                      {client.project_status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-gray-600">{client.company}</p>
                  {currentUserType !== 'client' && (
                    <p className="text-xs font-bold text-gray-500">{client.email}</p>
                  )}
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  {/* Next Meeting Info */}
                  {nextMeeting ? (
                    <div className="bg-green-50 border-2 border-green-200 p-3 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-black text-green-800 uppercase">
                          Next Meeting
                        </span>
                      </div>
                      <p className="text-sm font-bold text-green-700">{nextMeeting.title}</p>
                      <p className="text-xs font-bold text-green-600">
                        {new Date(nextMeeting.date).toLocaleDateString()} at {nextMeeting.time}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border-2 border-gray-200 p-3 rounded">
                      <p className="text-sm font-bold text-gray-500 text-center">
                        No upcoming meetings
                      </p>
                    </div>
                  )}

                  {/* Meeting Stats */}
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-lg font-black text-gray-900">{totalMeetings}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase">Total Meetings</p>
                    </div>
                    <div>
                      <p className="text-lg font-black text-gray-900">
                        {getClientMeetings(client.id).filter(m => m.status === 'completed').length}
                      </p>
                      <p className="text-xs font-bold text-gray-500 uppercase">Completed</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-4">
                    {nextMeeting && (
                      <Button
                        onClick={() => handleJoinMeeting(client)}
                        className="w-full neo-button bg-green-500 text-white font-black uppercase"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        JOIN MEETING
                      </Button>
                    )}
                    
                    <div className={`${canScheduleMeetings ? 'grid grid-cols-2' : 'grid grid-cols-1'} gap-2`}>
                      {canScheduleMeetings && (
                        <Button
                          onClick={() => handleScheduleMeeting(client)}
                          variant="outline"
                          className="neo-button bg-white text-gray-900 font-black uppercase"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          SCHEDULE
                        </Button>
                      )}
                      <Button
                        onClick={() => handleViewHistory(client)}
                        variant="outline"
                        className="neo-button bg-white text-gray-900 font-black uppercase"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        HISTORY
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {selectedClient && (
        <>
          {canScheduleMeetings && (
            <ScheduleMeetingModal
              isOpen={showScheduleModal}
              onClose={() => setShowScheduleModal(false)}
              client={selectedClient}
              onSchedule={(meetingData) => {
                console.log('Meeting scheduled:', meetingData);
                setShowScheduleModal(false);
              }}
            />
          )}

          <MeetingHistoryModal
            isOpen={showHistoryModal}
            onClose={() => setShowHistoryModal(false)}
            client={selectedClient}
          />
        </>
      )}
    </div>
  );
}