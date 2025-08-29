
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MonitorSpeaker,
  PhoneOff,
  Hand,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Camera,
  Grid3X3,
  User,
  Circle,
  Smile,
  Share,
  Edit3,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Pause,
  Play
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface MeetingControlsProps {
  isAudioOn: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  isHandRaised: boolean;
  isMuted: boolean;
  viewMode: 'gallery' | 'speaker';
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onToggleRecording: () => void;
  onToggleHand: () => void;
  onToggleMute: () => void;
  onToggleViewMode: () => void;
  onShowParticipants: () => void;
  onShowChat: () => void;
  onShowNotes: () => void;
  onShowSettings: () => void;
  onShowReactions: () => void;
  onShowWhiteboard: () => void;
  onBreakoutRooms: () => void;
  onEndMeeting: () => void;
}

export default function MeetingControls({
  isAudioOn,
  isVideoOn,
  isScreenSharing,
  isRecording,
  isHandRaised,
  isMuted,
  viewMode,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onToggleRecording,
  onToggleHand,
  onToggleMute,
  onToggleViewMode,
  onShowParticipants,
  onShowChat,
  onShowNotes,
  onShowSettings,
  onShowReactions,
  onShowWhiteboard,
  onBreakoutRooms,
  onEndMeeting
}: MeetingControlsProps) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  return (
    <div className="bg-gray-900 border-t-2 border-gray-700 p-2 md:p-4">
      <div className="flex items-center justify-between gap-1 md:gap-2">
        {/* Left Controls - Audio/Video */}
        <div className="flex items-center gap-1">
          <Button
            onClick={onToggleAudio}
            className={`neo-button ${isAudioOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500 text-white hover:bg-red-600'} font-black`}
            size="sm"
          >
            {isAudioOn ? <Mic className="w-3 h-3 md:w-4 md:h-4" /> : <MicOff className="w-3 h-3 md:w-4 md:h-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-700 text-white border-gray-600 p-1 md:p-2"
              >
                <span className="text-xs">▲</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white z-50">
              <DropdownMenuItem>Microphone Settings</DropdownMenuItem>
              <DropdownMenuItem>Test Speaker & Microphone</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Select a Microphone</DropdownMenuItem>
              <DropdownMenuItem>Select a Speaker</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={onToggleVideo}
            className={`neo-button ${isVideoOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500 text-white hover:bg-red-600'} font-black`}
            size="sm"
          >
            {isVideoOn ? <Video className="w-3 h-3 md:w-4 md:h-4" /> : <VideoOff className="w-3 h-3 md:w-4 md:h-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-700 text-white border-gray-600 p-1 md:p-2"
              >
                <span className="text-xs">▲</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white z-50">
              <DropdownMenuItem>
                <Camera className="w-4 h-4 mr-2" />
                Camera Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Choose Virtual Background</DropdownMenuItem>
              <DropdownMenuItem>Touch up my appearance</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Select a Camera</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center Controls - More Compact */}
        <div className="flex items-center gap-1 flex-1 justify-center overflow-x-auto">
          <Button
            onClick={onToggleScreenShare}
            className={`neo-button ${isScreenSharing ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-700 text-white hover:bg-gray-600'} font-black whitespace-nowrap`}
            size="sm"
          >
            <MonitorSpeaker className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden md:inline ml-1 text-xs">Share</span>
          </Button>

          <Button
            onClick={onToggleRecording}
            className={`neo-button ${isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-700 text-white hover:bg-gray-600'} font-black`}
            size="sm"
          >
            {isRecording ? <Pause className="w-3 h-3 md:w-4 md:h-4" /> : <Circle className="w-3 h-3 md:w-4 md:h-4" />}
            <span className="hidden md:inline ml-1 text-xs">{isRecording ? 'Pause' : 'Rec'}</span>
          </Button>

          <Button
            onClick={onShowReactions}
            className="neo-button bg-gray-700 text-white hover:bg-gray-600 font-black"
            size="sm"
          >
            <Smile className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden md:inline ml-1 text-xs">React</span>
          </Button>

          <Button
            onClick={onToggleHand}
            className={`neo-button ${isHandRaised ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-gray-700 text-white hover:bg-gray-600'} font-black`}
            size="sm"
          >
            <Hand className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden md:inline ml-1 text-xs">{isHandRaised ? 'Lower' : 'Hand'}</span>
          </Button>

          <DropdownMenu open={showMoreOptions} onOpenChange={setShowMoreOptions}>
            <DropdownMenuTrigger asChild>
              <Button
                className="neo-button bg-gray-700 text-white hover:bg-gray-600 font-black"
                size="sm"
              >
                <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline ml-1 text-xs">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white z-50">
              <DropdownMenuItem onClick={onShowWhiteboard}>
                <Edit3 className="w-4 h-4 mr-2" />
                Whiteboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onBreakoutRooms}>
                <Users className="w-4 h-4 mr-2" />
                Breakout Rooms
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="w-4 h-4 mr-2" />
                Live Stream
              </DropdownMenuItem>
              <DropdownMenuItem>
                Polls
              </DropdownMenuItem>
              <DropdownMenuItem>
                Apps
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Captions
              </DropdownMenuItem>
              <DropdownMenuItem>
                Transcription
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Controls - Simplified */}
        <div className="flex items-center gap-1">
          <Button
            onClick={onToggleViewMode}
            className="neo-button bg-gray-700 text-white hover:bg-gray-600 font-black"
            size="sm"
          >
            {viewMode === 'gallery' ? <User className="w-3 h-3 md:w-4 md:h-4" /> : <Grid3X3 className="w-3 h-3 md:w-4 md:h-4" />}
            <span className="hidden lg:inline ml-1 text-xs">{viewMode === 'gallery' ? 'Speaker' : 'Gallery'}</span>
          </Button>

          <Button
            onClick={onShowSettings}
            className="neo-button bg-gray-700 text-white hover:bg-gray-600 font-black"
            size="sm"
          >
            <Settings className="w-3 h-3 md:w-4 md:h-4" />
          </Button>

          <Button
            onClick={onEndMeeting}
            className="neo-button bg-red-500 text-white hover:bg-red-600 font-black px-2 md:px-4"
            size="sm"
          >
            <PhoneOff className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden md:inline ml-1 text-xs">End</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
