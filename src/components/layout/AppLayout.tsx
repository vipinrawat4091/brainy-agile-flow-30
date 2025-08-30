import React, { useState } from "react";
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
  Settings,
  Menu,
  Plus
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-md-background">
        <Sidebar className={cn(
          "md-nav-drawer border-r-0",
          sidebarOpen ? "w-64" : "w-16"
        )}>
          <SidebarHeader className="p-4 border-b border-md-outline-variant">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-8 h-8"
              >
                <Menu className="w-4 h-4" />
              </Button>
              {sidebarOpen && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    {isClient ? <Eye className="w-4 h-4 text-on-primary" /> : <Brain className="w-4 h-4 text-on-primary" />}
                  </div>
                  <div>
                    <h2 className="md-title-medium text-on-surface">
                      {portalTitle}
                    </h2>
                    <p className="md-body-small text-outline">
                      {isClient ? 'Project View' : isTeamMember ? 'Workspace' : 'Orchestration'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              {sidebarOpen && (
                <SidebarGroupLabel className="md-label-medium text-outline px-3 py-2">
                  Navigation
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link 
                            to={item.url} 
                            className={cn(
                              "md-nav-item w-full justify-start",
                              isActive && "active",
                              !sidebarOpen && "justify-center px-2"
                            )}
                          >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {sidebarOpen && <span className="md-body-medium">{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-md-outline-variant">
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-2xl bg-md-surface-variant",
              !sidebarOpen && "justify-center"
            )}>
              {isClient ? <Eye className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <div className="md-label-large text-on-surface">
                    {isClient ? 'Client View' : isTeamMember ? 'Team Member' : 'Manager'}
                  </div>
                  <div className="md-body-small text-outline">
                    AI Powered
                  </div>
                </div>
              )}
            </div>
            
            {isClient && sidebarOpen && (
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm"
                className="w-full justify-start gap-2 text-error hover:bg-error/8"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          {/* Top App Bar */}
          <header className="h-16 flex items-center justify-between px-6 bg-md-surface border-b border-md-outline-variant md-elevation-1">
            <div className="flex items-center gap-4">
              <h1 className="md-headline-small text-on-surface">
                {currentPageName || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-outline" />
                <Input 
                  placeholder="Search..." 
                  className="md-input pl-10 w-64 h-10"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <Bell className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-md-background">
            {children}
          </div>
        </main>

        {/* Floating Action Button */}
        <Button 
          variant="fab"
          className="md-fab animate-fab-in"
          aria-label="Add new item"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </SidebarProvider>
  );
}
