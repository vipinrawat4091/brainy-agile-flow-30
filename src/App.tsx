import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./components/layout/AppLayout";

// Page imports
import Index from "./pages/Index";  
import TeamLogin from "./pages/TeamLogin";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import SprintBoard from "./pages/SprintBoard";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";
import TeamDashboard from "./pages/TeamDashboard";
import CreateTask from "./pages/CreateTask";
import AITaskHelper from "./pages/AITaskHelper";
import TeamCollaboration from "./pages/TeamCollaboration";
import MyProgress from "./pages/MyProgress";
import MyCalendar from "./pages/MyCalendar";
import KnowledgeBase from "./pages/KnowledgeBase";
import TeamSprintBoard from "./pages/TeamSprintBoard";
import EditTask from "./pages/EditTask";
import Workspace from "./pages/Workspace";
import MyTasks from "./pages/MyTasks";
import Progress from "./pages/Progress";
import TestCenter from "./pages/TestCenter";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProgress from "./pages/ClientProgress";
import ClientFeatures from "./pages/ClientFeatures";
import ClientMessages from "./pages/ClientMessages";
import ClientDocuments from "./pages/ClientDocuments";
import ClientSupport from "./pages/ClientSupport";
import TeamLogs from "./pages/TeamLogs";
import ClientManagement from "./pages/ClientManagement";
import ClientMeetings from "./pages/ClientMeetings";
import MeetingDashboard from "./pages/MeetingDashboard";
import MeetingInterface from "./pages/MeetingInterface";
import Features from "./pages/Features";
import ClientTickets from "./pages/ClientTickets";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/team-login" element={<TeamLogin />} />
          
          <Route 
            path="/dashboard" 
            element={
              <AppLayout currentPageName="Dashboard">
                <Dashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <AppLayout currentPageName="Projects">
                <Projects />
              </AppLayout>
            } 
          />
          <Route 
            path="/create-project" 
            element={
              <AppLayout currentPageName="CreateProject">
                <CreateProject />
              </AppLayout>
            } 
          />
          <Route 
            path="/sprint-board" 
            element={
              <AppLayout currentPageName="SprintBoard">
                <SprintBoard />
              </AppLayout>
            } 
          />
          <Route 
            path="/team" 
            element={
              <AppLayout currentPageName="Team">
                <Team />
              </AppLayout>
            } 
          />
          <Route 
            path="/progress" 
            element={
              <AppLayout currentPageName="Progress">
                <Progress />
              </AppLayout>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <AppLayout currentPageName="Analytics">
                <Analytics />
              </AppLayout>
            } 
          />
          <Route 
            path="/workspace" 
            element={
              <AppLayout currentPageName="Workspace">
                <Workspace />
              </AppLayout>
            } 
          />
          <Route 
            path="/team-dashboard"
            element={
              <AppLayout currentPageName="TeamDashboard">
                <TeamDashboard />
              </AppLayout>
            }
          />
          <Route 
            path="/my-tasks"
            element={
              <AppLayout currentPageName="MyTasks">
                <MyTasks />
              </AppLayout>
            }
          />
          <Route 
            path="/create-task"
            element={
              <AppLayout currentPageName="CreateTask">
                <CreateTask />
              </AppLayout>
            }
          />
          <Route 
            path="/ai-task-helper"
            element={
              <AppLayout currentPageName="AITaskHelper">
                <AITaskHelper />
              </AppLayout>
            }
          />
          <Route 
            path="/team-collaboration"
            element={
              <AppLayout currentPageName="TeamCollaboration">
                <TeamCollaboration />
              </AppLayout>
            }
          />
          <Route 
            path="/my-progress"
            element={
              <AppLayout currentPageName="MyProgress">
                <MyProgress />
              </AppLayout>
            }
          />
          <Route 
            path="/my-calendar"
            element={
              <AppLayout currentPageName="MyCalendar">
                <MyCalendar />
              </AppLayout>
            }
          />
          <Route 
            path="/knowledge-base"
            element={
              <AppLayout currentPageName="KnowledgeBase">
                <KnowledgeBase />
              </AppLayout>
            }
          />
          <Route 
            path="/team-sprint-board"
            element={
              <AppLayout currentPageName="TeamSprintBoard">
                <TeamSprintBoard />
              </AppLayout>
            }
          />
          <Route 
            path="/edit-task"
            element={
              <AppLayout currentPageName="EditTask">
                <EditTask />
              </AppLayout>
            }
          />
          <Route 
            path="/test-center"
            element={
              <AppLayout currentPageName="TestCenter">
                <TestCenter />
              </AppLayout>
            }
          />
          <Route 
            path="/team-logs"
            element={
              <AppLayout currentPageName="TeamLogs">
                <TeamLogs />
              </AppLayout>
            }
          />
          
          <Route 
            path="/features" 
            element={
              <AppLayout currentPageName="Features">
                <Features />
              </AppLayout>
            } 
          />
          <Route 
            path="/client-tickets" 
            element={
              <AppLayout currentPageName="ClientTickets">
                <ClientTickets />
              </AppLayout>
            } 
          />
          
          <Route 
            path="/client-dashboard" 
            element={
              <AppLayout currentPageName="ClientDashboard">
                <ClientDashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/client-progress" 
            element={
              <AppLayout currentPageName="ClientProgress">
                <ClientProgress />
              </AppLayout>
            } 
          />
          <Route 
            path="/client-features" 
            element={
              <AppLayout currentPageName="ClientFeatures">
                <ClientFeatures />
              </AppLayout>
            } 
          />
          <Route 
            path="/client-messages" 
            element={
              <AppLayout currentPageName="ClientMessages">
                <ClientMessages />
              </AppLayout>
            } 
          />
          <Route 
            path="/client-documents" 
            element={
              <AppLayout currentPageName="ClientDocuments">
                <ClientDocuments />
              </AppLayout>
            } 
          />
          <Route 
            path="/client-support" 
            element={
              <AppLayout currentPageName="ClientSupport">
                <ClientSupport />
              </AppLayout>
            } 
          />
          <Route 
            path="/client-management" 
            element={
              <AppLayout currentPageName="ClientManagement">
                <ClientManagement />
              </AppLayout>
            } 
          />
          <Route 
            path="/client-meetings" 
            element={
              <AppLayout currentPageName="ClientMeetings">
                <ClientMeetings />
              </AppLayout>
            } 
          />
          <Route 
            path="/meeting-dashboard" 
            element={
              <AppLayout currentPageName="MeetingDashboard">
                <MeetingDashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/meeting-interface" 
            element={<MeetingInterface />} 
          />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
