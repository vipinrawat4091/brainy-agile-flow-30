
import React, { useState } from 'react';
import { Calendar, Clock, User, Activity, AlertCircle, Filter, Search, Users, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { mockTeamMembers, mockTeamLogs, getLogsForMember, getLogsForDate, getLogsForDateAndMember, type TeamMember, type TeamMemberLog } from '@/utils/mockLogs';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function TeamLogs() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const filteredMembers = mockTeamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembersForActivity = mockTeamMembers.filter(member =>
    member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(memberSearchTerm.toLowerCase())
  );

  const getFilteredLogs = (logs: TeamMemberLog[]) => {
    return logs.filter(log => {
      const matchesPriority = priorityFilter === 'all' || log.priority === priorityFilter;
      const matchesDate = dateFilter === 'all' || isWithinDateRange(log.date, dateFilter);
      const matchesMemberSearch = memberSearchTerm === '' || 
        log.memberName.toLowerCase().includes(memberSearchTerm.toLowerCase());
      return matchesPriority && matchesDate && matchesMemberSearch;
    });
  };

  const isWithinDateRange = (logDate: string, filter: string) => {
    const date = new Date(logDate);
    const now = new Date();
    
    switch (filter) {
      case 'today':
        return date.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return date >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return date >= monthAgo;
      default:
        return true;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getCurrentLogs = () => {
    if (selectedDate && selectedMember) {
      return getLogsForDateAndMember(selectedDate, selectedMember.id);
    } else if (selectedDate) {
      return getLogsForDate(selectedDate);
    } else if (selectedMember) {
      return getLogsForMember(selectedMember.id);
    }
    return mockTeamLogs;
  };

  const currentLogs = getCurrentLogs();
  const displayedLogs = getFilteredLogs(currentLogs);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Neo-Brutalism Header */}
        <div className="neo-card bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight mb-2">TEAM ACTIVITY LOGS</h1>
              <p className="text-blue-100 font-bold text-lg">MONITOR TEAM MEMBER ACTIVITIES AND TRACK PROGRESS</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="neo-card bg-white text-black p-4 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                <div className="text-2xl font-black">{displayedLogs.length}</div>
                <div className="text-sm font-bold uppercase">LOGS</div>
              </div>
              <div className="neo-card bg-white text-black p-4 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                <div className="text-2xl font-black">{mockTeamMembers.length}</div>
                <div className="text-sm font-bold uppercase">MEMBERS</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="calendar-view" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[600px] neo-card bg-white p-2 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
              <TabsTrigger value="calendar-view" className="neo-button font-black uppercase data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <CalendarDays className="w-4 h-4 mr-2" />
                CALENDAR VIEW
              </TabsTrigger>
              <TabsTrigger value="team-view" className="neo-button font-black uppercase data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                TEAM VIEW
              </TabsTrigger>
              <TabsTrigger value="activity-feed" className="neo-button font-black uppercase data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Activity className="w-4 h-4 mr-2" />
                ACTIVITY FEED
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="calendar-view" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Calendar Panel */}
                  <Card className="lg:col-span-1 neo-card bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                    <CardHeader className="pb-4 border-b-4 border-black bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      <CardTitle className="flex items-center gap-2 font-black uppercase">
                        <CalendarDays className="w-6 h-6" />
                        SELECT DATE
                      </CardTitle>
                      <div className="text-sm font-bold text-green-100">
                        CLICK ON A DATE TO VIEW TEAM LOGS FOR THAT DAY
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="neo-card border-4 border-black shadow-[4px_4px_0px_0px_#000] w-full bg-white"
                        modifiers={{
                          hasLogs: (date) => getLogsForDate(date).length > 0
                        }}
                        modifiersStyles={{
                          hasLogs: { 
                            backgroundColor: '#3b82f6', 
                            color: 'white', 
                            fontWeight: 'bold',
                            border: '2px solid #000',
                            borderRadius: '0'
                          }
                        }}
                        classNames={{
                          day_selected: "bg-blue-500 text-white font-black border-2 border-black hover:bg-blue-600",
                          day_today: "bg-yellow-400 text-black font-black border-2 border-black",
                          day: "font-bold text-black hover:bg-gray-100 border border-gray-300"
                        }}
                      />
                      
                      {selectedDate && (
                        <div className="mt-4 neo-card bg-blue-50 p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                          <div className="text-sm font-black text-blue-900 uppercase">
                            SELECTED: {format(selectedDate, 'MMMM dd, yyyy')}
                          </div>
                          <div className="text-xs font-bold text-blue-700 mt-1 uppercase">
                            {getLogsForDate(selectedDate).length} LOGS FOUND
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Team Members Panel for Date */}
                  <Card className="lg:col-span-2 neo-card bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                    <CardHeader className="pb-4 border-b-4 border-black bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <CardTitle className="flex items-center gap-2 font-black uppercase">
                        <Users className="w-6 h-6" />
                        {selectedDate ? `TEAM ACTIVITY - ${format(selectedDate, 'MMM dd, yyyy').toUpperCase()}` : 'SELECT A DATE'}
                      </CardTitle>
                      
                      {/* Search for team members */}
                      {selectedDate && (
                        <div className="mt-4">
                          <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
                            <Input
                              placeholder="SEARCH TEAM MEMBER..."
                              value={memberSearchTerm}
                              onChange={(e) => setMemberSearchTerm(e.target.value)}
                              className="neo-input pl-10 bg-white/20 border-2 border-white text-white placeholder:text-white/80 font-bold uppercase"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Button
                              variant={!selectedMember ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedMember(null)}
                              className="neo-button border-2 border-white font-black uppercase text-xs bg-white/20 text-white hover:bg-white hover:text-black"
                            >
                              ALL MEMBERS
                            </Button>
                            {filteredMembersForActivity.map((member) => {
                              const memberLogsForDate = getLogsForDateAndMember(selectedDate, member.id);
                              return (
                                <Button
                                  key={member.id}
                                  variant={selectedMember?.id === member.id ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedMember(member)}
                                  className="neo-button border-2 border-white font-black uppercase text-xs bg-white/20 text-white hover:bg-white hover:text-black flex items-center gap-1"
                                  disabled={memberLogsForDate.length === 0}
                                >
                                  {member.name.split(' ')[0].toUpperCase()}
                                  <Badge variant="secondary" className="neo-card text-xs px-1 bg-black text-white border border-white">
                                    {memberLogsForDate.length}
                                  </Badge>
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent className="space-y-4 max-h-96 overflow-y-auto p-6">
                      {selectedDate ? (
                        displayedLogs.length > 0 ? (
                          displayedLogs.map((log) => (
                            <div key={log.id} className="neo-card bg-gray-50 p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-black text-gray-900 uppercase">{log.activity}</h4>
                                    <Badge variant={getPriorityColor(log.priority)} className="neo-card text-xs font-bold uppercase border-2 border-black">
                                      {log.priority}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                  <Clock className="w-4 h-4" />
                                  {format(new Date(log.date), 'HH:mm')}
                                </div>
                              </div>
                              
                              <p className="text-gray-700 mb-3 font-semibold">{log.description}</p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-600 font-bold">
                                  <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {log.memberName}
                                  </div>
                                  {log.timeSpent && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {log.timeSpent}h
                                    </div>
                                  )}
                                  {log.project && (
                                    <Badge variant="outline" className="neo-card text-xs font-bold border-2 border-black">
                                      {log.project}
                                    </Badge>
                                  )}
                                </div>
                                {log.taskId && (
                                  <Badge variant="secondary" className="neo-card text-xs font-bold border-2 border-black">
                                    {log.taskId}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="font-bold uppercase">No logs found for this date{selectedMember ? ` for ${selectedMember.name}` : ''}{memberSearchTerm ? ` matching "${memberSearchTerm}"` : ''}</p>
                          </div>
                        )
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <CalendarDays className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <h3 className="text-lg font-black text-gray-600 mb-2 uppercase">Select a Date</h3>
                          <p className="font-bold">Choose a date from the calendar to view team member logs</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="team-view" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Team Members Panel */}
                  <Card className="lg:col-span-1 neo-card bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                    <CardHeader className="pb-4 border-b-4 border-black bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      <CardTitle className="flex items-center gap-2 font-black uppercase">
                        <Users className="w-6 h-6" />
                        TEAM MEMBERS
                      </CardTitle>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search members..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="neo-input pl-10 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000]"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 p-6">
                      {filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          className={`neo-card p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] cursor-pointer transition-all hover:shadow-[6px_6px_0px_0px_#000] ${
                            selectedMember?.id === member.id
                              ? 'bg-blue-50 border-blue-500'
                              : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedMember(member)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar className="w-10 h-10 neo-card border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-black">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                              </div>
                              <div>
                                <h4 className="font-black text-gray-900 uppercase">{member.name}</h4>
                                <p className="text-sm text-gray-600 font-bold uppercase">{member.role}</p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="neo-card text-xs font-bold border-2 border-black">
                              {member.totalLogs}
                            </Badge>
                          </div>
                          <div className="mt-2 text-xs text-gray-500 font-bold uppercase">
                            Last active: {format(new Date(member.lastActivity), 'MMM dd, HH:mm')}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Activity Logs Panel */}
                  <Card className="lg:col-span-2 neo-card bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                    <CardHeader className="pb-4 border-b-4 border-black bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 font-black uppercase">
                          <Activity className="w-6 h-6" />
                          {selectedMember ? `${selectedMember.name.toUpperCase()}'S ACTIVITIES` : 'ALL ACTIVITIES'}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="w-32 neo-input font-bold border-2 border-white bg-white/20 text-white">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent className="neo-card border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                              <SelectItem value="all">All Priority</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={dateFilter} onValueChange={setDateFilter}>
                            <SelectTrigger className="w-32 neo-input font-bold border-2 border-white bg-white/20 text-white">
                              <SelectValue placeholder="Date" />
                            </SelectTrigger>
                            <SelectContent className="neo-card border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                              <SelectItem value="all">All Time</SelectItem>
                              <SelectItem value="today">Today</SelectItem>
                              <SelectItem value="week">This Week</SelectItem>
                              <SelectItem value="month">This Month</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-96 overflow-y-auto p-6">
                      {displayedLogs.length > 0 ? (
                        displayedLogs.map((log) => (
                          <div key={log.id} className="neo-card bg-gray-50 p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-black text-gray-900 uppercase">{log.activity}</h4>
                                  <Badge variant={getPriorityColor(log.priority)} className="neo-card text-xs font-bold uppercase border-2 border-black">
                                    {log.priority}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(log.date), 'MMM dd, HH:mm')}
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-3 font-semibold">{log.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-600 font-bold">
                                {!selectedMember && (
                                  <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {log.memberName}
                                  </div>
                                )}
                                {log.timeSpent && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {log.timeSpent}h
                                  </div>
                                )}
                                {log.project && (
                                  <Badge variant="outline" className="neo-card text-xs font-bold border-2 border-black">
                                    {log.project}
                                  </Badge>
                                )}
                              </div>
                              {log.taskId && (
                                <Badge variant="secondary" className="neo-card text-xs font-bold border-2 border-black">
                                  {log.taskId}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="font-bold uppercase">No logs found matching your filters</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity-feed" className="space-y-6 mt-0">
                <Card className="neo-card bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                  <CardHeader className="border-b-4 border-black bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 font-black uppercase">
                        <Activity className="w-6 h-6" />
                        RECENT ACTIVITY FEED
                      </CardTitle>
                      <div className="flex gap-2">
                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                          <SelectTrigger className="w-32 neo-input font-bold border-2 border-white bg-white/20 text-white">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent className="neo-card border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                            <SelectItem value="all">All Priority</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={dateFilter} onValueChange={setDateFilter}>
                          <SelectTrigger className="w-32 neo-input font-bold border-2 border-white bg-white/20 text-white">
                            <SelectValue placeholder="Date" />
                          </SelectTrigger>
                          <SelectContent className="neo-card border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {getFilteredLogs(mockTeamLogs).map((log) => (
                      <div key={log.id} className="flex items-start gap-4 neo-card bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-shadow">
                        <Avatar className="w-10 h-10 flex-shrink-0 neo-card border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-black">
                            {log.memberName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-gray-900 uppercase">{log.memberName}</h4>
                              <span className="text-gray-500 font-bold">•</span>
                              <span className="text-sm font-black text-gray-700 uppercase">{log.activity}</span>
                              <Badge variant={getPriorityColor(log.priority)} className="neo-card text-xs font-bold uppercase border-2 border-black">
                                {log.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(log.date), 'MMM dd, HH:mm')}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-2 font-semibold">{log.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 font-bold">
                            <span className="font-black uppercase">{log.memberRole}</span>
                            {log.timeSpent && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {log.timeSpent}h
                              </div>
                            )}
                            {log.project && (
                              <Badge variant="outline" className="neo-card text-xs font-bold border-2 border-black">
                                {log.project}
                              </Badge>
                            )}
                            {log.taskId && (
                              <Badge variant="secondary" className="neo-card text-xs font-bold border-2 border-black">
                                {log.taskId}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
