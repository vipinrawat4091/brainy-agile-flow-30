
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  MoreVertical,
  Filter,
  Download,
  Edit,
  Trash2,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockClients } from "@/utils/mockClients";

export default function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setClients(mockClients);
      setIsLoading(false);
    };

    loadClients();
  }, []);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || client.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-md-background min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-md-surface-variant rounded-lg w-64"></div>
            <div className="grid gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-md-surface-variant rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-md-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="md-headline-medium text-on-background mb-2">Client Management</h1>
            <p className="md-body-large text-outline">Manage your client relationships and projects</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <Card elevation={1} className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-outline" />
              <Input
                placeholder="Search clients by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("all")}
                className="whitespace-nowrap"
              >
                All ({clients.length})
              </Button>
              <Button
                variant={selectedStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("active")}
                className="whitespace-nowrap"
              >
                Active ({clients.filter(c => c.status === 'active').length})
              </Button>
              <Button
                variant={selectedStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("pending")}
                className="whitespace-nowrap"
              >
                Pending ({clients.filter(c => c.status === 'pending').length})
              </Button>
            </div>
          </div>
        </Card>

        {/* Client Grid */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card elevation={1} className="p-6 hover:md-elevation-2 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback className="bg-primary text-on-primary font-medium">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="md-title-large text-on-surface truncate">{client.name}</h3>
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-outline">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            <span className="md-body-medium">{client.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="md-body-medium">{client.email}</span>
                          </div>
                          {client.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span className="md-body-medium">{client.phone}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-outline">
                            <Calendar className="w-4 h-4" />
                            <span className="md-body-small">
                              Joined {new Date(client.joinedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="md-body-small text-outline">
                            {client.projectsCount} projects
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredClients.length === 0 && (
          <Card elevation={1} className="p-12 text-center">
            <Users className="w-16 h-16 text-outline mx-auto mb-4" />
            <h2 className="md-title-large text-on-surface mb-2">No clients found</h2>
            <p className="md-body-medium text-outline mb-6">
              {searchTerm || selectedStatus !== "all" 
                ? "Try adjusting your search or filters"
                : "Get started by adding your first client"
              }
            </p>
            {(!searchTerm && selectedStatus === "all") && (
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Client
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
