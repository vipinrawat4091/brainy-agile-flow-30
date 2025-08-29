import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare,
  FileText,
  Settings,
  Camera,
  User,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorSpeaker,
  Volume2,
  VolumeX,
  PhoneOff,
  Send,
  Save,
  X,
  Users
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockClients } from "@/utils/mockClients";
import { mockTeamMembers } from "@/utils/mockMeetings";
import { useIsMobile } from "@/hooks/use-mobile";

// Import new meeting components
import ParticipantGrid from "@/components/meetings/ParticipantGrid";
import MeetingControls from "@/components/meetings/MeetingControls";
import ReactionsOverlay from "@/components/meetings/ReactionsOverlay";
import ParticipantsList from "@/components/meetings/ParticipantsList";
import WhiteboardPanel from "@/components/meetings/WhiteboardPanel";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'user' | 'system';
}

interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  type: 'note' | 'action_item' | 'decision';
}

export default function MeetingInterface() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clientId = searchParams.get('client');
  const client = mockClients.find(c => c.id === clientId);
  const isMobile = useIsMobile();

  // Meeting controls state
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewMode, setViewMode] = useState<'gallery' | 'speaker'>('gallery');
  const [isLocked, setIsLocked] = useState(false);

  // Panel states
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  // Chat state
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Manager",
      message: "Welcome to the meeting! Let's discuss the project progress.",
      timestamp: new Date().toLocaleTimeString(),
      type: "user"
    },
    {
      id: "2",
      sender: "System",
      message: `${client?.full_name} joined the meeting`,
      timestamp: new Date().toLocaleTimeString(),
      type: "system"
    }
  ]);

  // Notes state
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState<'note' | 'action_item' | 'decision'>('note');
  const [meetingNotes, setMeetingNotes] = useState<Note[]>([
    {
      id: "1",
      content: "Discussed project timeline and upcoming milestones",
      author: "Manager",
      timestamp: new Date().toLocaleTimeString(),
      type: "note"
    },
    {
      id: "2",
      content: "Client requested additional features for the dashboard",
      author: "Manager",
      timestamp: new Date().toLocaleTimeString(),
      type: "action_item"
    }
  ]);

  // Enhanced Participants with Zoom-like features
  const [participants, setParticipants] = useState([
    { 
      id: "manager", 
      name: "Project Manager", 
      role: "Manager", 
      isOnline: true, 
      isVideoOn: true, 
      isAudioOn: true, 
      isPinned: false, 
      hasRaisedHand: false, 
      isHost: true,
      isWaiting: false 
    },
    { 
      id: "client", 
      name: client?.full_name || "Client", 
      role: "Client", 
      isOnline: true, 
      isVideoOn: true, 
      isAudioOn: true, 
      isPinned: false, 
      hasRaisedHand: false, 
      isHost: false,
      isWaiting: false 
    },
    ...mockTeamMembers.slice(0, 2).map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      isOnline: Math.random() > 0.3,
      isVideoOn: Math.random() > 0.4,
      isAudioOn: Math.random() > 0.3,
      isPinned: false,
      hasRaisedHand: Math.random() > 0.8,
      isHost: false,
      isWaiting: false
    }))
  ]);

  // Waiting room participants
  const [waitingParticipants, setWaitingParticipants] = useState([
    { 
      id: "waiting1", 
      name: "John Doe", 
      role: "Developer", 
      isOnline: true, 
      isVideoOn: false, 
      isAudioOn: false, 
      isPinned: false, 
      hasRaisedHand: false, 
      isHost: false,
      isWaiting: true 
    }
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [meetingDuration, setMeetingDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Enhanced handlers for Zoom-like features
  const handleParticipantAction = (participantId: string, action: string) => {
    setParticipants(prev => prev.map(p => {
      if (p.id === participantId) {
        switch (action) {
          case 'mute':
            return { ...p, isAudioOn: !p.isAudioOn };
          case 'video':
            return { ...p, isVideoOn: !p.isVideoOn };
          case 'pin':
            return { ...p, isPinned: !p.isPinned };
          case 'makeHost':
            return { ...p, isHost: true };
          case 'remove':
            return null; // Will be filtered out
          default:
            return p;
        }
      }
      return p;
    }).filter(Boolean));
  };

  const handleAdmitParticipant = (participantId: string) => {
    const waitingParticipant = waitingParticipants.find(p => p.id === participantId);
    if (waitingParticipant) {
      setParticipants(prev => [...prev, { ...waitingParticipant, isWaiting: false }]);
      setWaitingParticipants(prev => prev.filter(p => p.id !== participantId));
    }
  };

  const handleAdmitAll = () => {
    setParticipants(prev => [...prev, ...waitingParticipants.map(p => ({ ...p, isWaiting: false }))]);
    setWaitingParticipants([]);
  };

  const handleSendReaction = (emoji: string) => {
    // Add reaction logic here
    console.log(`Reaction sent: ${emoji}`);
  };

  // Control handlers
  const handleToggleAudio = () => setIsAudioOn(!isAudioOn);
  const handleToggleVideo = () => setIsVideoOn(!isVideoOn);
  const handleToggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const handleToggleRecording = () => setIsRecording(!isRecording);
  const handleToggleHand = () => setIsHandRaised(!isHandRaised);
  const handleToggleMute = () => setIsMuted(!isMuted);
  const handleToggleViewMode = () => setViewMode(prev => prev === 'gallery' ? 'speaker' : 'gallery');
  const handleLockMeeting = () => setIsLocked(!isLocked);

  // Panel handlers
  const handleShowParticipants = () => setShowParticipants(!showParticipants);
  const handleShowChat = () => setShowChat(!showChat);
  const handleShowNotes = () => setShowNotes(!showNotes);
  const handleShowSettings = () => console.log('Settings opened');
  const handleShowReactions = () => setShowReactions(!showReactions);
  const handleShowWhiteboard = () => setShowWhiteboard(!showWhiteboard);
  const handleBreakoutRooms = () => console.log('Breakout rooms opened');

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "Manager",
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString(),
      type: "user"
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatMessage("");
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      author: "Manager",
      timestamp: new Date().toLocaleTimeString(),
      type: noteType
    };

    setMeetingNotes(prev => [...prev, note]);
    setNewNote("");
  };

  const handleEndMeeting = () => {
    navigate('/meeting-dashboard');
  };

  const getNoteIcon = (type: string) => {
    switch (type) {
      case 'action_item':
        return '📋';
      case 'decision':
        return '✅';
      default:
        return '📝';
    }
  };

  const getNoteColor = (type: string) => {
    switch (type) {
      case 'action_item':
        return 'border-orange-200 bg-orange-50';
      case 'decision':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  if (!client) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Client not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden relative">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b-2 border-gray-700 p-2 md:p-4 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Badge className="bg-red-500 text-white border-2 border-red-600 font-black animate-pulse text-xs">
            ● LIVE
          </Badge>
          {isRecording && (
            <Badge className="bg-red-500 text-white border-2 border-red-600 font-black animate-pulse text-xs">
              🔴 REC
            </Badge>
          )}
          <div className="min-w-0">
            <h2 className="text-white font-black text-sm md:text-lg uppercase truncate">
              {isMobile ? client.full_name.split(' ')[0] : `Meeting with ${client.full_name}`}
            </h2>
            <p className="text-gray-300 text-xs font-bold">
              {!isMobile && `${client.company} • `}{formatDuration(meetingDuration)} • {participants.length + waitingParticipants.length}
            </p>
          </div>
        </div>

        {/* Enhanced Right Side Controls */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          {waitingParticipants.length > 0 && (
            <Badge className="bg-orange-500 text-white animate-bounce text-xs">
              {waitingParticipants.length} waiting
            </Badge>
          )}
          {isLocked && (
            <Badge className="bg-yellow-500 text-black text-xs">
              🔒 LOCKED
            </Badge>
          )}
          
          {/* Quick Access Buttons - Always visible */}
          <Button
            onClick={handleShowParticipants}
            className={`neo-button ${showParticipants ? 'bg-blue-500' : 'bg-gray-700'} text-white hover:bg-gray-600 font-black p-2 md:px-3`}
            size="sm"
            title="Participants"
          >
            <Users className="w-4 h-4 md:mr-1" />
            {!isMobile && <span className="text-xs">Participants</span>}
          </Button>

          <Button
            onClick={handleShowChat}
            className={`neo-button ${showChat ? 'bg-blue-500' : 'bg-gray-700'} text-white hover:bg-gray-600 font-black p-2 md:px-3`}
            size="sm"
            title="Chat"
          >
            <MessageSquare className="w-4 h-4 md:mr-1" />
            {!isMobile && <span className="text-xs">Chat</span>}
          </Button>

          <Button
            onClick={handleShowNotes}
            className={`neo-button ${showNotes ? 'bg-blue-500' : 'bg-gray-700'} text-white hover:bg-gray-600 font-black p-2 md:px-3`}
            size="sm"
            title="Notes"
          >
            <FileText className="w-4 h-4 md:mr-1" />
            {!isMobile && <span className="text-xs">Notes</span>}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Video Grid - Scrollable on smaller screens */}
          <div className="flex-1 bg-gray-900 p-2 md:p-4 overflow-hidden">
            <ScrollArea className="h-full">
              <ParticipantGrid
                participants={participants}
                currentUser="manager"
                viewMode={viewMode}
                onParticipantAction={handleParticipantAction}
              />

              {/* Meeting Stats - Responsive Grid */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div className="bg-gray-800 rounded-lg p-2 md:p-3 text-center neo-card">
                  <div className="text-green-500 font-black text-sm md:text-lg">{participants.filter(p => p.isOnline).length}</div>
                  <div className="text-gray-400 text-xs font-bold">ONLINE</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 md:p-3 text-center neo-card">
                  <div className="text-blue-500 font-black text-sm md:text-lg">{formatDuration(meetingDuration)}</div>
                  <div className="text-gray-400 text-xs font-bold">TIME</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 md:p-3 text-center neo-card">
                  <div className="text-purple-500 font-black text-sm md:text-lg">{isScreenSharing ? 'ON' : 'OFF'}</div>
                  <div className="text-gray-400 text-xs font-bold">SHARE</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 md:p-3 text-center neo-card">
                  <div className="text-orange-500 font-black text-sm md:text-lg">{chatMessages.length}</div>
                  <div className="text-gray-400 text-xs font-bold">MSGS</div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Enhanced Meeting Controls */}
          <div className="shrink-0">
            <MeetingControls
              isAudioOn={isAudioOn}
              isVideoOn={isVideoOn}
              isScreenSharing={isScreenSharing}
              isRecording={isRecording}
              isHandRaised={isHandRaised}
              isMuted={isMuted}
              viewMode={viewMode}
              onToggleAudio={handleToggleAudio}
              onToggleVideo={handleToggleVideo}
              onToggleScreenShare={handleToggleScreenShare}
              onToggleRecording={handleToggleRecording}
              onToggleHand={handleToggleHand}
              onToggleMute={handleToggleMute}
              onToggleViewMode={handleToggleViewMode}
              onShowParticipants={handleShowParticipants}
              onShowChat={handleShowChat}
              onShowNotes={handleShowNotes}
              onShowSettings={handleShowSettings}
              onShowReactions={handleShowReactions}
              onShowWhiteboard={handleShowWhiteboard}
              onBreakoutRooms={handleBreakoutRooms}
              onEndMeeting={handleEndMeeting}
            />
          </div>
        </div>

        {/* Mobile/Responsive Panels */}
        {/* Chat Panel */}
        {showChat && (
          <div className={`${
            isMobile 
              ? 'fixed inset-y-0 right-0 w-full z-40' 
              : 'w-80 border-l-4 border-black'
          } bg-white flex flex-col`}>
            <div className="border-b-4 border-black p-4 flex items-center justify-between shrink-0">
              <h3 className="font-black text-gray-900 uppercase">Meeting Chat</h3>
              {isMobile && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowChat(false)}
                  className="neo-button"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`p-2 rounded ${
                    msg.type === 'system' 
                      ? 'bg-gray-100 text-gray-600 text-center text-sm'
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    {msg.type === 'user' && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-gray-600">{msg.sender}</span>
                        <span className="text-xs text-gray-400">{msg.timestamp}</span>
                      </div>
                    )}
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t-4 border-black p-4 shrink-0">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="neo-input"
                />
                <Button onClick={handleSendMessage} className="neo-button bg-blue-500 text-white shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Panel */}
        {showNotes && (
          <div className={`${
            isMobile 
              ? 'fixed inset-y-0 right-0 w-full z-40' 
              : 'w-80 border-l-4 border-black'
          } bg-white flex flex-col`}>
            <div className="border-b-4 border-black p-4 flex items-center justify-between shrink-0">
              <h3 className="font-black text-gray-900 uppercase">Meeting Notes</h3>
              {isMobile && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowNotes(false)}
                  className="neo-button"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {meetingNotes.map((note) => (
                  <div key={note.id} className={`p-3 border-2 rounded ${getNoteColor(note.type)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getNoteIcon(note.type)}</span>
                      <span className="font-bold text-xs text-gray-600">{note.author}</span>
                      <span className="text-xs text-gray-400">{note.timestamp}</span>
                    </div>
                    <p className="text-sm font-medium">{note.content}</p>
                    <Badge className="mt-2 text-xs font-bold">
                      {note.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t-4 border-black p-4 space-y-3 shrink-0">
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value as any)}
                className="w-full p-2 border-2 border-black font-bold text-sm"
              >
                <option value="note">Note</option>
                <option value="action_item">Action Item</option>
                <option value="decision">Decision</option>
              </select>
              
              <Textarea
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="neo-input resize-none"
                rows={3}
              />
              
              <Button 
                onClick={handleAddNote} 
                className="w-full neo-button bg-green-500 text-white font-black"
              >
                <Save className="w-4 h-4 mr-2" />
                ADD NOTE
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Features Overlays */}
      <ReactionsOverlay
        isVisible={showReactions}
        onClose={() => setShowReactions(false)}
        onSendReaction={handleSendReaction}
      />

      <ParticipantsList
        participants={participants}
        waitingParticipants={waitingParticipants}
        isVisible={showParticipants}
        onClose={() => setShowParticipants(false)}
        onParticipantAction={(id, action) => {
          if (action === 'admit') {
            handleAdmitParticipant(id);
          } else {
            handleParticipantAction(id, action);
          }
        }}
        onAdmitAll={handleAdmitAll}
        onLockMeeting={handleLockMeeting}
        isLocked={isLocked}
      />

      <WhiteboardPanel
        isVisible={showWhiteboard}
        onClose={() => setShowWhiteboard(false)}
      />
    </div>
  );
}
