import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  AlertTriangle, 
  Users, 
  Clock, 
  CheckCircle2,
  X,
  MessageSquare,
  Target,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { Notification } from "@/types/notifications";
import TaskDetailModal from './TaskDetailModal';
import ReplyModal from './ReplyModal';

interface NotificationsPageProps {
  user: any;
}

export default function NotificationsPage({ user }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);

  useEffect(() => {
    // Mock notifications data
    const mockNotifications: Notification[] = [
      {
        id: '1',
        userId: user?.user_email || 'current_user',
        type: 'help_assignment',
        title: 'Help Assignment - Testing Environment Issue',
        message: 'Manager assigned you to help Mike Rodriguez with the testing environment setup. Priority: High. "Please assist Mike with getting the testing environment back online. Contact DevOps if needed."',
        from: 'Sarah Johnson (Manager)',
        priority: 'high',
        read: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        actionRequired: true,
        relatedBlockerId: '2'
      },
      {
        id: '2',
        userId: user?.user_email || 'current_user',
        type: 'reminder',
        title: 'Stand-up Reminder',
        message: 'Please complete your daily stand-up. You have not submitted your status update for today.',
        from: 'AI Assistant',
        priority: 'medium',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        actionRequired: true
      },
      {
        id: '3',
        userId: user?.user_email || 'current_user',
        type: 'escalation',
        title: 'Blocker Escalated - Design Approval',
        message: 'Your blocker regarding design approval for login page has been escalated to senior management. Expected resolution within 24 hours.',
        from: 'Sarah Johnson (Manager)',
        priority: 'high',
        read: true,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        relatedBlockerId: '1'
      },
      {
        id: '4',
        userId: user?.user_email || 'current_user',
        type: 'general',
        title: 'Sprint Planning Tomorrow',
        message: 'Sprint planning meeting scheduled for tomorrow at 10:00 AM. Please prepare your velocity estimates.',
        from: 'Sarah Johnson (Manager)',
        priority: 'medium',
        read: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ];

    setNotifications(mockNotifications);
  }, [user]);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'help_assignment': return <Users className="w-5 h-5 text-blue-600" />;
      case 'reminder': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'escalation': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleViewTask = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowTaskDetail(true);
  };

  const handleReply = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowReplyModal(true);
  };

  const handleSendReply = (reply: string) => {
    console.log('Sending reply:', reply);
    
    // In a real app, this would send the reply to the manager
    alert(`Reply sent to manager! Your message: "${reply}"`);
    
    // Mark notification as read
    if (selectedNotification) {
      markAsRead(selectedNotification.id);
    }
  };

  return (
    <div className="space-y-6">
      <style>{`
        .neo-card {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }
        
        .neo-button {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 10px 10px 0px #000000 !important;
        }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-black text-gray-900 uppercase">NOTIFICATIONS</h1>
              <p className="text-sm font-bold text-gray-600">
                {unreadCount} unread messages
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead}
              className="neo-button bg-green-500 text-white font-black uppercase"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              MARK ALL READ
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3">
        {[
          { key: 'all', label: 'All', count: notifications.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'high', label: 'High Priority', count: notifications.filter(n => n.priority === 'high').length }
        ].map(tab => (
          <Button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`neo-button font-black uppercase ${
              filter === tab.key 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.label} ({tab.count})
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="neo-card bg-white">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-black text-gray-900 uppercase mb-2">No Notifications</h3>
              <p className="text-gray-600 font-bold">You're all caught up!</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`neo-card ${!notification.read ? 'bg-blue-50 border-blue-500' : 'bg-white'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-black text-gray-900 text-lg">
                            {notification.title}
                          </h3>
                          <Badge className={`font-black border-2 border-black ${getPriorityColor(notification.priority)}`}>
                            {notification.priority.toUpperCase()}
                          </Badge>
                          {!notification.read && (
                            <Badge className="bg-blue-500 text-white font-black border-2 border-black">
                              NEW
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-700 font-bold mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                            <span>From: {notification.from}</span>
                            <span>•</span>
                            <span>{new Date(notification.createdAt).toLocaleString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {notification.actionRequired && (
                              <Badge className="bg-orange-500 text-white font-black border-2 border-black">
                                <Zap className="w-3 h-3 mr-1" />
                                ACTION REQUIRED
                              </Badge>
                            )}
                            
                            {!notification.read && (
                              <Button
                                onClick={() => markAsRead(notification.id)}
                                size="sm"
                                className="neo-button bg-green-500 text-white font-black text-xs"
                              >
                                MARK READ
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons for specific notification types */}
                        {notification.type === 'help_assignment' && (
                          <div className="mt-4 flex gap-2">
                            <Button 
                              onClick={() => handleViewTask(notification)}
                              className="neo-button bg-blue-500 text-white font-black text-sm"
                            >
                              <Target className="w-4 h-4 mr-2" />
                              VIEW TASK
                            </Button>
                            <Button 
                              onClick={() => handleReply(notification)}
                              className="neo-button bg-green-500 text-white font-black text-sm"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              REPLY
                            </Button>
                          </div>
                        )}

                        {(notification.type === 'reminder' || notification.type === 'escalation' || notification.type === 'general') && (
                          <div className="mt-4">
                            <Button 
                              onClick={() => handleReply(notification)}
                              className="neo-button bg-orange-500 text-white font-black text-sm"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              REPLY
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Modals */}
      {selectedNotification && (
        <>
          <TaskDetailModal
            isOpen={showTaskDetail}
            onClose={() => setShowTaskDetail(false)}
            notification={selectedNotification}
          />
          <ReplyModal
            isOpen={showReplyModal}
            onClose={() => setShowReplyModal(false)}
            notification={selectedNotification}
            onSendReply={handleSendReply}
          />
        </>
      )}
    </div>
  );
}
