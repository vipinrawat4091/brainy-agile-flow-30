
export interface Notification {
  id: string;
  userId: string;
  type: 'help_assignment' | 'reminder' | 'escalation' | 'general';
  title: string;
  message: string;
  from: string; // Manager name
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  createdAt: Date;
  actionRequired?: boolean;
  relatedTaskId?: string;
  relatedBlockerId?: string;
}

export interface HelpAssignment {
  id: string;
  blockerId: string;
  assignedTo: string;
  assignedBy: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  status: 'pending' | 'in_progress' | 'resolved';
}
