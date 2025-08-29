import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Reaction {
  id: string;
  emoji: string;
  participantId: string;
  participantName: string;
  timestamp: number;
  x: number;
  y: number;
}

interface ReactionsOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  onSendReaction: (emoji: string) => void;
}

const reactionEmojis = [
  '👍', '👏', '❤️', '😂', '😮', '😢', '👎', '🎉', '✋', '💯'
];

export default function ReactionsOverlay({ 
  isVisible, 
  onClose, 
  onSendReaction 
}: ReactionsOverlayProps) {
  const [activeReactions, setActiveReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    // Simulate incoming reactions
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newReaction: Reaction = {
          id: Date.now().toString(),
          emoji: reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)],
          participantId: 'participant_' + Math.floor(Math.random() * 5),
          participantName: ['John', 'Sarah', 'Mike', 'Anna', 'David'][Math.floor(Math.random() * 5)],
          timestamp: Date.now(),
          x: Math.random() * 80 + 10, // 10% to 90% from left
          y: Math.random() * 60 + 20   // 20% to 80% from top
        };
        
        setActiveReactions(prev => [...prev, newReaction]);
        
        // Remove reaction after animation
        setTimeout(() => {
          setActiveReactions(prev => prev.filter(r => r.id !== newReaction.id));
        }, 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleReactionClick = (emoji: string) => {
    onSendReaction(emoji);
    
    // Add our own reaction to the overlay
    const newReaction: Reaction = {
      id: Date.now().toString(),
      emoji,
      participantId: 'current_user',
      participantName: 'You',
      timestamp: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20
    };
    
    setActiveReactions(prev => [...prev, newReaction]);
    
    setTimeout(() => {
      setActiveReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Reactions */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {activeReactions.map((reaction) => (
          <div
            key={reaction.id}
            className="absolute animate-bounce"
            style={{
              left: `${reaction.x}%`,
              top: `${reaction.y}%`,
              animation: 'float-up 3s ease-out forwards'
            }}
          >
            <div className="text-4xl animate-pulse">
              {reaction.emoji}
            </div>
            <div className="text-xs text-white bg-black/50 rounded px-1 mt-1 text-center">
              {reaction.participantName}
            </div>
          </div>
        ))}
      </div>

      {/* Reactions Panel */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
        <Card className="p-4 bg-white/95 backdrop-blur border-2 border-gray-300 neo-card">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-sm">Quick Reactions</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-auto"
            >
              ✕
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {reactionEmojis.map((emoji) => (
              <Button
                key={emoji}
                variant="outline"
                className="text-2xl p-3 hover:scale-110 transition-transform neo-button"
                onClick={() => handleReactionClick(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-30px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.8);
          }
        }
        `
      }} />
    </>
  );
}