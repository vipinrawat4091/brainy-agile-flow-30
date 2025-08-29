import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Camera, 
  CameraOff, 
  Mic, 
  MicOff, 
  MoreHorizontal,
  Hand,
  Pin,
  MessageSquare
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
  isPinned: boolean;
  hasRaisedHand: boolean;
  isHost: boolean;
}

interface ParticipantGridProps {
  participants: Participant[];
  currentUser: string;
  viewMode: 'gallery' | 'speaker';
  onParticipantAction: (participantId: string, action: string) => void;
}

export default function ParticipantGrid({ 
  participants, 
  currentUser, 
  viewMode,
  onParticipantAction 
}: ParticipantGridProps) {
  const [hoveredParticipant, setHoveredParticipant] = useState<string | null>(null);

  const getGridClass = () => {
    if (viewMode === 'speaker') return 'grid-cols-1';
    
    const count = participants.length;
    if (count <= 1) return 'grid-cols-1';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 9) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  const getParticipantColor = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-blue-600 to-purple-600',
      'bg-gradient-to-br from-green-600 to-teal-600',
      'bg-gradient-to-br from-orange-600 to-red-600',
      'bg-gradient-to-br from-indigo-600 to-blue-600',
      'bg-gradient-to-br from-pink-600 to-rose-600',
      'bg-gradient-to-br from-yellow-600 to-orange-600'
    ];
    return colors[index % colors.length];
  };

  const handleParticipantAction = (participantId: string, action: string) => {
    onParticipantAction(participantId, action);
  };

  return (
    <div className={`grid ${getGridClass()} gap-4 h-full`}>
      {participants.map((participant, index) => (
        <div 
          key={participant.id}
          className={`relative bg-gray-800 rounded-lg overflow-hidden neo-card transition-all duration-200 ${
            participant.isPinned ? 'ring-4 ring-yellow-400' : ''
          } ${viewMode === 'speaker' && index === 0 ? 'col-span-full' : ''}`}
          onMouseEnter={() => setHoveredParticipant(participant.id)}
          onMouseLeave={() => setHoveredParticipant(null)}
        >
          {/* Video/Avatar */}
          {participant.isVideoOn ? (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-white font-bold">Camera On</p>
              </div>
            </div>
          ) : (
            <div className={`w-full h-full ${getParticipantColor(index)} flex items-center justify-center`}>
              <div className="text-center">
                <User className="w-16 h-16 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-lg">{participant.name}</p>
                <p className="text-gray-200 text-sm">{participant.role}</p>
              </div>
            </div>
          )}

          {/* Overlay Controls */}
          {hoveredParticipant === participant.id && participant.id !== currentUser && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleParticipantAction(participant.id, 'mute')}
                  className="bg-gray-800/80 text-white border-gray-600"
                >
                  {participant.isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm" 
                  variant="outline"
                  onClick={() => handleParticipantAction(participant.id, 'video')}
                  className="bg-gray-800/80 text-white border-gray-600"
                >
                  {participant.isVideoOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-gray-800/80 text-white border-gray-600"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleParticipantAction(participant.id, 'pin')}>
                      <Pin className="w-4 h-4 mr-2" />
                      {participant.isPinned ? 'Unpin' : 'Pin'} Video
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleParticipantAction(participant.id, 'chat')}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Private Message
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleParticipantAction(participant.id, 'spotlight')}>
                      Spotlight for Everyone
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleParticipantAction(participant.id, 'remove')}>
                      Remove from Meeting
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          {/* Status Indicators */}
          <div className="absolute top-2 left-2 flex gap-1">
            {participant.hasRaisedHand && (
              <Badge className="bg-yellow-500 text-black animate-bounce">
                <Hand className="w-3 h-3 mr-1" />
                ✋
              </Badge>
            )}
            {!participant.isAudioOn && (
              <Badge className="bg-red-500 text-white">
                <MicOff className="w-3 h-3" />
              </Badge>
            )}
            {!participant.isVideoOn && (
              <Badge className="bg-gray-500 text-white">
                <CameraOff className="w-3 h-3" />
              </Badge>
            )}
            {participant.isHost && (
              <Badge className="bg-blue-500 text-white">HOST</Badge>
            )}
          </div>

          {/* Name Badge */}
          <div className="absolute bottom-2 left-2">
            <Badge className={`${
              participant.id === currentUser 
                ? 'bg-green-500 text-white border-2 border-green-600' 
                : 'bg-gray-700 text-white border border-gray-600'
            } font-bold`}>
              {participant.id === currentUser ? 'You' : participant.name.split(' ')[0]}
            </Badge>
          </div>

          {/* Online Status */}
          <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white ${
            participant.isOnline ? 'bg-green-500' : 'bg-gray-500'
          }`}></div>

          {/* Pin Indicator */}
          {participant.isPinned && (
            <div className="absolute top-2 right-8">
              <Pin className="w-4 h-4 text-yellow-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}