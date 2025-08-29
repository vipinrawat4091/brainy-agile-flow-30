// Mock data for team member logs

export interface TeamMemberLog {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberRole: string;
  date: string;
  activity: string;
  description: string;
  timeSpent?: number; // in hours
  project?: string;
  taskId?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'away' | 'offline';
  totalLogs: number;
  lastActivity: string;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    role: 'Senior Developer',
    status: 'active',
    totalLogs: 24,
    lastActivity: '2024-01-16T14:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'UI/UX Designer',
    status: 'away',
    totalLogs: 18,
    lastActivity: '2024-01-16T11:15:00Z'
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@company.com',
    role: 'QA Engineer',
    status: 'active',
    totalLogs: 31,
    lastActivity: '2024-01-16T16:45:00Z'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'Frontend Developer',
    status: 'offline',
    totalLogs: 15,
    lastActivity: '2024-01-15T17:20:00Z'
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    role: 'Backend Developer',
    status: 'active',
    totalLogs: 28,
    lastActivity: '2024-01-16T15:10:00Z'
  }
];

export const mockTeamLogs: TeamMemberLog[] = [
  // Today's logs
  {
    id: '1',
    memberId: '1',
    memberName: 'Alex Johnson',
    memberEmail: 'alex.johnson@company.com',
    memberRole: 'Senior Developer',
    date: new Date().toISOString(),
    activity: 'Code Review',
    description: 'Reviewed pull requests for authentication module. Found 3 critical issues that need addressing before merge.',
    timeSpent: 2,
    project: 'E-commerce Platform',
    taskId: 'TASK-001',
    priority: 'high'
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Sarah Chen',
    memberEmail: 'sarah.chen@company.com',
    memberRole: 'UI/UX Designer',
    date: new Date().toISOString(),
    activity: 'Design System Update',
    description: 'Updated component library with new design tokens and improved accessibility.',
    timeSpent: 4,
    project: 'Design System',
    taskId: 'TASK-002',
    priority: 'medium'
  },
  // Yesterday's logs  
  {
    id: '3',
    memberId: '1',
    memberName: 'Alex Johnson',
    memberEmail: 'alex.johnson@company.com',
    memberRole: 'Senior Developer',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    activity: 'Feature Development',
    description: 'Implemented new search functionality with advanced filters. Added unit tests and documentation.',
    timeSpent: 5,
    project: 'E-commerce Platform',
    taskId: 'TASK-003',
    priority: 'medium'
  },
  {
    id: '4',
    memberId: '3',
    memberName: 'Mike Rodriguez',
    memberEmail: 'mike.rodriguez@company.com',
    memberRole: 'QA Engineer',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    activity: 'Test Execution',
    description: 'Executed regression test suite for the latest build. Found 2 new bugs in the checkout process.',
    timeSpent: 3,
    project: 'E-commerce Platform',
    taskId: 'TASK-004',
    priority: 'high'
  },

  // 2 days ago logs
  {
    id: '5',
    memberId: '2',
    memberName: 'Sarah Chen',
    memberEmail: 'sarah.chen@company.com',
    memberRole: 'UI/UX Designer',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    activity: 'Design Review',
    description: 'Created wireframes for the new dashboard layout. Incorporated feedback from user testing sessions.',
    timeSpent: 4,
    project: 'Dashboard Redesign',
    taskId: 'TASK-005',
    priority: 'medium'
  },
  {
    id: '6',
    memberId: '4',
    memberName: 'Emily Davis',
    memberEmail: 'emily.davis@company.com',
    memberRole: 'Frontend Developer',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    activity: 'Component Development',
    description: 'Built reusable React components for the product catalog. Implemented responsive design and accessibility features.',
    timeSpent: 4,
    project: 'E-commerce Platform',
    taskId: 'TASK-006',
    priority: 'medium'
  },

  // 3 days ago logs
  {
    id: '7',
    memberId: '5',
    memberName: 'James Wilson',
    memberEmail: 'james.wilson@company.com',
    memberRole: 'Backend Developer',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    activity: 'API Development',
    description: 'Implemented new REST endpoints for order management. Added proper error handling and rate limiting.',
    timeSpent: 4,
    project: 'E-commerce Platform',
    taskId: 'TASK-007',
    priority: 'high'
  },
  {
    id: '8',
    memberId: '1',
    memberName: 'Alex Johnson',
    memberEmail: 'alex.johnson@company.com',
    memberRole: 'Senior Developer',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    activity: 'Bug Fix',
    description: 'Fixed critical memory leak in the payment processing service. Deployed hotfix to production.',
    timeSpent: 3,
    project: 'Payment System',
    taskId: 'TASK-008',
    priority: 'high'
  },

  // 4 days ago logs
  {
    id: '9',
    memberId: '2',
    memberName: 'Sarah Chen',
    memberEmail: 'sarah.chen@company.com',
    memberRole: 'UI/UX Designer',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    activity: 'User Research',
    description: 'Conducted 5 user interviews for the mobile app redesign. Identified key pain points in current navigation.',
    timeSpent: 6,
    project: 'Mobile App',
    taskId: 'TASK-009',
    priority: 'high'
  },
  {
    id: '10',
    memberId: '3',
    memberName: 'Mike Rodriguez',
    memberEmail: 'mike.rodriguez@company.com',
    memberRole: 'QA Engineer',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    activity: 'Test Planning',
    description: 'Created test cases for the new payment gateway integration. Documented edge cases and negative scenarios.',
    timeSpent: 2,
    project: 'Payment System',
    taskId: 'TASK-010',
    priority: 'medium'
  },

  // Last week logs
  {
    id: '11',
    memberId: '4',
    memberName: 'Emily Davis',
    memberEmail: 'emily.davis@company.com',
    memberRole: 'Frontend Developer',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    activity: 'Performance Optimization',
    description: 'Optimized bundle size and improved page load times by 40%. Implemented lazy loading for images.',
    timeSpent: 3,
    project: 'Performance Optimization',
    taskId: 'TASK-011',
    priority: 'low'
  },
  {
    id: '12',
    memberId: '5',
    memberName: 'James Wilson',
    memberEmail: 'james.wilson@company.com',
    memberRole: 'Backend Developer',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    activity: 'Database Optimization',
    description: 'Optimized database queries and added proper indexing. Reduced average response time by 60%.',
    timeSpent: 5,
    project: 'Performance Optimization',
    taskId: 'TASK-012',
    priority: 'medium'
  }
];

export const getTeamMembers = (): TeamMember[] => {
  return mockTeamMembers;
};

export const getLogsForMember = (memberId: string): TeamMemberLog[] => {
  return mockTeamLogs.filter(log => log.memberId === memberId);
};

export const getLogsForDate = (date: Date): TeamMemberLog[] => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  return mockTeamLogs.filter(log => {
    const logDate = new Date(log.date);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === targetDate.getTime();
  });
};

export const getLogsForDateAndMember = (date: Date, memberId: string): TeamMemberLog[] => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  return mockTeamLogs.filter(log => {
    const logDate = new Date(log.date);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === targetDate.getTime() && log.memberId === memberId;
  });
};

export const getAllLogs = (): TeamMemberLog[] => {
  return mockTeamLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getLogsByDateRange = (startDate: string, endDate: string): TeamMemberLog[] => {
  return mockTeamLogs.filter(log => {
    const logDate = new Date(log.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return logDate >= start && logDate <= end;
  });
};