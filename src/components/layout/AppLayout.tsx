
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Zap, 
  LayoutGrid, 
  Target, 
  Users, 
  BarChart3,
  FileText,
  Brain,
  CheckSquare,
  MessageSquare,
  Calendar,
  TrendingUp,
  BookOpen,
  FolderOpen,
  FlaskConical,
  Eye,
  LogOut,
  UserCheck,
  Search,
  Bell,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutGrid,
  },
  {
    title: "Projects",
    url: createPageUrl("Projects"),
    icon: FolderOpen,
  },
  {
    title: "Create Project",
    url: createPageUrl("CreateProject"),
    icon: Zap,
  },
  {
    title: "Features",
    url: createPageUrl("Features"),
    icon: CheckSquare,
  },
  {
    title: "Sprint Board",
    url: createPageUrl("SprintBoard"),
    icon: Target,
  },
  {
    title: "Team",
    url: createPageUrl("Team"),
    icon: Users,
  },
  {
    title: "Meetings",
    url: createPageUrl("MeetingDashboard"),
    icon: Calendar,
  },
  {
    title: "Messages",
    url: "/client-messages",
    icon: MessageSquare,
  },
  {
    title: "Clients",
    url: createPageUrl("ClientManagement"),
    icon: UserCheck,
  },
  {
    title: "Client Tickets",
    url: createPageUrl("ClientTickets"),
    icon: FileText,
  },
  {
    title: "Progress",
    url: createPageUrl("Progress"),
    icon: TrendingUp,
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: BarChart3,
  },
  {
    title: "Workspace",
    url: createPageUrl("Workspace"),
    icon: FileText,
  },
  {
    title: "Test Center",
    url: createPageUrl("TestCenter"),
    icon: FlaskConical,
  },
  {
    title: "Team Logs",
    url: createPageUrl("TeamLogs"),
    icon: FileText,
  }
];

const teamNavigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("TeamDashboard"),
    icon: LayoutGrid,
  },
  {
    title: "My Tasks",
    url: createPageUrl("MyTasks"),
    icon: CheckSquare,
  },
  {
    title: "Features",
    url: createPageUrl("Features"),
    icon: CheckSquare,
  },
  {
    title: "Sprint Board",
    url: createPageUrl("TeamSprintBoard"),
    icon: Target,
  },
  {
    title: "Meetings",
    url: createPageUrl("MeetingDashboard"),
    icon: Calendar,
  },
  {
    title: "Messages",
    url: "/client-messages",
    icon: MessageSquare,
  },
  {
    title: "AI Assistant",
    url: createPageUrl("AITaskHelper"),
    icon: Brain,
  },
  {
    title: "Collaboration",
    url: createPageUrl("TeamCollaboration"),
    icon: MessageSquare,
  },
  {
    title: "My Progress",
    url: createPageUrl("MyProgress"),
    icon: TrendingUp,
  },
  {
    title: "Calendar",
    url: createPageUrl("MyCalendar"),
    icon: Calendar,
  },
  {
    title: "Knowledge Base",
    url: createPageUrl("KnowledgeBase"),
    icon: BookOpen,
  },
  {
    title: "Test Center",
    url: createPageUrl("TestCenter"),
    icon: FlaskConical,
  }
];

const clientNavigationItems = [
  {
    title: "Dashboard",
    url: "/client-dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Meetings",
    url: createPageUrl("MeetingDashboard"),
    icon: Calendar,
  },
  {
    title: "Project Progress",
    url: "/client-progress",
    icon: TrendingUp,
  },
  {
    title: "Features",
    url: "/client-features",
    icon: CheckSquare,
  },
  {
    title: "Messages",
    url: "/client-messages",
    icon: MessageSquare,
  },
  {
    title: "Documents",
    url: "/client-documents",
    icon: FileText,
  },
  {
    title: "Support",
    url: "/client-support",
    icon: Users,
  }
];

interface AppLayoutProps {
  children: React.ReactNode;
  currentPageName?: string;
}

export default function AppLayout({ children, currentPageName }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Check user type from localStorage
  const userType = localStorage.getItem('user_type');
  
  // Determine which navigation items to show
  const isTeamMember = userType === 'team_member';
  const isClient = userType === 'client';
  
  let navItems = navigationItems; // Default to manager navigation
  let portalTitle = 'Project AI';
  
  if (isTeamMember) {
    navItems = teamNavigationItems;
    portalTitle = 'Team Portal';
  } else if (isClient) {
    navItems = clientNavigationItems;
    portalTitle = 'Client Portal';
  }

  const handleLogout = () => {
    localStorage.removeItem('user_type');
    navigate('/');
  };

  // If on login pages, don't show sidebar
  if (currentPageName === 'TeamLogin') {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="notion-sidebar w-64">
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-notion-blue flex items-center justify-center">
                {isClient ? <Eye className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-white" />}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">
                  {portalTitle}
                </h2>
                <p className="text-xs text-sidebar-foreground/60">
                  {isClient ? 'Project View' : isTeamMember ? 'Workspace' : 'Orchestration'}
                </p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/60 px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isActive 
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                              : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3">
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50">
              {isClient ? <Eye className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-sidebar-foreground truncate">
                  {isClient ? 'Client View' : isTeamMember ? 'Team Member' : 'Manager'}
                </div>
                <div className="text-xs text-sidebar-foreground/60">
                  AI Powered
                </div>
              </div>
            </div>
            
            {isClient && (
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm"
                className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation */}
          <header className="notion-page-header h-16 flex-shrink-0">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-foreground">
                {currentPageName || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64 h-9 bg-background border-border"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Bell className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
