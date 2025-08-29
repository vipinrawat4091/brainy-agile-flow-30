
export const createPageUrl = (pageName: string): string => {
  const pageMapping: { [key: string]: string } = {
    Dashboard: "/dashboard",
    Projects: "/projects",
    CreateProject: "/create-project",
    SprintBoard: "/sprint-board",
    Team: "/team",
    ClientManagement: "/client-management",
    Progress: "/progress",
    Analytics: "/analytics",
    Workspace: "/workspace",
    TeamDashboard: "/team-dashboard",
    MyTasks: "/my-tasks",
    CreateTask: "/create-task",
    AITaskHelper: "/ai-task-helper",
    TeamCollaboration: "/team-collaboration",
    MyProgress: "/my-progress",
    MyCalendar: "/my-calendar",
    KnowledgeBase: "/knowledge-base",
    TeamSprintBoard: "/team-sprint-board",
    EditTask: "/edit-task",
    TestCenter: "/test-center",
    TeamLogs: "/team-logs",
    TeamLogin: "/team-login",
    ClientMeetings: "/client-meetings",
    MeetingDashboard: "/meeting-dashboard",
    Features: "/features",
    ClientTickets: "/client-tickets"
  };

  return pageMapping[pageName] || "/";
};
