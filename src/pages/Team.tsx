
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Users,
  Plus,
  Mail,
  Star,
  Clock,
  Code,
  Palette,
  TestTube,
  Shield,
  Brain,
  TrendingUp,
  AlertCircle,
  PlusCircle,
  UserPlus
} from "lucide-react";
import { motion } from "framer-motion";

const ROLES = [
  { value: "owner", label: "PROJECT OWNER", icon: Shield, color: "text-red-600" },
  { value: "lead", label: "TECH LEAD", icon: Star, color: "text-purple-600" },
  { value: "developer", label: "DEVELOPER", icon: Code, color: "text-blue-600" },
  { value: "designer", label: "DESIGNER", icon: Palette, color: "text-pink-600" },
  { value: "tester", label: "QA TESTER", icon: TestTube, color: "text-green-600" },
  { value: "client", label: "CLIENT", icon: Users, color: "text-gray-600" }
];

const EXPERIENCE_LEVELS = [
  { value: "junior", label: "JUNIOR", color: "bg-yellow-500" },
  { value: "mid", label: "MID-LEVEL", color: "bg-blue-500" },
  { value: "senior", label: "SENIOR", color: "bg-purple-500" },
  { value: "expert", label: "EXPERT", color: "bg-red-500" }
];

// Mock data for demonstration
const mockProjects = [
  { id: "1", name: "E-Commerce Platform" },
  { id: "2", name: "Mobile Banking App" }
];

const mockTeamMembers = [
  {
    id: "1",
    project_id: "1",
    user_email: "john@example.com",
    full_name: "John Developer",
    role: "developer",
    experience_level: "senior",
    capacity_hours: 40,
    availability: "full_time",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"]
  },
  {
    id: "2",
    project_id: "1",
    user_email: "sarah@example.com",
    full_name: "Sarah Designer",
    role: "designer",
    experience_level: "mid",
    capacity_hours: 35,
    availability: "full_time",
    skills: ["Figma", "UI/UX", "Adobe XD"]
  }
];

const mockTasks = [
  {
    id: "1",
    project_id: "1",
    assignee_id: "john@example.com",
    status: "done",
    title: "Setup Database"
  },
  {
    id: "2",
    project_id: "1",
    assignee_id: "john@example.com",
    status: "in_progress",
    title: "User Authentication"
  },
  {
    id: "3",
    project_id: "1",
    assignee_id: "sarah@example.com",
    status: "done",
    title: "Login UI Design"
  }
];

