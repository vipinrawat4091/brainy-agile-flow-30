import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserCheck,
  Plus,
  Mail,
  Key,
  FolderOpen,
  Eye,
  Edit,
  Trash2,
  Search,
  Users,
  Shield,
  CheckCircle2,
  AlertCircle,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import EditClientModal from "@/components/client/EditClientModal";
import ScheduleMeetingModal from "@/components/client/ScheduleMeetingModal";
import MeetingHistoryModal from "@/components/client/MeetingHistoryModal";
import { mockMeetings } from "@/utils/mockMeetings";

// Mock data for demonstration
const mockProjects = [
  { id: "1", name: "E-Commerce Platform", status: "active" },
  { id: "2", name: "Mobile Banking App", status: "active" },
  { id: "3", name: "Healthcare Portal", status: "completed" },
  { id: "4", name: "Education System", status: "planning" }
];

const mockClients = [
  {
    id: "1",
    username: "client_ecommerce",
    email: "john@ecommerce.com",
    full_name: "John Smith",
    company: "E-Commerce Corp",
    assigned_projects: ["1"],
    created_date: "2024-01-15",
    last_login: "2024-01-20",
    status: "active"
  },
  {
    id: "2",
    username: "banking_client",
    email: "sarah@banking.com",
    full_name: "Sarah Johnson",
    company: "Banking Solutions",
    assigned_projects: ["2"],
    created_date: "2024-01-10",
    last_login: "2024-01-19",
    status: "active"
  }
];

