
// Mock entities for the analytics system
export interface Project {
  id: string;
  name: string;
  description?: string;
  updated_date: string;
  created_date: string;
  status: 'active' | 'completed' | 'on_hold';
}

export interface Sprint {
  id: string;
  project_id: string;
  name: string;
  status: 'planning' | 'active' | 'completed';
  velocity?: number;
  actual_velocity?: number;
  created_date: string;
  start_date?: string;
  end_date?: string;
}

export interface Task {
  id: string;
  project_id: string;
  sprint_id?: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  assignee_id?: string;
  story_points?: number;
  estimated_hours?: number;
  actual_hours?: number;
  created_date: string;
}

export interface Feature {
  id: string;
  project_id: string;
  name: string;
  description?: string;
  status: 'planning' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created_date: string;
}

export interface TeamMember {
  id: string;
  project_id: string;
  user_email: string;
  role: 'developer' | 'designer' | 'manager' | 'tester';
  joined_date: string;
}

// Mock implementations with static methods
export class Project {
  static async list(orderBy?: string): Promise<Project[]> {
    // Mock data for demonstration
    return [
      {
        id: '1',
        name: 'AI Project Management System',
        description: 'Next-gen project management with AI features',
        updated_date: '2024-01-15T10:00:00Z',
        created_date: '2024-01-01T10:00:00Z',
        status: 'active'
      }
    ];
  }
}

export class Sprint {
  static async filter(criteria: any, orderBy?: string): Promise<Sprint[]> {
    return [
      {
        id: '1',
        project_id: criteria.project_id,
        name: 'Sprint 1',
        status: 'completed',
        velocity: 20,
        actual_velocity: 18,
        created_date: '2024-01-01T10:00:00Z',
        start_date: '2024-01-01T10:00:00Z',
        end_date: '2024-01-14T10:00:00Z'
      },
      {
        id: '2',
        project_id: criteria.project_id,
        name: 'Sprint 2',
        status: 'active',
        velocity: 22,
        actual_velocity: 20,
        created_date: '2024-01-15T10:00:00Z',
        start_date: '2024-01-15T10:00:00Z',
        end_date: '2024-01-28T10:00:00Z'
      }
    ];
  }
}

export class Task {
  static async filter(criteria: any): Promise<Task[]> {
    return [
      {
        id: '1',
        project_id: criteria.project_id,
        sprint_id: '1',
        title: 'Setup project structure',
        description: 'Initialize the project with basic structure',
        status: 'done',
        assignee_id: 'dev@example.com',
        story_points: 5,
        estimated_hours: 8,
        actual_hours: 6,
        created_date: '2024-01-01T10:00:00Z'
      },
      {
        id: '2',
        project_id: criteria.project_id,
        sprint_id: '2',
        title: 'Implement analytics dashboard',
        description: 'Create comprehensive analytics dashboard',
        status: 'in_progress',
        assignee_id: 'dev@example.com',
        story_points: 8,
        estimated_hours: 16,
        actual_hours: 12,
        created_date: '2024-01-15T10:00:00Z'
      }
    ];
  }
}

export class Feature {
  static async filter(criteria: any): Promise<Feature[]> {
    return [
      {
        id: '1',
        project_id: criteria.project_id,
        name: 'Analytics Dashboard',
        description: 'Real-time project analytics and insights',
        status: 'in_progress',
        priority: 'high',
        created_date: '2024-01-01T10:00:00Z'
      },
      {
        id: '2',
        project_id: criteria.project_id,
        name: 'Team Collaboration Tools',
        description: 'Enhanced team communication features',
        status: 'planning',
        priority: 'medium',
        created_date: '2024-01-05T10:00:00Z'
      }
    ];
  }
}

export class TeamMember {
  static async filter(criteria: any): Promise<TeamMember[]> {
    return [
      {
        id: '1',
        project_id: criteria.project_id,
        user_email: 'dev@example.com',
        role: 'developer',
        joined_date: '2024-01-01T10:00:00Z'
      },
      {
        id: '2',
        project_id: criteria.project_id,
        user_email: 'designer@example.com',
        role: 'designer',
        joined_date: '2024-01-02T10:00:00Z'
      }
    ];
  }
}
