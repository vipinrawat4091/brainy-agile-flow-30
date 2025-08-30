
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
  UserCheck
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

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutGrid,
    color: "text-blue-600"
  },
  {
    title: "Projects",
    url: createPageUrl("Projects"),
    icon: FolderOpen,
    color: "text-indigo-600"
  },
  {
    title: "Create Project",
    url: createPageUrl("CreateProject"),
    icon: Zap,
    color: "text-orange-600"
  },
  {
    title: "Features",
    url: createPageUrl("Features"),
    icon: CheckSquare,
    color: "text-purple-600"
  },
  {
    title: "Sprint Board",
    url: createPageUrl("SprintBoard"),
    icon: Target,
    color: "text-green-600"
  },
  {
    title: "Team",
    url: createPageUrl("Team"),
    icon: Users,
    color: "text-purple-600"
  },
  {
    title: "Meetings",
    url: createPageUrl("MeetingDashboard"),
    icon: Calendar,
    color: "text-violet-600"
  },
  {
    title: "Messages",
    url: "/client-messages",
    icon: MessageSquare,
    color: "text-orange-600"
  },
  {
    title: "Clients",
    url: createPageUrl("ClientManagement"),
    icon: UserCheck,
    color: "text-emerald-600"
  },
  {
    title: "Client Tickets",
    url: createPageUrl("ClientTickets"),
    icon: FileText,
    color: "text-red-600"
  },
  {
    title: "Progress",
    url: createPageUrl("Progress"),
    icon: TrendingUp,
    color: "text-pink-600"
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: BarChart3,
    color: "text-cyan-600"
  },
  {
    title: "Workspace",
    url: createPageUrl("Workspace"),
    icon: FileText,
    color: "text-amber-600"
  },
  {
    title: "Test Center",
    url: createPageUrl("TestCenter"),
    icon: FlaskConical,
    color: "text-red-600"
  },
  {
    title: "Team Logs",
    url: createPageUrl("TeamLogs"),
    icon: FileText,
    color: "text-slate-600"
  }
];

const teamNavigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("TeamDashboard"),
    icon: LayoutGrid,
    color: "text-blue-600"
  },
  {
    title: "My Tasks",
    url: createPageUrl("MyTasks"),
    icon: CheckSquare,
    color: "text-green-600"
  },
  {
    title: "Features",
    url: createPageUrl("Features"),
    icon: CheckSquare,
    color: "text-purple-600"
  },
  {
    title: "Sprint Board",
    url: createPageUrl("TeamSprintBoard"),
    icon: Target,
    color: "text-purple-600"
  },
  {
    title: "Meetings",
    url: createPageUrl("MeetingDashboard"),
    icon: Calendar,
    color: "text-violet-600"
  },
  {
    title: "Messages",
    url: "/client-messages",
    icon: MessageSquare,
    color: "text-blue-600"
  },
  {
    title: "AI Assistant",
    url: createPageUrl("AITaskHelper"),
    icon: Brain,
    color: "text-pink-600"
  },
  {
    title: "Collaboration",
    url: createPageUrl("TeamCollaboration"),
    icon: MessageSquare,
    color: "text-orange-600"
  },
  {
    title: "My Progress",
    url: createPageUrl("MyProgress"),
    icon: TrendingUp,
    color: "text-cyan-600"
  },
  {
    title: "Calendar",
    url: createPageUrl("MyCalendar"),
    icon: Calendar,
    color: "text-indigo-600"
  },
  {
    title: "Knowledge Base",
    url: createPageUrl("KnowledgeBase"),
    icon: BookOpen,
    color: "text-amber-600"
  },
  {
    title: "Test Center",
    url: createPageUrl("TestCenter"),
    icon: FlaskConical,
    color: "text-red-600"
  }
];

