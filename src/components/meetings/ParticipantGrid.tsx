
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
  MessageSquare,
  Zap,
  UserMinus,
  Grid3X3,
  Maximize2
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
  fullscreenParticipant?: string | null;
  onFullscreenChange?: (participantId: string | null) => void;
}

export default function ParticipantGrid({ 
  participants, 
  currentUser, 
  viewMode,
  onParticipantAction,
  fullscreenParticipant,
  onFullscreenChange
}: ParticipantGridProps) {
  const [hoveredParticipant, setHoveredParticipant] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const getGridClass = () => {
    if (fullscreenParticipant) {
      return 'grid-cols-1';
    }
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

  const handleParticipantAction = (participantId: string, action: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    onParticipantAction(participantId, action);
    // Close dropdown after action
    if (action === 'pin' || action === 'spotlight' || action === 'remove') {
      setOpenDropdowns(prev => {
        const newSet = new Set(prev);
        newSet.delete(participantId);
        return newSet;
      });
    }
  };

  const handleDropdownOpenChange = (participantId: string, open: boolean) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (open) {
        newSet.add(participantId);
      } else {
        newSet.delete(participantId);
      }
      return newSet;
    });
  };

  const handleDoubleClick = (participantId: string) => {
    if (onFullscreenChange) {
      onFullscreenChange(fullscreenParticipant === participantId ? null : participantId);
    }
  };

  const handleViewAll = () => {
    if (onFullscreenChange) {
      onFullscreenChange(null);
    }
  };

  const renderParticipant = (participant: Participant, index: number, isMain: boolean = false) => (
    <div 
      key={participant.id}
      className={`relative bg-gray-800 rounded-lg overflow-hidden neo-card transition-all duration-200 cursor-pointer ${
        participant.isPinned ? 'ring-4 ring-yellow-400 ring-opacity-80' : ''
      } ${isMain ? 'min-h-[400px]' : 'min-h-[200px]'}`}
      onMouseEnter={() => setHoveredParticipant(participant.id)}
      onMouseLeave={() => setHoveredParticipant(null)}
      onDoubleClick={() => handleDoubleClick(participant.id)}
    >
      {/* Video/Avatar */}
      {participant.isVideoOn ? (
        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
          <div className="text-center">
            <Camera className={`${isMain ? 'w-16 md:w-20 h-16 md:h-20' : 'w-12 md:w-16 h-12 md:h-16'} text-gray-400 mx-auto mb-2`} />
            <p className={`text-white font-bold ${isMain ? 'text-lg md:text-xl' : 'text-sm md:text-base'}`}>Camera On</p>
          </div>
        </div>
      ) : (
        <div className={`w-full h-full ${getParticipantColor(index)} flex items-center justify-center`}>
          <div className="text-center">
            <User className={`${isMain ? 'w-16 md:w-20 h-16 md:h-20' : 'w-12 md:w-16 h-12 md:h-16'} text-white mx-auto mb-2`} />
            <p className={`text-white font-bold ${isMain ? 'text-lg md:text-xl' : 'text-sm md:text-lg'}`}>{participant.name}</p>
            <p className={`text-gray-200 ${isMain ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>{participant.role}</p>
          </div>
        </div>
      )}

      {/* Double-click hint */}
      {hoveredParticipant === participant.id && !fullscreenParticipant && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 animate-fade-in">
          <Maximize2 className="w-3 h-3" />
          Double-click to fullscreen
        </div>
      )}

      {/* Enhanced Overlay Controls */}
      {(hoveredParticipant === participant.id || openDropdowns.has(participant.id)) && participant.id !== currentUser && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => handleParticipantAction(participant.id, 'mute', e)}
              className="bg-gray-800/90 text-white border-gray-600 hover:bg-gray-700/90"
            >
              {participant.isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            <Button
              size="sm" 
              variant="outline"
              onClick={(e) => handleParticipantAction(participant.id, 'video', e)}
              className="bg-gray-800/90 text-white border-gray-600 hover:bg-gray-700/90"
            >
              {participant.isVideoOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
            </Button>
            <DropdownMenu 
              open={openDropdowns.has(participant.id)} 
              onOpenChange={(open) => handleDropdownOpenChange(participant.id, open)}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-gray-800/90 text-white border-gray-600 hover:bg-gray-700/90"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-white border-2 border-gray-200 shadow-xl z-50"
                align="center"
                side="top"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem 
                  onClick={(e) => handleParticipantAction(participant.id, 'pin', e)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <Pin className="w-4 h-4 mr-2" />
                  {participant.isPinned ? 'Unpin Video' : 'Pin Video'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => handleParticipantAction(participant.id, 'chat', e)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Private Message
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => handleParticipantAction(participant.id, 'spotlight', e)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Spotlight for Everyone
                </DropdownMenuItem>
                {!participant.isHost && (
                  <DropdownMenuItem 
                    onClick={(e) => handleParticipantAction(participant.id, 'remove', e)}
                    className="hover:bg-red-100 text-red-600 cursor-pointer"
                  >
                    <UserMinus className="w-4 h-4 mr-2" />
                    Remove from Meeting
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {/* Status Indicators */}
      <div className="absolute top-2 left-2 flex gap-1 z-20">
        {participant.hasRaisedHand && (
          <Badge className="bg-yellow-500 text-black animate-bounce text-xs">
            <Hand className="w-3 h-3 mr-1" />
            ✋
          </Badge>
        )}
        {!participant.isAudioOn && (
          <Badge className="bg-red-500 text-white text-xs">
            <MicOff className="w-3 h-3" />
          </Badge>
        )}
        {!participant.isVideoOn && (
          <Badge className="bg-gray-500 text-white text-xs">
            <CameraOff className="w-3 h-3" />
          </Badge>
        )}
        {participant.isHost && (
          <Badge className="bg-blue-500 text-white text-xs font-bold">HOST</Badge>
        )}
      </div>

      {/* Name Badge */}
      <div className="absolute bottom-2 left-2 z-20">
        <Badge className={`${
          participant.id === currentUser 
            ? 'bg-green-500 text-white border-2 border-green-600' 
            : 'bg-gray-700/90 text-white border border-gray-600'
        } font-bold text-xs`}>
          {participant.id === currentUser ? 'You' : participant.name.split(' ')[0]}
        </Badge>
      </div>

      {/* Online Status */}
      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white z-20 ${
        participant.isOnline ? 'bg-green-500' : 'bg-gray-500'
      }`}></div>

      {/* Enhanced Pin Indicator */}
      {participant.isPinned && (
        <div className="absolute top-2 right-8 z-20 bg-yellow-500 rounded-full p-1">
          <Pin className="w-3 h-3 text-black" />
        </div>
      )}
    </div>
  );

  if (fullscreenParticipant) {
    const mainParticipant = participants.find(p => p.id === fullscreenParticipant);
    const otherParticipants = participants.filter(p => p.id !== fullscreenParticipant);

    return (
      <div className="h-full flex gap-4">
        {/* Main fullscreen participant */}
        <div className="flex-1">
          {/* View All button */}
          <div className="mb-4 flex justify-between items-center">
            <Button
              onClick={handleViewAll}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm px-4 py-2"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              View All
            </Button>
            <Badge className="bg-gray-700 text-white text-sm px-3 py-1">
              Fullscreen Mode
            </Badge>
          </div>
          
          {mainParticipant && renderParticipant(mainParticipant, 0, true)}
        </div>

        {/* Side panel with other participants */}
        {otherParticipants.length > 0 && (
          <div className="w-64 space-y-2 overflow-y-auto">
            <h3 className="text-white font-bold text-sm mb-2 uppercase">Other Participants</h3>
            {otherParticipants.map((participant, index) => (
              <div key={participant.id} className="h-32">
                {renderParticipant(participant, index + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClass()} gap-4 h-full`}>
      {participants.map((participant, index) => (
        renderParticipant(participant, index, viewMode === 'speaker' && index === 0)
      ))}
    </div>
  );
}