export default function ClientManagement() {
  const [clients, setClients] = useState(mockClients);
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClient, setNewClient] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    company: "",
    assigned_projects: []
  });
  const [editingClient, setEditingClient] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [schedulingClient, setSchedulingClient] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [viewingMeetingsClient, setViewingMeetingsClient] = useState(null);
  const [showMeetingsModal, setShowMeetingsModal] = useState(false);
  const [meetings, setMeetings] = useState(mockMeetings);

  const filteredClients = clients.filter(client =>
    client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectAssignment = (projectId, checked) => {
    setNewClient(prev => ({
      ...prev,
      assigned_projects: checked
        ? [...prev.assigned_projects, projectId]
        : prev.assigned_projects.filter(id => id !== projectId)
    }));
  };

  const createClient = async (e) => {
    e.preventDefault();
    if (!newClient.username || !newClient.email || !newClient.password || !newClient.full_name) {
      return;
    }

    const clientData = {
      ...newClient,
      id: `client_${Date.now()}`,
      created_date: new Date().toISOString().split('T')[0],
      last_login: null,
      status: "active"
    };

    setClients(prev => [...prev, clientData]);
    setNewClient({
      username: "",
      email: "",
      password: "",
      full_name: "",
      company: "",
      assigned_projects: []
    });
    setShowCreateForm(false);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowEditModal(true);
  };

  const handleSaveClient = (updatedClient) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  const handleScheduleMeeting = (client) => {
    setSchedulingClient(client);
    setShowScheduleModal(true);
  };

  const handleMeetingScheduled = (meetingData) => {
    setMeetings(prev => [...prev, meetingData]);
  };

  const handleViewMeetings = (client) => {
    setViewingMeetingsClient(client);
    setShowMeetingsModal(true);
  };

  const getProjectNames = (projectIds) => {
    return projects
      .filter(p => projectIds.includes(p.id))
      .map(p => p.name);
  };

  const getClientMeetingCount = (clientId) => {
    return meetings.filter(meeting => meeting.client_id === clientId).length;
  };

  const deleteClient = (clientId) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              CLIENT MANAGEMENT
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              MANAGE CLIENT ACCOUNTS & PROJECT ACCESS
            </p>
          </div>

          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="neo-button bg-green-500 text-white font-black uppercase"
          >
            <Plus className="w-5 h-5 mr-2" />
            CREATE CLIENT
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="neo-card bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
              <CardTitle className="text-sm font-black uppercase text-gray-900">TOTAL CLIENTS</CardTitle>
              <Users className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-black text-gray-900">{clients.length}</div>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-green-600">ALL ACTIVE</span>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
              <CardTitle className="text-sm font-black uppercase text-gray-900">ASSIGNED PROJECTS</CardTitle>
              <FolderOpen className="w-5 h-5 text-purple-600" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-black text-gray-900">
                {new Set(clients.flatMap(c => c.assigned_projects)).size}
              </div>
              <p className="text-sm font-bold text-gray-600 mt-1">UNIQUE PROJECTS</p>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
              <CardTitle className="text-sm font-black uppercase text-gray-900">ACCESS LEVEL</CardTitle>
              <Shield className="w-5 h-5 text-orange-600" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-black text-orange-600">SECURE</div>
              <p className="text-sm font-bold text-gray-600 mt-1">PROJECT-RESTRICTED</p>
            </CardContent>
          </Card>

          <Card className="neo-card bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-4 border-gray-900">
              <CardTitle className="text-sm font-black uppercase text-gray-900">ACTIVITY</CardTitle>
              <Eye className="w-5 h-5 text-cyan-600" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-black text-green-600">
                {clients.filter(c => c.last_login).length}
              </div>
              <p className="text-sm font-bold text-gray-600 mt-1">RECENT LOGINS</p>
            </CardContent>
          </Card>
        </div>

        {/* Create Client Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card bg-white"
          >
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-green-600" />
                CREATE NEW CLIENT
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={createClient} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-black text-gray-900 uppercase">FULL NAME</Label>
                    <Input
                      name="full_name"
                      value={newClient.full_name}
                      onChange={handleInputChange}
                      className="neo-input mt-1 font-bold"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-black text-gray-900 uppercase">COMPANY</Label>
                    <Input
                      name="company"
                      value={newClient.company}
                      onChange={handleInputChange}
                      className="neo-input mt-1 font-bold"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-black text-gray-900 uppercase">EMAIL</Label>
                    <Input
                      name="email"
                      type="email"
                      value={newClient.email}
                      onChange={handleInputChange}
                      className="neo-input mt-1 font-bold"
                      placeholder="client@company.com"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-black text-gray-900 uppercase">USERNAME</Label>
                    <Input
                      name="username"
                      value={newClient.username}
                      onChange={handleInputChange}
                      className="neo-input mt-1 font-bold"
                      placeholder="client_username"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-black text-gray-900 uppercase">PASSWORD</Label>
                    <Input
                      name="password"
                      type="password"
                      value={newClient.password}
                      onChange={handleInputChange}
                      className="neo-input mt-1 font-bold"
                      placeholder="Create secure password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase mb-4 block">
                    ASSIGN PROJECTS
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {projects.map((project) => (
                      <div key={project.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`project-${project.id}`}
                          checked={newClient.assigned_projects.includes(project.id)}
                          onCheckedChange={(checked) => handleProjectAssignment(project.id, checked)}
                        />
                        <label
                          htmlFor={`project-${project.id}`}
                          className="text-sm font-bold text-gray-700 cursor-pointer"
                        >
                          {project.name}
                          <Badge 
                            className={`ml-2 text-xs ${
                              project.status === 'active' ? 'bg-green-500' : 
                              project.status === 'completed' ? 'bg-blue-500' : 'bg-orange-500'
                            } text-white border-2 border-black`}
                          >
                            {project.status.toUpperCase()}
                          </Badge>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="neo-button bg-green-500 text-white font-black uppercase"
                  >
                    <UserCheck className="w-5 h-5 mr-2" />
                    CREATE CLIENT
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    variant="outline"
                    className="neo-button bg-white text-gray-900 font-black uppercase"
                  >
                    CANCEL
                  </Button>
                </div>
              </form>
            </CardContent>
          </motion.div>
        )}

        {/* Search */}
        <Card className="neo-card bg-white">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="SEARCH CLIENTS BY NAME, COMPANY, OR EMAIL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neo-input pl-10 font-bold uppercase"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Grid */}
        {filteredClients.length === 0 ? (
          <div className="text-center py-16">
            <UserCheck className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">
              {searchTerm ? "NO CLIENTS FOUND" : "NO CLIENTS YET"}
            </h2>
            <p className="text-gray-400 font-bold">
              {searchTerm ? "Try adjusting your search terms" : "Create your first client to get started"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="neo-card bg-white hover:shadow-[12px_12px_0px_#000] transition-all duration-200">
                  <CardHeader className="border-b-2 border-gray-200 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 border-4 border-black flex items-center justify-center">
                          <span className="text-white font-black text-lg">
                            {client.full_name[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 uppercase">
                            {client.full_name}
                          </h3>
                          <p className="text-sm font-bold text-gray-600">
                            {client.company || "Independent"}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white border-2 border-black font-black">
                        {client.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-600 truncate">
                          {client.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Key className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-600">
                          {client.username}
                        </span>
                      </div>
                    </div>

                    {/* Assigned Projects */}
                    <div>
                      <div className="text-xs font-black text-gray-900 uppercase mb-2">
                        ASSIGNED PROJECTS ({client.assigned_projects.length})
                      </div>
                      <div className="space-y-1">
                        {client.assigned_projects.length === 0 ? (
                          <p className="text-xs text-gray-500 font-bold">No projects assigned</p>
                        ) : (
                          getProjectNames(client.assigned_projects).map((name) => (
                            <div key={name} className="flex items-center gap-2">
                              <FolderOpen className="w-3 h-3 text-blue-500" />
                              <span className="text-xs font-bold text-gray-700">{name}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="pt-3 border-t-2 border-gray-200">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                          <div className="text-sm font-black text-gray-900">
                            {client.created_date.split('-')[2]}/{client.created_date.split('-')[1]}
                          </div>
                          <div className="text-xs font-bold text-gray-500 uppercase">CREATED</div>
                        </div>
                        <div>
                          <div className="text-sm font-black text-gray-900">
                            {client.last_login ? 
                              `${client.last_login.split('-')[2]}/${client.last_login.split('-')[1]}` : 
                              'Never'
                            }
                          </div>
                          <div className="text-xs font-bold text-gray-500 uppercase">LAST LOGIN</div>
                        </div>
                      </div>
                    </div>

                    {/* Meeting Info */}
                    <div className="pt-3 border-t-2 border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-black text-gray-900 uppercase">
                          MEETINGS
                        </div>
                        <Badge className="bg-purple-500 text-white border-2 border-black font-black text-xs">
                          {getClientMeetingCount(client.id)}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditClient(client)}
                        variant="outline"
                        className="neo-button bg-blue-50 text-blue-700 font-bold uppercase"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        EDIT
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleScheduleMeeting(client)}
                        variant="outline"
                        className="neo-button bg-purple-50 text-purple-700 font-bold uppercase"
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        MEET
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleViewMeetings(client)}
                        variant="outline"
                        className="neo-button bg-green-50 text-green-700 font-bold uppercase"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        VIEW
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteClient(client.id)}
                        className="neo-button bg-red-50 text-red-700 font-bold uppercase"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <EditClientModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingClient(null);
        }}
        client={editingClient}
        projects={projects}
        onSave={handleSaveClient}
      />

      <ScheduleMeetingModal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setSchedulingClient(null);
        }}
        client={schedulingClient}
        onSchedule={handleMeetingScheduled}
      />

      <MeetingHistoryModal
        isOpen={showMeetingsModal}
        onClose={() => {
          setShowMeetingsModal(false);
          setViewingMeetingsClient(null);
        }}
        client={viewingMeetingsClient}
      />
    </div>
  );
}