const clientNavigationItems = [
  {
    title: "Dashboard",
    url: "/client-dashboard",
    icon: LayoutGrid,
    color: "text-blue-600"
  },
  {
    title: "Meetings",
    url: createPageUrl("MeetingDashboard"),
    icon: Calendar,
    color: "text-purple-600"
  },
  {
    title: "Project Progress",
    url: "/client-progress",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Features",
    url: "/client-features",
    icon: CheckSquare,
    color: "text-purple-600"
  },
  {
    title: "Messages",
    url: "/client-messages",
    icon: MessageSquare,
    color: "text-orange-600"
  },
  {
    title: "Documents",
    url: "/client-documents",
    icon: FileText,
    color: "text-cyan-600"
  },
  {
    title: "Support",
    url: "/client-support",
    icon: Users,
    color: "text-pink-600"
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
  let portalTitle = 'PROJECT AI';
  let portalSubtitle = 'ORCHESTRATION';
  let sectionLabel = 'NAVIGATION';
  
  if (isTeamMember) {
    navItems = teamNavigationItems;
    portalTitle = 'TEAM PORTAL';
    portalSubtitle = 'WORKSPACE';
    sectionLabel = 'MY WORKSPACE';
  } else if (isClient) {
    navItems = clientNavigationItems;
    portalTitle = 'CLIENT PORTAL';
    portalSubtitle = 'PROJECT VIEW';
    sectionLabel = 'MY PROJECT';
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
      <style>{`
        :root {
          --neo-blue: #0066FF;
          --neo-orange: #FF6600;
          --neo-green: #00CC44;
          --neo-pink: #FF0099;
          --neo-purple: #7700FF;
          --neo-cyan: #00FFCC;
          --neo-black: #000000;
          --neo-white: #FFFFFF;
        }
        
        .neo-button {
          border: 4px solid var(--neo-black) !important;
          box-shadow: 8px 8px 0px var(--neo-black) !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 10px 10px 0px var(--neo-black) !important;
        }
        
        .neo-card {
          border: 4px solid var(--neo-black) !important;
          box-shadow: 8px 8px 0px var(--neo-black) !important;
        }
        
        .neo-input {
          border: 3px solid var(--neo-black) !important;
          box-shadow: 4px 4px 0px var(--neo-black) !important;
        }
        
        .neo-sidebar {
          border-right: 4px solid var(--neo-black) !important;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
        }
        
        .neo-active {
          background: var(--neo-blue) !important;
          color: white !important;
          border: 3px solid var(--neo-black) !important;
          box-shadow: 4px 4px 0px var(--neo-black) !important;
          transform: translate(-1px, -1px) !important;
        }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="neo-sidebar">
          <SidebarHeader className="border-b-4 border-black p-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 neo-card rounded-none flex items-center justify-center ${
                isClient ? 'bg-gradient-to-br from-green-500 to-blue-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                {isClient ? <Eye className="w-7 h-7 text-white" /> : <Brain className="w-7 h-7 text-white" />}
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                  {portalTitle}
                </h2>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  {portalSubtitle}
                </p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-black text-gray-900 uppercase tracking-widest px-3 py-3 border-b-2 border-gray-300">
                {sectionLabel}
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-4">
                <SidebarMenu className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`rounded-none font-bold uppercase tracking-wide transition-all duration-100 ${
                            isActive 
                              ? 'neo-active text-white' 
                              : 'hover:bg-white hover:border-2 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-1px] hover:translate-y-[-1px]'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 p-3">
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  
                  {/* Logout button for clients */}
                  {isClient && (
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        className="rounded-none font-bold uppercase tracking-wide transition-all duration-100 hover:bg-red-100 hover:border-2 hover:border-black hover:shadow-[4px_4px_0px_#000] hover:transform hover:translate-x-[-1px] hover:translate-y-[-1px]"
                        onClick={handleLogout}
                      >
                        <div className="flex items-center gap-3 p-3">
                          <LogOut className="w-5 h-5 text-red-600" />
                          <span className="text-sm text-red-600">Logout</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t-4 border-black">
            <div className={`flex items-center gap-3 p-3 neo-card text-white ${
              isClient ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}>
              {isClient ? <Eye className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
              <div>
                <div className="text-sm font-black uppercase">
                  {isClient ? 'CLIENT VIEW' : 'AI POWERED'}
                </div>
                <div className="text-xs font-bold opacity-80">
                  {isClient ? 'Project Portal' : isTeamMember ? 'Smart Workspace' : 'Next-Gen PM'}
                </div>
              </div>
            </div>
            
            {!isTeamMember && !isClient && (
              <div className="mt-3 space-y-2">
                <Link 
                  to={createPageUrl("TeamLogin")}
                  className="block w-full p-2 text-center bg-gray-200 hover:bg-gray-300 border-2 border-black font-bold uppercase text-xs transition-colors"
                >
                  TEAM LOGIN
                </Link>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-hidden">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