export default function Team() {
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState("1");
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [tasks, setTasks] = useState(mockTasks);
  const [isLoading, setIsLoading] = useState(false);
  const [newMember, setNewMember] = useState({
    project_id: "1",
    user_email: "",
    username: "",
    password: "",
    full_name: "",
    role: "developer",
    experience_level: "mid",
  });

  useEffect(() => {
    loadTeamData();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadMembersForProject();
    }
  }, [selectedProject]);

  const loadTeamData = async () => {
    try {
      // In real app, this would load from database
      setProjects(mockProjects);
      if (mockProjects.length > 0) {
        setSelectedProject(mockProjects[0].id);
        setNewMember(prev => ({ ...prev, project_id: mockProjects[0].id }));
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const loadMembersForProject = async () => {
    setIsLoading(true);
    try {
      // Filter mock data by project
      const membersData = mockTeamMembers.filter(m => m.project_id === selectedProject);
      const tasksData = mockTasks.filter(t => t.project_id === selectedProject);

      setTeamMembers(membersData);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error loading team data:", error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };
  
  const handleSelectChange = (name, value) => {
    setNewMember({ ...newMember, [name]: value });
  };

  const addTeamMember = async (e) => {
    e.preventDefault();
    if (!newMember.project_id || !newMember.user_email || !newMember.full_name || !newMember.username || !newMember.password) return;

    try {
      // In real app, this would create in database
      const newMemberData = {
        ...newMember,
        id: `member_${Date.now()}`,
        capacity_hours: 40,
        availability: "full_time",
        skills: []
      };
      
      setTeamMembers(prev => [...prev, newMemberData]);
      setNewMember({
        project_id: selectedProject,
        user_email: "",
        username: "",
        password: "",
        full_name: "",
        role: "developer",
        experience_level: "mid",
      });
    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };

  const getMemberStats = (memberEmail) => {
    const memberTasks = tasks.filter(t => t.assignee_id === memberEmail);
    const completedTasks = memberTasks.filter(t => t.status === 'done').length;
    const inProgressTasks = memberTasks.filter(t => t.status === 'in_progress').length;

    return {
      total: memberTasks.length,
      completed: completedTasks,
      inProgress: inProgressTasks,
      completionRate: memberTasks.length > 0 ? (completedTasks / memberTasks.length) * 100 : 0
    };
  };

  const getRoleInfo = (role) => {
    return ROLES.find(r => r.value === role) || ROLES[2];
  };

  const getExperienceInfo = (level) => {
    return EXPERIENCE_LEVELS.find(e => e.value === level) || EXPERIENCE_LEVELS[1];
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
              TEAM MANAGEMENT
            </h1>
            <p className="text-lg font-bold text-gray-600 uppercase tracking-wide">
              BUILD & MANAGE YOUR PROJECT TEAM
            </p>
          </div>

          <div className="w-64">
            <Select value={selectedProject} onValueChange={(value) => {
              setSelectedProject(value);
              setNewMember(prev => ({ ...prev, project_id: value }));
            }}>
              <SelectTrigger className="neo-input font-bold">
                <SelectValue placeholder="SELECT PROJECT" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* AI Team Insights */}
        <Card className="neo-card bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
              <Brain className="w-6 h-6" />
              AI TEAM INSIGHTS
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black mb-2">{teamMembers.length}</div>
              <div className="text-purple-100 font-bold uppercase">TEAM MEMBERS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-2">
                {Math.round(teamMembers.reduce((sum, m) => sum + (m.capacity_hours || 0), 0) / teamMembers.length || 0)}h
              </div>
              <div className="text-purple-100 font-bold uppercase">AVG CAPACITY</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-2">
                {Math.round(teamMembers.reduce((sum, m) => sum + getMemberStats(m.user_email).completionRate, 0) / teamMembers.length || 0)}%
              </div>
              <div className="text-purple-100 font-bold uppercase">COMPLETION RATE</div>
            </div>
          </CardContent>
        </Card>

        {/* Add Member Form - Always visible */}
        <Card className="neo-card bg-white">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
              <PlusCircle className="w-6 h-6 text-green-600" />
              ADD NEW TEAM MEMBER
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={addTeamMember} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">FULL NAME</Label>
                  <Input name="full_name" value={newMember.full_name} onChange={handleInputChange} className="neo-input mt-1 font-bold" placeholder="John Doe" required />
                </div>
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">EMAIL</Label>
                  <Input name="user_email" type="email" value={newMember.user_email} onChange={handleInputChange} className="neo-input mt-1 font-bold" placeholder="john@company.com" required />
                </div>
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">USERNAME</Label>
                  <Input name="username" value={newMember.username} onChange={handleInputChange} className="neo-input mt-1 font-bold" placeholder="john_dev" required />
                </div>
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">PASSWORD</Label>
                  <Input name="password" type="password" value={newMember.password} onChange={handleInputChange} className="neo-input mt-1 font-bold" placeholder="Create password" required />
                </div>
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">ROLE</Label>
                  <Select value={newMember.role} onValueChange={(value) => handleSelectChange('role', value)}>
                    <SelectTrigger className="neo-input mt-1 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <role.icon className={`w-4 h-4 ${role.color}`} />
                            {role.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-black text-gray-900 uppercase">EXPERIENCE</Label>
                  <Select value={newMember.experience_level} onValueChange={(value) => handleSelectChange('experience_level', value)}>
                    <SelectTrigger className="neo-input mt-1 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!newMember.full_name || !newMember.user_email || !newMember.username || !newMember.password}
                  className="neo-button bg-green-500 text-white font-black uppercase"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  ADD MEMBER
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        {!selectedProject ? (
          <div className="text-center py-16">
            <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">NO PROJECT SELECTED</h2>
            <p className="text-gray-400 font-bold">Choose a project to manage team members</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">NO TEAM MEMBERS</h2>
            <p className="text-gray-400 font-bold">Add team members to get started</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => {
              const roleInfo = getRoleInfo(member.role);
              const expInfo = getExperienceInfo(member.experience_level);
              const stats = getMemberStats(member.user_email);

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="neo-card bg-white hover:shadow-[12px_12px_0px_#000] transition-all duration-200">
                    <CardHeader className="border-b-2 border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-black flex items-center justify-center">
                            <span className="text-white font-black text-lg">
                              {member.full_name ? member.full_name[0].toUpperCase() : 'U'}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-black text-gray-900 uppercase">
                              {member.full_name || member.user_email}
                            </h3>
                            <div className="flex items-center gap-2">
                              <roleInfo.icon className={`w-4 h-4 ${roleInfo.color}`} />
                              <span className="text-sm font-bold text-gray-600">
                                {roleInfo.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Badge className={`font-black border-2 border-black ${expInfo.color} text-white`}>
                          {expInfo.label}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 space-y-4">
                      {/* Contact */}
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-600 truncate">
                          {member.user_email}
                        </span>
                      </div>

                      {/* Capacity */}
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-600">
                          {member.capacity_hours}h/week • {member.availability?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      {/* Performance Stats */}
                      <div className="grid grid-cols-3 gap-2 text-center py-3 border-2 border-gray-200 bg-gray-50">
                        <div>
                          <div className="text-lg font-black text-gray-900">{stats.total}</div>
                          <div className="text-xs font-bold text-gray-500 uppercase">TASKS</div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-green-600">{stats.completed}</div>
                          <div className="text-xs font-bold text-gray-500 uppercase">DONE</div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-blue-600">{stats.inProgress}</div>
                          <div className="text-xs font-bold text-gray-500 uppercase">ACTIVE</div>
                        </div>
                      </div>

                      {/* Completion Rate */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-gray-600">COMPLETION RATE</span>
                          <span className="font-black text-gray-900">{Math.round(stats.completionRate)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 border-2 border-gray-400">
                          <div
                            className="bg-green-500 h-full transition-all duration-500"
                            style={{ width: `${stats.completionRate}%` }}
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      {member.skills && member.skills.length > 0 && (
                        <div>
                          <div className="text-xs font-black text-gray-900 uppercase mb-2">SKILLS</div>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.slice(0, 4).map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-xs font-bold border-2 border-gray-400"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {member.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs font-bold border-2 border-gray-400">
                                +{member.skills.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
