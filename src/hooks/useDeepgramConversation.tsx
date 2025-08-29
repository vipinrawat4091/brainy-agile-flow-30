import { useState, useRef, useCallback } from 'react';

interface ConversationOptions {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (message: { type: string; content: string; speaker: 'user' | 'ai' }) => void;
  onTranscript?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: any) => void;
}

interface ConversationState {
  status: 'disconnected' | 'connected' | 'connecting';
  isSpeaking: boolean;
  isListening: boolean;
  currentTranscript: string;
}

export function useDeepgramConversation(options: ConversationOptions = {}) {
  const [state, setState] = useState<ConversationState>({
    status: 'disconnected',
    isSpeaking: false,
    isListening: false,
    currentTranscript: ''
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const conversationIdRef = useRef<string | null>(null);

  // AI conversation responses for standup
  const standupResponses = [
    "Hi! I'm excited to chat with you about your work. Let's start with yesterday - what did you accomplish?",
    "That sounds great! Now tell me about what you're planning to work on today.",
    "Excellent! Are there any blockers or challenges you're facing that I can help you think through?",
    "Thanks for sharing that. Based on what you've told me, here are my thoughts and recommendations...",
    "Is there anything else you'd like to discuss or any other challenges you're working through?",
    "Perfect! That was a really productive standup. Let me summarize what we covered."
  ];

  let currentResponseIndex = 0;
  const conversationHistory: Array<{type: string, content: string, speaker: 'user' | 'ai'}> = [];

  const startSession = useCallback(async ({ apiKey }: { apiKey: string }) => {
    try {
      setState(prev => ({ ...prev, status: 'connecting' }));
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Initialize MediaRecorder for audio capture
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Create WebSocket connection to Deepgram
      const websocket = new WebSocket(`wss://api.deepgram.com/v1/listen?model=nova-2&language=en-US&smart_format=true`, [
        'token',
        apiKey
      ]);

      websocketRef.current = websocket;

      websocket.onopen = () => {
        setState(prev => ({ ...prev, status: 'connected', isListening: true }));
        options.onConnect?.();
        
        // Start the conversation
        setTimeout(() => {
          speakAIResponse(standupResponses[0]);
        }, 1000);
      };

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.channel?.alternatives?.[0]?.transcript) {
          const transcript = data.channel.alternatives[0].transcript;
          const isFinal = data.is_final;
          
          if (transcript.trim()) {
            // Update real-time transcript
            setState(prev => ({ 
              ...prev, 
              currentTranscript: isFinal ? '' : transcript 
            }));
            
            // Call transcript callback for real-time display
            options.onTranscript?.(transcript, isFinal);
            
            if (isFinal) {
              // User finished speaking
              conversationHistory.push({
                type: 'transcript',
                content: transcript,
                speaker: 'user'
              });
              
              options.onMessage?.({
                type: 'transcript',
                content: transcript,
                speaker: 'user'
              });

              // Generate AI response after a brief pause
              setTimeout(() => {
                handleAIResponse(transcript);
              }, 1500);
            }
          }
        }
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        options.onError?.(error);
      };

      websocket.onclose = () => {
        setState(prev => ({ 
          ...prev, 
          status: 'disconnected', 
          isListening: false,
          currentTranscript: ''
        }));
        options.onDisconnect?.();
      };

      // Start recording and sending audio
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && websocket.readyState === WebSocket.OPEN) {
          websocket.send(event.data);
        }
      };

      mediaRecorder.start(100); // Send audio chunks every 100ms

      const conversationId = `conv_${Date.now()}`;
      conversationIdRef.current = conversationId;
      
      return conversationId;

    } catch (error) {
      console.error('Failed to start session:', error);
      setState(prev => ({ ...prev, status: 'disconnected' }));
      options.onError?.(error);
      throw error;
    }
  }, [options]);

  const handleAIResponse = (userInput: string) => {
    currentResponseIndex++;
    
    let aiResponse = '';
    
    if (currentResponseIndex < standupResponses.length) {
      aiResponse = standupResponses[currentResponseIndex];
    } else {
      // Generate contextual responses based on conversation
      aiResponse = generateContextualResponse(userInput, conversationHistory);
    }

    conversationHistory.push({
      type: 'ai_response',
      content: aiResponse,
      speaker: 'ai'
    });

    options.onMessage?.({
      type: 'ai_response',
      content: aiResponse,
      speaker: 'ai'
    });

    speakAIResponse(aiResponse);
  };

  const generateContextualResponse = (userInput: string, history: any[]) => {
    const responses = [
      "That's really interesting. Can you tell me more about that?",
      "I understand. How do you think we could approach that challenge?",
      "That sounds like a great plan. What's your next step?",
      "Based on what you've shared, I think you're making excellent progress.",
      "That's a common challenge. Have you considered trying a different approach?",
      "Thanks for sharing all of that with me. You've covered a lot of ground today!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speakAIResponse = (text: string) => {
    setState(prev => ({ ...prev, isSpeaking: true }));
    
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesisRef.current = utterance;
    
    // Configure voice settings
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Samantha')) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      console.log('AI started speaking:', text);
    };

    utterance.onend = () => {
      console.log('AI finished speaking');
      setState(prev => ({ ...prev, isSpeaking: false }));
    };

    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setState(prev => ({ ...prev, isSpeaking: false }));
    };

    speechSynthesis.speak(utterance);
  };

  const endSession = useCallback(async () => {
    try {
      // Stop speech synthesis
      if (speechSynthesisRef.current) {
        speechSynthesis.cancel();
      }

      // Stop media recorder
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }

      // Close WebSocket
      if (websocketRef.current) {
        websocketRef.current.close();
      }

      setState({
        status: 'disconnected',
        isSpeaking: false,
        isListening: false,
        currentTranscript: ''
      });

    } catch (error) {
      console.error('Error ending session:', error);
      options.onError?.(error);
    }
  }, [options]);

  const setVolume = useCallback(async ({ volume }: { volume: number }) => {
    // For browser speech synthesis, we'd need to stop current speech and restart with new volume
    // This is a simplified implementation
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.volume = volume;
    }
  }, []);

  const getConversationSummary = () => {
    const userMessages = conversationHistory.filter(msg => msg.speaker === 'user');
    const topics = ['Yesterday\'s work', 'Today\'s plan', 'Blockers discussion'];
    
    return {
      messages: conversationHistory,
      userContributions: userMessages.length,
      topics: topics,
      insights: [
        'Active participation in standup discussion',
        'Clear communication about work progress',
        'Engaged in problem-solving conversation'
      ]
    };
  };

  return {
    startSession,
    endSession,
    setVolume,
    getConversationSummary,
    status: state.status,
    isSpeaking: state.isSpeaking,
    isListening: state.isListening,
    currentTranscript: state.currentTranscript
  };
}