import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Hand,
  Crown,
  UserPlus,
  Settings,
  Lock,
  Unlock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface Participant {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
  isVideoOn: boolean;
  isAudioOn: boolean;
  hasRaisedHand: boolean;
  isHost: boolean;
  isWaiting: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
  waitingParticipants: Participant[];
  isVisible: boolean;
  onClose: () => void;
  onParticipantAction: (participantId: string, action: string) => void;
  onAdmitAll: () => void;
  onLockMeeting: () => void;
  isLocked: boolean;
}

export default function ParticipantsList({
  participants,
  waitingParticipants,
  isVisible,
  onClose,
  onParticipantAction,
  onAdmitAll,
  onLockMeeting,
  isLocked
}: ParticipantsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParticipants = participants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-20 bottom-4 w-80 z-50">
      <Card className="h-full flex flex-col neo-card bg-white">
        <CardHeader className="border-b-4 border-black">
          <div className="flex items-center justify-between">
            <CardTitle className="font-black text-gray-900 uppercase flex items-center gap-2">
              <Users className="w-5 h-5" />
              Participants ({participants.length + waitingParticipants.length})
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 neo-input"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onLockMeeting}
                className="flex-1"
              >
                {isLocked ? <Unlock className="w-4 h-4 mr-1" /> : <Lock className="w-4 h-4 mr-1" />}
                {isLocked ? 'Unlock' : 'Lock'} Meeting
              </Button>
              <Button size="sm" variant="outline">
                <UserPlus className="w-4 h-4 mr-1" />
                Invite
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            {/* Waiting Room */}
            {waitingParticipants.length > 0 && (
              <div className="border-b-2 border-gray-200">
                <div className="p-4 bg-orange-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm text-orange-800">
                      Waiting Room ({waitingParticipants.length})
                    </h3>
                    <Button
                      size="sm"
                      onClick={onAdmitAll}
                      className="bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Admit All
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {waitingParticipants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div>
                          <p className="font-medium text-sm">{participant.name}</p>
                          <p className="text-xs text-gray-500">{participant.role}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={() => onParticipantAction(participant.id, 'admit')}
                            className="bg-green-500 text-white hover:bg-green-600"
                          >
                            Admit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onParticipantAction(participant.id, 'deny')}
                          >
                            Deny
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Participants */}
            <div className="p-4">
              <h3 className="font-bold text-sm mb-3 text-gray-700">
                In Meeting ({filteredParticipants.length})
              </h3>
              
              <div className="space-y-2">
                {filteredParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {participant.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{participant.name}</p>
                          {participant.isHost && (
                            <Crown className="w-3 h-3 text-yellow-500" />
                          )}
                          {participant.hasRaisedHand && (
                            <Badge className="bg-yellow-500 text-black text-xs animate-bounce">
                              <Hand className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{participant.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        {!participant.isAudioOn && <MicOff className="w-4 h-4 text-red-500" />}
                        {!participant.isVideoOn && <VideoOff className="w-4 h-4 text-red-500" />}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onParticipantAction(participant.id, 'mute')}>
                            {participant.isAudioOn ? 'Mute' : 'Unmute'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onParticipantAction(participant.id, 'video')}>
                            {participant.isVideoOn ? 'Stop Video' : 'Ask to Start Video'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onParticipantAction(participant.id, 'chat')}>
                            Send Private Message
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onParticipantAction(participant.id, 'spotlight')}>
                            Spotlight for Everyone
                          </DropdownMenuItem>
                          {!participant.isHost && (
                            <>
                              <DropdownMenuItem onClick={() => onParticipantAction(participant.id, 'makeHost')}>
                                Make Host
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onParticipantAction(participant.id, 'remove')}>
                                Remove from Meeting
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}